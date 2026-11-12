import { Skeleton } from "@/widgets/ui/skeleton";

export default function PatientsLoading() {
  return (
    <main className="min-h-screen bg-background p-6 lg:ml-64">
      <div className="mx-auto max-w-[1500px] space-y-6">
        <Skeleton className="h-28 w-full" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => <Skeleton className="h-28" key={index} />)}
        </div>
        <Skeleton className="h-96 w-full" />
      </div>
    </main>
  );
}
