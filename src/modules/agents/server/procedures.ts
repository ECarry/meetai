import { db } from "@/db";
import { agent } from "@/db/schema";
import {
  baseProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/trpc/init";
import { agentsInsertSchema } from "../schemas";
import { eq } from "drizzle-orm";
import z from "zod";

export const agentsRouter = createTRPCRouter({
  getOne: baseProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const [data] = await db
        .select()
        .from(agent)
        .where(eq(agent.id, input.id));

      return data;
    }),
  getMany: baseProcedure.query(async () => {
    const data = await db.select().from(agent);

    return data;
  }),
  create: protectedProcedure
    .input(agentsInsertSchema)
    .mutation(async ({ input, ctx }) => {
      const [data] = await db
        .insert(agent)
        .values({
          ...input,
          userId: ctx.auth.user.id,
        })
        .returning();

      return data;
    }),
});
