# SurplusClaim USA — Platform Requirements V2

## County list upload
Accept CSV first, with adapters for XLSX/PDF/HTML/API sources. Every import stores state, county/jurisdiction, surplus type, case/parcel number, claimant/former owner, property address, amount, sale date, deadline, source URL, source document identifier, import batch, and source timestamp. Imports must preview, validate, normalize, deduplicate, and require operator approval before committing.

## Compliance and fee engine
Rules are versioned by state + county/jurisdiction + surplus type. Each rule stores official primary source citation/URL, effective dates, claim deadline, who may file, assignment rules, licensing/attorney requirements, waiting periods, contact restrictions, mandatory disclosures, fee model, fee cap, and verification status.

No fee may be quoted and no outbound solicitation may be enabled unless the applicable rule is VERIFIED and current. Unknown/conflicting rules fail closed to HUMAN_REVIEW.

Fee quotes must show: surplus amount, permitted fee model, configured service rate, legal cap if any, actual quoted fee, claimant net estimate, and rule/source version used. The configured rate may never exceed a verified legal cap.

## Claimant conversation assistant
The case screen provides talking points selected by jurisdiction, surplus type, channel, contact stage, and objection code. Scripts must identify the company as a private recovery service, never imply government affiliation, disclose the claimant's self-claim option when required, and never guarantee recovery.

Supported objection paths include: wants proof, can claim myself, fee concern, needs time, already filed, has attorney, wrong person, deceased owner/heir, not interested, and do-not-contact.

A pivot is a single respectful clarification or alternative next step, not repeated pressure. A clear do-not-contact request immediately creates a suppression record and disables further outreach through covered channels.

## Auditability
Log rule version, fee quote, script/talk-track version, operator, contact outcome, consent/opt-out, upload source, and timestamps for every case action.