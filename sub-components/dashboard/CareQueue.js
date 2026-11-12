"use client";

import { useState } from "react";
import { Check, Clock3 } from "lucide-react";
import { Badge } from "@/widgets/ui/badge";
import { Button } from "@/widgets/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/widgets/ui/card";
import { DataSurfaceState } from "@/widgets/DataSurfaceState";

export function CareQueue({ items, status, onRetry }) {
  const [completed, setCompleted] = useState([]);

  return (
    <Card className="dashboard-card h-full" id="care-queue">
      <CardHeader>
        <CardTitle>Today’s care queue</CardTitle>
        <CardDescription>{items.length - completed.length} tasks remaining</CardDescription>
      </CardHeader>
      <CardContent>
        {status !== "success" ? (
          <DataSurfaceState status={status} onRetry={onRetry} loadingRows={4} emptyTitle="Care queue is clear" />
        ) : (
          <ul className="divide-y">
            {items.map((item) => {
              const isComplete = completed.includes(item.id);
              return (
                <li className={`flex gap-3 py-4 first:pt-0 last:pb-0 ${isComplete ? "opacity-55" : ""}`} key={item.id}>
                  <Button
                    size="icon-sm"
                    variant={isComplete ? "secondary" : "outline"}
                    aria-label={`${isComplete ? "Reopen" : "Complete"} task for ${item.patient}`}
                    onClick={() => setCompleted((current) => isComplete ? current.filter((id) => id !== item.id) : [...current, item.id])}
                  >
                    <Check />
                  </Button>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div><p className={`text-sm font-medium ${isComplete ? "line-through" : ""}`}>{item.task}</p><p className="mt-1 text-xs text-muted-foreground">{item.patient} · {item.owner}</p></div>
                      <Badge variant={item.priority === "Urgent" ? "destructive" : "secondary"}>{item.priority}</Badge>
                    </div>
                    <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground"><Clock3 className="size-3" /> Due {item.due}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
