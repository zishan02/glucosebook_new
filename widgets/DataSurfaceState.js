import { AlertCircle, DatabaseZap, RotateCcw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/widgets/ui/alert";
import { Button } from "@/widgets/ui/button";
import { Skeleton } from "@/widgets/ui/skeleton";

export function DataSurfaceState({ status, onRetry, loadingRows = 4, emptyTitle = "No data yet", emptyDescription = "Data will appear here when it is available." }) {
  if (status === "loading") {
    return (
      <div className="space-y-3" aria-busy="true" aria-label="Loading data">
        {Array.from({ length: loadingRows }).map((_, index) => (
          <Skeleton className="h-12 w-full" key={index} />
        ))}
      </div>
    );
  }

  if (status === "error") {
    return (
      <Alert variant="destructive">
        <AlertCircle />
        <AlertTitle>Unable to load this data</AlertTitle>
        <AlertDescription>
          The data source did not respond. Existing records have not been changed.
          {onRetry ? (
            <Button className="mt-3 w-fit" size="sm" variant="outline" onClick={onRetry}>
              <RotateCcw /> Retry
            </Button>
          ) : null}
        </AlertDescription>
      </Alert>
    );
  }

  if (status === "empty") {
    return (
      <div className="grid min-h-48 place-items-center rounded-lg border border-dashed p-6 text-center">
        <div>
          <DatabaseZap className="mx-auto size-7 text-muted-foreground" aria-hidden="true" />
          <h3 className="mt-3 font-medium">{emptyTitle}</h3>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">{emptyDescription}</p>
        </div>
      </div>
    );
  }

  return null;
}
