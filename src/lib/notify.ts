import { Resend } from "resend";
import { SITE } from "@/lib/site";

export async function notifyLead(payload: {
  name: string;
  phone: string;
  email?: string | null;
  source: string;
  message?: string | null;
}) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL || SITE.email;
  if (!key) {
    console.info("[notify] RESEND_API_KEY missing — lead logged only", payload);
    return;
  }
  const resend = new Resend(key);
  await resend.emails.send({
    from: "LuxeSalon <onboarding@resend.dev>",
    to,
    subject: `New lead: ${payload.name} (${payload.source})`,
    text: `Name: ${payload.name}\nPhone: ${payload.phone}\nEmail: ${payload.email || "-"}\nSource: ${payload.source}\nMessage: ${payload.message || "-"}`,
  });
}

export async function notifyBooking(payload: {
  id: string;
  customerName: string;
  customerPhone: string;
  date: string;
  time: string;
  serviceName: string;
}) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL || SITE.email;
  if (!key) {
    console.info("[notify] booking", payload);
    return;
  }
  const resend = new Resend(key);
  await resend.emails.send({
    from: "LuxeSalon <onboarding@resend.dev>",
    to,
    subject: `New booking: ${payload.customerName} — ${payload.date} ${payload.time}`,
    text: `Booking ${payload.id}\n${payload.customerName} (${payload.customerPhone})\n${payload.serviceName}\n${payload.date} at ${payload.time}`,
  });
}
