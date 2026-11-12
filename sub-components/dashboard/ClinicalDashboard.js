"use client";

import { useState } from "react";
import { CalendarDays, Download, RefreshCw } from "lucide-react";
import { dashboardResponse } from "@/data/dashboard/DashboardData";
import { PageHeading } from "@/widgets/PageHeading";
import { Button } from "@/widgets/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/widgets/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/widgets/ui/tabs";
import { CareAlerts } from "./CareAlerts";
import { CareQueue } from "./CareQueue";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardSidebar } from "./DashboardSidebar";
import { GlucoseTrend } from "./GlucoseTrend";
import { OverviewCards } from "./OverviewCards";
import { PatientRiskTable } from "./PatientRiskTable";
import { RangeDistribution } from "./RangeDistribution";

export function ClinicalDashboard() {
  const [dataState, setDataState] = useState("success");
  const [range, setRange] = useState("7d");
  const data = dashboardResponse;

  function retryData() {
    setDataState("loading");
    window.setTimeout(() => setDataState("success"), 650);
  }

  function exportSummary() {
    const summary = [
      "Glucosebook clinic summary",
      `Generated: ${new Date(data.meta.generatedAt).toLocaleString("en-IN")}`,
      ...data.metrics.map((metric) => `${metric.label}: ${metric.value}`),
    ].join("\n");
    const blob = new Blob([summary], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "glucosebook-clinic-summary.txt";
    link.click();
    URL.revokeObjectURL(link.href);
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <DashboardHeader clinic={data.clinic} />

      <main className="clinical-grid lg:ml-64">
        <div className="mx-auto max-w-[1600px] space-y-6 p-4 md:p-6 xl:p-8">
          <PageHeading
            eyebrow="Clinical overview"
            title="Good morning, Dr. Rao"
            description="Focus the care team on patients whose glucose patterns changed most since yesterday."
            actions={
              <>
                <Select value={dataState} onValueChange={setDataState}>
                  <SelectTrigger className="w-36 bg-background" aria-label="Preview data state"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="success">Live data</SelectItem>
                    <SelectItem value="loading">Loading state</SelectItem>
                    <SelectItem value="empty">Empty state</SelectItem>
                    <SelectItem value="error">Error state</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={retryData}><RefreshCw /> Refresh</Button>
                <Button onClick={exportSummary}><Download /> Export summary</Button>
              </>
            }
          />

          <div className="flex flex-col gap-3 rounded-xl border bg-card p-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><CalendarDays className="size-4" /><span>Showing clinic data through 12 Nov 2026</span></div>
            <Tabs value={range} onValueChange={setRange}>
              <TabsList aria-label="Dashboard date range">
                <TabsTrigger value="24h">24 hours</TabsTrigger>
                <TabsTrigger value="7d">7 days</TabsTrigger>
                <TabsTrigger value="30d">30 days</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <OverviewCards metrics={data.metrics} status={dataState} />

          <section className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(300px,0.7fr)]" aria-label="Glucose analytics">
            <GlucoseTrend data={data.glucoseSeries} status={dataState} onRetry={retryData} />
            <RangeDistribution data={data.rangeDistribution} status={dataState} onRetry={retryData} />
          </section>

          <PatientRiskTable patients={data.patients} status={dataState} onRetry={retryData} />

          <section className="grid gap-6 xl:grid-cols-2" aria-label="Care operations">
            <CareQueue items={data.careQueue} status={dataState} onRetry={retryData} />
            <CareAlerts alerts={data.alerts} status={dataState} onRetry={retryData} />
          </section>

          <footer className="flex flex-col gap-1 border-t py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>Glucosebook clinical workspace · Demonstration data only</p>
            <p>Last sync: 2 minutes ago · Asia/Kolkata</p>
          </footer>
        </div>
      </main>
    </div>
  );
}
