import { NextResponse } from 'next/server'
import { markPaid } from '../../../../lib/db'

export async function POST(req){
  try{
    const event = await req.json()
    const tx = event?.data || event
    const tx_ref = tx?.tx_ref || tx?.data?.tx_ref
    const status = tx?.status || tx?.data?.status
    if(status==='successful' && tx_ref){
      await markPaid(tx_ref, tx)
    }
    return NextResponse.json({ received:true })
  }catch(e){
    return NextResponse.json({ error:String(e) }, { status:500 })
  }
}
