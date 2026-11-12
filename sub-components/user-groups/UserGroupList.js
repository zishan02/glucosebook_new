import { Check, ShieldCheck, UsersRound } from "lucide-react";
import { DataSurfaceState } from "@/widgets/DataSurfaceState";
import { Badge } from "@/widgets/ui/badge";
import { Button } from "@/widgets/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/widgets/ui/card";

export function UserGroupList({ groups, users, selectedGroupId, status, onSelectGroup, onRetry }) {
  if (status !== "success") {
    return (
      <section aria-labelledby="groups-heading">
        <DataSurfaceState
          status={status}
          onRetry={onRetry}
          loadingRows={3}
          emptyTitle="No user groups yet"
          emptyDescription="Create a user group before adding workspace users."
        />
      </section>
    );
  }

  if (!groups.length) {
    return (
      <section aria-labelledby="groups-heading">
        <DataSurfaceState status="empty" emptyTitle="No user groups yet" emptyDescription="Create a user group before adding workspace users." />
      </section>
    );
  }

  return (
    <section aria-labelledby="groups-heading">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold" id="groups-heading">User groups</h2>
          <p className="mt-1 text-sm text-muted-foreground">Select a group to review its members.</p>
        </div>
        <Badge variant="secondary">{groups.length} groups</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {groups.map((group) => {
          const memberCount = users.filter((user) => user.groupId === group.id).length;
          const isSelected = selectedGroupId === group.id;

          return (
            <Card className={`dashboard-card transition-colors ${isSelected ? "border-primary ring-2 ring-primary/15" : "hover:border-primary/45"}`} key={group.id}>
              <CardHeader className="gap-3">
                <div className="flex items-start justify-between gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary"><UsersRound className="size-5" aria-hidden="true" /></span>
                  {isSelected ? <Badge><Check className="size-3" /> Selected</Badge> : null}
                </div>
                <div>
                  <CardTitle className="text-base">{group.name}</CardTitle>
                  <CardDescription className="mt-1 line-clamp-2 min-h-10">{group.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5"><UsersRound className="size-3.5" /> {memberCount} {memberCount === 1 ? "member" : "members"}</span>
                  <span className="inline-flex items-center gap-1.5"><ShieldCheck className="size-3.5" /> {group.accessLevel}</span>
                </div>
                <Button className="w-full" variant={isSelected ? "secondary" : "outline"} onClick={() => onSelectGroup(group.id)} aria-pressed={isSelected}>
                  {isSelected ? "Viewing members" : "View members"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
