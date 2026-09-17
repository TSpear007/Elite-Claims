import { NextRequest, NextResponse } from 'next/server';
const ALLOWED=['text/csv','application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','application/pdf'];
export async function POST(req:NextRequest){
 const form=await req.formData(); const file=form.get('file'); const state=String(form.get('state')||'').toUpperCase(); const county=String(form.get('county')||''); const sourceUrl=String(form.get('sourceUrl')||'');
 if(!(file instanceof File)||!state||!county||!sourceUrl)return NextResponse.json({error:'file, state, county and official source URL are required'},{status:400});
 if(!ALLOWED.includes(file.type))return NextResponse.json({error:'Unsupported file type'},{status:415});
 if(file.size>25*1024*1024)return NextResponse.json({error:'File exceeds 25 MB limit'},{status:413});
 return NextResponse.json({status:'RECEIVED',fileName:file.name,state,county,sourceUrl,next:'Store file, parse content, map columns and create UploadBatch. Records must remain REVIEW_REQUIRED until source/compliance verification.'},{status:202});
}
