import Link from "next/link";
import { Pencil, ArrowRight, Users } from "lucide-react";
import { DeleteButton } from "@/components/events/delete-button";
import type { EventWithCount } from "@/lib/events";
import { formatTime } from "@/lib/format";

export function EventCard({
  event,
  isAdmin = false,
}: {
  event: EventWithCount;
  isAdmin?: boolean;
}) {
  const role = isAdmin ? "admin" : "user";
  const detailHref = `/events/${event.id}?role=${role}`;

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card p-5 transition-colors hover:border-accent/50">
      <Link href={detailHref} prefetch={false} className="group flex-1">
        <h2 className="font-semibold transition-colors group-hover:text-accent">
          {event.title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{event.description}</p>
        <div className="mt-3 space-y-0.5 text-sm text-muted-foreground">
          <p>{event.date} at {formatTime(event.time)}</p>
          <p>{event.location}</p>
        </div>
      </Link>

      {/* Actions */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {isAdmin ? (
          <>
            <Link
              href={`/events/${event.id}/edit?role=admin`}
              prefetch={false}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted"
            >
              <Pencil className="h-3.5 w-3.5" />
              Edit
            </Link>
            <DeleteButton eventId={event.id} />
            <Link
              href={detailHref}
              prefetch={false}
              className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-accent-soft px-3 py-1.5 text-sm font-medium text-accent transition-colors hover:brightness-95"
            >
              <Users className="h-3.5 w-3.5" />
              {event._count.rsvps} RSVP{event._count.rsvps === 1 ? "" : "s"}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </>
        ) : (
          <Link
            href={detailHref}
            prefetch={false}
            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-strong"
          >
            View &amp; RSVP
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
