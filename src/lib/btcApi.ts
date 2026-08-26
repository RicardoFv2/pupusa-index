export interface BtcPriceData {
  USD: number;
  EUR?: number;
  GBP?: number;
}

/**
 * Converts a USD amount to Satoshis (1 BTC = 100,000,000 Satoshis)
 */
export function usdToSats(usdAmount: number, btcPriceUsd: number): number {
  if (!btcPriceUsd || btcPriceUsd <= 0) return 0;
  return Math.round((usdAmount / btcPriceUsd) * 100_000_000);
}

/**
 * Converts Satoshis to USD amount
 */
export function satsToUsd(satsAmount: number, btcPriceUsd: number): number {
  if (!btcPriceUsd || btcPriceUsd <= 0) return 0;
  return (satsAmount / 100_000_000) * btcPriceUsd;
}

/**
 * Fetches BTC price directly from CoinGecko API
 */
export async function fetchBtcPriceFromCoinGecko(): Promise<number> {
  const cgRes = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
  );
  if (!cgRes.ok) throw new Error(`CoinGecko API HTTP error: ${cgRes.status}`);
  const cgData = await cgRes.json();
  if (cgData?.bitcoin?.usd) {
    return Number(cgData.bitcoin.usd);
  }
  throw new Error("CoinGecko response missing bitcoin.usd field");
}

/**
 * Fetches BTC price directly from Mempool.space API
 */
export async function fetchBtcPriceFromMempool(): Promise<number> {
  const res = await fetch("https://mempool.space/api/v1/prices");
  if (!res.ok) throw new Error(`Mempool API HTTP error: ${res.status}`);
  const data: BtcPriceData = await res.json();
  if (data?.USD) return Number(data.USD);
  throw new Error("Mempool response missing USD field");
}

/**
 * Robust multi-provider BTC price fetcher (CoinGecko + Mempool API fallback)
 */
export async function fetchBtcPrice(provider: "coingecko" | "mempool" | "auto" = "auto"): Promise<number> {
  if (provider === "coingecko") {
    try {
      return await fetchBtcPriceFromCoinGecko();
    } catch (e) {
      console.warn("CoinGecko provider failed, trying Mempool fallback...", e);
      return await fetchBtcPriceFromMempool();
    }
  }

  // Auto/Mempool first, then CoinGecko
  try {
    return await fetchBtcPriceFromMempool();
  } catch (err) {
    console.warn("Mempool API failed, falling back to CoinGecko...", err);
    try {
      return await fetchBtcPriceFromCoinGecko();
    } catch (fallbackErr) {
      console.error("All BTC price providers failed (CoinGecko & Mempool):", fallbackErr);
    }
  }

  // Default baseline fallback
  return 95000;
}
