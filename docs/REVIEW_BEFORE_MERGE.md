# Review before merge

This branch changes the Prisma schema and adds API/UI modules. Before merging: run npm install/build/typecheck; run Prisma format/validate/generate; review seed script TypeScript/JSON configuration; add migration; test all API inputs; wire authenticated persistence; confirm no secrets; then open/merge the PR. Production deployment follows separately.
