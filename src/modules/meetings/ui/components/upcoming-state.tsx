import { BanIcon, VideoIcon } from "lucide-react";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  meetingId: string;
  onCancel: () => void;
  isCancelling: boolean;
}

export const UpcomingState = ({ meetingId, onCancel, isCancelling }: Props) => {
  return (
    <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState
        title="Upcoming Meeting"
        description="This meeting is not scheduled yet"
        image="/upcoming.svg"
      />

      <div className="flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2">
        <Button
          variant="secondary"
          className="w-full lg:w-auto"
          onClick={onCancel}
          disabled={isCancelling}
        >
          <BanIcon />
          Cancel Meeting
        </Button>

        <Button disabled={isCancelling} className="w-full lg:w-auto" asChild>
          <Link href={`/call/${meetingId}`}>
            <VideoIcon />
            Start Meeting
          </Link>
        </Button>
      </div>
    </div>
  );
};
