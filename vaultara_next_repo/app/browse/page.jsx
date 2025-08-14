import products from '../../data/products.json'
import AddBtn from './AddBtn'

export default function Browse(){
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {products.map(p=> (
        <div key={p.id} className="bg-white rounded-xl p-4 shadow">
          <img src={p.image} alt={p.name} className="h-28 object-contain mb-3"/>
          <div className="font-semibold">{p.name}</div>
          <div className="text-sm text-gray-600">{p.description}</div>
          <div className="flex justify-between items-center mt-3">
            <div className="font-bold">₦{p.price.toLocaleString()}</div>
            <AddBtn p={p}/>
          </div>
        </div>
      ))}
    </div>
  )
}
