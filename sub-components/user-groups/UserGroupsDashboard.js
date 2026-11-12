"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { dashboardResponse } from "@/data/dashboard/DashboardData";
import { userGroupsResponse } from "@/data/user-groups/UserGroupsData";
import { DashboardHeader } from "@/sub-components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/sub-components/dashboard/DashboardSidebar";
import { PageHeading } from "@/widgets/PageHeading";
import { Button } from "@/widgets/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/widgets/ui/select";
import { AddUserGroupSheet } from "./AddUserGroupSheet";
import { AddUserSheet } from "./AddUserSheet";
import { GroupUsersTable } from "./GroupUsersTable";
import { UserGroupList } from "./UserGroupList";

export function UserGroupsDashboard() {
  const [groups, setGroups] = useState(userGroupsResponse.groups);
  const [users, setUsers] = useState(userGroupsResponse.users);
  const [selectedGroupId, setSelectedGroupId] = useState(userGroupsResponse.groups[0]?.id ?? "");
  const [search, setSearch] = useState("");
  const [dataState, setDataState] = useState("success");
  const [announcement, setAnnouncement] = useState("");

  const selectedGroup = groups.find((group) => group.id === selectedGroupId) ?? groups[0];

  function retryData() {
    setDataState("loading");
    window.setTimeout(() => setDataState("success"), 650);
  }

  function addGroup(group) {
    setGroups((currentGroups) => [...currentGroups, group]);
    setSelectedGroupId(group.id);
    setSearch("");
    setDataState("success");
    setAnnouncement(`${group.name} was created.`);
  }

  function addUser(user) {
    setUsers((currentUsers) => [...currentUsers, user]);
    setSelectedGroupId(user.groupId);
    setSearch("");
    setDataState("success");
    setAnnouncement(`${user.name} was invited.`);
  }

  function selectGroup(groupId) {
    setSelectedGroupId(groupId);
    setSearch("");
    document.getElementById("users")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <DashboardHeader clinic={dashboardResponse.clinic} />

      <main className="clinical-grid lg:ml-64">
        <div className="mx-auto max-w-[1500px] space-y-6 p-4 md:p-6 xl:p-8">
          <PageHeading
            eyebrow="Workspace administration"
            title="User groups"
            description="Organize workspace users into clear access groups, then invite each person into the right team."
            actions={
              <>
                <AddUserSheet groups={groups} selectedGroupId={selectedGroup?.id} onAddUser={addUser} />
                <AddUserGroupSheet onAddGroup={addGroup} />
              </>
            }
          />

          <div className="flex flex-col gap-3 rounded-xl border bg-card p-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">Demo workspace · changes remain in this browser session</p>
            <div className="flex flex-wrap items-center gap-2">
              <Select value={dataState} onValueChange={setDataState}>
                <SelectTrigger className="w-36 bg-background" aria-label="Preview user group data state"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="success">Live data</SelectItem>
                  <SelectItem value="loading">Loading state</SelectItem>
                  <SelectItem value="empty">Empty state</SelectItem>
                  <SelectItem value="error">Error state</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={retryData}><RefreshCw /> Refresh</Button>
            </div>
          </div>

          <p className="sr-only" aria-live="polite">{announcement}</p>

          <UserGroupList
            groups={groups}
            users={users}
            selectedGroupId={selectedGroup?.id}
            status={dataState}
            onSelectGroup={selectGroup}
            onRetry={retryData}
          />

          <GroupUsersTable
            group={selectedGroup}
            users={users}
            status={dataState}
            search={search}
            onSearchChange={setSearch}
            onRetry={retryData}
          />

          <footer className="flex flex-col gap-1 border-t py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>Glucosebook user management · Demonstration data only</p>
            <p>{groups.length} groups · {users.length} users</p>
          </footer>
        </div>
      </main>
    </div>
  );
}
