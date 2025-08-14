import Link from 'next/link'

export default function Home(){
  return (
    <div className="bg-white rounded-2xl p-8 shadow">
      <h1 className="text-3xl font-bold mb-2">Welcome to Vaultara</h1>
      <p className="text-gray-600 mb-6">A simple marketplace with Paystack & Flutterwave checkout.</p>
      <Link href="/browse" className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Start Browsing</Link>
    </div>
  )
}
