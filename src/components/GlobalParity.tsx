import React from "react";
import GlassCard from "./GlassCard";
import { useLanguage } from "../context/LanguageContext";

type GlobalParityProps = {
  localPrice: number;
};

const GlobalParity: React.FC<GlobalParityProps> = ({ localPrice }) => {
  const { t } = useLanguage();
  const usaPrice = 4.0; // Estimated average price in USA
  const diff = ((usaPrice - localPrice) / usaPrice) * 100; // positive => cheaper here
  const cheaper = diff >= 0;
  const pct = Math.abs(Math.round(diff));
  const barWidth = Math.min((localPrice / usaPrice) * 100, 100);
  const accent = cheaper ? "text-cyan-400" : "text-amber-400";
  const bar = cheaper ? "bg-cyan-400" : "bg-amber-400";

  return (
    <GlassCard className="flex flex-col items-center justify-center p-6 text-center h-full">
      <div className="mb-2 p-3 bg-white/10 rounded-full">
        <span className={`material-symbols-outlined text-3xl ${accent}`}>
          public
        </span>
      </div>
      <h3 className="text-white/70 text-sm font-medium uppercase tracking-wider mb-1">
        {t("globalParityTitle")}
      </h3>

      <div className={`num-serif text-5xl font-semibold mb-2 tracking-tight ${accent}`}>
        {cheaper ? "-" : "+"}
        {pct}%
      </div>

      <div className="w-full bg-white/10 rounded-full h-2 mb-2 overflow-hidden">
        <div
          className={`${bar} h-full rounded-full transition-all duration-500`}
          style={{ width: `${barWidth}%` }}
        />
      </div>

      <p className="text-white/50 text-xs font-medium">
        {cheaper ? t("globalParityCheaper") : t("globalParityPricier")}
      </p>
    </GlassCard>
  );
};

export default GlobalParity;
