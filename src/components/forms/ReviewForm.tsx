"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ReviewForm() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          rating: Number(fd.get("rating")),
          text: fd.get("text"),
          service: fd.get("service") || undefined,
        }),
      });
      if (!res.ok) throw new Error("fail");
      toast.success("Thanks! Review submitted for approval.");
      e.currentTarget.reset();
    } catch {
      toast.error("Could not submit review");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" className="mt-2" required />
        </div>
        <div>
          <Label htmlFor="rating">Rating</Label>
          <select id="rating" name="rating" className="mt-2 flex h-10 w-full rounded-md border px-3" defaultValue="5">
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>{n} stars</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <Label htmlFor="service">Service</Label>
        <Input id="service" name="service" className="mt-2" />
      </div>
      <div>
        <Label htmlFor="text">Review</Label>
        <Textarea id="text" name="text" className="mt-2" required minLength={10} />
      </div>
      <Button type="submit" disabled={loading}>{loading ? "Sending…" : "Submit review"}</Button>
    </form>
  );
}
