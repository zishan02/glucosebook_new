"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, CalendarDays, RefreshCw } from "lucide-react";
import { dashboardResponse } from "@/data/dashboard/DashboardData";
import { todayResponse } from "@/data/today/TodayData";
import { DashboardHeader } from "@/sub-components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/sub-components/dashboard/DashboardSidebar";
import { PageHeading } from "@/widgets/PageHeading";
import { Button } from "@/widgets/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/widgets/ui/select";
import { TodayWorklist } from "./TodayWorklist";

export function TodayDashboard() {
  const [dataState, setDataState] = useState("success");

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
            eyebrow="Daily care hub"
            title="Today"
            description={`${todayResponse.meta.displayDate} (IST) · review who logged glucose, then call who stayed silent.`}
            actions={
              <>
                <Select value={dataState} onValueChange={setDataState}>
                  <SelectTrigger className="w-36 bg-background" aria-label="Preview today data state"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="success">Live data</SelectItem>
                    <SelectItem value="loading">Loading state</SelectItem>
                    <SelectItem value="empty">Empty state</SelectItem>
                    <SelectItem value="error">Error state</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={retryData}><RefreshCw /> Refresh</Button>
              </>
            }
          />

          <div className="flex flex-col gap-3 rounded-xl border bg-card p-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><CalendarDays className="size-4" /><span>Clinic-wide worklist · updated 9:10 am</span></div>
            <Button asChild size="sm" variant="ghost"><Link href="/"><ArrowLeft /> Back to overview</Link></Button>
          </div>

          <TodayWorklist response={todayResponse} status={dataState} onRetry={retryData} />

          <footer className="flex flex-col gap-1 border-t py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>Glucosebook Today · Demonstration data only</p>
            <p>One patient per row · reviewed-today status is team-visible</p>
          </footer>
        </div>
      </main>
    </div>
  );
}
