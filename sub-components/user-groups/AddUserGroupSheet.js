"use client";

import { useState } from "react";
import { FolderPlus } from "lucide-react";
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

const accessLevels = ["Care operations", "Clinical review", "Patient education", "Workspace administration"];

export function AddUserGroupSheet({ onAddGroup }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [accessLevel, setAccessLevel] = useState("");
  const [error, setError] = useState("");

  function resetForm() {
    setName("");
    setDescription("");
    setAccessLevel("");
    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim() || !description.trim() || !accessLevel) {
      setError("Enter a group name, description, and access level.");
      return;
    }

    onAddGroup({
      id: `group-${crypto.randomUUID()}`,
      name: name.trim(),
      description: description.trim(),
      accessLevel,
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
        <Button className="button-primary"><FolderPlus /> Add user group</Button>
      </SheetTrigger>
      <SheetContent className="w-full overflow-y-auto sm:max-w-md">
        <form className="flex min-h-full flex-col" onSubmit={handleSubmit}>
          <SheetHeader className="border-b p-6 pr-12">
            <SheetTitle>Add user group</SheetTitle>
            <SheetDescription>Create a team and define the kind of workspace access its members need.</SheetDescription>
          </SheetHeader>

          <div className="flex-1 space-y-5 p-6">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="group-name">Group name</label>
              <Input id="group-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="For example, Night care team" autoFocus />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="group-description">Description</label>
              <Input id="group-description" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="What does this group handle?" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="group-access">Access level</label>
              <Select value={accessLevel} onValueChange={setAccessLevel}>
                <SelectTrigger id="group-access" className="w-full"><SelectValue placeholder="Select access level" /></SelectTrigger>
                <SelectContent>
                  {accessLevels.map((level) => <SelectItem value={level} key={level}>{level}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            {error ? <p className="text-sm text-destructive" role="alert">{error}</p> : null}
          </div>

          <SheetFooter className="border-t p-6 sm:flex-row sm:justify-end">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit">Create group</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
