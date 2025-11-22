import React from "react";
import GlassCard from "./GlassCard";
import { useLanguage } from "../context/LanguageContext";

type ContextualDataProps = {
  price: number;
  wage: number;
};

const ContextualData: React.FC<ContextualDataProps> = ({ price, wage }) => {
  const pupusasPerDay = Math.floor(wage / price);
  const { t } = useLanguage();

  return (
    <GlassCard className="flex flex-col items-center justify-center p-6 text-center h-full">
      <div className="mb-2 p-3 bg-white/10 rounded-full">
        <span className="material-symbols-outlined text-3xl text-white">
          lunch_dining
        </span>
      </div>
      <h3 className="text-white/70 text-sm font-medium uppercase tracking-wider mb-1">
        {t("contextualDataLabel")}
      </h3>
      <div className="text-5xl font-bold text-white mb-2">{pupusasPerDay}</div>
      <p className="text-white/50 text-xs max-w-[200px]">
        Based on daily minimum wage of ${wage.toFixed(2)}
      </p>
    </GlassCard>
  );
};

export default ContextualData;
