import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/widgets/ui/card";
import { DataSurfaceState } from "@/widgets/DataSurfaceState";

export function RangeDistribution({ data, status, onRetry }) {
  return (
    <Card className="dashboard-card h-full">
      <CardHeader>
        <CardTitle>Time in range</CardTitle>
        <CardDescription>Clinic-wide distribution</CardDescription>
      </CardHeader>
      <CardContent>
        {status !== "success" ? (
          <DataSurfaceState status={status} onRetry={onRetry} loadingRows={5} emptyTitle="No distribution available" />
        ) : (
          <div className="space-y-5">
            <div className="rounded-xl bg-primary/8 p-4 text-center">
              <p className="text-4xl font-semibold tracking-tight">72%</p>
              <p className="mt-1 text-xs text-muted-foreground">within 70–180 mg/dL</p>
            </div>
            <div className="space-y-3">
              {data.map((item) => (
                <div key={item.label}>
                  <div className="mb-1.5 flex items-center justify-between gap-3 text-xs">
                    <span className="font-medium">{item.label} <span className="font-normal text-muted-foreground">{item.range}</span></span>
                    <span>{item.value}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted" role="progressbar" aria-label={`${item.label}, ${item.value} percent`} aria-valuenow={item.value} aria-valuemin="0" aria-valuemax="100">
                    <div className={`h-full rounded-full ${item.tone}`} style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
