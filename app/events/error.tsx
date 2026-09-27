"use client";

import { AlertCircle } from "lucide-react";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-20 text-center sm:px-6">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <AlertCircle className="h-6 w-6" />
      </span>
      <h2 className="mt-4 text-lg font-semibold">Something went wrong</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        We couldn&apos;t load this page. Please try again.
      </p>
      <button
        onClick={reset}
        className="mt-5 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-strong"
      >
        Try again
      </button>
    </div>
  );
}
