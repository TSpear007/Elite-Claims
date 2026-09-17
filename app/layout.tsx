import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SurplusClaim USA",
  description: "Compliance-first surplus funds discovery and claims workflow platform",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="topbar">
          <div className="brand">SurplusClaim <span>USA</span></div>
          <nav><a href="/">Dashboard</a><a href="/sources">50-State Sources</a><a href="/compliance">Compliance</a></nav>
        </header>
        {children}
      </body>
    </html>
  );
}
