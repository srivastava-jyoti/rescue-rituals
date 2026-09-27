import { redirect } from "next/navigation";

// Home redirects to the events list (the app's entry point).
export default function Home() {
  redirect("/events");
}
