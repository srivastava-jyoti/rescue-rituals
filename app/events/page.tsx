import Link from "next/link";
import { Plus } from "lucide-react";
import { getEvents } from "@/lib/events";
import { EventCard } from "@/components/events/event-card";

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const { role } = await searchParams;
  const isAdmin = role === "admin";
  const events = await getEvents();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Events</h1>
          <p className="mt-1 text-muted-foreground">All events — {events.length} total.</p>
        </div>

        {isAdmin && (
          <Link
            href="/events/new?role=admin"
            className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-strong"
          >
            <Plus className="h-4 w-4" />
            Create event
          </Link>
        )}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}