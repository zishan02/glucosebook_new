"use client";

import { useMemo, useState } from "react";
import { Activity, Clock3, Search, UserRound } from "lucide-react";
import { DataSurfaceState } from "@/widgets/DataSurfaceState";
import { Avatar, AvatarFallback } from "@/widgets/ui/avatar";
import { Badge } from "@/widgets/ui/badge";
import { Button } from "@/widgets/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/widgets/ui/card";
import { Input } from "@/widgets/ui/input";
import { Progress } from "@/widgets/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/widgets/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/widgets/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/widgets/ui/table";

const riskStyles = {
  Critical: "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300",
  Watch: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300",
  Stable: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300",
};

export function PatientRoster({ patients, status, onRetry }) {
  const [query, setQuery] = useState("");
  const [careStatus, setCareStatus] = useState("active");
  const [monitoringType, setMonitoringType] = useState("all");
  const [selectedPatient, setSelectedPatient] = useState(null);

  const filteredPatients = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return patients.filter((patient) => {
      const matchesQuery = !normalizedQuery || patient.name.toLowerCase().includes(normalizedQuery) || patient.id.toLowerCase().includes(normalizedQuery);
      const matchesStatus = careStatus === "all" || patient.careStatus.toLowerCase() === careStatus;
      const matchesType = monitoringType === "all" || patient.monitoringType === monitoringType;
      return matchesQuery && matchesStatus && matchesType;
    });
  }, [patients, query, careStatus, monitoringType]);

  return (
    <>
      <Card className="dashboard-card" id="patient-roster">
        <CardHeader className="gap-4 border-b lg:flex-row lg:items-end lg:justify-between">
          <div>
            <CardTitle>Patient roster</CardTitle>
            <CardDescription className="mt-1">Search and filter the clinic caseload. Review opens a concise patient snapshot.</CardDescription>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <label className="relative">
              <span className="sr-only">Search patients</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <Input className="w-full pl-9 sm:w-56" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name or ID" />
            </label>
            <Select value={careStatus} onValueChange={setCareStatus}>
              <SelectTrigger className="w-full sm:w-32" aria-label="Filter patient status"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
                <SelectItem value="all">All statuses</SelectItem>
              </SelectContent>
            </Select>
            <Select value={monitoringType} onValueChange={setMonitoringType}>
              <SelectTrigger className="w-full sm:w-32" aria-label="Filter monitoring type"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                <SelectItem value="T-type">T-type</SelectItem>
                <SelectItem value="L-type">L-type</SelectItem>
                <SelectItem value="E-type">E-type</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          {status !== "success" ? (
            <DataSurfaceState status={status} onRetry={onRetry} loadingRows={6} emptyTitle="No patients in this view" emptyDescription="Patients will appear after they are added to the roster." />
          ) : filteredPatients.length === 0 ? (
            <DataSurfaceState status="empty" emptyTitle="No matching patients" emptyDescription="Try another name, ID, status, or monitoring type." />
          ) : (
            <div className="overflow-x-auto scrollbar-subtle">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Care</TableHead>
                    <TableHead>Latest glucose</TableHead>
                    <TableHead>Risk</TableHead>
                    <TableHead>Time in range</TableHead>
                    <TableHead className="text-right"><span className="sr-only">Actions</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell>
                        <div className="flex min-w-48 items-center gap-3">
                          <Avatar className="size-9"><AvatarFallback className="bg-primary/10 text-xs text-primary">{patient.initials}</AvatarFallback></Avatar>
                          <div><p className="font-medium">{patient.name}</p><p className="text-xs text-muted-foreground">{patient.id} · {patient.age} years · {patient.monitoringType}</p></div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{patient.careStatus}</Badge>
                        <p className="mt-1 text-xs text-muted-foreground">{patient.engagement}</p>
                      </TableCell>
                      <TableCell>
                        {patient.glucose == null ? <span className="text-sm text-muted-foreground">Awaiting reading</span> : <p className="font-semibold tabular-nums">{patient.glucose} <span className="text-xs font-normal text-muted-foreground">mg/dL</span></p>}
                        <p className="mt-1 text-xs text-muted-foreground">{patient.trend} · {patient.lastLog}</p>
                      </TableCell>
                      <TableCell><Badge className={riskStyles[patient.risk]} variant="outline">{patient.risk}</Badge></TableCell>
                      <TableCell>
                        {patient.timeInRange == null ? <span className="text-sm text-muted-foreground">No data</span> : <div className="flex min-w-28 items-center gap-3"><Progress className="h-1.5" value={patient.timeInRange} /><span className="text-xs tabular-nums">{patient.timeInRange}%</span></div>}
                      </TableCell>
                      <TableCell className="text-right"><Button size="sm" variant="ghost" onClick={() => setSelectedPatient(patient)}>Review</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Sheet open={Boolean(selectedPatient)} onOpenChange={(nextOpen) => !nextOpen && setSelectedPatient(null)}>
        <SheetContent className="overflow-y-auto sm:max-w-md">
          {selectedPatient ? (
            <>
              <SheetHeader className="border-b p-6 pr-12">
                <SheetTitle className="flex items-center gap-2"><UserRound className="size-5 text-primary" /> {selectedPatient.name}</SheetTitle>
                <SheetDescription>{selectedPatient.id} · {selectedPatient.age} years · {selectedPatient.monitoringType}</SheetDescription>
              </SheetHeader>
              <div className="space-y-5 p-6">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border p-3"><p className="text-xs text-muted-foreground">Latest glucose</p><p className="mt-1 text-xl font-semibold">{selectedPatient.glucose ?? "—"} {selectedPatient.glucose != null ? <span className="text-xs font-normal">mg/dL</span> : null}</p></div>
                  <div className="rounded-lg border p-3"><p className="text-xs text-muted-foreground">Time in range</p><p className="mt-1 text-xl font-semibold">{selectedPatient.timeInRange == null ? "—" : `${selectedPatient.timeInRange}%`}</p></div>
                </div>
                <div className="space-y-3 rounded-lg bg-muted p-4 text-sm">
                  <p className="flex items-center gap-2 font-medium"><Activity className="size-4 text-primary" /> Current assessment</p>
                  <p className="leading-6 text-muted-foreground">{selectedPatient.risk} risk · {selectedPatient.trend}. This is a roster snapshot for review, not a treatment recommendation.</p>
                  <p className="flex items-center gap-2 text-muted-foreground"><Clock3 className="size-4" /> Last logged {selectedPatient.lastLog}</p>
                </div>
                <Button className="w-full" variant="outline" onClick={() => setSelectedPatient(null)}>Close snapshot</Button>
              </div>
            </>
          ) : null}
        </SheetContent>
      </Sheet>
    </>
  );
}
