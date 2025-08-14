import { NextResponse } from 'next/server'
import { createOrder } from '../../../../lib/db'

export async function POST(req){
  try{
    const body = await req.json()
    const { items, customer } = body
    const total = items.reduce((s,i)=> s + (i.price||0)*i.qty, 0)
    const order = await createOrder({ email: customer.email, name: customer.name||'', items, total, provider:'paystack' })
    const initRes = await fetch('https://api.paystack.co/transaction/initialize', {
      method:'POST',
      headers:{ 'Authorization': `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, 'Content-Type':'application/json' },
      body: JSON.stringify({
        amount: Math.round(total*100),
        email: customer.email,
        metadata: { order_id: order.id },
        callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`
      })
    })
    const data = await initRes.json()
    if(!data.status) return NextResponse.json({ error: data }, { status: 500 })
    return NextResponse.json({ authorization_url: data.data.authorization_url })
  }catch(e){
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
