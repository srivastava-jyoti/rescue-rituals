import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import { getEventById } from "@/lib/events";
import { RsvpForm } from "@/components/events/rsvp-form";

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
          {event.date} at {event.time}
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
            <h2 className="font-semibold">RSVPs ({event.rsvps.length})</h2>
            {event.rsvps.length === 0 ? (
              <p className="mt-2 text-sm text-muted-foreground">No RSVPs yet.</p>
            ) : (
              <ul className="mt-3 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
                {event.rsvps.map((r) => (
                  <li key={r.id} className="p-4">
                    <p className="font-medium">{r.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {r.email} · {r.phone}
                    </p>
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
