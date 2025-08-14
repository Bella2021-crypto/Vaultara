import { NextResponse } from 'next/server'
import { markPaid } from '../../../../lib/db'

export async function POST(req){
  const event = await req.json()
  try{
    if(event?.event === 'charge.success'){
      const orderId = event?.data?.metadata?.order_id
      if(orderId) await markPaid(orderId, event.data)
    }
    return NextResponse.json({ received:true })
  }catch(e){
    return NextResponse.json({ error:String(e) }, { status:500 })
  }
}
