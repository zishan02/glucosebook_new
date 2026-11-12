"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, HeartPulse } from "lucide-react";
import { usePathname } from "next/navigation";
import { dashboardRoutes } from "@/routes/DashboardRoutes";
import { Badge } from "@/widgets/ui/badge";

export function DashboardSidebarContent({ onNavigate }) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState({});

  function isRouteActive(href) {
    const targetPath = href.split("#")[0];

    if (href === "/") {
      return pathname === "/";
    }

    if (targetPath === "/") {
      return false;
    }

    return pathname === targetPath || pathname.startsWith(`${targetPath}/`);
  }

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-5">
        <span className="grid size-9 place-items-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
          <HeartPulse className="size-5" aria-hidden="true" />
        </span>
        <div>
          <p className="font-semibold tracking-tight">Glucosebook</p>
          <p className="text-xs text-sidebar-foreground/60">Clinical workspace</p>
        </div>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5" aria-label="Primary navigation">
        {dashboardRoutes.map((group) => (
          <div key={group.title}>
            <p className="px-3 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-sidebar-foreground/45">
              {group.title}
            </p>
            <ul className="mt-2 space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = isRouteActive(item.href);
                const isExpanded = item.children ? (expandedItems[item.name] ?? isActive) : false;

                function toggleExpanded() {
                  setExpandedItems((currentItems) => ({
                    ...currentItems,
                    [item.name]: !(currentItems[item.name] ?? isActive),
                  }));
                }

                return (
                  <li key={item.name}>
                    <div className={`flex items-center rounded-lg transition-colors ${isActive ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground/72 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"}`}>
                      <Link
                        href={item.href}
                        onClick={onNavigate}
                        aria-current={isActive ? "page" : undefined}
                        className="flex min-w-0 flex-1 items-center gap-3 px-3 py-2.5 text-sm"
                      >
                        <Icon className="size-4 shrink-0" aria-hidden="true" />
                        <span className="flex-1 truncate">{item.name}</span>
                        {item.badge ? (
                          <Badge className="h-5 min-w-5 justify-center border-0 bg-sidebar-accent px-1.5 text-[0.65rem] text-sidebar-accent-foreground">
                            {item.badge}
                          </Badge>
                        ) : null}
                      </Link>
                      {item.children ? (
                        <button
                          type="button"
                          onClick={toggleExpanded}
                          aria-expanded={isExpanded}
                          aria-label={`${isExpanded ? "Collapse" : "Expand"} ${item.name} menu`}
                          className="mr-1 grid size-8 shrink-0 place-items-center rounded-md hover:bg-sidebar-accent/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
                        >
                          <ChevronDown className={`size-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} aria-hidden="true" />
                        </button>
                      ) : null}
                    </div>
                    {item.children && isExpanded ? (
                      <ul className="ml-5 mt-1 space-y-1 border-l border-sidebar-border pl-3">
                        {item.children.map((child) => {
                          const ChildIcon = child.icon;
                          const isChildActive = pathname === child.href.split("#")[0];

                          return (
                            <li key={child.name}>
                              <Link
                                href={child.href}
                                onClick={onNavigate}
                                aria-current={isChildActive ? "page" : undefined}
                                className={`flex items-center gap-2 rounded-md px-3 py-2 text-xs transition-colors ${isChildActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/62 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"}`}
                              >
                                <ChildIcon className="size-3.5" aria-hidden="true" />
                                <span>{child.name}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="m-3 rounded-xl border border-sidebar-border bg-sidebar-accent/70 p-4">
        <p className="text-sm font-medium">Clinic sync healthy</p>
        <div className="mt-2 flex items-center gap-2 text-xs text-sidebar-foreground/65">
          <span className="size-2 rounded-full bg-emerald-400" aria-hidden="true" />
          Last synced 2 minutes ago
        </div>
      </div>
    </div>
  );
}

export function DashboardSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-sidebar-border lg:block">
      <DashboardSidebarContent />
    </aside>
  );
}
