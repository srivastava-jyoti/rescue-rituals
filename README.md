# Rescue Rituals — Events Module

A consumer-facing **Events module** for an animal rescue platform: browse events,
view details, RSVP, and (as an admin) create, edit, and delete events and see who
has RSVP'd.

Built as a fullstack app with the Next.js App Router, a Postgres database via
Prisma, and a warm, mobile-first UI.

## Tech stack

- **Next.js 16** (App Router, Route Handlers)
- **TypeScript**
- **Tailwind CSS v4**
- **PostgreSQL** + **Prisma 6**
- **lucide-react** icons

## Roles (no login)

Roles are a simple mode toggle in the navbar (there is no auth) — both roles use
the same URLs, and the `?role=` query decides what's shown:

- **User** (`/events?role=user`) — browse events, open an event, and RSVP.
- **Admin** (`/events?role=admin`) — create / edit / delete events and view each
  event's attendee list and count.

## Features

- Event list with **search** by title or location
- Event detail page
- Create / edit event forms with front-end **and** back-end validation
- Delete with a confirmation modal
- RSVP (name, email, phone) — one RSVP per email per event
- Admin sees the RSVP count on each card and the full attendee list per event

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set your database connection in `.env`:

   ```bash
   DATABASE_URL="postgresql://user@localhost:5432/rescue_rituals?schema=public"
   ```

3. Apply the schema and seed sample data:

   ```bash
   npx prisma migrate deploy
   npm run db:seed
   ```

4. Run the dev server:

   ```bash
   npm run dev
   ```

   Open http://localhost:3000 (redirects to `/events`).

## API

| Method | Route                     | Description                 |
| ------ | ------------------------- | --------------------------- |
| GET    | `/api/events`             | List events                 |
| POST   | `/api/events`             | Create an event             |
| GET    | `/api/events/:id`         | Get one event (with RSVPs)  |
| PUT    | `/api/events/:id`         | Update an event             |
| DELETE | `/api/events/:id`         | Delete an event             |
| POST   | `/api/events/:id/rsvp`    | RSVP to an event            |

## Project structure

```
app/
  page.tsx                 Redirects to /events
  events/
    page.tsx               Events list (search + cards)
    [id]/page.tsx          Event detail (RSVP form / attendee list)
    [id]/edit/page.tsx     Edit form
    new/page.tsx           Create form
  api/events/...           Route handlers (REST)
components/
  layout/                  Navbar, Footer
  events/                  EventCard, EventsBrowser, RsvpForm, DeleteButton
lib/
  prisma.ts                Prisma client
  events.ts                Data-access / service functions
prisma/
  schema.prisma            Event + Rsvp models
  seed.ts                  Sample data
```

## Data model

- **Event** — title, description, date, time, location
- **Rsvp** — name, email, phone, linked to an event (`@@unique([eventId, email])`)
