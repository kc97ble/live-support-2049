import { getTickets, isAdminFingerprint } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { serializeError } from "serialize-error";
import { z } from "zod";
import { Result$GetTickets } from "./typing";

export async function GET(req: NextRequest) {
  try {
    const cookie = req.cookies.get("fingerprint");
    const fingerprint = z.string().uuid().safeParse(cookie?.value).data;
    const tickets = await getTickets({ fingerprint });

    return NextResponse.json({
      tickets: tickets.map((t) =>
        (fingerprint && isAdminFingerprint(fingerprint)) ||
        fingerprint === t.fingerprint
          ? t
          : { ...t, fingerprint: undefined }
      ),
    } satisfies Result$GetTickets);
  } catch (error) {
    console.error(error);
    return NextResponse.json(serializeError(error), { status: 500 });
  }
}
