"use client";

import { Button } from "@/components/ui/button";
import { CircleXIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { NewMeetingDialog } from "./new-meeting-dialog";
import { MeetingsSearchFilter } from "./meetings-search-filter";
import { StatusFilters } from "./status-filters";
import { AgentIdFilter } from "./agent-id-filter";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export const MeetingsListHeader = () => {
  const [filters, setFilters] = useMeetingsFilters();
  const [open, setOpen] = useState(false);

  const isAnyFilterModified =
    !!filters.search || !!filters.agentId || !!filters.status;

  const clearFilters = () => {
    setFilters({
      search: "",
      agentId: "",
      status: null,
      page: 1,
    });
  };

  return (
    <>
      <NewMeetingDialog open={open} onOpenChange={setOpen} />
      <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl">Meetings</h1>
          <Button onClick={() => setOpen(true)}>
            <PlusIcon />
            New Meeting
          </Button>
        </div>
        <ScrollArea>
          <div className="flex items-center gap-x-2 p-1">
            <MeetingsSearchFilter />
            <StatusFilters />
            <AgentIdFilter />
            {isAnyFilterModified && (
              <Button variant="outline" onClick={clearFilters}>
                <CircleXIcon className="size-4" />
                Clear
              </Button>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
};
