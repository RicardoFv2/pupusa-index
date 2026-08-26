import React, { useState } from "react";
import GlassCard from "./GlassCard";
import { getDepartmentList, DepartmentPrice } from "../data/departmentData";

interface DepartmentBreakdownProps {
  btcPriceUsd: number;
}

export const DepartmentBreakdown: React.FC<DepartmentBreakdownProps> = ({
  btcPriceUsd,
}) => {
  const departments = getDepartmentList(btcPriceUsd);
  const [selectedId, setSelectedId] = useState<string>("san-salvador");

  const selectedDept =
    departments.find((d) => d.id === selectedId) || departments[0];
  const sortedDepts = [...departments].sort((a, b) => a.satsPrice - b.satsPrice);

  return (
    <GlassCard className="p-6 md:p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span>🗺️</span> Desglose Departamental del Pupusa Index (El Salvador)
          </h3>
          <p className="text-sm text-white/60">
            Compara el precio promedio por departamento en Satoshis y USD.
          </p>
        </div>

        <div className="text-xs bg-cyan-500/10 text-cyan-300 px-3 py-1.5 rounded-full border border-cyan-500/20 font-mono">
          14 Departamentos Monitoreados
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Selector de Departamento & Resumen */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-white/70 uppercase mb-2 font-mono">
              Selecciona Departamento:
            </label>
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#00d1ff] font-mono text-sm"
            >
              {departments.map((d) => (
                <option key={d.id} value={d.id} className="bg-slate-900 text-white">
                  {d.name} {d.isEstimated ? "(Estimado)" : ""}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-5 font-mono space-y-3">
            <div className="text-sm font-bold text-white flex justify-between items-center">
              <span>{selectedDept.name}</span>
              {selectedDept.isEstimated ? (
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded">
                  Estimado Nacional
                </span>
              ) : (
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">
                  Datos Directos
                </span>
              )}
            </div>

            <div>
              <span className="text-xs text-white/50 block">Precio Promedio USD</span>
              <div className="text-2xl font-bold text-[#00d1ff]">
                ${selectedDept.priceUsd.toFixed(2)} USD
              </div>
            </div>

            <div>
              <span className="text-xs text-white/50 block">Precio Promedio Satoshis</span>
              <div className="text-2xl font-bold text-amber-400">
                ⚡ {selectedDept.satsPrice.toLocaleString()} Sats
              </div>
            </div>

            <div className="text-xs text-white/40 border-t border-white/10 pt-2">
              Basado en {selectedDept.sampleCount} reportes en la región.
            </div>
          </div>
        </div>

        {/* Tabla Clasificatoria */}
        <div className="lg:col-span-2 border border-white/10 rounded-xl overflow-hidden">
          <div className="bg-white/5 px-4 py-3 border-b border-white/10 font-bold text-xs text-white/70 uppercase tracking-wider font-mono flex justify-between">
            <span>Ranking de Precios (Del más económico al más costoso)</span>
            <span>Sats / Pupusa</span>
          </div>
          <div className="max-h-72 overflow-y-auto divide-y divide-white/5">
            {sortedDepts.map((d, index) => (
              <div
                key={d.id}
                onClick={() => setSelectedId(d.id)}
                className={`flex items-center justify-between px-4 py-2.5 cursor-pointer text-sm font-mono transition-all hover:bg-white/10 ${
                  d.id === selectedId ? "bg-white/10 border-l-4 border-[#00d1ff]" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs text-white/40 w-5">#{index + 1}</span>
                  <span className="font-semibold text-white">{d.name}</span>
                  {d.isEstimated && (
                    <span className="text-[10px] text-amber-400/70">(Est.)</span>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-white/60">${d.priceUsd.toFixed(2)}</span>
                  <span className="font-bold text-amber-400">
                    {d.satsPrice.toLocaleString()} Sats
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default DepartmentBreakdown;
