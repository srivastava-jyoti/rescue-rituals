"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type FormState = {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
};

const empty: FormState = { title: "", description: "", date: "", time: "", location: "" };

export default function EditEventPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // 1) Load the event's current values into the form.
  useEffect(() => {
    fetch(`/api/events/${id}`)
      .then((res) => res.json())
      .then((data) =>
        setForm({
          title: data.title,
          description: data.description,
          date: data.date,
          time: data.time,
          location: data.location,
        })
      )
      .finally(() => setLoading(false));
  }, [id]);

  function validate(): boolean {
    const next: Partial<FormState> = {};
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
      // 2) Save with PUT instead of POST.
      const res = await fetch(`/api/events/${id}`, {
        method: "PUT",
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

  function update(field: keyof FormState, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-accent";

  if (loading) {
    return <p className="mx-auto max-w-xl px-4 py-10 text-muted-foreground sm:px-6">Loading…</p>;
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-10 sm:px-6">
      <Link
        href="/events?role=admin"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to events
      </Link>

      <h1 className="text-2xl font-bold tracking-tight">Edit event</h1>

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
          {submitting ? "Saving…" : "Save changes"}
        </button>
      </form>
    </div>
  );
}