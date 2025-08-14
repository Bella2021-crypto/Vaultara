'use client'
import { useCartStore } from '../../lib/store'

export default function AddBtn({p}){
  const add = useCartStore(s=>s.add)
  return <button onClick={()=>add(p)} className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg">Add</button>
}
