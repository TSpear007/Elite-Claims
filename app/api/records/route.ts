import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { normalizeRecord } from "@/lib/ingestion";
import { requireAdminApiKey } from "@/lib/api-auth";

const serialize = (value: unknown) => JSON.parse(JSON.stringify(value, (_, v) => typeof v === "bigint" ? v.toString() : v));

export async function GET(request: NextRequest) {
  const denied = requireAdminApiKey(request); if (denied) return denied;
  const records = await db.surplusRecord.findMany({ include: { source: true }, orderBy: { discoveredAt: "desc" }, take: 100 });
  return NextResponse.json(serialize(records));
}

export async function POST(request: NextRequest) {
  const denied = requireAdminApiKey(request); if (denied) return denied;
  try {
    const body = await request.json();
    const sourceId = String(body.sourceId ?? "");
    if (!sourceId) return NextResponse.json({ error: "sourceId is required" }, { status: 400 });
    const normalized = normalizeRecord(body);
    const record = await db.surplusRecord.upsert({
      where: { fingerprint: normalized.fingerprint },
      update: { ...normalized, rawData: body },
      create: { sourceId, ...normalized, rawData: body },
    });
    await db.auditLog.create({ data: { action: "SURPLUS_RECORD_UPSERT", entityType: "SurplusRecord", entityId: record.id } });
    return NextResponse.json(serialize(record), { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid record" }, { status: 400 });
  }
}
