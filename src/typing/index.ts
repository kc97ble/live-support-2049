import { z } from "zod";

export type Ticket = z.infer<typeof Ticket>;
export const Ticket = z.object({
  fingerprint: z.string().uuid(),
  question: z.string().nullable(),
  answer: z.string().nullable(),
  published: z.boolean(),
  createdAt: z.number(), // primary key
});
