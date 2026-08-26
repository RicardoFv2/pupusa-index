import React, { useState, useEffect } from "react";
import GlassCard from "./GlassCard";
import SatsCalculator from "./SatsCalculator";
import SatsPriceChart from "./SatsPriceChart";
import PupusaBasketSimulator from "./PupusaBasketSimulator";
import DepartmentBreakdown from "./DepartmentBreakdown";
import DeflationComparison from "./DeflationComparison";
import { fetchBtcPrice, usdToSats } from "../lib/btcApi";
import { scrapePupusaPrices, ScrapedPupusaPrice } from "../lib/firecrawlScraper";

interface SatsTrackerViewProps {
  mainPupusaPrice: number;
}

export const SatsTrackerView: React.FC<SatsTrackerViewProps> = ({
  mainPupusaPrice,
}) => {
  const [btcPrice, setBtcPrice] = useState<number>(95000);
  const [loadingBtc, setLoadingBtc] = useState<boolean>(true);
  const [targetUrl, setTargetUrl] = useState<string>(
    "https://ejemplo-pupuseria.sv/menu"
  );
  const [scrapedData, setScrapedData] = useState<ScrapedPupusaPrice[]>([]);
  const [isScraping, setIsScraping] = useState<boolean>(false);
  const [scrapeError, setScrapeError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBtc() {
      try {
        const price = await fetchBtcPrice();
        setBtcPrice(price);
      } catch (err) {
        console.error("Failed to load BTC price:", err);
      } finally {
        setLoadingBtc(false);
      }
    }
    loadBtc();
  }, []);

  const handleScrape = async () => {
    setIsScraping(true);
    setScrapeError(null);
    try {
      const results = await scrapePupusaPrices(targetUrl);
      setScrapedData(results);
    } catch (err) {
      setScrapeError("Error al escanear el sitio con Firecrawl.");
    } finally {
      setIsScraping(false);
    }
  };

  const currentSatsPerPupusa = usdToSats(mainPupusaPrice, btcPrice);

  return (
    <div className="flex flex-col gap-8 w-full animate-fade-up">
      {/* Metric Highlights Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-6 text-center">
          <div className="text-xs text-white/50 uppercase tracking-wider mb-2">
            Precio BTC / USD (Mempool API)
          </div>
          <div className="text-2xl font-extrabold text-[#00d1ff] font-mono">
            {loadingBtc ? "Cargando..." : `$${btcPrice.toLocaleString()} USD`}
          </div>
          <div className="text-xs text-emerald-400 mt-1">● Conexión en vivo</div>
        </GlassCard>

        <GlassCard className="p-6 text-center">
          <div className="text-xs text-white/50 uppercase tracking-wider mb-2">
            Costo 1 Pupusa en Satoshis
          </div>
          <div className="text-2xl font-extrabold text-amber-400 font-mono">
            {currentSatsPerPupusa.toLocaleString()} Sats
          </div>
          <div className="text-xs text-white/60 mt-1">
            Basado en ${mainPupusaPrice.toFixed(2)} USD
          </div>
        </GlassCard>

        <GlassCard className="p-6 text-center">
          <div className="text-xs text-white/50 uppercase tracking-wider mb-2">
            Pupusas por 100,000 Sats
          </div>
          <div className="text-2xl font-extrabold text-emerald-300 font-mono">
            {currentSatsPerPupusa > 0
              ? (100_000 / currentSatsPerPupusa).toFixed(1)
              : "0"}{" "}
            <span className="text-sm font-normal text-white/70">pupusas</span>
          </div>
          <div className="text-xs text-white/60 mt-1">Poder Adquisitivo Satoshis</div>
        </GlassCard>
      </div>

      {/* Deflation vs FIAT Comparison Card */}
      <DeflationComparison pupusaPriceUsd={mainPupusaPrice} btcPriceUsd={btcPrice} />

      {/* Sats Calculator Component */}
      <SatsCalculator pupusaPriceUsd={mainPupusaPrice} btcPriceUsd={btcPrice} />

      {/* Dual Axis Chart Component */}
      <SatsPriceChart currentBtcPrice={btcPrice} />

      {/* Basket Simulator Component */}
      <PupusaBasketSimulator btcPriceUsd={btcPrice} />

      {/* Department Breakdown Component */}
      <DepartmentBreakdown btcPriceUsd={btcPrice} />

      {/* Firecrawl Scraper Panel */}
      <GlassCard className="p-6 md:p-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span>🔥</span> Escáner de Menús con Firecrawl AI
            </h3>
            <p className="text-sm text-white/60">
              Extrae datos de precios de pupuserías o sitios web en El Salvador mediante Firecrawl API.
            </p>
          </div>
          <span className="text-xs bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full border border-amber-500/30">
            Automático / Manual
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="url"
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
            placeholder="https://menu-pupuseria.sv"
            className="grow bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400 font-mono text-sm"
          />
          <button
            onClick={handleScrape}
            disabled={isScraping}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-bold px-6 py-3 rounded-xl transition-all disabled:opacity-50 whitespace-nowrap shadow-lg shadow-amber-500/20"
          >
            {isScraping ? "Escaneando..." : "🔥 Escanear Menú"}
          </button>
        </div>

        {scrapeError && (
          <div className="text-red-400 text-sm mb-4 bg-red-500/10 p-3 rounded-lg border border-red-500/20">
            {scrapeError}
          </div>
        )}

        {scrapedData.length > 0 && (
          <div className="mt-4 border border-white/10 rounded-xl overflow-hidden">
            <table className="w-full text-left text-sm text-white/80">
              <thead className="bg-white/5 text-white/50 text-xs uppercase font-mono">
                <tr>
                  <th className="p-3">Establecimiento</th>
                  <th className="p-3">Ubicación</th>
                  <th className="p-3">Tipo</th>
                  <th className="p-3">Precio (USD)</th>
                  <th className="p-3">Precio (Sats)</th>
                  <th className="p-3">Modo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono">
                {scrapedData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-white/5">
                    <td className="p-3 font-semibold text-white">
                      {item.establishment}
                    </td>
                    <td className="p-3">{item.location || "N/A"}</td>
                    <td className="p-3 capitalize">{item.type}</td>
                    <td className="p-3 text-emerald-400 font-bold">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="p-3 text-amber-400 font-bold">
                      {usdToSats(item.price, btcPrice).toLocaleString()} Sats
                    </td>
                    <td className="p-3">
                      {item.isSimulated ? (
                        <span className="text-xs text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                          Simulado
                        </span>
                      ) : (
                        <span className="text-xs text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
                          Firecrawl Live
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </GlassCard>
    </div>
  );
};

export default SatsTrackerView;
