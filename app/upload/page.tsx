import UploadForm from './UploadForm';
export default function UploadPage(){
 const fields=['State','County','Government source','Surplus type','File (CSV/XLSX/PDF)','Column mapping','Validation','Import'];
 return <main><h1>County List Upload</h1><p>Import public surplus lists from U.S. counties. Records remain in review until their source and jurisdiction rule are verified.</p><UploadForm/><section className="card"><h2>Upload workflow</h2><ol>{fields.map(x=><li key={x}>{x}</li>)}</ol><p><strong>Accepted pipeline:</strong> upload → parse → map columns → deduplicate → validate amounts/dates → source review → import → AI triage.</p></section><section className="card"><h2>Compliance gate</h2><p>No fee quote or claimant outreach is enabled from an imported record until the applicable state/county/surplus-type rule is VERIFIED.</p></section></main>
}
