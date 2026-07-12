-- Base schema for the Pupusa Index: core price + community submission tables.
-- Run in the Supabase SQL Editor (or via the Management API) before 0001/0002.

-- Current price per pupusa type. `type` is the primary key so the app's
-- upsert({ type, price }) and the cron's upsert(..., onConflict: "type") both work.
create table public.pupusa_prices (
  type       text primary key,
  price      numeric(6,2) not null check (price >= 0),
  updated_at timestamptz not null default now()
);

-- Community-submitted sightings.
create table public.submissions (
  id            bigint generated always as identity primary key,
  location      text not null,
  price         numeric(6,2) not null check (price > 0),
  establishment text not null default 'Anonymous',
  created_at    timestamptz not null default now()
);

alter table public.pupusa_prices enable row level security;
alter table public.submissions   enable row level security;

-- pupusa_prices: public read. Anon insert/update is intentional — the admin
-- dashboard writes with the anon key and its auth is client-side only, so this
-- preserves existing app behavior. (Hardening the admin flow is tracked separately.)
create policy "Public read pupusa_prices" on public.pupusa_prices
  for select to anon, authenticated using (true);
create policy "Anon insert pupusa_prices" on public.pupusa_prices
  for insert to anon, authenticated with check (true);
create policy "Anon update pupusa_prices" on public.pupusa_prices
  for update to anon, authenticated using (true) with check (true);

-- submissions: anyone may submit; not publicly readable.
create policy "Anon insert submissions" on public.submissions
  for insert to anon, authenticated with check (true);

-- Seed the known pupusa types so the app renders a price immediately.
insert into public.pupusa_prices (type, price) values
  ('pupusa revuelta', 1.00),
  ('queso', 0.90),
  ('frijol con queso', 0.90),
  ('chicharrón', 0.90)
on conflict (type) do nothing;
