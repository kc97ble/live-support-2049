import { createTicket } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { serializeError } from "serialize-error";
import { z } from "zod";
import { Params$CreateTicket, Result$CreateTicket } from "./typing";

export async function POST(req: NextRequest) {
  try {
    const cookie = req.cookies.get("fingerprint");
    const fingerprint = z.string().uuid().parse(cookie?.value);
    const body = await req.json();
    const params = Params$CreateTicket.parse(body);
    const createdAt = await createTicket({
      fingerprint,
      question: params.question,
    });
    return NextResponse.json({ createdAt } satisfies Result$CreateTicket);
  } catch (error) {
    console.error(error);
    return NextResponse.json(serializeError(error), { status: 500 });
  }
}
