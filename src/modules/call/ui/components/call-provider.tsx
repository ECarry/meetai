"use client";

import { authClient } from "@/modules/auth/lib/auth-client";
import { Loader } from "lucide-react";

interface Props {
  meetingId: string;
  meetingName: string;
}

export const CallProvider = ({ meetingId, meetingName }: Props) => {
  const { data, isPending } = authClient.useSession();

  if (!data || isPending) {
    return (
      <div className="flex h-screen items-center justify-center bg-radial from-sidebar-accent to-sidebar">
        <Loader className="animate-spin size-6 text-white" />
      </div>
    );
  }

  return (
    <div>
      {meetingName} {meetingId}
    </div>
  );
};
