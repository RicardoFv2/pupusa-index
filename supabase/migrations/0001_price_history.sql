-- Price history for the Pupusa Index.
-- Run manually in the Supabase SQL Editor (this repo is not linked to the Supabase CLI).

create table public.price_history (
  id          bigint generated always as identity primary key,
  price       numeric(6,2) not null check (price > 0),
  source      text not null,              -- "PedidosYa – <restaurante>"
  index_value numeric(8,4) not null,      -- price / hourly_wage
  hourly_wage numeric(6,2) not null,      -- freezes the wage used for the calculation
  scraped_at  timestamptz not null default now()
);

create index price_history_scraped_at_idx
  on public.price_history (scraped_at desc);

alter table public.price_history enable row level security;

-- Public read only; writes come exclusively from the cron via the
-- service role key, which bypasses RLS. No insert/update policy on purpose.
create policy "Public read access" on public.price_history
  for select to anon, authenticated using (true);
