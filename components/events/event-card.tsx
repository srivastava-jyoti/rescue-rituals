import type { Event } from "@prisma/client";
import Link from "next/link";
import { Pencil } from "lucide-react";

export function EventCard({
  event,
  isAdmin = false,
}: {
  event: Event;
  isAdmin?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h2 className="font-semibold">{event.title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{event.description}</p>
      <div className="mt-3 space-y-0.5 text-sm text-muted-foreground">
        <p>{event.date} at {event.time}</p>
        <p>{event.location}</p>
      </div>

      {isAdmin && (
        <div className="mt-4">
          <Link
            href={`/events/${event.id}/edit?role=admin`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted"
          >
            <Pencil className="h-3.5 w-3.5" />
            Edit
          </Link>
        </div>
      )}
    </div>
  );
}
