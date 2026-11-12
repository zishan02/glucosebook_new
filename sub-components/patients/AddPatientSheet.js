"use client";

import { useState } from "react";
import { UserPlus } from "lucide-react";
import { Button } from "@/widgets/ui/button";
import { Input } from "@/widgets/ui/input";
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
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/widgets/ui/sheet";

function initialsFor(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function AddPatientSheet({ onAddPatient }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [monitoringType, setMonitoringType] = useState("");
  const [error, setError] = useState("");

  function resetForm() {
    setName("");
    setAge("");
    setMonitoringType("");
    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    const parsedAge = Number(age);

    if (!name.trim() || !monitoringType || !Number.isInteger(parsedAge) || parsedAge < 1 || parsedAge > 120) {
      setError("Enter a patient name, valid age, and monitoring type.");
      return;
    }

    onAddPatient({
      id: `PT-${String(Math.floor(1000 + Math.random() * 9000))}`,
      name: name.trim(),
      initials: initialsFor(name),
      age: parsedAge,
      monitoringType,
      careStatus: "Active",
      engagement: "Needs outreach",
      risk: "Stable",
      glucose: null,
      trend: "Awaiting first reading",
      timeInRange: null,
      lastLog: "Not started",
    });
    setOpen(false);
    resetForm();
  }

  return (
    <Sheet open={open} onOpenChange={(nextOpen) => {
      setOpen(nextOpen);
      if (!nextOpen) resetForm();
    }}>
      <SheetTrigger asChild>
        <Button id="add-patient"><UserPlus /> Add patient</Button>
      </SheetTrigger>
      <SheetContent className="w-full overflow-y-auto sm:max-w-md">
        <form className="flex min-h-full flex-col" onSubmit={handleSubmit}>
          <SheetHeader className="border-b p-6 pr-12">
            <SheetTitle>Add patient</SheetTitle>
            <SheetDescription>Create a demo roster entry and assign its monitoring type.</SheetDescription>
          </SheetHeader>

          <div className="flex-1 space-y-5 p-6">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="patient-name">Full name</label>
              <Input id="patient-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Patient name" autoFocus />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="patient-age">Age</label>
              <Input id="patient-age" type="number" min="1" max="120" value={age} onChange={(event) => setAge(event.target.value)} placeholder="Age in years" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="patient-monitoring-type">Monitoring type</label>
              <Select value={monitoringType} onValueChange={setMonitoringType}>
                <SelectTrigger id="patient-monitoring-type" className="w-full"><SelectValue placeholder="Select monitoring type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="T-type">T-type</SelectItem>
                  <SelectItem value="L-type">L-type</SelectItem>
                  <SelectItem value="E-type">E-type</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-lg bg-muted p-4 text-sm text-muted-foreground">
              New patients start as active and awaiting their first glucose reading. This demo does not save clinical records.
            </div>

            {error ? <p className="text-sm text-destructive" role="alert">{error}</p> : null}
          </div>

          <SheetFooter className="border-t p-6 sm:flex-row sm:justify-end">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit">Add to roster</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
