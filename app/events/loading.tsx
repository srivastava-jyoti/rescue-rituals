export default function Loading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="h-8 w-32 animate-pulse rounded-lg bg-muted" />
      <div className="mt-2 h-4 w-24 animate-pulse rounded bg-muted" />
      <div className="mt-6 h-11 w-full animate-pulse rounded-lg bg-muted" />

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-5">
            <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
            <div className="mt-3 h-4 w-full animate-pulse rounded bg-muted" />
            <div className="mt-2 h-4 w-4/5 animate-pulse rounded bg-muted" />
            <div className="mt-4 h-4 w-1/2 animate-pulse rounded bg-muted" />
            <div className="mt-4 h-9 w-32 animate-pulse rounded-full bg-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}
