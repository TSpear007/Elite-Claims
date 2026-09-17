export type ClaimSignals={amountCents:bigint;sourceVerified:boolean;identityConfidence:number;lienRisk:number;daysToDeadline?:number|null;ruleVerified:boolean};
export function scoreClaim(s:ClaimSignals){
 let score=0; const reasons:string[]=[]; const flags:string[]=[];
 if(s.sourceVerified){score+=20;reasons.push('Official source verified')}else flags.push('SOURCE_REVIEW');
 score+=Math.round(Math.max(0,Math.min(1,s.identityConfidence))*25);
 score+=Math.round((1-Math.max(0,Math.min(1,s.lienRisk)))*25);
 if(s.amountCents>=5000000n){score+=15;reasons.push('High surplus amount')}else if(s.amountCents>=1000000n)score+=10;else score+=5;
 if(s.daysToDeadline!=null&&s.daysToDeadline<30){score+=10;flags.push('DEADLINE_SOON')}else score+=5;
 if(s.ruleVerified)score+=10;else flags.push('COMPLIANCE_REVIEW');
 score=Math.max(0,Math.min(100,score));
 return {score,priority:score>=80?'HIGH':score>=60?'MEDIUM':'REVIEW',reasons,flags,notice:'Triage only; not a legal determination of entitlement or lien priority.'};
}
