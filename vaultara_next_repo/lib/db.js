import { sql } from '@vercel/postgres'

export async function ensureTables(){
  await sql`create table if not exists orders (
    id uuid default gen_random_uuid() primary key,
    email text,
    name text,
    items jsonb,
    total integer,
    provider text,
    status text,
    created_at timestamptz default now()
  );`
}

export async function createOrder({email, name, items, total, provider}){
  const { rows } = await sql`insert into orders (email,name,items,total,provider,status) values (${email}, ${name}, ${JSON.stringify(items)}, ${total}, ${provider}, 'pending') returning *`
  return rows[0]
}

export async function markPaid(id, paymentInfo){
  await sql`update orders set status='paid', items = items || ${JSON.stringify({paymentInfo})} where id=${id}`
}

export async function getOrder(id){
  const { rows } = await sql`select * from orders where id=${id}`
  return rows[0]
}

export async function listOrders(){
  const { rows } = await sql`select * from orders order by created_at desc`
  return rows
}
