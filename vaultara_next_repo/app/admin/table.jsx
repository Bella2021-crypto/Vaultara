import { listOrders } from '../../lib/db'

export default async function Orders(){
  const rows = await listOrders()
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Orders</h2>
      <div className="overflow-auto">
        <table className="min-w-full text-sm">
          <thead><tr><th className="text-left p-2">Date</th><th className="text-left p-2">Email</th><th className="text-left p-2">Provider</th><th className="text-left p-2">Total</th><th className="text-left p-2">Status</th></tr></thead>
          <tbody>
            {rows.map(o=> (
              <tr key={o.id} className="border-t">
                <td className="p-2">{new Date(o.created_at).toLocaleString()}</td>
                <td className="p-2">{o.email}</td>
                <td className="p-2">{o.provider}</td>
                <td className="p-2">₦{Number(o.total).toLocaleString()}</td>
                <td className="p-2">{o.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
