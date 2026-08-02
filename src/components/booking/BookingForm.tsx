"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatInr, whatsappLink } from "@/lib/site";

type Service = { id: string; name: string; priceInr: number; durationMin: number };
type Stylist = { id: string; name: string; title: string };

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

export function BookingForm({
  services,
  stylists,
}: {
  services: Service[];
  stylists: Stylist[];
}) {
  const [serviceId, setServiceId] = useState(services[0]?.id || "");
  const [stylistId, setStylistId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [slots, setSlots] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [payAdvance, setPayAdvance] = useState(true);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState<{ id: string } | null>(null);

  useEffect(() => {
    if (!date) return;
    const q = new URLSearchParams({ date });
    if (stylistId) q.set("stylistId", stylistId);
    fetch(`/api/bookings?${q}`)
      .then((r) => r.json())
      .then((d) => setSlots(d.slots || []))
      .catch(() => setSlots([]));
  }, [date, stylistId]);

  async function pay(bookingId: string) {
    const orderRes = await fetch("/api/payments/razorpay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingId }),
    });
    const order = await orderRes.json();
    if (!orderRes.ok) throw new Error(order.error || "Payment failed");

    if (order.demo) {
      await fetch("/api/payments/razorpay", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId, demo: true }),
      });
      toast.success("Demo payment recorded. Booking confirmed!");
      return;
    }

    await new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Razorpay script failed"));
      document.body.appendChild(script);
    });

    await new Promise<void>((resolve, reject) => {
      if (!window.Razorpay) return reject(new Error("Razorpay missing"));
      const rzp = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "LuxeSalon Lucknow",
        description: "Booking advance",
        order_id: order.orderId,
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          const verify = await fetch("/api/payments/razorpay", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ bookingId, ...response }),
          });
          if (!verify.ok) reject(new Error("Verification failed"));
          else resolve();
        },
        modal: { ondismiss: () => reject(new Error("Payment cancelled")) },
      });
      rzp.open();
    });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId,
          stylistId: stylistId || undefined,
          customerName: name,
          customerPhone: phone,
          customerEmail: email,
          date,
          time,
          notes,
          payAdvance,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(typeof data.error === "string" ? data.error : "Failed");
      if (data.needsPayment) await pay(data.bookingId);
      setDone({ id: data.bookingId });
      toast.success("Booking received!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    const svc = services.find((s) => s.id === serviceId);
    return (
      <div className="rounded-xl border bg-card p-8 text-center shadow-soft space-y-4">
        <h2 className="font-display text-3xl font-semibold text-primary">Booking Confirmed</h2>
        <p className="text-muted-foreground">
          Ref: {done.id.slice(0, 8).toUpperCase()} — {svc?.name} on {date} at {time}
        </p>
        <Button asChild>
          <a href={whatsappLink(`Hi LuxeSalon! Booking ref ${done.id}. ${name}, ${date} ${time}.`)}>
            Message on WhatsApp
          </a>
        </Button>
      </div>
    );
  }

  const selected = services.find((s) => s.id === serviceId);

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-border/70 bg-card/90 backdrop-blur p-6 md:p-9 shadow-card space-y-5">
      <div>
        <Label htmlFor="service">Service</Label>
        <select id="service" className="mt-2 flex h-11 w-full rounded-md border border-input bg-background px-3 text-sm" value={serviceId} onChange={(e) => setServiceId(e.target.value)} required>
          {services.map((s) => (
            <option key={s.id} value={s.id}>{s.name} — {formatInr(s.priceInr)}</option>
          ))}
        </select>
      </div>
      <div>
        <Label htmlFor="stylist">Stylist (optional)</Label>
        <select id="stylist" className="mt-2 flex h-11 w-full rounded-md border border-input bg-background px-3 text-sm" value={stylistId} onChange={(e) => setStylistId(e.target.value)}>
          <option value="">Any available</option>
          {stylists.map((s) => (
            <option key={s.id} value={s.id}>{s.name} — {s.title}</option>
          ))}
        </select>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="date">Date</Label>
          <Input id="date" type="date" className="mt-2 h-11" value={date} min={new Date().toISOString().slice(0, 10)} onChange={(e) => { setDate(e.target.value); setTime(""); }} required />
        </div>
        <div>
          <Label htmlFor="time">Time</Label>
          <select id="time" className="mt-2 flex h-11 w-full rounded-md border border-input bg-background px-3 text-sm" value={time} onChange={(e) => setTime(e.target.value)} required>
            <option value="">Select slot</option>
            {slots.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Full name</Label>
          <Input id="name" className="mt-2 h-11" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="phone">WhatsApp / Phone</Label>
          <Input id="phone" className="mt-2 h-11" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
      </div>
      <div>
        <Label htmlFor="email">Email (optional)</Label>
        <Input id="email" type="email" className="mt-2 h-11" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea id="notes" className="mt-2" value={notes} onChange={(e) => setNotes(e.target.value)} />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={payAdvance} onChange={(e) => setPayAdvance(e.target.checked)} />
        Pay ₹{selected ? Math.min(500, Math.round(selected.priceInr * 0.2)) : 500} advance (Razorpay)
      </label>
      <Button type="submit" variant="hero" size="lg" className="w-full rounded-full" disabled={loading}>
        {loading ? "Booking…" : "Confirm Booking"}
      </Button>
    </form>
  );
}
