/**
 * Supabase browser client for crowdsource (price/supply reports).
 * Uses fetch to Supabase REST API; no @supabase/supabase-js dependency.
 * Requires NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.
 */
export type SupabaseConfig = {
  url: string;
  anonKey: string;
};

export function getSupabaseConfig(): SupabaseConfig | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (url && anonKey) return { url, anonKey };
  return null;
}

export function isSupabaseConfigured(): boolean {
  return getSupabaseConfig() !== null;
}

const headers = (anonKey: string) => ({
  apikey: anonKey,
  Authorization: `Bearer ${anonKey}`,
  'Content-Type': 'application/json',
  Prefer: 'return=minimal',
});

export type PriceReportRow = {
  id: string;
  drug: string;
  amount_paid_usd: number;
  pharmacy_or_platform: string;
  insurance_or_cash: string;
  state_zip: string | null;
  reported_at: string;
};

export type SupplyReportRow = {
  id: string;
  drug: string;
  pharmacy_or_platform: string;
  city_state: string;
  note: string | null;
  reported_at: string;
};

export async function insertPriceReport(config: SupabaseConfig, body: {
  drug: string;
  amount_paid_usd: number;
  pharmacy_or_platform: string;
  insurance_or_cash: string;
  state_zip?: string;
}): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch(`${config.url}/rest/v1/crowdsource_price_reports`, {
      method: 'POST',
      headers: headers(config.anonKey),
      body: JSON.stringify({
        drug: body.drug,
        amount_paid_usd: body.amount_paid_usd,
        pharmacy_or_platform: body.pharmacy_or_platform,
        insurance_or_cash: body.insurance_or_cash,
        state_zip: body.state_zip || null,
      }),
    });
    if (!res.ok) {
      const t = await res.text();
      return { ok: false, error: t || res.statusText };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Request failed' };
  }
}

export async function insertSupplyReport(config: SupabaseConfig, body: {
  drug: string;
  pharmacy_or_platform: string;
  city_state: string;
  note?: string;
}): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch(`${config.url}/rest/v1/crowdsource_supply_reports`, {
      method: 'POST',
      headers: headers(config.anonKey),
      body: JSON.stringify({
        drug: body.drug,
        pharmacy_or_platform: body.pharmacy_or_platform,
        city_state: body.city_state,
        note: body.note || null,
      }),
    });
    if (!res.ok) {
      const t = await res.text();
      return { ok: false, error: t || res.statusText };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Request failed' };
  }
}

export async function fetchRecentPriceReports(config: SupabaseConfig, limit = 10): Promise<PriceReportRow[]> {
  try {
    const res = await fetch(
      `${config.url}/rest/v1/crowdsource_price_reports?order=reported_at.desc&limit=${limit}`,
      { headers: { apikey: config.anonKey, Authorization: `Bearer ${config.anonKey}` } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function fetchRecentSupplyReports(config: SupabaseConfig, limit = 10): Promise<SupplyReportRow[]> {
  try {
    const res = await fetch(
      `${config.url}/rest/v1/crowdsource_supply_reports?order=reported_at.desc&limit=${limit}`,
      { headers: { apikey: config.anonKey, Authorization: `Bearer ${config.anonKey}` } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}
