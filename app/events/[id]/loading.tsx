export default function Loading() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <div className="h-4 w-28 animate-pulse rounded bg-muted" />
      <div className="mt-4 h-8 w-2/3 animate-pulse rounded-lg bg-muted" />
      <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-muted" />
      <div className="mt-2 h-4 w-1/3 animate-pulse rounded bg-muted" />
      <div className="mt-6 h-16 w-full animate-pulse rounded bg-muted" />
      <div className="mt-8 h-48 w-full animate-pulse rounded-2xl bg-muted" />
    </div>
  );
}
