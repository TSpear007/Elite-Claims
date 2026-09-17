# County upload system

Supported intake targets: CSV, XLS/XLSX and PDF. Every upload is tied to state, county/jurisdiction, agency and official source URL.

Pipeline: RECEIVE → virus/file validation → PARSE → COLUMN MAP → NORMALIZE → DEDUPLICATE → SOURCE REVIEW → IMPORT → AI TRIAGE.

Canonical fields: state, county, claimant/former owner, surplus amount, case number, parcel number, property address, sale date, claim deadline, external record ID, source URL and raw source data.

Duplicate fingerprint uses stable record characteristics so repeat county pulls can be reconciled rather than blindly creating new leads.

Current branch implements intake validation, interactive upload form, CSV preview/normalization, mapping contract and duplicate fingerprint. XLS/XLSX/PDF are accepted by intake but production parsing and persistent object storage remain deployment work.
