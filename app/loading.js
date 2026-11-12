import { Skeleton } from "@/widgets/ui/skeleton";

export default function DashboardLoading() {
  return (
    <main className="min-h-screen bg-background p-6" aria-busy="true" aria-label="Loading dashboard">
      <div className="mx-auto max-w-7xl space-y-6">
        <Skeleton className="h-16 w-full rounded-xl" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton className="h-36 rounded-xl" key={index} />
          ))}
        </div>
        <Skeleton className="h-[420px] rounded-xl" />
      </div>
    </main>
  );
}
