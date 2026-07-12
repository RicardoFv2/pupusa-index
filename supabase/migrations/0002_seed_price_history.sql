-- Optional seed data for local/preview development so the trend chart
-- renders before the weekly cron has accumulated real scrapes.
-- hourly_wage = 408 / 160 = 2.55 USD/h.

insert into public.price_history (price, price_frijol_queso, source, index_value, hourly_wage, scraped_at) values
  (0.90, 0.75, 'Seed – manual', 0.3529, 2.55, now() - interval '5 weeks'),
  (0.95, 0.80, 'Seed – manual', 0.3725, 2.55, now() - interval '4 weeks'),
  (0.90, 0.75, 'Seed – manual', 0.3529, 2.55, now() - interval '3 weeks'),
  (1.00, 0.85, 'Seed – manual', 0.3922, 2.55, now() - interval '2 weeks'),
  (1.00, 0.85, 'Seed – manual', 0.3922, 2.55, now() - interval '1 week');
