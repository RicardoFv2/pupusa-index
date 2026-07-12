import React, { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import GlassCard from "./GlassCard";
import { useLanguage } from "../context/LanguageContext";
import { PriceHistoryEntry } from "../hooks/usePriceHistory";
import { formatDate, formatShortDate } from "../utils/formatDate";

type PriceChartProps = {
  history: PriceHistoryEntry[];
};

type Mode = "price" | "index";

type ChartDatum = {
  iso: string;
  label: string;
  price: number;
  index: number;
};

const ACCENT = "#00d1ff";

const PriceChart: React.FC<PriceChartProps> = ({ history }) => {
  const { t, language } = useLanguage();
  const [mode, setMode] = useState<Mode>("price");

  const data: ChartDatum[] = useMemo(() => {
    if (!history.length) return [];
    const base = history[0].price || 1;
    return history.map((h) => ({
      iso: h.scraped_at,
      label: formatShortDate(h.scraped_at, language),
      price: h.price,
      index: (h.price / base) * 100,
    }));
  }, [history, language]);

  const domain = useMemo<[number, number]>(() => {
    if (!data.length) return [0, 1];
    const values = data.map((d) => (mode === "price" ? d.price : d.index));
    const min = Math.min(...values);
    const max = Math.max(...values);
    const pad = mode === "price" ? 0.15 : 6;
    const lo = Math.max(0, min - pad);
    return [Number(lo.toFixed(2)), Number((max + pad).toFixed(2))];
  }, [data, mode]);

  const formatValue = (v: number) =>
    mode === "price" ? `$${v.toFixed(2)}` : v.toFixed(1);

  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload || !payload.length) return null;
    const datum = payload[0].payload as ChartDatum;
    const value = mode === "price" ? datum.price : datum.index;
    return (
      <div className="rounded-lg border border-white/20 bg-black/70 px-3 py-2 backdrop-blur-xl shadow-xl">
        <p className="text-[11px] text-white/50">
          {formatDate(datum.iso, language)}
        </p>
        <p className="num-serif text-lg font-semibold text-white">
          {formatValue(value)}
        </p>
      </div>
    );
  };

  return (
    <GlassCard noHover className="p-6 md:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="font-serif text-2xl font-semibold tracking-tight text-white">
            {t("chartTitle")}
          </h3>
          <p className="mt-1 text-sm text-white/50">{t("chartSubtitle")}</p>
        </div>

        <div className="inline-flex rounded-full border border-white/15 bg-black/20 p-1 text-sm">
          {(["price", "index"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`rounded-full px-4 py-1.5 font-medium transition-colors ${
                mode === m
                  ? "bg-white/15 text-white shadow-sm"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              {t(m === "price" ? "chartPrice" : "chartIndex")}
            </button>
          ))}
        </div>
      </div>

      {data.length === 0 ? (
        <div className="flex h-64 items-center justify-center px-6 text-center">
          <p className="max-w-sm text-sm text-white/40">{t("chartEmpty")}</p>
        </div>
      ) : (
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 8, right: 8, bottom: 0, left: -8 }}
            >
              <defs>
                <linearGradient id="pupusaFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={ACCENT} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={ACCENT} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                vertical={false}
                stroke="rgba(255,255,255,0.08)"
                strokeDasharray="3 3"
              />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 11 }}
                dy={8}
                minTickGap={24}
              />
              <YAxis
                domain={domain}
                tickLine={false}
                axisLine={false}
                width={52}
                tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 11 }}
                tickFormatter={(v: number) =>
                  mode === "price" ? `$${v.toFixed(2)}` : v.toFixed(0)
                }
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ stroke: "rgba(255,255,255,0.2)", strokeWidth: 1 }}
              />
              <Area
                type="monotone"
                dataKey={mode}
                stroke={ACCENT}
                strokeWidth={2.5}
                fill="url(#pupusaFill)"
                dot={false}
                activeDot={{
                  r: 5,
                  fill: ACCENT,
                  stroke: "#0f0c29",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </GlassCard>
  );
};

export default PriceChart;
