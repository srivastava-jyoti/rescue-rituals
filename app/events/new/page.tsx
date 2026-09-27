"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type EventForm = {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
};

const empty: EventForm = { title: "", description: "", date: "", time: "", location: "" };

export default function NewEventPage() {
  const router = useRouter();
  const [form, setForm] = useState<EventForm>(empty);
  const [errors, setErrors] = useState<Partial<EventForm>>({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function validate(): boolean {
    const next: Partial<EventForm> = {};
    if (!form.title.trim()) next.title = "Title is required.";
    if (!form.description.trim()) next.description = "Description is required.";
    if (!form.date) next.date = "Date is required.";
    if (!form.time) next.time = "Time is required.";
    if (!form.location.trim()) next.location = "Location is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        setServerError(data.error ?? "Something went wrong.");
        return;
      }

      router.push("/events?role=admin");
      router.refresh();
    } catch {
      setServerError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function update(field: keyof EventForm, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-accent";

  return (
    <div className="mx-auto max-w-xl px-4 py-10 sm:px-6">
      <Link
        href="/events?role=admin"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to events
      </Link>

      <h1 className="text-2xl font-bold tracking-tight">Create event</h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Title</label>
          <input className={inputClass} value={form.title}
            onChange={(e) => update("title", e.target.value)} />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Description</label>
          <textarea className={`${inputClass} min-h-24`} value={form.description}
            onChange={(e) => update("description", e.target.value)} />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Date</label>
            <input type="date" className={inputClass} value={form.date}
              onChange={(e) => update("date", e.target.value)} />
            {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Time</label>
            <input type="time" className={inputClass} value={form.time}
              onChange={(e) => update("time", e.target.value)} />
            {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time}</p>}
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Location</label>
          <input className={inputClass} value={form.location}
            onChange={(e) => update("location", e.target.value)} />
          {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
        </div>

        {serverError && <p className="text-sm text-red-600">{serverError}</p>}

        <button type="submit" disabled={submitting}
          className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent-strong disabled:opacity-50">
          {submitting ? "Creating…" : "Create event"}
        </button>
      </form>
    </div>
  );
}