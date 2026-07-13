# 🫓 The Pupusa Index 🇸🇻

> **The unofficial economic indicator of El Salvador.**

The Pupusa Index gauges purchasing power parity in El Salvador using the price of a Revueltas pupusa as a benchmark. Inspired by the Big Mac Index, it offers a tangible way to understand inflation and the cost of living.

![Pupusa Index Screenshot](public/pupusa-logo.png)

## 🛠️ Stack

- **Framework**: [Vite](https://vitejs.dev/) + [React](https://reactjs.org/) (TypeScript)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Glassmorphism Design)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: Google Material Symbols & [RealFaviconGenerator](https://realfavicongenerator.net/)
- **Database**: [Supabase](https://supabase.com/)
- **Scraping**: [Firecrawl](https://firecrawl.dev/) via a monthly [Vercel Cron](https://vercel.com/docs/cron-jobs)

## 🚀 Features

- **Automated Price Tracking**: A monthly cron job scrapes the cheapest local price of a Pupusa Revuelta (and Frijol con Queso) from two El Salvador sources with Firecrawl's AI extraction, takes the minimum, and stores it in Supabase.
- **Price History & Trend Chart**: Every scrape is recorded in `price_history`, powering the index trend chart.
- **Community Submissions**: Visitors can submit prices they've seen, stored in Supabase.
- **Interactive Calculator**: Calculate how many pupusas you can buy with your budget.
- **Global Parity**: Compare local purchase power against international standards.
- **Labor Metric**: See how many minutes of work at minimum wage it takes to earn a pupusa.
- **Glassmorphism UI**: A modern, sleek interface.

## 🗄️ Database Setup (Supabase)

1.  Create a project at [Supabase](https://supabase.com).
2.  Get your `Project URL` and `anon public key` from Settings -> API.
3.  Create the tables. `pupusa_prices` needs a unique `type` (text) column and a `price` (numeric) column; `submissions` needs `location`, `price`, `establishment`. Then run the migration in `supabase/migrations/0001_price_history.sql` in the SQL Editor:

    ```sql
    create table public.price_history (
      id          bigint generated always as identity primary key,
      price       numeric(6,2) not null check (price > 0),
      source      text not null,              -- "PedidosYa – <restaurante>"
      index_value numeric(8,4) not null,      -- price / hourly_wage
      hourly_wage numeric(6,2) not null,      -- freezes the wage used
      scraped_at  timestamptz not null default now()
    );
    create index price_history_scraped_at_idx on public.price_history (scraped_at desc);
    alter table public.price_history enable row level security;
    create policy "Public read access" on public.price_history
      for select to anon, authenticated using (true);
    ```

    Optionally run `supabase/migrations/0002_seed_price_history.sql` to seed a few rows so the trend chart renders before the cron accumulates real data.

## 🔑 Environment Variables

Frontend (`.env`, exposed to the client bundle):

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_ADMIN_PASSWORD=your_secure_password
```

Serverless cron (`/api/update-index`, set in the Vercel dashboard — never prefix these with `VITE_`):

```env
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
FIRECRAWL_API_KEY=your_firecrawl_key
CRON_SECRET=any_random_secret
```

Vercel automatically sends `Authorization: Bearer $CRON_SECRET` when invoking cron jobs. The cron runs on the 1st of each month at 08:00 UTC (see `vercel.json`). To trigger it manually:

```bash
curl -H "Authorization: Bearer $CRON_SECRET" https://your-deployment.vercel.app/api/update-index
```

## 💻 Getting Started

Want to run this locally? Grab a horchata and follow these steps:

### 1. Clone the repo

```bash
git clone https://github.com/RicardoFv2/pupusa-index.git
cd pupusa-index
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the Frontend

```bash
npm run dev
```

The app will support hot-reloading at `http://localhost:5173`.

To test the scraping endpoint locally, run `vercel dev` with the serverless env vars in `.env` and curl `http://localhost:3000/api/update-index` with the Bearer secret.

## 🤝 Contribution

Feel free to submit a PR or open an issue if you have ideas to improve the index!

---

Made with ❤️ and 🌽 in El Salvador.
