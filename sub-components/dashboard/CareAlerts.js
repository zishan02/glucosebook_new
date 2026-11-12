import { AlertTriangle, RadioTower, ShieldAlert } from "lucide-react";
import { Badge } from "@/widgets/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/widgets/ui/card";
import { DataSurfaceState } from "@/widgets/DataSurfaceState";

const alertConfig = {
  Critical: { icon: ShieldAlert, className: "bg-rose-500/10 text-rose-600 dark:text-rose-400" },
  High: { icon: AlertTriangle, className: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
  Technical: { icon: RadioTower, className: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
};

export function CareAlerts({ alerts, status, onRetry }) {
  return (
    <Card className="dashboard-card h-full" id="care-alerts">
      <CardHeader>
        <CardTitle>Active alerts</CardTitle>
        <CardDescription>Events requiring acknowledgement</CardDescription>
      </CardHeader>
      <CardContent>
        {status !== "success" ? (
          <DataSurfaceState status={status} onRetry={onRetry} loadingRows={3} emptyTitle="No active alerts" emptyDescription="New clinical and device alerts will appear here." />
        ) : (
          <ul className="space-y-3">
            {alerts.map((alert) => {
              const config = alertConfig[alert.severity];
              const Icon = config.icon;
              return (
                <li className="flex gap-3 rounded-lg border p-3" key={alert.id}>
                  <span className={`grid size-9 shrink-0 place-items-center rounded-lg ${config.className}`}><Icon className="size-4" aria-hidden="true" /></span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2"><p className="text-sm font-medium">{alert.title}</p><Badge variant="outline">{alert.severity}</Badge></div>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">{alert.detail}</p>
                    <p className="mt-2 text-[0.7rem] text-muted-foreground">{alert.time}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
