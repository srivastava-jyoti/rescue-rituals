import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Start clean so re-seeding is idempotent
  await prisma.rsvp.deleteMany();
  await prisma.event.deleteMany();

  const adoptionFair = await prisma.event.create({
    data: {
      title: "Weekend Adoption Fair",
      description:
        "Meet dozens of rescue dogs and cats ready for their forever homes. Volunteers on hand to help you find your match.",
      date: "2026-10-04",
      time: "10:00",
      location: "Riverside Community Park",
    },
  });

  await prisma.event.create({
    data: {
      title: "Foster Volunteer Meetup",
      description:
        "An intro session for anyone interested in fostering. Learn what's involved and get your questions answered.",
      date: "2026-10-08",
      time: "18:30",
      location: "Rescue Rituals HQ",
    },
  });

  await prisma.event.create({
    data: {
      title: "Shelter Dog Walk-a-thon",
      description:
        "Join us for a morning of walks with shelter dogs. Great exercise for them, great company for you.",
      date: "2026-10-12",
      time: "09:00",
      location: "Greenway Trailhead",
    },
  });

  await prisma.event.create({
    data: {
      title: "Kitten Socialization Workshop",
      description:
        "Hands-on session on socializing young kittens to prepare them for adoption.",
      date: "2026-10-18",
      time: "14:00",
      location: "Downtown Rescue Center",
    },
  });

  // A couple of RSVPs so the admin view has data to show
  await prisma.rsvp.createMany({
    data: [
      {
        eventId: adoptionFair.id,
        name: "Aarav Sharma",
        email: "aarav@example.com",
        phone: "+91 98765 43210",
      },
      {
        eventId: adoptionFair.id,
        name: "Meera Nair",
        email: "meera@example.com",
        phone: "+91 91234 56780",
      },
    ],
  });

  const events = await prisma.event.count();
  const rsvps = await prisma.rsvp.count();
  console.log(`Seeded ${events} events and ${rsvps} RSVPs.`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
