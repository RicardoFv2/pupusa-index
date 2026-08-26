import React, { useState, useEffect } from "react";
import GlassCard from "./GlassCard";
import SatsCalculator from "./SatsCalculator";
import SatsPriceChart from "./SatsPriceChart";
import PupusaBasketSimulator from "./PupusaBasketSimulator";
import DepartmentBreakdown from "./DepartmentBreakdown";
import DeflationComparison from "./DeflationComparison";
import { fetchBtcPrice, usdToSats } from "../lib/btcApi";

interface SatsTrackerViewProps {
  mainPupusaPrice: number;
}

export const SatsTrackerView: React.FC<SatsTrackerViewProps> = ({
  mainPupusaPrice,
}) => {
  const [btcPrice, setBtcPrice] = useState<number>(95000);
  const [loadingBtc, setLoadingBtc] = useState<boolean>(true);

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

  const currentSatsPerPupusa = usdToSats(mainPupusaPrice, btcPrice);

  return (
    <div className="flex flex-col gap-8 w-full animate-fade-up">
      {/* Metric Highlights Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-6 text-center">
          <div className="text-xs text-white/50 uppercase tracking-wider mb-2">
            Precio BTC / USD (Mempool / CoinGecko)
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
      <DepartmentBreakdown btcPriceUsd={btcPrice} mainPupusaPrice={mainPupusaPrice} />
    </div>
  );
};

export default SatsTrackerView;
