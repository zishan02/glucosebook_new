"use client";

import { AlertCircle } from "lucide-react";
import { Button } from "@/widgets/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/widgets/ui/alert";

export default function DashboardError({ reset }) {
  return (
    <main className="grid min-h-screen place-items-center bg-background p-6">
      <Alert variant="destructive" className="max-w-lg">
        <AlertCircle />
        <AlertTitle>Dashboard unavailable</AlertTitle>
        <AlertDescription>
          We could not load the clinical workspace. No patient data was changed.
          <Button className="mt-4 w-fit" variant="outline" onClick={reset}>
            Try again
          </Button>
        </AlertDescription>
      </Alert>
    </main>
  );
}
