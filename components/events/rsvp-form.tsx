"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

type FormState = { name: string; email: string; phone: string };
const empty: FormState = { name: "", email: "", phone: "" };

export function RsvpForm({ eventId }: { eventId: string }) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  function validate(): boolean {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    if (!form.phone.trim()) next.phone = "Phone is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await fetch(`/api/events/${eventId}/rsvp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        setServerError(data.error ?? "Something went wrong.");
        return;
      }
      setDone(true);
      router.refresh();
    } catch {
      setServerError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function update(field: keyof FormState, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  // Success state — the green "You're RSVP'd" treatment from the design brief.
  if (done) {
    return (
      <div className="rounded-2xl border border-success bg-success-soft p-5">
        <p className="flex items-center gap-2 font-medium text-success-strong">
          <Check className="h-5 w-5" />
          You&apos;re RSVP&apos;d! See you there.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-accent";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-border bg-card p-5"
    >
      <h2 className="font-semibold">RSVP to this event</h2>

      <div>
        <label className="mb-1 block text-sm font-medium">Name</label>
        <input className={inputClass} value={form.name}
          onChange={(e) => update("name", e.target.value)} />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Email</label>
        <input type="email" className={inputClass} value={form.email}
          onChange={(e) => update("email", e.target.value)} />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Phone</label>
        <input className={inputClass} value={form.phone}
          onChange={(e) => update("phone", e.target.value)} />
        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
      </div>

      {serverError && <p className="text-sm text-red-600">{serverError}</p>}

      <button type="submit" disabled={submitting}
        className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent-strong disabled:opacity-50">
        {submitting ? "Submitting…" : "RSVP"}
      </button>
    </form>
  );
}
