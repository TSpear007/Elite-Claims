# SurplusClaim USA launch checklist

## Implemented in this branch
- County upload intake for CSV/XLS/XLSX/PDF with state, county and official source URL.
- CSV preview/normalization utility and deterministic duplicate fingerprint.
- Upload batch data model.
- State + county + surplus-type compliance rule model.
- Verified-rule fee calculator with percentage and dollar caps.
- Waiting-period outreach gate.
- Explainable 0–100 AI triage score with compliance/risk flags.
- Claimant talk tracks and objection pivots.
- Hard do-not-contact response.
- AI Claims command center pages.
- Permanent owner plan remains independent from claimant fee rules.

## Required before real claimant outreach
1. Configure PostgreSQL DATABASE_URL and run Prisma migration/generate.
2. Add authenticated sessions and enforce roles server-side.
3. Add object storage and malware scanning for uploaded files; current endpoint validates intake but does not persist file bytes.
4. Add Excel/PDF parsers and human mapping/review. CSV preview is implemented.
5. Populate each jurisdiction rule from current official authority and have counsel/compliance mark VERIFIED. Seed examples remain COUNSEL_REVIEW intentionally.
6. Add provider integrations for identity/skip-trace only under lawful contracts and permissible-purpose rules.
7. Add outbound mail/email/SMS/phone providers, consent/suppression controls and channel-specific legal review.
8. Add e-signature/document workflow and secure claimant portal.
9. Test, deploy and configure production monitoring/backups.

Do not enable automated solicitation merely because a record was imported or received a high AI score.
