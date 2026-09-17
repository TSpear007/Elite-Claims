import {NextRequest,NextResponse} from 'next/server';import {scoreClaim} from '../../../lib/ai-claims-score';
export async function POST(req:NextRequest){const b=await req.json();try{return NextResponse.json(scoreClaim({...b,amountCents:BigInt(b.amountCents)}));}catch{return NextResponse.json({error:'Invalid claim signals'},{status:400});}}
