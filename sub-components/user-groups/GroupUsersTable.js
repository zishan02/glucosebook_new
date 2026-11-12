import { Search, UserRound, UsersRound } from "lucide-react";
import { DataSurfaceState } from "@/widgets/DataSurfaceState";
import { Avatar, AvatarFallback } from "@/widgets/ui/avatar";
import { Badge } from "@/widgets/ui/badge";
import { Input } from "@/widgets/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/widgets/ui/table";

function getInitials(name) {
  return name
    .replace("Dr. ", "")
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function GroupUsersTable({ group, users, status, search, onSearchChange, onRetry }) {
  const filteredUsers = users.filter((user) => {
    if (group && user.groupId !== group.id) return false;
    const query = search.trim().toLowerCase();
    return !query || `${user.name} ${user.email} ${user.role}`.toLowerCase().includes(query);
  });

  return (
    <section className="dashboard-card overflow-hidden rounded-xl" id="users" aria-labelledby="users-heading">
      <div className="flex flex-col gap-4 border-b p-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold" id="users-heading">{group ? `${group.name} users` : "All users"}</h2>
            <Badge variant="secondary">{filteredUsers.length}</Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">Users added here inherit their group&apos;s workspace access.</p>
        </div>
        <label className="relative block w-full sm:w-72">
          <span className="sr-only">Search users</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input className="pl-9" value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Search name, email, or role" />
        </label>
      </div>

      <div className="p-5">
        {status !== "success" ? (
          <DataSurfaceState status={status} onRetry={onRetry} loadingRows={4} emptyTitle="No users in this group" emptyDescription="Add a user and assign them to this group." />
        ) : filteredUsers.length ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Group</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex min-w-56 items-center gap-3">
                        <Avatar className="size-9"><AvatarFallback className="bg-primary/10 text-xs text-primary">{getInitials(user.name)}</AvatarFallback></Avatar>
                        <div><p className="font-medium">{user.name}</p><p className="text-xs text-muted-foreground">{user.email}</p></div>
                      </div>
                    </TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell><Badge variant={user.status === "Active" ? "secondary" : "outline"}>{user.status}</Badge></TableCell>
                    <TableCell className="text-right text-sm text-muted-foreground">{group?.name ?? "Assigned"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="grid min-h-48 place-items-center rounded-lg border border-dashed p-6 text-center">
            <div>
              {search ? <UserRound className="mx-auto size-7 text-muted-foreground" aria-hidden="true" /> : <UsersRound className="mx-auto size-7 text-muted-foreground" aria-hidden="true" />}
              <h3 className="mt-3 font-medium">{search ? "No matching users" : "No users in this group"}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{search ? "Try another name, email, or role." : "Add a user and assign them to this group."}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
