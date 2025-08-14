'use client'
import { create } from 'zustand'

export const useCartStore = create((set,get)=>({
  items: [],
  add: (p)=> set(state=>{
    const idx = state.items.findIndex(i=>i.id===p.id)
    if(idx>-1){
      const copy=[...state.items]; copy[idx].qty+=1; return {items:copy}
    }
    return {items:[...state.items, {...p, qty:1}]}
  }),
  remove: (id)=> set(state=>({ items: state.items.filter(i=>i.id!==id) })),
  inc: (id)=> set(state=>({ items: state.items.map(i=>i.id===id?{...i, qty:i.qty+1}:i) })),
  dec: (id)=> set(state=>({ items: state.items.map(i=>i.id===id&&i.qty>1?{...i, qty:i.qty-1}:i) })),
  clear: ()=> set({items:[]})
}))
