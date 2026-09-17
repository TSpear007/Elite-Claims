import { NextResponse } from "next/server";
export async function GET(){return NextResponse.json({ok:true,service:"SurplusClaim USA",version:"0.1.0",outreachDefault:"compliance-locked",timestamp:new Date().toISOString()})}
