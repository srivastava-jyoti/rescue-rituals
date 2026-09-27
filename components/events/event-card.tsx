import type { Event } from "@prisma/client";

export function EventCard({ event }: { event: Event }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h2 className="font-semibold">{event.title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{event.description}</p>
      <div className="mt-3 space-y-0.5 text-sm text-muted-foreground">
        <p>{event.date} at {event.time}</p>
        <p>{event.location}</p>
      </div>
    </div>
  );
}