import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";

export function requireAdminApiKey(request: NextRequest) {
  const expected = process.env.ADMIN_API_KEY;
  if (!expected) {
    return NextResponse.json({ error: "ADMIN_API_KEY is not configured." }, { status: 503 });
  }
  const supplied = request.headers.get("x-admin-api-key") ?? "";
  const a = Buffer.from(supplied);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
