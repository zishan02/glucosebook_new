import { ChevronDown, Phone, PhoneOff } from "lucide-react";
import { Avatar, AvatarFallback } from "@/widgets/ui/avatar";
import { Badge } from "@/widgets/ui/badge";
import { Button } from "@/widgets/ui/button";
import { Card, CardContent } from "@/widgets/ui/card";
import { DataSurfaceState } from "@/widgets/DataSurfaceState";

function CallSection({ title, empty, rows }) {
  return (
    <section>
      <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{title} ({rows.length})</h3>
      {rows.length === 0 ? (
        <p className="mt-3 rounded-lg border border-dashed p-4 text-sm text-muted-foreground">{empty}</p>
      ) : (
        <ul className="mt-3 divide-y rounded-lg border">
          {rows.map((row) => (
            <li className="flex flex-wrap items-center gap-3 p-3" key={row.patientId}>
              <Avatar className="size-9"><AvatarFallback className="bg-muted text-xs">{row.initials}</AvatarFallback></Avatar>
              <div className="min-w-40 flex-1">
                <p className="text-sm font-medium">{row.fullName}</p>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span className={row.urgent ? "font-medium text-amber-600 dark:text-amber-400" : ""}>{row.detail}</span>
                  <span>· {row.educatorName}</span>
                </div>
              </div>
              {row.phone ? (
                <Button asChild size="sm" variant="outline"><a href={`tel:${row.phone}`}><Phone /> Call</a></Button>
              ) : (
                <Badge variant="secondary"><PhoneOff /> No number</Badge>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export function CallListPanel({ calls, status, onRetry }) {
  return (
    <Card className="dashboard-card">
      <details open={status === "success" && (calls.silent.length > 0 || calls.expiring.length > 0)} className="group">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <div>
            <p className="font-semibold">Call list</p>
            <p className="mt-1 text-sm text-muted-foreground">{calls.silent.length} not messaging · {calls.expiring.length} renewing</p>
          </div>
          <ChevronDown className="size-5 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
        </summary>
        <CardContent className="border-t pt-5">
          {status !== "success" ? (
            <DataSurfaceState status={status} onRetry={onRetry} loadingRows={3} emptyTitle="No calls due today" emptyDescription="Patients who are silent or renewing will appear here." />
          ) : (
            <div className="space-y-6">
              <p className="text-xs text-muted-foreground">{calls.scopeNote}</p>
              <CallSection title="Not messaging — call" empty="Everyone who needs a nudge has messaged or logged sugar today." rows={calls.silent} />
              <CallSection title="Subscription ending soon" empty="No subscription ends in the next few days." rows={calls.expiring} />
            </div>
          )}
        </CardContent>
      </details>
    </Card>
  );
}
