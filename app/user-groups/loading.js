import { Skeleton } from "@/widgets/ui/skeleton";

export default function UserGroupsLoading() {
  return (
    <main className="min-h-screen bg-background p-6 lg:ml-64">
      <div className="mx-auto max-w-[1500px] space-y-6">
        <Skeleton className="h-28 w-full" />
        <div className="grid gap-4 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton className="h-44 w-full" key={index} />
          ))}
        </div>
        <Skeleton className="h-80 w-full" />
      </div>
    </main>
  );
}
