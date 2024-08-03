import PageAnswer from "@/containers/PageAnswer";
import { getTicket } from "@/utils/db";
import { z } from "zod";

const Params = z.object({
  ticket: z.coerce.number(),
});

// https://nextjs.org/docs/app/api-reference/file-conventions/page
export default async function Route(ctx: { params: unknown }) {
  const params = Params.parse(ctx.params);
  const ticket = await getTicket(params.ticket);
  return <PageAnswer initialTicket={ticket} />;
}
