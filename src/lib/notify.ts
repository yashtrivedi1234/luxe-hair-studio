import nodemailer from "nodemailer";
import { SITE } from "@/lib/site";

/** Only SMTP_EMAIL + SMTP_APP_PASSWORD required (Gmail App Password). */
function getTransporter() {
  const user = process.env.SMTP_EMAIL;
  const pass = process.env.SMTP_APP_PASSWORD;

  if (!user || !pass) return null;

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

async function sendMail(options: {
  to: string | string[];
  subject: string;
  text: string;
  html?: string;
}) {
  const transporter = getTransporter();
  const email = process.env.SMTP_EMAIL;
  const from = `"${SITE.legalName}" <${email || SITE.email}>`;

  if (!transporter) {
    console.info("[nodemailer] SMTP not configured — email skipped:", options.subject);
    console.info(options.text);
    return;
  }

  await transporter.sendMail({
    from,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html || options.text.replace(/\n/g, "<br/>"),
  });
}

export async function notifyLead(payload: {
  name: string;
  phone: string;
  email?: string | null;
  source: string;
  message?: string | null;
  interest?: string | null;
}) {
  const to = process.env.NOTIFY_EMAIL || process.env.SMTP_EMAIL || SITE.email;
  const text = [
    `New lead received`,
    ``,
    `Name: ${payload.name}`,
    `Phone: ${payload.phone}`,
    `Email: ${payload.email || "-"}`,
    `Source: ${payload.source}`,
    `Interest: ${payload.interest || "-"}`,
    `Message: ${payload.message || "-"}`,
  ].join("\n");

  await sendMail({
    to,
    subject: `New lead: ${payload.name} (${payload.source})`,
    text,
  });
}

export async function notifyBooking(payload: {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string | null;
  date: string;
  time: string;
  serviceName: string;
  stylistName?: string | null;
}) {
  const adminTo = process.env.NOTIFY_EMAIL || process.env.SMTP_EMAIL || SITE.email;
  const text = [
    `New booking request`,
    ``,
    `Ref: ${payload.id}`,
    `Customer: ${payload.customerName}`,
    `Phone: ${payload.customerPhone}`,
    `Email: ${payload.customerEmail || "-"}`,
    `Service: ${payload.serviceName}`,
    `Stylist: ${payload.stylistName || "Any"}`,
    `When: ${payload.date} at ${payload.time}`,
  ].join("\n");

  await sendMail({
    to: adminTo,
    subject: `New booking: ${payload.customerName} — ${payload.date} ${payload.time}`,
    text,
  });

  if (payload.customerEmail) {
    const customerText = [
      `Hi ${payload.customerName},`,
      ``,
      `Thank you for booking with ${SITE.legalName}.`,
      ``,
      `Service: ${payload.serviceName}`,
      `Date: ${payload.date}`,
      `Time: ${payload.time}`,
      `Ref: ${payload.id.slice(0, 8).toUpperCase()}`,
      ``,
      `Our team will confirm shortly on WhatsApp/call.`,
      ``,
      `${SITE.legalName}`,
      `${SITE.phoneDisplay}`,
      `${SITE.address.area}, ${SITE.address.city}`,
    ].join("\n");

    await sendMail({
      to: payload.customerEmail,
      subject: `Booking received — ${SITE.name} Lucknow`,
      text: customerText,
    });
  }
}
