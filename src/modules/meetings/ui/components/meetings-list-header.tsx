"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { NewMeetingDialog } from "./new-meeting-dialog";

export const MeetingsListHeader = () => {
  const [open, setOpen] = useState(false);

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
      </div>
    </>
  );
};
