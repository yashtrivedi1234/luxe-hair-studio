import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { bookingId } = await req.json();
    if (!bookingId) return NextResponse.json({ error: "bookingId required" }, { status: 400 });

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { service: true },
    });
    if (!booking || booking.advanceAmount <= 0) {
      return NextResponse.json({ error: "No advance due" }, { status: 400 });
    }

    const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // Demo mode when keys missing — mark as mock order
    if (!keyId || !keySecret) {
      const mockOrderId = `order_demo_${booking.id.slice(0, 8)}`;
      await prisma.booking.update({
        where: { id: booking.id },
        data: { razorpayOrderId: mockOrderId, paymentStatus: "PENDING" },
      });
      await prisma.payment.create({
        data: {
          bookingId: booking.id,
          amountInr: booking.advanceAmount,
          razorpayOrderId: mockOrderId,
          status: "CREATED",
        },
      });
      return NextResponse.json({
        demo: true,
        orderId: mockOrderId,
        amount: booking.advanceAmount * 100,
        currency: "INR",
        keyId: "rzp_test_demo",
        bookingId: booking.id,
      });
    }

    const amountPaise = booking.advanceAmount * 100;
    const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amountPaise,
        currency: "INR",
        receipt: booking.id,
        notes: { bookingId: booking.id },
      }),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error(err);
      return NextResponse.json({ error: "Razorpay order failed" }, { status: 502 });
    }
    const order = await res.json();
    await prisma.booking.update({
      where: { id: booking.id },
      data: { razorpayOrderId: order.id, paymentStatus: "PENDING" },
    });
    await prisma.payment.create({
      data: {
        bookingId: booking.id,
        amountInr: booking.advanceAmount,
        razorpayOrderId: order.id,
        status: "CREATED",
      },
    });
    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
      bookingId: booking.id,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Payment init failed" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { bookingId, razorpay_order_id, razorpay_payment_id, razorpay_signature, demo } = body;

    if (demo) {
      await prisma.booking.update({
        where: { id: bookingId },
        data: { paymentStatus: "PAID", status: "CONFIRMED" },
      });
      await prisma.payment.updateMany({
        where: { bookingId },
        data: { status: "PAID", razorpayPaymentId: "pay_demo" },
      });
      return NextResponse.json({ ok: true, demo: true });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) return NextResponse.json({ error: "Not configured" }, { status: 500 });

    const expected = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expected !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    await prisma.booking.update({
      where: { id: bookingId },
      data: { paymentStatus: "PAID", status: "CONFIRMED" },
    });
    await prisma.payment.updateMany({
      where: { razorpayOrderId: razorpay_order_id },
      data: {
        status: "PAID",
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Verify failed" }, { status: 500 });
  }
}
