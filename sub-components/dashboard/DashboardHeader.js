"use client";

import { useState } from "react";
import { Bell, Building2, Menu } from "lucide-react";
import { ModeToggle } from "@/widgets/mode-toggle";
import { Avatar, AvatarFallback } from "@/widgets/ui/avatar";
import { Badge } from "@/widgets/ui/badge";
import { Button } from "@/widgets/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/widgets/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/widgets/ui/sheet";
import { DashboardSidebarContent } from "./DashboardSidebar";

export function DashboardHeader({ clinic }) {
  const [mobileNavigationOpen, setMobileNavigationOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b bg-background/92 px-4 backdrop-blur md:px-6 lg:ml-64">
      <Sheet open={mobileNavigationOpen} onOpenChange={setMobileNavigationOpen}>
        <SheetTrigger asChild>
          <Button className="lg:hidden" size="icon" variant="outline" aria-label="Open navigation">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 border-0 p-0">
          <SheetTitle className="sr-only">Glucosebook navigation</SheetTitle>
          <DashboardSidebarContent onNavigate={() => setMobileNavigationOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="hidden min-w-0 items-center gap-3 md:flex">
        <span className="grid size-9 place-items-center rounded-lg bg-muted text-muted-foreground"><Building2 className="size-4" aria-hidden="true" /></span>
        <div className="min-w-0"><p className="truncate text-sm font-medium">{clinic.name}</p><p className="text-xs text-muted-foreground">Live clinical workspace</p></div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="outline" className="relative" aria-label="Open notifications">
              <Bell />
              <span className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-destructive text-[0.6rem] font-bold text-white">3</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              Notifications <Badge variant="secondary">3 new</Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="items-start py-3">
              <span className="mt-1 size-2 shrink-0 rounded-full bg-destructive" />
              <span><strong className="block text-sm">Severe low detected</strong><span className="text-xs text-muted-foreground">Rohan Mehta · 11 min ago</span></span>
            </DropdownMenuItem>
            <DropdownMenuItem className="items-start py-3">
              <span className="mt-1 size-2 shrink-0 rounded-full bg-amber-500" />
              <span><strong className="block text-sm">Sustained high glucose</strong><span className="text-xs text-muted-foreground">Ananya Iyer · 18 min ago</span></span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="hidden h-8 w-px bg-border sm:block" />
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium leading-tight">{clinic.clinician}</p>
          <p className="text-xs text-muted-foreground">Endocrinology</p>
        </div>
        <Avatar className="size-9">
          <AvatarFallback className="bg-primary/15 text-primary">{clinic.initials}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
