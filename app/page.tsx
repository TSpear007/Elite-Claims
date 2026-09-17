const modules = [
  ["Surplus Records", "Ingest, normalize, deduplicate and search public surplus records."],
  ["Claimant CRM", "Research claimant matches, contacts, notes and case ownership."],
  ["Compliance Console", "Review state fee/contact rules before any outreach is approved."],
  ["Outreach Queue", "Draft and approve email/SMS/mail outreach with compliance gates."],
  ["Claims Pipeline", "Track research through filing, recovery, payment and closure."],
  ["Revenue", "Track expected fees, recovered funds and platform subscription revenue."],
  ["50-State Registry", "Maintain official source inventory and ingestion status by jurisdiction."],
  ["Audit Log", "Record sensitive actions and workflow changes for accountability."],
  ["Admin", "Manage roles, plans, limits and the permanent Owner/Super Admin tier."],
];

export default function Dashboard() {
  return <main>
    <div className="eyebrow">Owner Console · MVP Foundation</div>
    <h1>SurplusClaim USA</h1>
    <p className="muted">A compliance-first operating system for discovering surplus funds, researching potential claimants and managing claims across the United States.</p>
    <div className="grid">
      <div className="card"><span className="muted">States registered</span><div className="metric">50</div></div>
      <div className="card"><span className="muted">Owner plan</span><div className="metric gold">$0</div><span className="badge">Permanent</span></div>
      <div className="card"><span className="muted">Outreach default</span><div className="metric">Locked</div><span className="badge">Compliance gate</span></div>
      <div className="card"><span className="muted">Platform stage</span><div className="metric">MVP</div></div>
    </div>
    <div className="notice"><strong>Owner access never expires and is never billed.</strong> Owner privileges do not bypass state-specific fee, solicitation or claimant-contact compliance review.</div>
    <section className="panel"><h2>Platform modules</h2><div className="modules">{modules.map(([name,desc])=><div className="module" key={name}><strong>{name}</strong><span className="muted">{desc}</span></div>)}</div></section>
  </main>;
}
