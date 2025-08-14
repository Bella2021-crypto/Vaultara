import { NextResponse } from 'next/server'
import { createOrder } from '../../../../lib/db'

export async function POST(req){
  try{
    const body = await req.json()
    const { items, customer } = body
    const total = items.reduce((s,i)=> s + (i.price||0)*i.qty, 0)
    const order = await createOrder({ email: customer.email, name: customer.name||'', items, total, provider:'flutterwave' })
    const payload = {
      tx_ref: order.id,
      amount: total,
      currency: 'NGN',
      redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
      customer: { email: customer.email, name: customer.name||'' },
      customizations: { title: 'Vaultara Order', description: 'Purchase from Vaultara' }
    }
    const initRes = await fetch('https://api.flutterwave.com/v3/payments', {
      method:'POST',
      headers:{ 'Authorization': `Bearer ${process.env.FLW_SECRET_KEY}`, 'Content-Type':'application/json' },
      body: JSON.stringify(payload)
    })
    const data = await initRes.json()
    if(data.status!=='success') return NextResponse.json({ error: data }, { status: 500 })
    return NextResponse.json({ data })
  }catch(e){
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
