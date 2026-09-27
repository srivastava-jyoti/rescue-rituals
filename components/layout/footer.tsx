import { PawPrint } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-6 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-soft text-accent">
            <PawPrint className="h-4 w-4" strokeWidth={2.25} />
          </span>
          <span className="text-sm font-semibold tracking-tight">Rescue Rituals</span>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Rescue Rituals.
        </p>
      </div>
    </footer>
  );
}