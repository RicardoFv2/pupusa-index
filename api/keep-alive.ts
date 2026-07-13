import { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

// Supabase's free tier pauses a project after 7 days with no API traffic. The
// price cron only runs monthly, so this lightweight endpoint issues a trivial
// read every few days (see the cron in vercel.json) to keep the project awake.
export const config = { maxDuration: 10 };

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Vercel sends `Authorization: Bearer $CRON_SECRET` automatically for crons.
  const authHeader = req.headers["authorization"];
  if (!process.env.CRON_SECRET || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // A public-read anon query is enough to register activity; fall back to the
    // service role key if the anon key isn't present in the function env.
    const key =
      process.env.VITE_SUPABASE_ANON_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabase = createClient(process.env.SUPABASE_URL!, key!, {
      auth: { persistSession: false },
    });

    const { error } = await supabase
      .from("pupusa_prices")
      .select("type")
      .limit(1);
    if (error) throw new Error(error.message);

    return res.status(200).json({ alive: true, pingedAt: new Date().toISOString() });
  } catch (error: any) {
    console.error("Keep-alive ping failed:", error);
    return res.status(500).json({ alive: false, error: error.message });
  }
}
