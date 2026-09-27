import { NextResponse } from "next/server";
import { createRsvp } from "@/lib/events";

type RouteContext = { params: Promise<{ id: string }> };

// POST /api/events/:id/rsvp — RSVP to an event
export async function POST(request: Request, { params }: RouteContext) {
  const { id } = await params;
  const body = await request.json();
  const { name, email, phone } = body;

  // Required-field validation.
  if (!name || !email || !phone) {
    return NextResponse.json(
      { error: "Name, email and phone are required." },
      { status: 400 }
    );
  }

  try {
    const rsvp = await createRsvp(id, { name, email, phone });
    return NextResponse.json(rsvp, { status: 201 });
  } catch (err: unknown) {
    // P2002 = unique constraint: same email already RSVP'd to this event.
    if (
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      (err as { code: string }).code === "P2002"
    ) {
      return NextResponse.json(
        { error: "You've already RSVP'd with this email." },
        { status: 409 }
      );
    }
    // Otherwise the event id is likely invalid.
    return NextResponse.json(
      { error: "Could not RSVP. The event may not exist." },
      { status: 400 }
    );
  }
}
