import Link from "next/link";
import { Plus } from "lucide-react";
import { getEvents } from "@/lib/events";
import { EventsBrowser } from "@/components/events/events-browser";

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
          <p className="mt-1 text-muted-foreground">All events: {events.length}</p>
        </div>

        {isAdmin && (
          <Link
            href="/events/new?role=admin"
            className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg bg-accent px-3 py-2 text-xs font-semibold text-accent-foreground transition-colors hover:bg-accent-strong sm:px-4 sm:text-sm"
          >
            <Plus className="h-4 w-4 shrink-0" />
            Create event
          </Link>
        )}
      </div>

      <EventsBrowser events={events} isAdmin={isAdmin} />
    </div>
  );
}