# Malten deployment

This directory is an isolated static beta application inside Elite-Claims.

## Safe beta defaults

- Training Sandbox is the default operational environment.
- No production database is connected.
- No live billing is connected.
- No email, SMS, calling, logistics, or supplier APIs are connected.
- Browser-local persistence is for training/prototype use only.

## HTTPS deployment

Use `malten/` as the deployment root for a static host such as Vercel. `index.html` is the entry point and `vercel.json` provides basic security headers. The host supplies TLS/HTTPS automatically after project deployment.

## Before production

Add authenticated user accounts, separate sandbox and production databases, server-side authorization, secrets management, audit logging, real billing in test mode first, rate limiting, backups, monitoring, privacy controls, and integration-specific compliance reviews.