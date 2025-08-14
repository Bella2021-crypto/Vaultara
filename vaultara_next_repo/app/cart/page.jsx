'use client'
import { useCartStore } from '../../lib/store'
import { useState } from 'react'

export default function CartPage(){
  const { items, inc, dec, remove, clear } = useCartStore()
  const [email,setEmail] = useState('')
  const [name,setName] = useState('')
  const total = items.reduce((s,i)=> s + i.price * i.qty, 0)

  const checkout = async (provider) => {
    if(!email) return alert('Enter email')
    const res = await fetch(`/api/${provider}/initialize`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ items, customer:{ email, name } }) })
    const data = await res.json()
    if(provider==='paystack'){
      window.location.href = data.authorization_url
    }else{
      const link = data?.data?.link || data?.link || data?.payment_link
      window.location.href = link
    }
  }

  if(items.length===0) return <div className="bg-white p-6 rounded-xl shadow">Your cart is empty.</div>
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 bg-white rounded-xl p-4 shadow">
        {items.map(i=> (
          <div key={i.id} className="flex justify-between items-center border-b py-3">
            <div>
              <div className="font-medium">{i.name}</div>
              <div className="text-sm text-gray-500">₦{i.price.toLocaleString()}</div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={()=>dec(i.id)} className="px-2 py-1 border rounded">-</button>
              <div>{i.qty}</div>
              <button onClick={()=>inc(i.id)} className="px-2 py-1 border rounded">+</button>
              <button onClick={()=>remove(i.id)} className="ml-3 text-red-600">Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl p-4 shadow">
        <div className="font-semibold mb-2">Checkout</div>
        <input placeholder="Name (optional)" value={name} onChange={e=>setName(e.target.value)} className="w-full border rounded p-2 mb-2"/>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full border rounded p-2 mb-4"/>
        <div className="flex justify-between mb-4"><div>Total</div><div className="font-bold">₦{total.toLocaleString()}</div></div>
        <button onClick={()=>checkout('paystack')} className="w-full mb-2 px-4 py-2 bg-emerald-600 text-white rounded-lg">Pay with Paystack</button>
        <button onClick={()=>checkout('flutterwave')} className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg">Pay with Flutterwave</button>
      </div>
    </div>
  )
}
