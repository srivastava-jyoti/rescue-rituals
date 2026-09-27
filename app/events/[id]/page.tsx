import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, MapPin, Mail, Phone, Users } from "lucide-react";
import { getEventById } from "@/lib/events";
import { RsvpForm } from "@/components/events/rsvp-form";
import { formatTime } from "@/lib/format";

export default async function EventDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ role?: string }>;
}) {
  const { id } = await params;
  const { role } = await searchParams;
  const isAdmin = role === "admin";

  const event = await getEventById(id);
  if (!event) notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <Link
        href={`/events?role=${isAdmin ? "admin" : "user"}`}
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to events
      </Link>

      <h1 className="text-2xl font-bold tracking-tight">{event.title}</h1>
      <div className="mt-2 space-y-1 text-sm text-muted-foreground">
        <p className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          {event.date} at {formatTime(event.time)}
        </p>
        <p className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          {event.location}
        </p>
      </div>
      <p className="mt-4 leading-relaxed">{event.description}</p>

      <div className="mt-8">
        {isAdmin ? (
          // ADMIN: who has RSVP'd
          <div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-lg font-semibold">Attendees</h2>
              <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-sm font-medium text-accent">
                {event.rsvps.length}
              </span>
            </div>

            {event.rsvps.length === 0 ? (
              <p className="mt-4 rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                No one has RSVP&apos;d yet.
              </p>
            ) : (
              <ul className="mt-4 space-y-2">
                {event.rsvps.map((r) => (
                  <li
                    key={r.id}
                    className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-sm font-semibold text-accent">
                      {r.name.charAt(0).toUpperCase()}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{r.name}</p>
                      <div className="mt-0.5 flex flex-col gap-0.5 text-xs text-muted-foreground sm:flex-row sm:gap-4">
                        <span className="inline-flex min-w-0 items-center gap-1">
                          <Mail className="h-3 w-3 shrink-0" />
                          <span className="truncate">{r.email}</span>
                        </span>
                        <span className="inline-flex shrink-0 items-center gap-1">
                          <Phone className="h-3 w-3 shrink-0" />
                          {r.phone}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          // USER: RSVP form
          <RsvpForm eventId={event.id} />
        )}
      </div>
    </div>
  );
}
