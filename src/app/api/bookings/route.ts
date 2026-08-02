import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { notifyBooking } from "@/lib/notify";

const schema = z.object({
  serviceId: z.string(),
  stylistId: z.string().optional(),
  customerName: z.string().min(1).max(100),
  customerPhone: z.string().min(8).max(20),
  customerEmail: z.string().email().optional().or(z.literal("")),
  date: z.string().min(8),
  time: z.string().min(4),
  notes: z.string().max(1000).optional(),
  payAdvance: z.boolean().optional(),
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");
  const stylistId = searchParams.get("stylistId");
  if (!date) return NextResponse.json({ error: "date required" }, { status: 400 });

  const day = new Date(date + "T12:00:00").getDay();
  const avail = await prisma.availability.findMany({
    where: stylistId ? { stylistId, dayOfWeek: day } : { dayOfWeek: day },
  });

  const booked = await prisma.booking.findMany({
    where: {
      date,
      status: { notIn: ["CANCELLED", "LOST"] },
      ...(stylistId ? { stylistId } : {}),
    },
    select: { time: true, stylistId: true },
  });

  const slots: string[] = [];
  for (const a of avail) {
    const [sh, sm] = a.startTime.split(":").map(Number);
    const [eh, em] = a.endTime.split(":").map(Number);
    let mins = sh * 60 + sm;
    const end = eh * 60 + em;
    while (mins + 30 <= end) {
      const h = String(Math.floor(mins / 60)).padStart(2, "0");
      const m = String(mins % 60).padStart(2, "0");
      const t = `${h}:${m}`;
      const taken = booked.some(
        (b) => b.time === t && (!stylistId || b.stylistId === a.stylistId)
      );
      if (!taken && !slots.includes(t)) slots.push(t);
      mins += 30;
    }
  }
  slots.sort();
  return NextResponse.json({ slots });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = schema.parse(body);
    const service = await prisma.service.findUnique({ where: { id: data.serviceId } });
    if (!service || !service.active) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    const advance = data.payAdvance ? Math.min(500, Math.round(service.priceInr * 0.2)) : 0;

    const booking = await prisma.booking.create({
      data: {
        serviceId: data.serviceId,
        stylistId: data.stylistId || null,
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        customerEmail: data.customerEmail || null,
        date: data.date,
        time: data.time,
        notes: data.notes || null,
        status: "PENDING",
        advanceAmount: advance,
        paymentStatus: advance > 0 ? "PENDING" : "UNPAID",
      },
      include: { service: true },
    });

    await notifyBooking({
      id: booking.id,
      customerName: booking.customerName,
      customerPhone: booking.customerPhone,
      date: booking.date,
      time: booking.time,
      serviceName: booking.service.name,
    });

    // Also create a lead for CRM pipeline
    await prisma.lead.create({
      data: {
        name: data.customerName,
        phone: data.customerPhone,
        email: data.customerEmail || null,
        source: "BOOKING",
        interest: service.name,
        message: `${data.date} ${data.time}`,
        status: "BOOKED",
      },
    });

    return NextResponse.json({
      ok: true,
      bookingId: booking.id,
      advanceAmount: advance,
      needsPayment: advance > 0,
    });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: e.flatten() }, { status: 400 });
    }
    console.error(e);
    return NextResponse.json({ error: "Booking failed" }, { status: 500 });
  }
}
