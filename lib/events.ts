import { prisma } from "@/lib/prisma";
import type { Event } from "@prisma/client";

// An event plus how many people RSVP'd (for the list cards).
export type EventWithCount = Event & { _count: { rsvps: number } };

// Get all events, soonest first, each with its RSVP count.
export function getEvents(): Promise<EventWithCount[]> {
  return prisma.event.findMany({
    orderBy: { date: "asc" },
    include: { _count: { select: { rsvps: true } } },
  });
}

// Get a single event by its id, including its RSVPs (newest first).
export function getEventById(id: string) {
  return prisma.event.findUnique({
    where: { id },
    include: { rsvps: { orderBy: { createdAt: "desc" } } },
  });
}

export type NewEventInput = {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
};

// Insert a new event into the database.
export function createEvent(data: NewEventInput) {
  return prisma.event.create({ data });
}

// Update an existing event by id.
export function updateEvent(id: string, data: NewEventInput) {
  return prisma.event.update({ where: { id }, data });
}

// Delete an event by id (its RSVPs are removed too via the schema's cascade).
export function deleteEvent(id: string) {
  return prisma.event.delete({ where: { id } });
}

// The fields a person provides to RSVP (no login, so they enter these).
export type RsvpInput = {
  name: string;
  email: string;
  phone: string;
};

// Add an RSVP to an event.
export function createRsvp(eventId: string, data: RsvpInput) {
  return prisma.rsvp.create({ data: { ...data, eventId } });
}