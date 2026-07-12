import { VercelRequest, VercelResponse } from "@vercel/node";
import FirecrawlApp from "@mendable/firecrawl-js";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Configuration constants
const MINIMUM_WAGE_MONTHLY = 408.0; // USD in El Salvador (Updated)
const WORKING_HOURS_PER_MONTH = 160;
const HOURLY_WAGE = MINIMUM_WAGE_MONTHLY / WORKING_HOURS_PER_MONTH;

// Sanity bounds for a single pupusa price in USD
const MIN_VALID_PRICE = 0.25;
const MAX_VALID_PRICE = 5.0;

// Multiple El Salvador sources: a national price guide plus real delivery-menu
// stores. They are scraped in parallel and averaged, and per source we take the
// cheapest quoted price, so the index also reflects affordable local vendors.
// (PedidosYa was dropped — a heavy, bot-protected SPA that timed out at 408.)
const SOURCES: { name: string; url: string }[] = [
  {
    name: "Visit El Salvador",
    url: "https://www.visitelsalvador.ai/blog/pupusas-guide-complet-garnitures-prix",
  },
  {
    name: "Uber Eats · La Estación de la Pupusa",
    url: "https://www.ubereats.com/sv/store/la-estacion-de-la-pupusa-san-salvador/2uttLM_UUJCDCxfel3mm8w",
  },
  {
    name: "Uber Eats · La Pupusería SV",
    url: "https://www.ubereats.com/sv/store/la-pupuseria-sv/A3SxK2yxQXqEKF2P2pLnPg",
  },
];

const EXTRACT_PROMPT =
  'Esta página contiene precios de pupusas en El Salvador (en dólares USD). Extrae el precio unitario de UNA "pupusa revuelta" y de UNA "pupusa de frijol con queso" — el precio individual, nunca un combo. Si se da un rango de precios, usa el valor más bajo (el precio más barato/local). Si algún tipo no aparece, ponlo en null. Devuelve obligatoriamente un objeto JSON: { "revuelta_price": number | null, "frijol_queso_price": number | null }.';

// Vercel Hobby caps function duration at 60s; parallel scrapes stay well under it.
export const config = { maxDuration: 60 };

function sanitizePrice(value: unknown): number | null {
  return typeof value === "number" &&
    Number.isFinite(value) &&
    value >= MIN_VALID_PRICE &&
    value <= MAX_VALID_PRICE
    ? value
    : null;
}

const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length;
const round2 = (n: number) => Number(n.toFixed(2));

type SourceResult = {
  name: string;
  revuelta: number | null;
  frijolQueso: number | null;
};

async function scrapeSource(
  app: FirecrawlApp,
  s: { name: string; url: string }
): Promise<SourceResult> {
  const r = await app.scrapeUrl(s.url, {
    formats: ["json"],
    onlyMainContent: true,
    timeout: 30000,
    jsonOptions: { prompt: EXTRACT_PROMPT },
  });
  if (!r.success) throw new Error(`${s.name}: ${r.error}`);
  const j = (r.json ?? {}) as {
    revuelta_price?: unknown;
    frijol_queso_price?: unknown;
  };
  return {
    name: s.name,
    revuelta: sanitizePrice(j.revuelta_price),
    frijolQueso: sanitizePrice(j.frijol_queso_price),
  };
}

async function persist(
  supabase: SupabaseClient,
  row: {
    revuelta: number;
    frijolQueso: number | null;
    indexValue: number;
    source: string;
  }
): Promise<void> {
  const prices = [{ type: "pupusa revuelta", price: row.revuelta }];
  if (row.frijolQueso != null) {
    prices.push({ type: "pupusa frijol con queso", price: row.frijolQueso });
  }

  const { error: upsertError } = await supabase
    .from("pupusa_prices")
    .upsert(prices, { onConflict: "type" });
  if (upsertError) {
    throw new Error(`Failed to upsert pupusa_prices: ${upsertError.message}`);
  }

  const { error: insertError } = await supabase.from("price_history").insert({
    price: row.revuelta,
    price_frijol_queso: row.frijolQueso,
    source: row.source,
    index_value: row.indexValue,
    hourly_wage: round2(HOURLY_WAGE),
  });
  if (insertError) {
    throw new Error(`Failed to insert price_history: ${insertError.message}`);
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. Security check: verify CRON_SECRET (Vercel cron sends it automatically)
  const authHeader = req.headers["authorization"];
  if (!process.env.CRON_SECRET || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // 2. Scrape every source in parallel; a single failure must not sink the run.
  const app = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY });
  const settled = await Promise.allSettled(
    SOURCES.map((s) => scrapeSource(app, s))
  );

  const results: SourceResult[] = [];
  settled.forEach((r, i) => {
    if (r.status === "fulfilled") results.push(r.value);
    else console.warn(`Source failed (${SOURCES[i].name}):`, r.reason?.message ?? r.reason);
  });

  const revueltas = results
    .map((r) => r.revuelta)
    .filter((x): x is number => x != null);
  const frijoles = results
    .map((r) => r.frijolQueso)
    .filter((x): x is number => x != null);

  // 3. Need at least one valid revuelta price to form the index.
  if (revueltas.length === 0) {
    console.error("No source yielded a valid revuelta price:", JSON.stringify(results));
    return res.status(502).json({
      success: false,
      error: "No source yielded a valid revuelta price",
      sources: results,
    });
  }

  // 4. Average across sources.
  const avgRevuelta = round2(mean(revueltas));
  const avgFrijol = frijoles.length ? round2(mean(frijoles)) : null;
  const pupusaIndex = Number((avgRevuelta / HOURLY_WAGE).toFixed(4));
  const source = `Promedio · ${revueltas.length} fuentes SV`;

  // 5. Persist and return.
  try {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );
    await persist(supabase, {
      revuelta: avgRevuelta,
      frijolQueso: avgFrijol,
      indexValue: pupusaIndex,
      source,
    });

    return res.status(200).json({
      success: true,
      persisted: true,
      data: {
        pupusa_price: avgRevuelta,
        frijol_con_queso_price: avgFrijol,
        hourly_wage: HOURLY_WAGE.toFixed(4),
        pupusa_index: pupusaIndex.toFixed(4),
        source,
        contributing: results,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    console.error("Pupusa Index Update Error:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Internal Server Error",
    });
  }
}
