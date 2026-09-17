# Jurisdiction compliance data

SurplusClaim USA must never infer a fee cap or outreach permission from another jurisdiction. Each rule is keyed by state + county + surplus type and remains UNVERIFIED until reviewed against an official source and, where appropriate, counsel.

Required fields: statute/ordinance citation, official URL, surplus type, fee model, maximum percentage and/or dollar cap, waiting period, solicitation restrictions, licensing requirements, agreement disclosures, filing restrictions, effective date and last verification date.

## Verified-source examples to seed after legal review

- Texas tax-sale excess proceeds: Texas Tax Code §34.04. Official text states a non-attorney may not charge an owner a fee to obtain covered excess proceeds; attorney fee is capped by the statute. Do not enable a non-attorney contingency quote for this rule.
- Arizona trustee-sale excess proceeds: A.R.S. §33-812(P) requires a written acknowledged agreement, voids agreements made before the 30-day period expires, and creates a statutory reasonableness rule around fees over $2,500.
- Nevada excess proceeds: current statute provides a 10% ceiling for covered recovery agreements described by the statute.
- Florida tax-deed surplus and foreclosure surplus are separate workflows and must have separate rule records.

County-specific procedure can be stored alongside state law, but county configuration may not override controlling state/federal law.

## Safety gates

1. Imported record is DATA VERIFIED only after source validation.
2. Fee quote is disabled unless the applicable JurisdictionRule is VERIFIED.
3. Outreach is disabled during a waiting period or when rule status is not VERIFIED.
4. DO_NOT_CONTACT is a hard suppression flag.
5. Scripts must disclose private-company status and the self-claim option when applicable.
6. AI scores are triage aids, never legal determinations of entitlement or lien priority.
