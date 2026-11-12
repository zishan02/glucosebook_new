import { Activity, BellRing, CalendarCheck2, Layers3, LayoutDashboard, ListChecks, UserRound, UsersRound } from "lucide-react";

export const dashboardRoutes = [
  {
    title: "Workspace",
    items: [
      { name: "Today", href: "/today", icon: CalendarCheck2, badge: "9" },
      { name: "Overview", href: "/", icon: LayoutDashboard },
      { name: "Glucose trends", href: "/#glucose-trends", icon: Activity },
      {
        name: "Patients",
        href: "/patients",
        icon: UsersRound,
        children: [
          { name: "T-type", href: "/patients/by-type/t-type", icon: Layers3 },
          { name: "L-type", href: "/patients/by-type/l-type", icon: Layers3 },
          { name: "E-type", href: "/patients/by-type/e-type", icon: Layers3 },
        ],
      },
      { name: "Care queue", href: "/#care-queue", icon: ListChecks, badge: "5" },
      { name: "Alerts", href: "/#care-alerts", icon: BellRing, badge: "3" },
    ],
  },
  {
    title: "Administration",
    items: [
      {
        name: "User groups",
        href: "/user-groups",
        icon: UsersRound,
        children: [
          { name: "Users", href: "/user-groups#users", icon: UserRound },
        ],
      },
    ],
  },
];
