import React from "react";
import GlassCard from "./GlassCard";
import { usdToSats } from "../lib/btcApi";

interface DeflationComparisonProps {
  pupusaPriceUsd: number;
  btcPriceUsd: number;
}

export const DeflationComparison: React.FC<DeflationComparisonProps> = ({
  pupusaPriceUsd,
  btcPriceUsd,
}) => {
  const currentSats = usdToSats(pupusaPriceUsd, btcPriceUsd);
  // Historical reference (e.g. 2021: BTC $45,000, Pupusa $0.50 -> 1,111 Sats)
  const historicalSats2021 = 1111;
  const historicalUsd2021 = 0.5;

  const usdChangePct = (((pupusaPriceUsd - historicalUsd2021) / historicalUsd2021) * 100).toFixed(1);
  const satsChangePct = (((currentSats - historicalSats2021) / historicalSats2021) * 100).toFixed(1);

  return (
    <GlassCard className="p-6 md:p-8 border-amber-500/20">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span>⚡ vs 💵</span> Comparativa de Poder Adquisitivo (Sats Deflation vs FIAT)
          </h3>
          <p className="text-sm text-white/60">
            Compara cómo el dinero FIAT pierde valor (inflación) mientras que guardar en Satoshis preserva tu poder de compra.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono">
        {/* FIAT Card */}
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-red-300 font-bold uppercase tracking-wider">
              Dólar Estadounidense (USD)
            </span>
            <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded">
              +{usdChangePct}% Inflación
            </span>
          </div>
          <div className="text-2xl font-extrabold text-white mb-1">
            ${pupusaPriceUsd.toFixed(2)} USD
          </div>
          <p className="text-xs text-white/50">
            En 2021 costaba ${historicalUsd2021.toFixed(2)} USD. El dinero FIAT requiere desembolsar más dólares con el tiempo.
          </p>
        </div>

        {/* Bitcoin Sats Card */}
        <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-xl p-5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-amber-300 font-bold uppercase tracking-wider">
              Bitcoin (Satoshis)
            </span>
            <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">
              {satsChangePct}% Poder Adquisitivo
            </span>
          </div>
          <div className="text-2xl font-extrabold text-amber-400 mb-1">
            ⚡ {currentSats.toLocaleString()} Sats
          </div>
          <p className="text-xs text-white/60">
            En 2021 costaba ~{historicalSats2021.toLocaleString()} Sats. Hoy necesitas <span className="text-emerald-300 font-bold">MENOS Satoshis</span> para comer la misma pupusa.
          </p>
        </div>
      </div>
    </GlassCard>
  );
};

export default DeflationComparison;
