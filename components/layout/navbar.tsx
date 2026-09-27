"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { PawPrint } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") ?? "user"; // default to user
  const onEvents = pathname.startsWith("/events");

  const tabs = [
    { label: "User", href: "/events?role=user", active: onEvents && role !== "admin" },
    { label: "Admin", href: "/events?role=admin", active: onEvents && role === "admin" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-soft text-accent">
            <PawPrint className="h-5 w-5" strokeWidth={2.25} />
          </span>
          <span className="font-serif text-xl tracking-tight">Rescue Rituals</span>
        </Link>

        <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
          {tabs.map((tab) => (
            <Link
              key={tab.label}
              href={tab.href}
              prefetch={false}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                tab.active
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}