'use client'
import Link from 'next/link'
import { useCartStore } from '../lib/store'

export default function Header(){
  const count = useCartStore(s => s.items.reduce((a,b)=>a+b.qty,0))
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="Vaultara" className="h-8"/><span className="font-bold text-xl">Vaultara</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/browse">Browse</Link>
          <Link href="/cart" className="px-3 py-1 bg-indigo-600 text-white rounded-lg">Cart ({count})</Link>
          <Link href="/admin" className="text-sm text-gray-500 hover:text-gray-800">Admin</Link>
        </nav>
      </div>
    </header>
  )
}
