import React from "react";
import GlassCard from "./GlassCard";
import { useLanguage } from "../context/LanguageContext";

type GlobalParityProps = {
  localPrice: number;
};

const GlobalParity: React.FC<GlobalParityProps> = ({ localPrice }) => {
  const { t } = useLanguage();
  const usaPrice = 4.0; // Estimated average price in USA
  const savings = ((usaPrice - localPrice) / usaPrice) * 100;

  return (
    <GlassCard className="flex flex-col items-center justify-center p-6 text-center h-full">
      <div className="mb-2 p-3 bg-white/10 rounded-full">
        <span className="material-symbols-outlined text-3xl text-cyan-400">
          public
        </span>
      </div>
      <h3 className="text-white/70 text-sm font-medium uppercase tracking-wider mb-1">
        {t("globalParityTitle")}
      </h3>

      <div className="text-5xl font-bold text-cyan-400 mb-2 tracking-tighter">
        -{Math.round(savings)}%
      </div>

      <div className="w-full bg-white/10 rounded-full h-2 mb-2 overflow-hidden">
        <div
          className="bg-cyan-400 h-full rounded-full"
          style={{ width: `${(localPrice / usaPrice) * 100}%` }}
        />
      </div>

      <p className="text-white/50 text-xs font-medium">
        {t("globalParityCheaper")}
      </p>
    </GlassCard>
  );
};

export default GlobalParity;
