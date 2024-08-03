import { Ticket } from "@/typing";
import { z } from "zod";

export type Result$GetTickets = z.infer<typeof Result$GetTickets>;
export const Result$GetTickets = z.object({
  tickets: Ticket.extend({ fingerprint: z.string().nullish() }).array(),
});
