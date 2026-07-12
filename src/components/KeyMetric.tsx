import React from "react";
import GlassCard from "./GlassCard";
import { useLanguage } from "../context/LanguageContext";
import { useCountUp } from "../hooks/useCountUp";
import { formatDate } from "../utils/formatDate";
import { PriceHistoryEntry } from "../hooks/usePriceHistory";

type KeyMetricProps = {
  price: number;
  latest?: PriceHistoryEntry | null;
  previous?: PriceHistoryEntry | null;
};

const KeyMetric: React.FC<KeyMetricProps> = ({ price, latest, previous }) => {
  const { t, language } = useLanguage();
  const display = useCountUp(price);

  const delta =
    latest && previous && previous.price
      ? ((latest.price - previous.price) / previous.price) * 100
      : null;

  const up = delta !== null && delta > 0.05;
  const down = delta !== null && delta < -0.05;

  const frijolPrice = latest?.price_frijol_queso ?? null;

  return (
    <GlassCard noHover className="p-8 md:p-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow mb-3">{t("keyMetricLabel")}</p>
          <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
            <span className="num-serif text-6xl font-semibold leading-none tracking-tight text-white drop-shadow-lg md:text-8xl">
              ${display.toFixed(2)}
            </span>
            {delta !== null && (
              <span
                className={`mb-1 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-sm font-semibold ${
                  up
                    ? "bg-amber-400/15 text-amber-300"
                    : down
                    ? "bg-emerald-400/15 text-emerald-300"
                    : "bg-white/10 text-white/60"
                }`}
                title={t("deltaVsPrevious")}
              >
                <span className="material-symbols-outlined text-base leading-none">
                  {up ? "arrow_upward" : down ? "arrow_downward" : "remove"}
                </span>
                {Math.abs(delta).toFixed(1)}%
              </span>
            )}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
            <span className="inline-flex items-center gap-1.5 text-white/50">
              <span className="size-2 rounded-full bg-[#00d1ff]" />
              {t("revueltaLabel")}
            </span>
            {frijolPrice != null && (
              <span className="inline-flex items-center gap-1.5 text-white/60">
                <span className="size-2 rounded-full bg-amber-300" />
                {t("frijolLabel")}
                <span className="num-serif font-semibold text-white/90">
                  ${frijolPrice.toFixed(2)}
                </span>
              </span>
            )}
          </div>
        </div>

        {latest && (
          <div className="md:text-right">
            <div className="flex items-center gap-1.5 text-white/70 md:justify-end">
              <span className="material-symbols-outlined text-base text-cyan-400">
                schedule
              </span>
              <span className="text-sm font-medium">{latest.source}</span>
            </div>
            <p className="mt-1 text-xs text-white/45">
              {t("updatedLabel")} {formatDate(latest.scraped_at, language)}
            </p>
          </div>
        )}
      </div>
    </GlassCard>
  );
};

export default KeyMetric;
