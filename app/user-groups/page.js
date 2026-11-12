import { UserGroupsDashboard } from "@/sub-components/user-groups/UserGroupsDashboard";

export const metadata = {
  title: "User groups | Glucosebook",
  description: "Manage workspace user groups and group membership.",
};

export default function UserGroupsPage() {
  return <UserGroupsDashboard />;
}
