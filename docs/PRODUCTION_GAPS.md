# Production integration gaps

This branch materially builds the product workflow but is not yet a hosted production service. Before handling real claimant data or automated outreach, complete: database migration and persistence wiring; authenticated role enforcement; secure object storage and malware scanning; XLSX/PDF extraction; encryption/secrets; backups; e-signature; identity/skip-trace vendor contracts; outbound provider integrations; consent/suppression enforcement; tests/CI; hosting/domain; and verified legal rules for the jurisdictions you activate.

Do not describe placeholder API contracts that return normalized payloads as durable database writes until persistence is wired.
