"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { EventCard } from "@/components/events/event-card";
import type { EventWithCount } from "@/lib/events";

export function EventsBrowser({
  events,
  isAdmin,
}: {
  events: EventWithCount[];
  isAdmin: boolean;
}) {
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const filtered = q
    ? events.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.location.toLowerCase().includes(q)
      )
    : events;

  return (
    <div>
      {/* Search */}
      <div className="relative mt-6">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search events by title or location…"
          className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-3 text-sm outline-none transition-colors focus:border-accent"
        />
      </div>

      {/* Results */}
      {events.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-border p-10 text-center">
          <p className="text-sm font-medium">No events yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {isAdmin
              ? "Create your first event to get started."
              : "Check back soon for upcoming events."}
          </p>
        </div>
      ) : filtered.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          No events match &ldquo;{query}&rdquo;.
        </p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {filtered.map((event) => (
            <EventCard key={event.id} event={event} isAdmin={isAdmin} />
          ))}
        </div>
      )}
    </div>
  );
}
