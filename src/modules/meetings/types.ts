import { inferRouterOutputs } from "@trpc/server";
import type { appRouter } from "@/trpc/routers/_app";

export type MeetingGetOne = inferRouterOutputs<
  typeof appRouter
>["meetings"]["getOne"];

export type MeetingGetMany = inferRouterOutputs<
  typeof appRouter
>["meetings"]["getMany"]["items"];
export enum MeetingStatus {
  Upcoming = "upcoming",
  Active = "active",
  Completed = "completed",
  Processing = "processing",
  Cancelled = "cancelled",
}
