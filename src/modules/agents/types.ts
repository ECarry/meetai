import { inferRouterOutputs } from "@trpc/server";
import type { appRouter } from "@/trpc/routers/_app";

export type AgentGetOne = inferRouterOutputs<
  typeof appRouter
>["agents"]["getOne"];
export type AgentGetMany = inferRouterOutputs<
  typeof appRouter
>["agents"]["getMany"]["items"];
