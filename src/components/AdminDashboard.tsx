import React, { useState, useEffect } from "react";
import GlassCard from "./GlassCard";
import { useLanguage } from "../context/LanguageContext";
import { supabase } from "../utils/supabase";

type AdminDashboardProps = {
  onUpdate: () => void;
  password?: string;
};

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onUpdate,
  password = "pupusa123",
}) => {
  const { t } = useLanguage();
  const [prices, setPrices] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const { data, error } = await supabase
          .from("pupusa_prices")
          .select("*");

        if (error) throw error;

        // Convert numbers to strings for editing
        const stringPrices: Record<string, string> = {};
        if (data) {
          data.forEach((item: { type: string; price: number }) => {
            stringPrices[item.type] = String(item.price);
          });
        }
        setPrices(stringPrices);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch prices:", err);
      }
    };

    fetchPrices();
  }, []);

  const handlePriceChange = (name: string, value: string) => {
    setPrices((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      // Update each price in Supabase
      const updates = Object.entries(prices).map(async ([type, priceStr]) => {
        const price = parseFloat(priceStr) || 0;
        const { error } = await supabase
          .from("pupusa_prices")
          .upsert({ type, price });
        if (error) throw error;
      });

      await Promise.all(updates);

      setMessage({ text: t("adminSuccess"), type: "success" });
      onUpdate(); // Refresh app data
    } catch (error) {
      console.error("Error saving prices:", error);
      setMessage({ text: t("adminError"), type: "error" });
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return <div className="text-white text-center">Loading Admin...</div>;

  return (
    <GlassCard className="p-8 border-yellow-500/30 bg-yellow-500/5" noHover>
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <span className="material-symbols-outlined text-yellow-400">
          admin_panel_settings
        </span>
        {t("adminDashboardTitle")}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {Object.entries(prices)
          .filter(([name]) => name.toLowerCase() === "pupusa revuelta")
          .map(([name, price]) => (
            <div key={name} className="flex flex-col">
              <label className="text-white/70 text-sm mb-1 capitalize">
                {name}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">
                  $
                </span>
                <input
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => handlePriceChange(name, e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg py-2 pl-7 pr-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                />
              </div>
            </div>
          ))}
      </div>

      <div className="flex items-center justify-between">
        {message && (
          <span
            className={`text-sm ${
              message.type === "success" ? "text-green-400" : "text-red-400"
            }`}
          >
            {message.text}
          </span>
        )}
        <button
          onClick={handleSave}
          disabled={saving}
          className="ml-auto bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? t("adminSaving") : t("adminSave")}
        </button>
      </div>
    </GlassCard>
  );
};

export default AdminDashboard;
