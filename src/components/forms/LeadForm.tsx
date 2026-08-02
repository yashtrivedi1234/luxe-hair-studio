"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function LeadForm({
  source = "CONTACT",
  interest,
}: {
  source?: string;
  interest?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          phone: fd.get("phone"),
          email: fd.get("email") || "",
          message: fd.get("message") || "",
          source,
          interest,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setDone(true);
      toast.success("Thanks! We'll call you soon.");
      e.currentTarget.reset();
    } catch {
      toast.error("Could not send. Try WhatsApp.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <p className="text-center text-primary font-medium py-8">
        Lead received — our Lucknow team will contact you shortly.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" className="mt-2 h-11" required />
      </div>
      <div>
        <Label htmlFor="phone">Phone / WhatsApp</Label>
        <Input id="phone" name="phone" className="mt-2 h-11" required />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" className="mt-2 h-11" />
      </div>
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" className="mt-2" rows={4} />
      </div>
      <Button type="submit" variant="hero" className="w-full" disabled={loading}>
        {loading ? "Sending…" : "Send Enquiry"}
      </Button>
    </form>
  );
}
