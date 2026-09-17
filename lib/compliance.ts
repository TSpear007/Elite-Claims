export type ComplianceDecision = {
  allowed: boolean;
  reason: string;
};

export function canApproveOutreach(input: {
  sourceStatus: "UNREVIEWED" | "REVIEW_REQUIRED" | "APPROVED" | "RESTRICTED" | "BLOCKED";
  feeRuleReviewed: boolean;
  contactRuleReviewed: boolean;
}): ComplianceDecision {
  if (input.sourceStatus === "BLOCKED") return { allowed: false, reason: "Jurisdiction/source is blocked." };
  if (input.sourceStatus !== "APPROVED") return { allowed: false, reason: "Source requires compliance approval." };
  if (!input.feeRuleReviewed) return { allowed: false, reason: "Applicable fee rule has not been reviewed." };
  if (!input.contactRuleReviewed) return { allowed: false, reason: "Applicable claimant-contact rule has not been reviewed." };
  return { allowed: true, reason: "Compliance prerequisites satisfied." };
}

export function ownerCannotBypassCompliance() {
  return true;
}
