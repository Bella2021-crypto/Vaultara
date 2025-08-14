# Vaultara (Next.js + Paystack + Flutterwave + Vercel Postgres)

## Features
- Next.js App Router + Tailwind
- Dummy products, shopping cart (Zustand)
- Paystack & Flutterwave checkout (test & live ready)
- Webhooks to mark orders as paid
- Admin orders page
- Orders stored in Vercel Postgres

## Vercel Setup
1. Create project from this repo.
2. Storage → Postgres → Create DB → Link to project.
3. Environment Variables:
   - NEXT_PUBLIC_APP_URL = https://<your-vercel-url>
   - ADMIN_PASSWORD = a-strong-password
   - PAYSTACK_PUBLIC_KEY, PAYSTACK_SECRET_KEY
   - FLW_PUBLIC_KEY, FLW_SECRET_KEY, FLW_ENCRYPTION_KEY
4. Webhooks:
   - Paystack: https://<your-vercel-url>/api/paystack/webhook
   - Flutterwave: https://<your-vercel-url>/api/flutterwave/webhook
5. Deploy

## Dev
npm install
npm run dev
