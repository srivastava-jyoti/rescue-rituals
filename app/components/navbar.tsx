"use client"; // uses usePathname (a browser hook) to highlight the active tab

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PawPrint } from "lucide-react";

// The two sections the switch flips between
const TABS = [
  { label: "User", href: "/events" },
  { label: "Admin", href: "/admin" },
];

export function Navbar() {
  const pathname = usePathname(); // current URL, e.g. "/admin"

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-soft text-accent">
            <PawPrint className="h-5 w-5" strokeWidth={2.25} />
          </span>
          <span className="text-lg font-semibold tracking-tight">Rescue Rituals</span>
        </Link>

        <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
          {TABS.map((tab) => {
            const active = pathname.startsWith(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}