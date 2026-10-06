# SurplusClaim USA

SurplusClaim USA is a compliance-first surplus-funds discovery and claims workflow platform for public surplus records across the United States.

## Repository projects

### SurplusClaim USA

The primary claims platform in the repository root.

### Malten

Malten is maintained as a separate application category under [`/malten`](./malten/). It contains the North American Business Ecosystem dashboard, Training Sandbox, and future Malten application/deployment files. Malten production and training data must remain isolated from SurplusClaim USA.

## MVP

- 50-state source registry and ingestion framework
- Surplus record normalization and deduplication
- Claimant/case CRM
- Compliance review gates before outreach
- Outreach queue with approval status
- Claim pipeline and fee tracking
- Subscription/plan model
- Revenue dashboard
- Immutable-style audit events
- Permanent $0 `OWNER_SUPER_ADMIN` tier

## Important compliance design

The Owner/Super Admin tier is permanently free, but it does **not** bypass state-specific compliance controls. Automated claimant solicitation remains disabled until the applicable jurisdiction/source rule has been reviewed and approved.

## Stack

Next.js + TypeScript + Prisma + PostgreSQL. The first commit establishes a production-oriented MVP structure; external data connectors, authentication provider, payments, email/SMS, and hosting credentials are configured through environment variables.

## Local setup

```bash
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

Open http://localhost:3000.

## Owner bootstrap

Set `OWNER_EMAIL` in the environment. The application treats that identity as `OWNER_SUPER_ADMIN` and the plan price is hard-coded to zero in the plan catalog. Production authentication must verify the email before assigning this role.

## Status

SurplusClaim USA and Malten are under active development in separate project areas of this repository.
