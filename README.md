# LuxeSalon — Next.js full-stack salon platform (Lucknow)

Premium hair & beauty salon website for **LuxeSalon Lucknow (Gomti Nagar)** with booking, leads CRM, email notifications (Nodemailer), admin dashboard, SEO + AI GEO.

## Stack

- Next.js 15 (App Router) + TypeScript + Tailwind
- Prisma + SQLite (local) / Postgres (Neon) for production
- NextAuth credentials admin
- Nodemailer SMTP for booking & lead emails

## Quick start

```bash
cp .env.example .env
npm install
npm run db:setup
npm run dev
```

Open http://localhost:3000

Admin: http://localhost:3000/admin/login  
Default: `admin@luxesalon.in` / `Admin@12345` (change in `.env`)

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run db:setup` | Push schema + seed |
| `npm run db:seed` | Re-seed data |

## SEO / GEO

- Dynamic `sitemap.xml` & `robots.txt`
- JSON-LD HairSalon + Service + FAQ
- `public/llms.txt` & `public/ai.txt` for AI citation
- Local Lucknow landing pages under `/services/[slug]`

## Deploy (Vercel)

1. Set env vars from `.env.example` (use Neon `DATABASE_URL` for production)
2. Build command: `prisma generate && prisma db push && tsx prisma/seed.ts && next build` (or run seed once manually)
3. Add `SMTP_EMAIL` + `SMTP_APP_PASSWORD` (Gmail App Password) for email notifications
4. Update `NEXT_PUBLIC_SITE_URL` and NAP in `src/lib/site.ts`
5. Submit sitemap in Google Search Console

## Lead features

- Contact / offer / service enquiry → Leads inbox
- Booking → Bookings + Lead pipeline
- Sticky WhatsApp + mobile Call/Book bar
- Review moderation in admin
