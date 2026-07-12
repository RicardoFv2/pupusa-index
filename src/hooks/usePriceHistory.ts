import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export type PriceHistoryEntry = {
  id: number;
  price: number;
  source: string;
  index_value: number;
  hourly_wage: number;
  scraped_at: string;
};

type PriceHistoryState = {
  history: PriceHistoryEntry[]; // ordered oldest -> newest
  latest: PriceHistoryEntry | null;
  previous: PriceHistoryEntry | null;
  loading: boolean;
};

export function usePriceHistory(): PriceHistoryState {
  const [history, setHistory] = useState<PriceHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const { data, error } = await supabase
          .from("price_history")
          .select("*")
          .order("scraped_at", { ascending: true });

        if (error) throw error;

        if (active && data) {
          setHistory(
            data.map((d: any) => ({
              id: Number(d.id),
              price: Number(d.price),
              source: String(d.source ?? ""),
              index_value: Number(d.index_value),
              hourly_wage: Number(d.hourly_wage),
              scraped_at: String(d.scraped_at),
            }))
          );
        }
      } catch (e) {
        // Table may not exist yet or RLS blocks read — degrade gracefully.
        const message = e instanceof Error ? e.message : "Unknown error";
        console.warn("Could not load price history:", message);
        if (active) setHistory([]);
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  const latest = history.length ? history[history.length - 1] : null;
  const previous = history.length > 1 ? history[history.length - 2] : null;

  return { history, latest, previous, loading };
}
