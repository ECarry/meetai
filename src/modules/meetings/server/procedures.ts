import { db } from "@/db";
import { meeting } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { and, count, desc, eq, ilike } from "drizzle-orm";
import z from "zod";
import { TRPCError } from "@trpc/server";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  MIN_PAGE_SIZE,
} from "@/constants";

export const meetingsRouter = createTRPCRouter({
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const [data] = await db
        .select()
        .from(meeting)
        .where(
          and(eq(meeting.id, input.id), eq(meeting.userId, ctx.auth.user.id))
        );

      if (!data) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Meeting not found",
        });
      }

      return data;
    }),
  getMany: protectedProcedure
    .input(
      z.object({
        page: z.number().default(DEFAULT_PAGE),
        pageSize: z
          .number()
          .min(MIN_PAGE_SIZE)
          .max(MAX_PAGE_SIZE)
          .default(DEFAULT_PAGE_SIZE),
        search: z.string().nullish(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { page, pageSize, search } = input;

      const data = await db
        .select()
        .from(meeting)
        .where(
          and(
            eq(meeting.userId, ctx.auth.user.id),
            search ? ilike(meeting.name, `%${search}%`) : undefined
          )
        )
        .orderBy(desc(meeting.createdAt), desc(meeting.id))
        .limit(pageSize)
        .offset((page - 1) * pageSize);

      const [total] = await db
        .select({
          count: count(),
        })
        .from(meeting)
        .where(
          and(
            eq(meeting.userId, ctx.auth.user.id),
            search ? ilike(meeting.name, `%${search}%`) : undefined
          )
        );

      const totalPages = Math.ceil(total.count / pageSize);

      return {
        items: data,
        total: total.count,
        totalPages,
      };
    }),
});
