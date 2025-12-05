import React from "react";
import GlassCard from "./GlassCard";
import { useLanguage } from "../context/LanguageContext";

type KeyMetricProps = {
  price: number;
};

const KeyMetric: React.FC<KeyMetricProps> = ({ price }) => {
  const { t } = useLanguage();

  return (
    <GlassCard className="flex flex-col items-center justify-center p-8 text-center h-full">
      <h2 className="text-white/70 text-sm font-medium uppercase tracking-wider mb-2">
        {t("keyMetricLabel")}
      </h2>
      <div className="text-5xl md:text-6xl font-bold text-white tracking-tighter drop-shadow-lg">
        ${price.toFixed(2)}
      </div>
    </GlassCard>
  );
};

export default KeyMetric;
