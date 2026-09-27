import { NextResponse } from "next/server";
import { getEvents, createEvent } from "@/lib/events";

export const preferredRegion = "bom1";

// GET /api/events
export async function GET() {
  const events = await getEvents();
  return NextResponse.json(events);
}

// POST /api/events
export async function POST(request: Request) {
  const body = await request.json();
  const { title, description, date, time, location } = body;

  if (!title || !description || !date || !time || !location) {
    return NextResponse.json(
      { error: "All fields are required." },
      { status: 400 }
    );
  }

  const event = await createEvent({ title, description, date, time, location });
  return NextResponse.json(event, { status: 201 });
}