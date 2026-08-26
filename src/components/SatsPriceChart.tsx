import React from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import GlassCard from "./GlassCard";
import { usdToSats } from "../lib/btcApi";

interface SatsPriceChartProps {
  history?: Array<{
    date: string;
    revuelta: number;
    btcPriceUsd?: number;
  }>;
  currentBtcPrice: number;
}

export const SatsPriceChart: React.FC<SatsPriceChartProps> = ({
  history,
  currentBtcPrice,
}) => {
  // Sample historical data points for demonstration if history is sparse
  const sampleData = [
    { date: "Ene 2024", usd: 0.5, btcRate: 42000 },
    { date: "Mar 2024", usd: 0.55, btcRate: 65000 },
    { date: "Jun 2024", usd: 0.6, btcRate: 61000 },
    { date: "Sep 2024", usd: 0.65, btcRate: 58000 },
    { date: "Dic 2024", usd: 0.7, btcRate: 98000 },
    { date: "Actual", usd: 0.75, btcRate: currentBtcPrice || 95000 },
  ];

  const chartData =
    history && history.length > 0
      ? history.map((item) => {
          const rate = item.btcPriceUsd || currentBtcPrice || 95000;
          return {
            date: item.date,
            usd: item.revuelta,
            sats: usdToSats(item.revuelta, rate),
          };
        })
      : sampleData.map((item) => ({
          date: item.date,
          usd: item.usd,
          sats: usdToSats(item.usd, item.btcRate),
        }));

  return (
    <GlassCard className="p-6 md:p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span>📈</span> Tendencia Comparativa: USD vs. Satoshis (Dual Axis)
          </h3>
          <p className="text-sm text-white/60">
            Observa cómo la inflación en USD contrasta con el valor deflacionario en Bitcoin.
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#00d1ff]" />
            <span className="text-white/80">Precio USD ($)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <span className="text-white/80">Precio Satoshis (Sats)</span>
          </div>
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
            <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" tick={{ fontSize: 12 }} />
            <YAxis
              yAxisId="left"
              orientation="left"
              stroke="#00d1ff"
              tickFormatter={(v) => `$${v.toFixed(2)}`}
              domain={["auto", "auto"]}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#f59e0b"
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k Sats`}
              domain={["auto", "auto"]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(15, 23, 42, 0.9)",
                borderColor: "rgba(255, 255, 255, 0.2)",
                borderRadius: "12px",
                color: "#fff",
              }}
              formatter={(value: any, name: any) => [
                name === "usd" ? `$${value}` : `${Number(value).toLocaleString()} Sats`,
                name === "usd" ? "Precio USD" : "Precio Satoshis",
              ]}
            />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="usd"
              name="usd"
              stroke="#00d1ff"
              strokeWidth={3}
              dot={{ r: 4, fill: "#00d1ff" }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="sats"
              name="sats"
              stroke="#f59e0b"
              strokeWidth={3}
              dot={{ r: 4, fill: "#f59e0b" }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
};

export default SatsPriceChart;
