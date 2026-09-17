import { createHash } from "crypto";
import { z } from "zod";

export const IncomingSurplusRecord = z.object({
  stateCode: z.string().length(2).transform(v => v.toUpperCase()),
  county: z.string().optional(),
  claimantName: z.string().optional(),
  propertyAddress: z.string().optional(),
  caseNumber: z.string().optional(),
  amountCents: z.coerce.bigint().nonnegative(),
  saleDate: z.coerce.date().optional(),
  deadlineDate: z.coerce.date().optional(),
  externalRecordId: z.string().optional(),
});

export type IncomingRecord = z.infer<typeof IncomingSurplusRecord>;

function clean(value?: string){return value?.trim().replace(/\s+/g," ") || undefined}

export function normalizeRecord(input: unknown){
  const parsed=IncomingSurplusRecord.parse(input);
  const normalized={...parsed,county:clean(parsed.county),claimantName:clean(parsed.claimantName),propertyAddress:clean(parsed.propertyAddress),caseNumber:clean(parsed.caseNumber)};
  const key=[normalized.stateCode,normalized.county,normalized.caseNumber,normalized.claimantName,normalized.propertyAddress,normalized.amountCents.toString()].join("|").toLowerCase();
  return {...normalized,fingerprint:createHash("sha256").update(key).digest("hex")};
}
