"use client";

import { useState } from "react";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { MeetingViewHeader } from "../components/meeting-view-header";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useConfirm } from "@/hooks/use-confirm";
import { UpdateMeetingDialog } from "../components/update-meeting-dialog";
import { UpcomingState } from "@/modules/meetings/ui/components/upcoming-state";
import { ActiveState } from "@/modules/meetings/ui/components/active-state";
import { CancelledState } from "@/modules/meetings/ui/components/cancelled-state";
import { ProcessingState } from "@/modules/meetings/ui/components/processing-state";

interface Props {
  meetingId: string;
}

export const MeetingView = ({ meetingId }: Props) => {
  const [UpdateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false);

  const router = useRouter();
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({
      id: meetingId,
    })
  );

  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Remove Meeting",
    "Are you sure you want to remove this meeting?"
  );

  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
        router.push("/meetings");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const handleRemove = async () => {
    const ok = await confirmRemove();
    if (!ok) return;

    await removeMeeting.mutateAsync({ id: meetingId });
  };

  const isActive = data.status === "active";
  const isUpcoming = data.status === "upcoming";
  const isCompleted = data.status === "completed";
  const isProcessing = data.status === "processing";
  const isCancelled = data.status === "cancelled";

  return (
    <>
      <RemoveConfirmation />
      <UpdateMeetingDialog
        open={UpdateMeetingDialogOpen}
        onOpenChange={setUpdateMeetingDialogOpen}
        initialValues={data}
      />
      <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <MeetingViewHeader
          meetingName={data.name}
          onEdit={() => {
            setUpdateMeetingDialogOpen(true);
          }}
          onRemove={handleRemove}
        />
        {isCancelled && <CancelledState />}
        {isCompleted && <div>Meeting Completed</div>}
        {isProcessing && <ProcessingState />}
        {isActive && <ActiveState meetingId={meetingId} />}
        {isUpcoming && (
          <UpcomingState
            meetingId={meetingId}
            onCancel={() => {}}
            isCancelling={false}
          />
        )}
      </div>
    </>
  );
};

export const MeetingViewLoading = () => {
  return (
    <LoadingState
      title="Loading Meeting"
      description="This may take a few seconds"
    />
  );
};

export const MeetingViewError = () => {
  return (
    <ErrorState
      title="Error Loading Meeting"
      description="Please try again later"
    />
  );
};
