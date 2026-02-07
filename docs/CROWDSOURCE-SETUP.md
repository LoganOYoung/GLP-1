# Crowdsource (Price & Supply Reports) Setup

This doc describes how to enable the crowdsource feature: user-submitted price and supply reports stored in Supabase and shown on the homepage and `/report` page.

## 1. Create a Supabase project

1. Go to [https://supabase.com](https://supabase.com) and sign in.
2. Create a new project (or use an existing one).
3. Note your **Project URL** and **anon public** key: Project Settings → API.

## 2. Run the migration

1. In the Supabase dashboard, open **SQL Editor**.
2. Copy the contents of `supabase/migrations/20260130000000_crowdsource.sql`.
3. Run the SQL. This creates:
   - `crowdsource_price_reports` — drug, amount paid, pharmacy, insurance/cash, state/ZIP.
   - `crowdsource_supply_reports` — drug, pharmacy, city/state, optional note.
   - Row Level Security (RLS) so anonymous users can **insert** and **select** only (no update/delete).
   - Indexes on `reported_at` for feed ordering.

## 3. Environment variables

In your project root, copy `.env.example` to `.env.local` (if needed) and set:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

Get both values from Supabase: Project Settings → API → Project URL and anon public key.

## 4. Verify

- **Without** these env vars: the app still runs; forms show a “backend not connected” message and the feed shows a placeholder.
- **With** env vars: users can submit price/supply reports from `/report`, and recent reports appear in the homepage “Recent community reports” strip and on `/report#feed`.

## 5. Optional: Supabase CLI

If you use the Supabase CLI and link the project, you can apply migrations with:

```bash
supabase db push
```

Otherwise, running the SQL in the dashboard (step 2) is enough.
