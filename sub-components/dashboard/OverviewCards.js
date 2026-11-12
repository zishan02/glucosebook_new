import { Activity, CircleGauge, RadioTower, UsersRound } from "lucide-react";
import { Card, CardContent } from "@/widgets/ui/card";
import { Skeleton } from "@/widgets/ui/skeleton";

const iconMap = {
  "active-patients": UsersRound,
  "time-in-range": CircleGauge,
  "urgent-reviews": Activity,
  "sensor-coverage": RadioTower,
};

const toneMap = {
  blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  teal: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  red: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

export function OverviewCards({ metrics, status }) {
  if (status === "loading") {
    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4" aria-busy="true" aria-label="Loading overview metrics">
        {Array.from({ length: 4 }).map((_, index) => <Skeleton className="h-36 rounded-xl" key={index} />)}
      </div>
    );
  }

  const visibleMetrics = status === "empty" || status === "error" ? metrics.map((item) => ({ ...item, value: "—", change: status === "error" ? "Unavailable" : "No data", context: "" })) : metrics;

  return (
    <section id="overview" aria-labelledby="overview-title">
      <h2 className="sr-only" id="overview-title">Clinic overview</h2>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {visibleMetrics.map((metric) => {
          const Icon = iconMap[metric.id];
          return (
            <Card className="dashboard-card" key={metric.id}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                    <p className="mt-2 text-3xl font-semibold tracking-tight">{metric.value}</p>
                  </div>
                  <span className={`grid size-10 place-items-center rounded-xl ${toneMap[metric.tone]}`}>
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                </div>
                <p className="mt-4 text-xs text-muted-foreground"><strong className="font-medium text-foreground">{metric.change}</strong> {metric.context}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
