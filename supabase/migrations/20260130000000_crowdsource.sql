-- Crowdsource: price and supply reports (anon insert, anon read for display)
-- Run in Supabase SQL Editor or via supabase db push

-- Price reports: "I paid $X at Y pharmacy/platform"
create table if not exists public.crowdsource_price_reports (
  id uuid primary key default gen_random_uuid(),
  drug text not null,
  amount_paid_usd numeric not null,
  pharmacy_or_platform text not null,
  insurance_or_cash text not null,
  state_zip text,
  reported_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

-- Supply reports: "I got this drug at X"
create table if not exists public.crowdsource_supply_reports (
  id uuid primary key default gen_random_uuid(),
  drug text not null,
  pharmacy_or_platform text not null,
  city_state text not null,
  note text,
  reported_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

-- RLS: allow anonymous insert and select (no auth required)
alter table public.crowdsource_price_reports enable row level security;
alter table public.crowdsource_supply_reports enable row level security;

create policy "Allow anon insert price"
  on public.crowdsource_price_reports for insert to anon with check (true);
create policy "Allow anon select price"
  on public.crowdsource_price_reports for select to anon using (true);

create policy "Allow anon insert supply"
  on public.crowdsource_supply_reports for insert to anon with check (true);
create policy "Allow anon select supply"
  on public.crowdsource_supply_reports for select to anon using (true);

-- Index for feed ordering
create index if not exists idx_price_reports_reported_at
  on public.crowdsource_price_reports (reported_at desc);
create index if not exists idx_supply_reports_reported_at
  on public.crowdsource_supply_reports (reported_at desc);

comment on table public.crowdsource_price_reports is 'User-reported GLP-1 prices (crowdsource)';
comment on table public.crowdsource_supply_reports is 'User-reported GLP-1 availability (crowdsource)';
