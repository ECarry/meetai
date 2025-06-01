"use client";

import { Button } from "@/components/ui/button";
import { PanelLeft, PanelLeftClose, Search } from "lucide-react";
import React from "react";
import { useSidebar } from "@/components/ui/sidebar";

export const DashboardNavbar = () => {
  const { toggleSidebar, state, isMobile } = useSidebar();

  return (
    <div className="flex px-4 gap-x-2 items-center py-3 border-b bg-background">
      <Button className="size-9" variant="outline" onClick={toggleSidebar}>
        {state === "collapsed" || isMobile ? (
          <PanelLeft className="size-4" />
        ) : (
          <PanelLeftClose className="size-4" />
        )}
      </Button>

      <Button
        className="h-9 w-[240px] justify-start font-normal text-muted-foreground hover:text-muted-foreground"
        variant="outline"
        size="sm"
        onClick={() => {}}
      >
        <Search />

        <kbd className="ml-auto pointer-events-none inline-flex items-center gap-1 select-none rounded border px-1.5 font-mono bg-muted text-[10px] text-muted-foreground">
          <span className="text-xs">&#8984;</span>K
        </kbd>
      </Button>
    </div>
  );
};
