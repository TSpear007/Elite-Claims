import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { canApproveOutreach } from "@/lib/compliance";
import { requireAdminApiKey } from "@/lib/api-auth";

export async function POST(request: NextRequest) {
  const denied = requireAdminApiKey(request); if (denied) return denied;
  const body = await request.json();
  const outreachId = String(body.outreachId ?? "");
  if (!outreachId) return NextResponse.json({ error: "outreachId is required" }, { status: 400 });

  const outreach = await db.outreach.findUnique({
    where: { id: outreachId },
    include: { claimCase: { include: { record: { include: { source: true } } } } },
  });
  if (!outreach) return NextResponse.json({ error: "Outreach not found" }, { status: 404 });

  const source = outreach.claimCase.record.source;
  const decision = canApproveOutreach({
    sourceStatus: source.complianceStatus,
    feeRuleReviewed: Boolean(source.feeRuleNotes && source.lastReviewedAt),
    contactRuleReviewed: Boolean(source.contactRuleNotes && source.lastReviewedAt),
  });
  if (!decision.allowed) return NextResponse.json({ error: decision.reason }, { status: 409 });

  const approved = await db.outreach.update({ where: { id: outreachId }, data: { status: "APPROVED", approvedAt: new Date() } });
  await db.auditLog.create({ data: { action: "OUTREACH_APPROVED", entityType: "Outreach", entityId: outreachId, metadata: { sourceId: source.id, jurisdiction: source.jurisdiction } } });
  return NextResponse.json({ id: approved.id, status: approved.status, approvedAt: approved.approvedAt });
}
