"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Minus, Search, UserRound } from "lucide-react";
import { Avatar, AvatarFallback } from "@/widgets/ui/avatar";
import { Badge } from "@/widgets/ui/badge";
import { Button } from "@/widgets/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/widgets/ui/card";
import { Input } from "@/widgets/ui/input";
import { Progress } from "@/widgets/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/widgets/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/widgets/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/widgets/ui/table";
import { DataSurfaceState } from "@/widgets/DataSurfaceState";

const statusStyles = {
  Critical: "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300",
  Watch: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300",
  Stable: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300",
};

function TrendIcon({ trend }) {
  if (trend.includes("Rising")) return <ArrowUp className="size-3.5" aria-hidden="true" />;
  if (trend.includes("Falling")) return <ArrowDown className="size-3.5" aria-hidden="true" />;
  return <Minus className="size-3.5" aria-hidden="true" />;
}

export function PatientRiskTable({ patients, status, onRetry }) {
  const [query, setQuery] = useState("");
  const [risk, setRisk] = useState("all");
  const [selectedPatient, setSelectedPatient] = useState(null);

  const filteredPatients = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return patients.filter((patient) => {
      const matchesQuery = !normalized || patient.name.toLowerCase().includes(normalized) || patient.id.toLowerCase().includes(normalized);
      const matchesRisk = risk === "all" || patient.status.toLowerCase() === risk;
      return matchesQuery && matchesRisk;
    });
  }, [patients, query, risk]);

  return (
    <>
      <Card className="dashboard-card" id="patient-roster">
        <CardHeader className="gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <CardTitle>Patients needing attention</CardTitle>
            <CardDescription>Prioritised by current glucose risk and recent trend</CardDescription>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <label className="relative">
              <span className="sr-only">Search patient roster</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input className="w-full pl-9 sm:w-56" placeholder="Search name or ID" value={query} onChange={(event) => setQuery(event.target.value)} />
            </label>
            <Select value={risk} onValueChange={setRisk}>
              <SelectTrigger className="w-full sm:w-36" aria-label="Filter by risk">
                <SelectValue placeholder="All risk" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All risk</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="watch">Watch</SelectItem>
                <SelectItem value="stable">Stable</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {status !== "success" ? (
            <DataSurfaceState status={status} onRetry={onRetry} loadingRows={5} emptyTitle="No patients in this view" emptyDescription="Patients will appear after they are enrolled and their devices sync." />
          ) : filteredPatients.length === 0 ? (
            <DataSurfaceState status="empty" emptyTitle="No matching patients" emptyDescription="Try another name, ID, or risk filter." />
          ) : (
            <div className="overflow-x-auto scrollbar-subtle">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Current glucose</TableHead>
                    <TableHead>Risk</TableHead>
                    <TableHead>Time in range</TableHead>
                    <TableHead>Last update</TableHead>
                    <TableHead className="text-right"><span className="sr-only">Actions</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell>
                        <div className="flex min-w-44 items-center gap-3">
                          <Avatar className="size-9"><AvatarFallback className="bg-muted text-xs">{patient.initials}</AvatarFallback></Avatar>
                          <div><p className="font-medium">{patient.name}</p><p className="text-xs text-muted-foreground">{patient.id} · {patient.age} years</p></div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-semibold tabular-nums">{patient.glucose} <span className="text-xs font-normal text-muted-foreground">mg/dL</span></p>
                        <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><TrendIcon trend={patient.trend} /> {patient.trend}</p>
                      </TableCell>
                      <TableCell><Badge variant="outline" className={statusStyles[patient.status]}>{patient.status}</Badge></TableCell>
                      <TableCell>
                        <div className="flex min-w-28 items-center gap-3"><Progress value={patient.timeInRange} className="h-1.5" /><span className="text-xs tabular-nums">{patient.timeInRange}%</span></div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{patient.updated}</TableCell>
                      <TableCell className="text-right"><Button size="sm" variant="ghost" onClick={() => setSelectedPatient(patient)}>Review</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Sheet open={Boolean(selectedPatient)} onOpenChange={(open) => !open && setSelectedPatient(null)}>
        <SheetContent className="overflow-y-auto sm:max-w-md">
          {selectedPatient ? (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2"><UserRound className="size-5 text-primary" /> {selectedPatient.name}</SheetTitle>
                <SheetDescription>{selectedPatient.id} · Updated {selectedPatient.updated}</SheetDescription>
              </SheetHeader>
              <div className="space-y-5 px-4 pb-6">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border p-3"><p className="text-xs text-muted-foreground">Current glucose</p><p className="mt-1 text-xl font-semibold">{selectedPatient.glucose} <span className="text-xs font-normal">mg/dL</span></p></div>
                  <div className="rounded-lg border p-3"><p className="text-xs text-muted-foreground">Time in range</p><p className="mt-1 text-xl font-semibold">{selectedPatient.timeInRange}%</p></div>
                </div>
                <div className="rounded-lg bg-muted p-4"><p className="text-sm font-medium">Current assessment</p><p className="mt-2 text-sm leading-6 text-muted-foreground">{selectedPatient.status} risk with a {selectedPatient.trend.toLowerCase()} glucose pattern. Review the recent trace before contacting the patient.</p></div>
                <Button className="w-full" onClick={() => setSelectedPatient(null)}>Mark review started</Button>
              </div>
            </>
          ) : null}
        </SheetContent>
      </Sheet>
    </>
  );
}
