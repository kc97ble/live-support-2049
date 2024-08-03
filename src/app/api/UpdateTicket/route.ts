import { NextRequest, NextResponse } from "next/server";
import { serializeError } from "serialize-error";
import { z } from "zod";
import { Params$UpdateTicket, Result$UpdateTicket } from "./typing";
import { isAdminFingerprint, updateTicket } from "@/utils/db";

export async function POST(req: NextRequest) {
  try {
    const cookie = req.cookies.get("fingerprint");
    const fingerprint = z.string().uuid().parse(cookie?.value);
    if (!isAdminFingerprint(fingerprint)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    const body = await req.json();
    const params = Params$UpdateTicket.parse(body);
    const modifiedAt = await updateTicket(params.createdAt, {
      question: params.question,
      answer: params.answer,
      published: params.published ?? undefined,
    });
    return NextResponse.json({ modifiedAt } satisfies Result$UpdateTicket);
  } catch (error) {
    console.error(error);
    return NextResponse.json(serializeError(error), { status: 500 });
  }
}
