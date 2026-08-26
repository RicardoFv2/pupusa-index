import React, { useState } from "react";
import GlassCard from "./GlassCard";
import { usdToSats } from "../lib/btcApi";

interface SatsCalculatorProps {
  pupusaPriceUsd: number;
  btcPriceUsd: number;
}

export const SatsCalculator: React.FC<SatsCalculatorProps> = ({
  pupusaPriceUsd,
  btcPriceUsd,
}) => {
  const [budgetUsd, setBudgetUsd] = useState<number>(10);

  const satsPerPupusa = usdToSats(pupusaPriceUsd, btcPriceUsd);
  const totalSatsBudget = usdToSats(budgetUsd, btcPriceUsd);
  const pupusasCount =
    pupusaPriceUsd > 0 ? (budgetUsd / pupusaPriceUsd).toFixed(1) : "0";

  return (
    <GlassCard className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span>⚡</span> Calculadora de Satoshis & Pupusas
          </h3>
          <p className="text-sm text-white/60">
            Calcula el valor en Bitcoin (Satoshis) de tus pupusas en tiempo real.
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs text-[#00d1ff] font-semibold block uppercase tracking-wider">
            1 BTC = ${btcPriceUsd.toLocaleString()} USD
          </span>
          <span className="text-xs text-amber-400 font-mono">
            1 Pupusa = {satsPerPupusa.toLocaleString()} Sats
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Presupuesto en USD ($):
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-lg">
              $
            </span>
            <input
              type="number"
              min="0.5"
              step="0.5"
              value={budgetUsd}
              onChange={(e) => setBudgetUsd(Number(e.target.value) || 0)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-9 pr-4 text-white text-lg focus:outline-none focus:border-[#00d1ff] transition-all font-mono"
            />
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-500/10 to-cyan-500/10 border border-white/10 rounded-xl p-5 text-center">
          <div className="text-xs text-white/50 uppercase tracking-wider mb-1">
            Equivalente en Satoshis
          </div>
          <div className="text-3xl font-extrabold text-amber-400 font-mono mb-2">
            {totalSatsBudget.toLocaleString()} <span className="text-sm">Sats</span>
          </div>
          <div className="text-sm text-cyan-300">
            Compras aprox. <span className="font-bold text-white text-base">{pupusasCount}</span> pupusas
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default SatsCalculator;
