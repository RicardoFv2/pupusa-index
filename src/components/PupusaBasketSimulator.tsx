import React, { useState } from "react";
import GlassCard from "./GlassCard";
import {
  BasketItems,
  calculateBasketSummary,
  UNIT_PRICES_USD,
} from "../lib/basketCalculator";

interface PupusaBasketSimulatorProps {
  btcPriceUsd: number;
}

export const PupusaBasketSimulator: React.FC<PupusaBasketSimulatorProps> = ({
  btcPriceUsd,
}) => {
  const [items, setItems] = useState<BasketItems>({
    harinaLb: 5,
    quesoLb: 3,
    chicharronLb: 2,
    frijolLb: 2,
    tomateLb: 3,
    gasJornadas: 1,
  });

  const [monthlyWageUsd, setMonthlyWageUsd] = useState<number>(365);

  const summary = calculateBasketSummary(items, btcPriceUsd, monthlyWageUsd);

  const updateItem = (key: keyof BasketItems, val: number) => {
    setItems((prev) => ({ ...prev, [key]: Math.max(0, val) }));
  };

  return (
    <GlassCard className="p-6 md:p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span>🛒</span> Simulador de Canasta Básica Pupusera & Paridad Salarial
          </h3>
          <p className="text-sm text-white/60">
            Ajusta los insumos para calcular el costo de producción en Satoshis y horas de trabajo equivalentes.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10 text-xs font-mono">
          <button
            onClick={() => setMonthlyWageUsd(365)}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              monthlyWageUsd === 365
                ? "bg-[#00d1ff] text-slate-950 font-bold"
                : "text-white/70 hover:text-white"
            }`}
          >
            Comercio ($365/mes)
          </button>
          <button
            onClick={() => setMonthlyWageUsd(408)}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              monthlyWageUsd === 408
                ? "bg-amber-400 text-slate-950 font-bold"
                : "text-white/70 hover:text-white"
            }`}
          >
            Industrial ($408/mes)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Sliders Area */}
        <div className="lg:col-span-2 space-y-4">
          <div>
            <div className="flex justify-between text-xs text-white/80 mb-1">
              <span>🌾 Harina de Maíz/Arroz (${UNIT_PRICES_USD.harinaLb}/lb)</span>
              <span className="font-mono text-cyan-300">{items.harinaLb} lbs</span>
            </div>
            <input
              type="range"
              min="1"
              max="25"
              value={items.harinaLb}
              onChange={(e) => updateItem("harinaLb", Number(e.target.value))}
              className="w-full accent-[#00d1ff]"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-white/80 mb-1">
              <span>🧀 Queso Quesillo (${UNIT_PRICES_USD.quesoLb}/lb)</span>
              <span className="font-mono text-amber-300">{items.quesoLb} lbs</span>
            </div>
            <input
              type="range"
              min="0"
              max="15"
              value={items.quesoLb}
              onChange={(e) => updateItem("quesoLb", Number(e.target.value))}
              className="w-full accent-amber-400"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-white/80 mb-1">
              <span>🥩 Chicharrón Molido (${UNIT_PRICES_USD.chicharronLb}/lb)</span>
              <span className="font-mono text-orange-300">{items.chicharronLb} lbs</span>
            </div>
            <input
              type="range"
              min="0"
              max="15"
              value={items.chicharronLb}
              onChange={(e) => updateItem("chicharronLb", Number(e.target.value))}
              className="w-full accent-orange-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-white/80 mb-1">
              <span>🫘 Frijoles Rojos (${UNIT_PRICES_USD.frijolLb}/lb)</span>
              <span className="font-mono text-red-300">{items.frijolLb} lbs</span>
            </div>
            <input
              type="range"
              min="0"
              max="15"
              value={items.frijolLb}
              onChange={(e) => updateItem("frijolLb", Number(e.target.value))}
              className="w-full accent-red-400"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-white/80 mb-1">
              <span>🍅 Tomate para Salsa (${UNIT_PRICES_USD.tomateLb}/lb)</span>
              <span className="font-mono text-rose-300">{items.tomateLb} lbs</span>
            </div>
            <input
              type="range"
              min="0"
              max="15"
              value={items.tomateLb}
              onChange={(e) => updateItem("tomateLb", Number(e.target.value))}
              className="w-full accent-rose-400"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-white/80 mb-1">
              <span>🔥 Gas Propano (${UNIT_PRICES_USD.gasJornadas}/jornada)</span>
              <span className="font-mono text-yellow-300">{items.gasJornadas} jornada(s)</span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              value={items.gasJornadas}
              onChange={(e) => updateItem("gasJornadas", Number(e.target.value))}
              className="w-full accent-yellow-400"
            />
          </div>
        </div>

        {/* Summary Card Area */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4 font-mono">
          <div>
            <span className="text-xs text-white/50 uppercase block mb-1">
              Costo Total Canasta
            </span>
            <div className="text-3xl font-extrabold text-[#00d1ff]">
              ${summary.totalUsd.toFixed(2)} <span className="text-sm text-white/60">USD</span>
            </div>
          </div>

          <div className="border-t border-white/10 pt-3">
            <span className="text-xs text-amber-400/80 uppercase block mb-1">
              Equivalente en Satoshis
            </span>
            <div className="text-2xl font-bold text-amber-400">
              ⚡ {summary.totalSats.toLocaleString()} Sats
            </div>
          </div>

          <div className="border-t border-white/10 pt-3">
            <span className="text-xs text-emerald-400/80 uppercase block mb-1">
              Horas de Trabajo Req. ($ {monthlyWageUsd}/mes)
            </span>
            <div className="text-xl font-bold text-emerald-300">
              ⏱️ {summary.laborHours} hrs ({summary.laborMinutes} mins)
            </div>
          </div>

          <div className="border-t border-white/10 pt-3 text-xs text-white/60">
            🫓 Rinde para aprox. <span className="text-white font-bold">{summary.pupusasEquivalentes} pupusas</span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default PupusaBasketSimulator;
