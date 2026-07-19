# Development

Technical setup for running and deploying the Pupusa Index. For the project pitch, see [`README.md`](README.md).

## 🛠️ Stack

- **Framework**: [Vite](https://vitejs.dev/) + [React](https://reactjs.org/) (TypeScript)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Glassmorphism Design)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: Google Material Symbols & [RealFaviconGenerator](https://realfavicongenerator.net/)
- **Database**: [Supabase](https://supabase.com/)
- **Scraping**: [Firecrawl](https://firecrawl.dev/) via a monthly [Vercel Cron](https://vercel.com/docs/cron-jobs)

## 💻 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/RicardoFv2/pupusa-index.git
cd pupusa-index
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the frontend

```bash
npm run dev
```

The app will support hot-reloading at `http://localhost:5173`.

To test the scraping endpoint locally, run `vercel dev` with the serverless env vars in `.env` and curl `http://localhost:3000/api/update-index` with the Bearer secret.

## 🗄️ Database Setup (Supabase)

1. Create a project at [Supabase](https://supabase.com).
2. Get your `Project URL` and `anon public key` from Settings -> API.
3. Run the migrations in `supabase/migrations/` (in order) in the SQL Editor. `0000_base_schema.sql` creates `pupusa_prices` (unique `type` + `price`) and `submissions`; `0001_price_history.sql` creates the `price_history` table that powers the trend chart.

   Optionally run `0002_seed_price_history.sql` to seed a few rows so the trend chart renders before the cron accumulates real data.

## 🔑 Environment Variables

Frontend (`.env`, exposed to the client bundle):

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_ADMIN_PASSWORD=your_secure_password
```

Serverless cron (`/api/update-index`, `/api/keep-alive` — set in the Vercel dashboard, never prefix these with `VITE_`):

```env
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
FIRECRAWL_API_KEY=your_firecrawl_key
CRON_SECRET=any_random_secret
```

Vercel automatically sends `Authorization: Bearer $CRON_SECRET` when invoking cron jobs. Two crons are configured in `vercel.json`:

- **`/api/update-index`** — 1st of each month at 08:00 UTC. Scrapes the price and records history.
- **`/api/keep-alive`** — every 3 days at 06:00 UTC. Issues a trivial read so the Supabase free-tier project never hits the 7-day inactivity pause.

To trigger either manually:

```bash
curl -H "Authorization: Bearer $CRON_SECRET" https://your-deployment.vercel.app/api/update-index
curl -H "Authorization: Bearer $CRON_SECRET" https://your-deployment.vercel.app/api/keep-alive
```
