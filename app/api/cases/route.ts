import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdminApiKey } from "@/lib/api-auth";

const serialize = (value: unknown) => JSON.parse(JSON.stringify(value, (_, v) => typeof v === "bigint" ? v.toString() : v));

export async function GET(request: NextRequest) {
  const denied = requireAdminApiKey(request); if (denied) return denied;
  const cases = await db.claimCase.findMany({ include: { record: true, outreach: true }, orderBy: { updatedAt: "desc" }, take: 100 });
  return NextResponse.json(serialize(cases));
}

export async function POST(request: NextRequest) {
  const denied = requireAdminApiKey(request); if (denied) return denied;
  try {
    const body = await request.json();
    const recordId = String(body.recordId ?? "");
    if (!recordId) return NextResponse.json({ error: "recordId is required" }, { status: 400 });
    const claimCase = await db.claimCase.create({ data: {
      recordId,
      claimantName: body.claimantName ? String(body.claimantName) : undefined,
      claimantEmail: body.claimantEmail ? String(body.claimantEmail) : undefined,
      claimantPhone: body.claimantPhone ? String(body.claimantPhone) : undefined,
      notes: body.notes ? String(body.notes) : undefined,
      status: "NEW",
    }});
    await db.auditLog.create({ data: { action: "CLAIM_CASE_CREATED", entityType: "ClaimCase", entityId: claimCase.id } });
    return NextResponse.json(serialize(claimCase), { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to create case" }, { status: 400 });
  }
}
