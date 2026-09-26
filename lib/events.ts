import { prisma } from "@/lib/prisma";

// Get all events, soonest first.
export function getEvents() {
  return prisma.event.findMany({
    orderBy: { date: "asc" },
  });
}