import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().min(1).max(100),
  rating: z.number().int().min(1).max(5),
  text: z.string().min(10).max(1000),
  service: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const data = schema.parse(await req.json());
    const review = await prisma.review.create({
      data: { ...data, service: data.service || null, approved: false },
    });
    return NextResponse.json({ ok: true, id: review.id });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: e.flatten() }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
