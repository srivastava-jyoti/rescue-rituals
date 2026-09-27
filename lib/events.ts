import { prisma } from "@/lib/prisma";

// Get all events.
export function getEvents() {
  return prisma.event.findMany({
    orderBy: { date: "asc" },
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