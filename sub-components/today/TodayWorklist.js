"use client";

import { useMemo, useState } from "react";
import { Check, CheckCircle2, Clock3, Phone, Search, UserRoundCheck } from "lucide-react";
import { Avatar, AvatarFallback } from "@/widgets/ui/avatar";
import { Badge } from "@/widgets/ui/badge";
import { Button } from "@/widgets/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/widgets/ui/card";
import { Input } from "@/widgets/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/widgets/ui/sheet";
import { DataSurfaceState } from "@/widgets/DataSurfaceState";
import { TodayFocusStrip } from "./TodayFocusStrip";
import { CallListPanel } from "./CallListPanel";

const zoneStyles = {
  critical_low: "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300",
  red_high: "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300",
  orange: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300",
};

function WorklistRow({ row, reviewedBy, planDone, onReview, onPlanDone }) {
  const isReviewed = reviewedBy.length > 0;
  return (
    <li className={`p-4 ${isReviewed ? "bg-muted/25" : ""}`}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex min-w-0 gap-3">
          <Avatar className="mt-0.5 size-10 shrink-0"><AvatarFallback className="bg-muted text-xs">{row.initials}</AvatarFallback></Avatar>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-medium">{row.fullName}</p>
              {row.zoneLabel ? <Badge variant="outline" className={zoneStyles[row.zone]}>{row.zoneLabel}</Badge> : null}
              <span className="text-xs text-muted-foreground">{row.updated}</span>
              <span className="text-xs text-muted-foreground">→ {row.educatorName}</span>
            </div>
            {isReviewed ? <p className="mt-1 flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400"><CheckCircle2 className="size-3.5" /> Reviewed today by {reviewedBy.join(", ")}</p> : null}
            <p className="mt-1 text-sm text-muted-foreground">{row.headline}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {row.chips.map((chip) => (
                <Badge key={chip.label} variant="secondary" className={chip.urgent ? "bg-rose-500/10 text-rose-700 dark:text-rose-300" : ""}>{chip.label}</Badge>
              ))}
              {planDone ? <Badge className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">Plan completed</Badge> : null}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 pl-13 lg:max-w-72 lg:justify-end lg:pl-0">
          <Button size="sm" variant="outline" onClick={() => onReview(row)}><UserRoundCheck /> Review</Button>
          {row.phone ? <Button asChild size="sm" variant="outline"><a href={`tel:${row.phone}`}><Phone /> Call</a></Button> : null}
          {row.planPending && !planDone ? <Button size="sm" onClick={() => onPlanDone(row.patientId)}><Check /> Mark plan done</Button> : null}
        </div>
      </div>
    </li>
  );
}

export function TodayWorklist({ response, status, onRetry }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [reviewed, setReviewed] = useState(() => new Map(response.worklist.map((row) => [row.patientId, row.reviewedBy])));
  const [planDone, setPlanDone] = useState(() => new Set());

  const filteredRows = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return response.worklist.filter((row) => {
      const matchesSearch = !normalized || row.fullName.toLowerCase().includes(normalized) || row.patientId.toLowerCase().includes(normalized);
      const matchesCategory = !activeCategory || row.categories.includes(activeCategory);
      return matchesSearch && matchesCategory;
    });
  }, [activeCategory, query, response.worklist]);

  const loggedRows = filteredRows.filter((row) => row.source === "logged");
  const otherRows = filteredRows.filter((row) => row.source !== "logged");
  const filtersActive = query.trim().length > 0 || Boolean(activeCategory);
  const completedCount = Math.min(response.plan.total, response.plan.completed + planDone.size);

  function markReviewed(patient) {
    setReviewed((current) => {
      const next = new Map(current);
      const names = next.get(patient.patientId) ?? [];
      if (!names.includes("Dr. Rao")) next.set(patient.patientId, [...names, "Dr. Rao"]);
      return next;
    });
    setSelectedPatient(null);
  }

  function markPlanDone(patientId) {
    setPlanDone((current) => new Set([...current, patientId]));
  }

  function renderRows(rows) {
    return (
      <ul className="divide-y rounded-xl border bg-card">
        {rows.map((row) => (
          <WorklistRow
            key={row.patientId}
            row={row}
            reviewedBy={reviewed.get(row.patientId) ?? []}
            planDone={planDone.has(row.patientId)}
            onReview={setSelectedPatient}
            onPlanDone={markPlanDone}
          />
        ))}
      </ul>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <TodayFocusStrip
          worklist={response.worklist}
          planTotal={response.plan.total}
          planCompleted={completedCount}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          status={status}
        />

        <Card className="dashboard-card">
          <CardHeader className="gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Daily worklist</CardTitle>
              <CardDescription>One patient per row, ordered for today’s clinical workflow</CardDescription>
            </div>
            <label className="relative w-full sm:w-72">
              <span className="sr-only">Search today’s patient worklist</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <Input className="pl-9" type="search" placeholder="Search patient name or ID…" value={query} onChange={(event) => setQuery(event.target.value)} />
            </label>
          </CardHeader>
          <CardContent>
            {status !== "success" ? (
              <DataSurfaceState status={status} onRetry={onRetry} loadingRows={5} emptyTitle="Today’s worklist is clear" emptyDescription="Patients will appear when glucose is logged or another care signal needs attention." />
            ) : filteredRows.length === 0 ? (
              <DataSurfaceState status="empty" emptyTitle={filtersActive ? "No patients match these filters" : "Today’s worklist is clear"} emptyDescription={filtersActive ? "Try a different name, ID, or focus category." : "Nobody logged glucose and nothing else needs attention."} />
            ) : (
              <div className="space-y-6">
                {loggedRows.length > 0 ? (
                  <section className="space-y-2" aria-labelledby="logged-today-title">
                    <div><h3 className="text-sm font-semibold" id="logged-today-title">Logged sugar today — review ({loggedRows.length})</h3><p className="mt-1 text-xs text-muted-foreground">Entered through WhatsApp or the patient app. Open each patient and clear the day.</p></div>
                    {renderRows(loggedRows)}
                  </section>
                ) : null}
                {otherRows.length > 0 ? (
                  <section className="space-y-2" aria-labelledby="other-attention-title">
                    <h3 className="text-sm font-semibold text-muted-foreground" id="other-attention-title">Also needs attention ({otherRows.length})</h3>
                    {renderRows(otherRows)}
                  </section>
                ) : null}
              </div>
            )}
          </CardContent>
        </Card>

        <CallListPanel calls={response.calls} status={status} onRetry={onRetry} />
      </div>

      <Sheet open={Boolean(selectedPatient)} onOpenChange={(open) => !open && setSelectedPatient(null)}>
        <SheetContent className="overflow-y-auto sm:max-w-md">
          {selectedPatient ? (
            <>
              <SheetHeader>
                <SheetTitle>{selectedPatient.fullName}</SheetTitle>
                <SheetDescription>{selectedPatient.patientId} · {selectedPatient.educatorName}</SheetDescription>
              </SheetHeader>
              <div className="space-y-4 px-4 pb-6">
                <div className="rounded-lg border p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    {selectedPatient.zoneLabel ? <Badge variant="outline" className={zoneStyles[selectedPatient.zone]}>{selectedPatient.zoneLabel}</Badge> : <Badge variant="secondary">No current zone</Badge>}
                    <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock3 className="size-3" /> {selectedPatient.updated}</span>
                  </div>
                  <p className="mt-3 text-sm leading-6">{selectedPatient.headline}</p>
                </div>
                {(reviewed.get(selectedPatient.patientId) ?? []).length > 0 ? (
                  <div className="rounded-lg bg-emerald-500/10 p-4 text-sm text-emerald-700 dark:text-emerald-300"><strong>Already reviewed today</strong><p className="mt-1">{(reviewed.get(selectedPatient.patientId) ?? []).join(", ")}</p></div>
                ) : null}
                <p className="text-sm leading-6 text-muted-foreground">This prototype marks the patient as reviewed locally. Production wiring should write through the existing reviewed-today service and permission checks.</p>
                <Button className="w-full" onClick={() => markReviewed(selectedPatient)}><CheckCircle2 /> Mark reviewed today</Button>
              </div>
            </>
          ) : null}
        </SheetContent>
      </Sheet>
    </>
  );
}
