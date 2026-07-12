import { VercelRequest, VercelResponse } from "@vercel/node";
import FirecrawlApp from "@mendable/firecrawl-js";
import { createClient } from "@supabase/supabase-js";

// Configuration constants
const MINIMUM_WAGE_MONTHLY = 408.0; // USD in El Salvador (Updated)
const WORKING_HOURS_PER_MONTH = 160;
const HOURLY_WAGE = MINIMUM_WAGE_MONTHLY / WORKING_HOURS_PER_MONTH;

// Sanity bounds for a single pupusa price in USD
const MIN_VALID_PRICE = 0.25;
const MAX_VALID_PRICE = 5.0;

const TARGET_URL =
  "https://www.pedidosya.com.sv/restaurantes/san-salvador?q=pupusas"; // PedidosYa search for pupusas in San Salvador

function validateScrapedPrice(value: unknown): number {
  if (
    typeof value !== "number" ||
    !Number.isFinite(value) ||
    value < MIN_VALID_PRICE ||
    value > MAX_VALID_PRICE
  ) {
    throw new Error(
      `Scraped price out of valid range [$${MIN_VALID_PRICE}, $${MAX_VALID_PRICE}]: ${JSON.stringify(value)}`
    );
  }
  return value;
}

async function persistScrape(row: {
  price: number;
  source: string;
  indexValue: number;
  hourlyWage: number;
}): Promise<void> {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const { error: upsertError } = await supabase
    .from("pupusa_prices")
    .upsert({ type: "pupusa revuelta", price: row.price }, { onConflict: "type" });
  if (upsertError) {
    throw new Error(`Failed to upsert pupusa_prices: ${upsertError.message}`);
  }

  const { error: insertError } = await supabase.from("price_history").insert({
    price: row.price,
    source: row.source,
    index_value: row.indexValue,
    hourly_wage: row.hourlyWage,
  });
  if (insertError) {
    throw new Error(`Failed to insert price_history: ${insertError.message}`);
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. Security Check: Verify CRON_SECRET (Vercel cron sends it automatically)
  const authHeader = req.headers["authorization"];
  if (!process.env.CRON_SECRET || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // 2. AI-Powered Scraping
  const app = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY });
  let crawlResponse;
  try {
    crawlResponse = await app.scrapeUrl(TARGET_URL, {
      formats: ["json"],
      jsonOptions: {
        prompt:
          'Navega por los resultados de PedidosYa y extrae el precio unitario de una \'Pupusa Revuelta\' de uno de los restaurantes destacados. Devuelve obligatoriamente un objeto JSON: { "unit_price": number, "source": string }. El source debe ser el nombre del restaurante encontrado.',
      },
    });
  } catch (error: any) {
    console.error("Firecrawl request error:", error);
    return res
      .status(502)
      .json({ success: false, error: `Firecrawl request failed: ${error.message}` });
  }

  if (!crawlResponse.success) {
    console.error("Firecrawl scrape failed:", crawlResponse.error);
    return res
      .status(502)
      .json({ success: false, error: `Firecrawl failed: ${crawlResponse.error}` });
  }

  // 3. Validate extracted payload — never persist garbage
  const payload = crawlResponse.json as { unit_price?: unknown; source?: unknown };
  let unitPrice: number;
  try {
    unitPrice = validateScrapedPrice(payload?.unit_price);
  } catch (error: any) {
    console.error("Invalid scraped payload:", JSON.stringify(payload));
    return res.status(422).json({ success: false, error: error.message });
  }
  const restaurant =
    typeof payload.source === "string" && payload.source.trim()
      ? payload.source.trim()
      : "restaurante desconocido";
  const source = `PedidosYa – ${restaurant}`;

  // 4. Calculate Pupusa Index
  // Formula: pupusa_index = (precio_pupusa / pago_por_hora)
  const pupusaIndex = unitPrice / HOURLY_WAGE;

  // 5. Persist and return
  try {
    await persistScrape({
      price: unitPrice,
      source,
      indexValue: Number(pupusaIndex.toFixed(4)),
      hourlyWage: Number(HOURLY_WAGE.toFixed(2)),
    });

    return res.status(200).json({
      success: true,
      persisted: true,
      data: {
        pupusa_price: unitPrice,
        hourly_wage: HOURLY_WAGE.toFixed(4),
        pupusa_index: pupusaIndex.toFixed(4),
        source,
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
