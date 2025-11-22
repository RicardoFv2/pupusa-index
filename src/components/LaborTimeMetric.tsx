import React from "react";
import GlassCard from "./GlassCard";
import { useLanguage } from "../context/LanguageContext";

type LaborTimeMetricProps = {
  price: number;
  minimumWage: number; // Daily minimum wage
};

const LaborTimeMetric: React.FC<LaborTimeMetricProps> = ({
  price,
  minimumWage,
}) => {
  const { t } = useLanguage();
  // Calculate minutes of work required to buy one pupusa
  // Assuming 8-hour workday
  const hourlyWage = minimumWage / 8;
  const minutesToEarn = (price / hourlyWage) * 60;

  return (
    <GlassCard className="flex flex-col items-center justify-center p-6 text-center h-full">
      <div className="mb-2 p-3 bg-white/10 rounded-full">
        <span className="material-symbols-outlined text-3xl text-yellow-400">
          timer
        </span>
      </div>
      <h3 className="text-white/70 text-sm font-medium uppercase tracking-wider mb-1">
        {t("laborTimeTitle")}
      </h3>
      <div className="text-4xl font-bold text-white mb-2">
        {Math.round(minutesToEarn)}{" "}
        <span className="text-lg font-normal text-white/60">
          {t("laborTimeMin")}
        </span>
      </div>
      <p className="text-white/50 text-xs max-w-[200px]">
        {t("laborTimeSubtitle")}
      </p>
    </GlassCard>
  );
};

export default LaborTimeMetric;
