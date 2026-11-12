import { AlertTriangle, CheckCircle2, ClipboardCheck, Flag, MessageSquareWarning, ShieldAlert } from "lucide-react";
import { Badge } from "@/widgets/ui/badge";
import { Button } from "@/widgets/ui/button";
import { Card, CardContent } from "@/widgets/ui/card";
import { Skeleton } from "@/widgets/ui/skeleton";

export const focusCategories = [
  { id: "logged", label: "Logged sugar" },
  { id: "alert", label: "Open alerts" },
  { id: "plan", label: "Today’s plan" },
  { id: "priority", label: "Glucose priority" },
  { id: "review", label: "Flagged in review" },
];

export function TodayFocusStrip({ worklist, planTotal, planCompleted, activeCategory, onCategoryChange, status }) {
  if (status === "loading") {
    return (
      <div className="space-y-3" aria-busy="true" aria-label="Loading today metrics">
        <div className="grid gap-3 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => <Skeleton className="h-28 rounded-xl" key={index} />)}
        </div>
        <Skeleton className="h-9 w-full max-w-2xl" />
      </div>
    );
  }

  const visibleRows = status === "success" ? worklist : [];
  const loggedCount = visibleRows.filter((row) => row.categories.includes("logged")).length;
  const criticalCount = visibleRows.filter((row) => row.zone === "critical_low" || row.zone === "red_high").length;
  const planPercent = planTotal > 0 ? Math.round((planCompleted / planTotal) * 100) : 0;

  const metrics = [
    { label: "Logged sugar", value: loggedCount, hint: "ready for review", icon: ClipboardCheck, tone: "text-primary bg-primary/10" },
    { label: "Critical", value: criticalCount, hint: criticalCount === 1 ? "patient needs action" : "patients need action", icon: ShieldAlert, tone: "text-rose-600 bg-rose-500/10 dark:text-rose-400" },
    { label: "Plan done", value: `${planPercent}%`, hint: `${planCompleted} of ${planTotal}`, icon: CheckCircle2, tone: "text-blue-600 bg-blue-500/10 dark:text-blue-400" },
  ];

  return (
    <section className="space-y-3" aria-labelledby="today-focus-title">
      <h2 className="sr-only" id="today-focus-title">Today at a glance</h2>
      <div className="grid gap-3 sm:grid-cols-3">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card className="dashboard-card" key={metric.label}>
              <CardContent className="flex items-start justify-between p-4">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">{metric.label}</p>
                  <p className="mt-1 text-2xl font-semibold tracking-tight">{metric.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{metric.hint}</p>
                </div>
                <span className={`grid size-9 place-items-center rounded-lg ${metric.tone}`}><Icon className="size-4" aria-hidden="true" /></span>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2" aria-label="Filter today worklist">
        {focusCategories.map((category) => {
          const active = activeCategory === category.id;
          const count = visibleRows.filter((row) => row.categories.includes(category.id)).length;
          const Icon = category.id === "alert" ? AlertTriangle : category.id === "review" ? Flag : category.id === "priority" ? MessageSquareWarning : null;
          return (
            <Button
              key={category.id}
              type="button"
              size="sm"
              variant={active ? "default" : "outline"}
              aria-pressed={active}
              onClick={() => onCategoryChange(active ? null : category.id)}
            >
              {Icon ? <Icon /> : null}
              {category.label}
              <Badge className="ml-1 h-5 min-w-5 justify-center border-0 px-1.5 text-[0.65rem]" variant={active ? "secondary" : "outline"}>{count}</Badge>
            </Button>
          );
        })}
        {activeCategory ? <Button type="button" size="sm" variant="ghost" onClick={() => onCategoryChange(null)}>Clear</Button> : null}
      </div>
    </section>
  );
}
