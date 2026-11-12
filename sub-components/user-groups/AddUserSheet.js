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

export function AddUserSheet({ groups, selectedGroupId, onAddUser }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [groupId, setGroupId] = useState(selectedGroupId ?? "");
  const [error, setError] = useState("");

  function resetForm() {
    setName("");
    setEmail("");
    setRole("");
    setGroupId(selectedGroupId ?? "");
    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !role.trim() || !groupId) {
      setError("Enter the user details and choose a user group.");
      return;
    }

    onAddUser({
      id: `user-${crypto.randomUUID()}`,
      name: name.trim(),
      email: email.trim(),
      role: role.trim(),
      groupId,
      status: "Invited",
    });
    setOpen(false);
    resetForm();
  }

  return (
    <Sheet open={open} onOpenChange={(nextOpen) => {
      setOpen(nextOpen);
      if (nextOpen) setGroupId(selectedGroupId ?? groups[0]?.id ?? "");
      if (!nextOpen) resetForm();
    }}>
      <SheetTrigger asChild>
        <Button variant="outline" disabled={!groups.length}><UserPlus /> Add user</Button>
      </SheetTrigger>
      <SheetContent className="w-full overflow-y-auto sm:max-w-md">
        <form className="flex min-h-full flex-col" onSubmit={handleSubmit}>
          <SheetHeader className="border-b p-6 pr-12">
            <SheetTitle>Add user</SheetTitle>
            <SheetDescription>Invite a user and place them directly into the right user group.</SheetDescription>
          </SheetHeader>

          <div className="flex-1 space-y-5 p-6">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="user-name">Full name</label>
              <Input id="user-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Full name" autoFocus />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="user-email">Email address</label>
              <Input id="user-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@example.com" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="user-role">Role</label>
              <Input id="user-role" value={role} onChange={(event) => setRole(event.target.value)} placeholder="For example, Care coordinator" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="user-group">User group</label>
              <Select value={groupId} onValueChange={setGroupId}>
                <SelectTrigger id="user-group" className="w-full"><SelectValue placeholder="Select a user group" /></SelectTrigger>
                <SelectContent>
                  {groups.map((group) => <SelectItem value={group.id} key={group.id}>{group.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            {error ? <p className="text-sm text-destructive" role="alert">{error}</p> : null}
          </div>

          <SheetFooter className="border-t p-6 sm:flex-row sm:justify-end">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit">Send invitation</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
