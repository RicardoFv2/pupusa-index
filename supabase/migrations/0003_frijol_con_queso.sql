-- Track the "frijol con queso" pupusa price alongside the revuelta, so the
-- index can average multiple pupusa types across sources. Nullable to keep
-- existing rows valid.
alter table public.price_history
  add column if not exists price_frijol_queso numeric(6,2);
