import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SurplusClaim USA",
  description: "Compliance-first surplus funds discovery and claims workflow platform",
};

const nav = [["/","Dashboard"],["/records","Records"],["/cases","Claims CRM"],["/sources","50-State Sources"],["/compliance","Compliance"],["/revenue","Revenue"]];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><header className="topbar"><div className="brand">SurplusClaim <span>USA</span></div><nav>{nav.map(([href,label])=><a href={href} key={href}>{label}</a>)}</nav></header>{children}<footer>SurplusClaim USA is not a government agency or law firm. Verify current jurisdiction requirements before claimant outreach or fee agreements.</footer></body></html>;
}
