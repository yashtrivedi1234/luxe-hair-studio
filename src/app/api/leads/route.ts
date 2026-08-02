import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { notifyLead } from "@/lib/notify";

const schema = z.object({
  name: z.string().min(1).max(100),
  phone: z.string().min(8).max(20),
  email: z.string().email().optional().or(z.literal("")),
  source: z.string().default("CONTACT"),
  interest: z.string().optional(),
  message: z.string().max(2000).optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = schema.parse(body);
    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        source: data.source,
        interest: data.interest || null,
        message: data.message || null,
      },
    });
    await notifyLead(lead);
    return NextResponse.json({ ok: true, id: lead.id });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: e.flatten() }, { status: 400 });
    }
    console.error(e);
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }
}
