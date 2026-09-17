export type Rule = {
  status: 'UNVERIFIED'|'COUNSEL_REVIEW'|'VERIFIED'|'RESTRICTED'|'BLOCKED';
  maxFeePercent?: number|null;
  maxFeeCents?: bigint|null;
  waitingPeriodDays?: number|null;
  feeModel?: string|null;
};

export function calculatePermittedFee(rule: Rule, surplusCents: bigint, requestedPercent: number) {
  if (rule.status !== 'VERIFIED') return { allowed: false, reason: 'Jurisdiction rule is not verified', feeCents: 0n };
  const pct = Math.min(Math.max(requestedPercent, 0), rule.maxFeePercent ?? requestedPercent);
  let fee = BigInt(Math.floor(Number(surplusCents) * pct / 100));
  if (rule.maxFeeCents != null && fee > rule.maxFeeCents) fee = rule.maxFeeCents;
  return { allowed: true, feeCents: fee, percent: pct, model: rule.feeModel ?? 'CONTINGENCY' };
}

export function canContact(rule: Rule, saleDate?: Date|null, now = new Date()) {
  if (rule.status !== 'VERIFIED') return { allowed: false, reason: 'Compliance verification required' };
  if (!saleDate || !rule.waitingPeriodDays) return { allowed: true };
  const eligibleAt = new Date(saleDate);
  eligibleAt.setDate(eligibleAt.getDate() + rule.waitingPeriodDays);
  return now >= eligibleAt ? { allowed: true, eligibleAt } : { allowed: false, reason: 'Waiting period active', eligibleAt };
}
