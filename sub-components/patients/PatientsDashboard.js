"use client";

import { useState } from "react";
import { Activity, CirclePause, RefreshCw, TriangleAlert, UsersRound } from "lucide-react";
import { dashboardResponse } from "@/data/dashboard/DashboardData";
import { patientsResponse } from "@/data/patients/PatientsData";
import { DashboardHeader } from "@/sub-components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/sub-components/dashboard/DashboardSidebar";
import { PageHeading } from "@/widgets/PageHeading";
import { Button } from "@/widgets/ui/button";
import { Card, CardContent } from "@/widgets/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/widgets/ui/select";
import { AddPatientSheet } from "./AddPatientSheet";
import { PatientRoster } from "./PatientRoster";

const overviewItems = [
  { id: "active", label: "Active patients", icon: UsersRound, color: "text-primary", getValue: (patients) => patients.filter((patient) => patient.careStatus === "Active").length },
  { id: "critical", label: "Critical review", icon: TriangleAlert, color: "text-rose-600 dark:text-rose-400", getValue: (patients) => patients.filter((patient) => patient.risk === "Critical").length },
  { id: "outreach", label: "Needs outreach", icon: Activity, color: "text-amber-600 dark:text-amber-400", getValue: (patients) => patients.filter((patient) => patient.engagement === "Needs outreach").length },
  { id: "paused", label: "Paused care", icon: CirclePause, color: "text-sky-600 dark:text-sky-400", getValue: (patients) => patients.filter((patient) => patient.careStatus === "Paused").length },
];

export function PatientsDashboard() {
  const [patients, setPatients] = useState(patientsResponse.patients);
  const [dataState, setDataState] = useState("success");
  const [announcement, setAnnouncement] = useState("");

  function retryData() {
    setDataState("loading");
    window.setTimeout(() => setDataState("success"), 650);
  }

  function addPatient(patient) {
    setPatients((currentPatients) => [patient, ...currentPatients]);
    setDataState("success");
    setAnnouncement(`${patient.name} was added to the patient roster.`);
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <DashboardHeader clinic={dashboardResponse.clinic} />

      <main className="clinical-grid lg:ml-64">
        <div className="mx-auto max-w-[1500px] space-y-6 p-4 md:p-6 xl:p-8">
          <PageHeading
            eyebrow="Care management"
            title="Patients"
            description="Search and filter the clinic caseload, review the latest status, and add new roster entries."
            actions={<AddPatientSheet onAddPatient={addPatient} />}
          />

          <div className="flex flex-col gap-3 rounded-xl border bg-card p-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">Demo roster · no production patient data is connected</p>
            <div className="flex flex-wrap items-center gap-2">
              <Select value={dataState} onValueChange={setDataState}>
                <SelectTrigger className="w-36 bg-background" aria-label="Preview patient roster data state"><SelectValue /></SelectTrigger>
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

          <p className="sr-only" aria-live="polite">{announcement}</p>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Patient roster summary">
            {overviewItems.map((item) => {
              const Icon = item.icon;
              return (
                <Card className="dashboard-card py-5" key={item.id}>
                  <CardContent className="flex items-center justify-between gap-4">
                    <div><p className="text-sm text-muted-foreground">{item.label}</p><p className="mt-1 text-2xl font-semibold tabular-nums">{item.getValue(patients)}</p></div>
                    <span className="grid size-10 place-items-center rounded-lg bg-muted"><Icon className={`size-5 ${item.color}`} aria-hidden="true" /></span>
                  </CardContent>
                </Card>
              );
            })}
          </section>

          <PatientRoster patients={patients} status={dataState} onRetry={retryData} />

          <footer className="flex flex-col gap-1 border-t py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>Glucosebook patients · Demonstration data only</p>
            <p>{patients.length} roster entries</p>
          </footer>
        </div>
      </main>
    </div>
  );
}
