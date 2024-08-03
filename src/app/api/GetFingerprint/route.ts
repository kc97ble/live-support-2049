import { NextRequest, NextResponse } from "next/server";
import * as uuid from "uuid";
import { Result$GetFingerprint } from "./typing";
import { isAdminFingerprint } from "@/utils/db";

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get("fingerprint");
  if (cookie?.value) {
    return NextResponse.json({
      fingerprint: cookie.value,
      isAdmin: isAdminFingerprint(cookie.value),
    } satisfies Result$GetFingerprint);
  } else {
    const fingerprint = uuid.v4();
    const response = NextResponse.json({
      fingerprint,
      isAdmin: isAdminFingerprint(fingerprint),
    } satisfies Result$GetFingerprint);
    response.cookies.set("fingerprint", fingerprint, {
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });

    return response;
  }
}
