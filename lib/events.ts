import { prisma } from "@/lib/prisma";

// Get all events.
export function getEvents() {
  return prisma.event.findMany({
    orderBy: { date: "asc" },
  });
}

// Get a single event by its id (null if it doesn't exist).
export function getEventById(id: string) {
  return prisma.event.findUnique({ where: { id } });
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