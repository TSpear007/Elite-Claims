# Architecture

Next.js UI/API → PostgreSQL/Prisma → source/import pipeline → AI triage → compliance engine → case CRM → claimant conversation workflow → documents/claim → revenue/audit.

Primary entities: User, StateSource, UploadBatch, SurplusRecord, JurisdictionRule, ClaimCase, Outreach, Conversation, TalkTrack and AuditLog.

Compliance is a hard service boundary: scoring cannot activate outreach; owner privileges cannot override legal gates; fee quotes require VERIFIED rules; do-not-contact suppresses all channels.
