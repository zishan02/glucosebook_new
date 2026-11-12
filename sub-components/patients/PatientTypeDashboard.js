"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, RefreshCw, TriangleAlert, UserCheck, UsersRound } from "lucide-react";
import { dashboardResponse } from "@/data/dashboard/DashboardData";
import { patientsResponse } from "@/data/patients/PatientsData";
import { DashboardHeader } from "@/sub-components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/sub-components/dashboard/DashboardSidebar";
import { DataSurfaceState } from "@/widgets/DataSurfaceState";
import { PageHeading } from "@/widgets/PageHeading";
import { Avatar, AvatarFallback } from "@/widgets/ui/avatar";
import { Badge } from "@/widgets/ui/badge";
import { Button } from "@/widgets/ui/button";
import { Card, CardContent } from "@/widgets/ui/card";
import { Progress } from "@/widgets/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/widgets/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/widgets/ui/table";

const typeDetails = {
  "T-type": "Structured glucose monitoring with the standard T-type schedule.",
  "L-type": "Longitudinal monitoring with the L-type care workflow.",
  "E-type": "Enhanced monitoring for patients using the E-type workflow.",
};

function averageTimeInRange(patients) {
  const values = patients.map((patient) => patient.timeInRange).filter((value) => value != null);
  if (!values.length) return "—";
  return `${Math.round(values.reduce((sum, value) => sum + value, 0) / values.length)}%`;
}

export function PatientTypeDashboard({ patientType }) {
  const [dataState, setDataState] = useState("success");
  const patients = patientsResponse.patients.filter((patient) => patient.monitoringType === patientType);
  const activeCount = patients.filter((patient) => patient.careStatus === "Active").length;
  const criticalCount = patients.filter((patient) => patient.risk === "Critical").length;

  function retryData() {
    setDataState("loading");
    window.setTimeout(() => setDataState("success"), 650);
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <DashboardHeader clinic={dashboardResponse.clinic} />

      <main className="clinical-grid lg:ml-64">
        <div className="mx-auto max-w-[1500px] space-y-6 p-4 md:p-6 xl:p-8">
          <PageHeading
            eyebrow="Patient type"
            title={`${patientType} patients`}
            description={typeDetails[patientType]}
            actions={<Button asChild variant="outline"><Link href="/patients"><ArrowLeft /> All patients</Link></Button>}
          />

          <div className="flex flex-col gap-3 rounded-xl border bg-card p-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">Demo roster · no production patient data is connected</p>
            <div className="flex flex-wrap items-center gap-2">
              <Select value={dataState} onValueChange={setDataState}>
                <SelectTrigger className="w-36 bg-background" aria-label="Preview patient type data state"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="success">Live data</SelectItem>
                  <SelectItem value="loading">Loading state</SelectItem>
                  <SelectItem value="empty">Empty state</SelectItem>
                  <SelectItem value="error">Error state</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={retryData}><RefreshCw /> Refresh</Button>
            </div>
          </div>

          <section className="grid gap-4 sm:grid-cols-3" aria-label={`${patientType} summary`}>
            <Card className="dashboard-card py-5"><CardContent className="flex items-center justify-between gap-4"><div><p className="text-sm text-muted-foreground">Patients</p><p className="mt-1 text-2xl font-semibold">{patients.length}</p></div><UsersRound className="size-5 text-primary" /></CardContent></Card>
            <Card className="dashboard-card py-5"><CardContent className="flex items-center justify-between gap-4"><div><p className="text-sm text-muted-foreground">Active care</p><p className="mt-1 text-2xl font-semibold">{activeCount}</p></div><UserCheck className="size-5 text-emerald-600 dark:text-emerald-400" /></CardContent></Card>
            <Card className="dashboard-card py-5"><CardContent className="flex items-center justify-between gap-4"><div><p className="text-sm text-muted-foreground">Critical review</p><p className="mt-1 text-2xl font-semibold">{criticalCount}</p></div><TriangleAlert className="size-5 text-rose-600 dark:text-rose-400" /></CardContent></Card>
          </section>

          <section className="dashboard-card overflow-hidden rounded-xl" aria-labelledby="type-roster-heading">
            <div className="flex flex-wrap items-end justify-between gap-3 border-b p-5">
              <div><h2 className="text-lg font-semibold" id="type-roster-heading">{patientType} roster</h2><p className="mt-1 text-sm text-muted-foreground">Average time in range: {averageTimeInRange(patients)}</p></div>
              <Badge variant="secondary">{patients.length} patients</Badge>
            </div>
            <div className="p-5">
              {dataState !== "success" ? (
                <DataSurfaceState status={dataState} onRetry={retryData} loadingRows={3} emptyTitle={`No ${patientType} patients`} emptyDescription="Patients appear here after their monitoring type is assigned." />
              ) : (
                <div className="overflow-x-auto scrollbar-subtle">
                  <Table>
                    <TableHeader><TableRow><TableHead>Patient</TableHead><TableHead>Care status</TableHead><TableHead>Latest glucose</TableHead><TableHead>Risk</TableHead><TableHead>Time in range</TableHead></TableRow></TableHeader>
                    <TableBody>
                      {patients.map((patient) => (
                        <TableRow key={patient.id}>
                          <TableCell><div className="flex min-w-48 items-center gap-3"><Avatar className="size-9"><AvatarFallback className="bg-primary/10 text-xs text-primary">{patient.initials}</AvatarFallback></Avatar><div><p className="font-medium">{patient.name}</p><p className="text-xs text-muted-foreground">{patient.id} · {patient.age} years</p></div></div></TableCell>
                          <TableCell><Badge variant="outline">{patient.careStatus}</Badge><p className="mt-1 text-xs text-muted-foreground">{patient.engagement}</p></TableCell>
                          <TableCell>{patient.glucose == null ? <span className="text-muted-foreground">Awaiting reading</span> : <><p className="font-semibold">{patient.glucose} <span className="text-xs font-normal text-muted-foreground">mg/dL</span></p><p className="text-xs text-muted-foreground">{patient.lastLog}</p></>}</TableCell>
                          <TableCell><Badge variant={patient.risk === "Critical" ? "destructive" : "outline"}>{patient.risk}</Badge></TableCell>
                          <TableCell>{patient.timeInRange == null ? <span className="text-muted-foreground">No data</span> : <div className="flex min-w-28 items-center gap-3"><Progress className="h-1.5" value={patient.timeInRange} /><span className="text-xs">{patient.timeInRange}%</span></div>}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </section>

          <footer className="flex flex-col gap-1 border-t py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>Glucosebook {patientType} roster · Demonstration data only</p>
            <p>{patients.length} patients</p>
          </footer>
        </div>
      </main>
    </div>
  );
}
