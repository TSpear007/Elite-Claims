import crypto from 'node:crypto';

export type CountyRow = Record<string, string|number|null|undefined>;
export type Mapping = { state:string; county?:string; claimant?:string; amount:string; caseNumber?:string; parcelNumber?:string; address?:string; saleDate?:string; deadline?:string; externalId?:string };

const value=(r:CountyRow,k?:string)=>k ? String(r[k] ?? '').trim() : '';
const cents=(v:string)=>BigInt(Math.round(Number(v.replace(/[$,\s]/g,'')) * 100));
const date=(v:string)=>v ? new Date(v) : null;

export function normalizeCountyRow(row: CountyRow, m: Mapping) {
  const stateCode=value(row,m.state).toUpperCase();
  const county=value(row,m.county);
  const claimantName=value(row,m.claimant);
  const caseNumber=value(row,m.caseNumber);
  const parcelNumber=value(row,m.parcelNumber);
  const propertyAddress=value(row,m.address);
  const amountCents=cents(value(row,m.amount));
  if (!stateCode || amountCents <= 0n) throw new Error('State and positive surplus amount are required');
  const fingerprint=crypto.createHash('sha256').update([stateCode,county,caseNumber,parcelNumber,claimantName,amountCents.toString()].join('|').toLowerCase()).digest('hex');
  return { externalRecordId:value(row,m.externalId)||null,stateCode,county:county||null,claimantName:claimantName||null,propertyAddress:propertyAddress||null,caseNumber:caseNumber||null,parcelNumber:parcelNumber||null,amountCents,saleDate:date(value(row,m.saleDate)),deadlineDate:date(value(row,m.deadline)),rawData:row,fingerprint };
}
