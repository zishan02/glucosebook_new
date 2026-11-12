import { Skeleton } from "@/widgets/ui/skeleton";

export default function TodayLoading() {
  return (
    <main className="min-h-screen bg-background p-6" aria-busy="true" aria-label="Loading today worklist">
      <div className="mx-auto max-w-7xl space-y-6">
        <Skeleton className="h-20 rounded-xl" />
        <div className="grid gap-3 sm:grid-cols-3">{Array.from({ length: 3 }).map((_, index) => <Skeleton className="h-28 rounded-xl" key={index} />)}</div>
        <Skeleton className="h-[520px] rounded-xl" />
      </div>
    </main>
  );
}
