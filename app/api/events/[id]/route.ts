import { NextResponse } from "next/server";
import { getEventById, updateEvent, deleteEvent } from "@/lib/events";

export const preferredRegion = "bom1";

type RouteContext = { params: Promise<{ id: string }> };

// GET /api/events/:id — fetch one event
export async function GET(_request: Request, { params }: RouteContext) {
  const { id } = await params;
  const event = await getEventById(id);
  if (!event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }
  return NextResponse.json(event);
}

// PUT /api/events/:id — update one event
export async function PUT(request: Request, { params }: RouteContext) {
  const { id } = await params;
  const body = await request.json();
  const { title, description, date, time, location } = body;

  if (!title || !description || !date || !time || !location) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  try {
    const event = await updateEvent(id, { title, description, date, time, location });
    return NextResponse.json(event);
  } catch {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }
}

// DELETE /api/events/:id — delete one event
export async function DELETE(_request: Request, { params }: RouteContext) {
  const { id } = await params;
  try {
    await deleteEvent(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }
}