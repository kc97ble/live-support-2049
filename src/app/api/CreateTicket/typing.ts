import { z } from "zod";

export type Params$CreateTicket = z.infer<typeof Params$CreateTicket>;
export const Params$CreateTicket = z.object({
  question: z.string(),
});

export type Result$CreateTicket = z.infer<typeof Result$CreateTicket>;
export const Result$CreateTicket = z.object({
  createdAt: z.number(),
});
