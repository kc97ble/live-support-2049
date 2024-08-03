import { z } from "zod";

export type Params$UpdateTicket = z.infer<typeof Params$UpdateTicket>;
export const Params$UpdateTicket = z.object({
  createdAt: z.number(),
  question: z.string().nullish(),
  answer: z.string().nullish(),
  published: z.boolean().nullish(),
});

export type Result$UpdateTicket = z.infer<typeof Result$UpdateTicket>;
export const Result$UpdateTicket = z.object({
  modifiedAt: z.number(),
});
