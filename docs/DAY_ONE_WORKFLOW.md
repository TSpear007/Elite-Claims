# Day-one operator workflow

1. Open `/ai-claims`.
2. Register the county/agency source and retain its official URL.
3. Open `/upload` and upload the public list. CSV can be previewed/mapped now; Excel/PDF are accepted into review but require parser/storage wiring before automated import.
4. Review normalized records and duplicate fingerprints.
5. Open `/rules`; enter controlling state law and county procedure for the specific surplus type. Leave COUNSEL_REVIEW until verified.
6. Run AI triage only after source review. High scores mean research priority, not entitlement.
7. Verify ownership, liens, priority, heirs and deadline.
8. Only after the jurisdiction rule is VERIFIED, use the fee quote/contact eligibility gates.
9. Use `/scripts` during claimant conversations. If a claimant requests no contact, suppress immediately.
10. Move engaged cases through document preparation, filing, recovery and revenue tracking.

Production outreach requires authentication, persistent DB migrations, secure file storage, channel providers and completed jurisdiction verification.
