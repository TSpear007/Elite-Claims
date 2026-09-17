export const PLANS = {
  OWNER: {
    code: "OWNER",
    name: "Owner / Super Admin",
    monthlyPriceCents: 0,
    permanent: true,
    features: ["All platform modules", "Revenue dashboard", "User administration", "Compliance console", "Source registry"],
  },
  STARTER: { code: "STARTER", name: "Starter", monthlyPriceCents: 4900, permanent: false },
  PRO: { code: "PRO", name: "Professional", monthlyPriceCents: 14900, permanent: false },
  AGENCY: { code: "AGENCY", name: "Agency", monthlyPriceCents: 39900, permanent: false },
} as const;

export function isOwnerEmail(email?: string | null) {
  const configured = process.env.OWNER_EMAIL?.trim().toLowerCase();
  return Boolean(configured && email?.trim().toLowerCase() === configured);
}

export function planForIdentity(email?: string | null) {
  if (isOwnerEmail(email)) return PLANS.OWNER;
  return PLANS.STARTER;
}
