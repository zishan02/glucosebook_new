"use client";

import { Area, AreaChart, CartesianGrid, ReferenceArea, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/widgets/ui/card";
import { Badge } from "@/widgets/ui/badge";
import { DataSurfaceState } from "@/widgets/DataSurfaceState";

function GlucoseTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const value = payload[0].value;
  const state = value > 180 ? "High" : value < 70 ? "Low" : "In range";
  return (
    <div className="rounded-lg border bg-popover px-3 py-2 text-sm shadow-lg">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 font-semibold">{value} mg/dL · {state}</p>
    </div>
  );
}

export function GlucoseTrend({ data, status, onRetry }) {
  return (
    <Card className="dashboard-card h-full" id="glucose-trends">
      <CardHeader className="flex-row items-start justify-between gap-4">
        <div>
          <CardTitle>Median glucose profile</CardTitle>
          <CardDescription>Combined clinic view across the selected period</CardDescription>
        </div>
        <Badge variant="secondary">mg/dL</Badge>
      </CardHeader>
      <CardContent>
        {status !== "success" ? (
          <DataSurfaceState
            status={status}
            onRetry={onRetry}
            emptyTitle="No glucose readings"
            emptyDescription="Readings will appear after a patient sensor syncs."
          />
        ) : (
          <>
            <p className="sr-only">Median glucose ranges from 103 to 192 milligrams per decilitre. The target range is 70 to 180.</p>
            <div className="h-[310px] w-full" role="img" aria-label="Area chart showing median glucose during the day with a target range from 70 to 180 milligrams per decilitre">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 12, right: 8, left: -18, bottom: 0 }}>
                  <defs>
                    <linearGradient id="glucoseFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.28} />
                      <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                  <ReferenceArea y1={70} y2={180} fill="var(--chart-1)" fillOpacity={0.08} />
                  <XAxis dataKey="time" tickLine={false} axisLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} interval={1} />
                  <YAxis domain={[40, 260]} ticks={[50, 100, 150, 200, 250]} tickLine={false} axisLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} />
                  <Tooltip content={<GlucoseTooltip />} cursor={{ stroke: "var(--border)" }} />
                  <Area type="monotone" dataKey="glucose" stroke="var(--chart-2)" strokeWidth={2.5} fill="url(#glucoseFill)" activeDot={{ r: 5, fill: "var(--chart-2)", stroke: "var(--card)", strokeWidth: 2 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-2"><span className="h-0.5 w-5 bg-[var(--chart-2)]" /> Median glucose</span>
              <span className="flex items-center gap-2"><span className="size-3 rounded-sm border border-emerald-500/30 bg-emerald-500/10" /> Target range: 70–180</span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
