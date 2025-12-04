import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

type SubmitPriceModalProps = {
  onClose: () => void;
  onSubmitSuccess: () => void;
};

const departments = [
  "San Salvador",
  "La Libertad",
  "Santa Ana",
  "San Miguel",
  "Sonsonate",
  "Usulután",
  "Ahuachapán",
  "La Paz",
  "La Unión",
  "Cuscatlán",
  "Chalatenango",
  "Morazán",
  "San Vicente",
  "Cabañas",
];

const SubmitPriceModal: React.FC<SubmitPriceModalProps> = ({
  onClose,
  onSubmitSuccess,
}) => {
  const { t } = useLanguage();
  const [location, setLocation] = useState(departments[0]);
  const [price, setPrice] = useState("");
  const [establishment, setEstablishment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/prices/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          location,
          price: parseFloat(price),
          establishment,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      onSubmitSuccess();
      onClose();
    } catch (err) {
      setError(t("submitError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          {t("submitPriceTitle")}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/70 text-sm mb-1">
              {t("locationLabel")}
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#00d1ff]/50 transition-all"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept} className="bg-[#1a1a2e]">
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white/70 text-sm mb-1">
              {t("priceLabel")}
            </label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#00d1ff]/50 transition-all"
            />
          </div>

          <div>
            <label className="block text-white/70 text-sm mb-1">
              {t("establishmentLabel")}
            </label>
            <input
              type="text"
              value={establishment}
              onChange={(e) => setEstablishment(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#00d1ff]/50 transition-all"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl text-white/70 hover:bg-white/5 transition-colors font-medium"
            >
              {t("cancelButton")}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#00d1ff] hover:bg-[#00b8e6] text-black font-bold py-3 rounded-xl transition-colors shadow-lg shadow-[#00d1ff]/20 disabled:opacity-50"
            >
              {loading ? "..." : t("submitButton")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitPriceModal;
