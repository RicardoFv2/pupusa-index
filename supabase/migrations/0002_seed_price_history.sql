-- Optional seed data for local/preview development so the trend chart
-- renders before the monthly cron has accumulated real scrapes.
-- hourly_wage = 408 / 30 / 8 = 1.70 USD/h (MTPS convention: daily = monthly/30).

-- Cheapest-local baseline (the index tracks the lowest local price).
insert into public.price_history (price, price_frijol_queso, source, index_value, hourly_wage, scraped_at) values
  (0.50, 0.40, 'Seed – manual', 0.2941, 1.70, now() - interval '5 weeks'),
  (0.55, 0.45, 'Seed – manual', 0.3235, 1.70, now() - interval '4 weeks'),
  (0.55, 0.45, 'Seed – manual', 0.3235, 1.70, now() - interval '3 weeks'),
  (0.60, 0.50, 'Seed – manual', 0.3529, 1.70, now() - interval '2 weeks'),
  (0.60, 0.50, 'Seed – manual', 0.3529, 1.70, now() - interval '1 week');
