import React, { useState } from "react";
import GlassCard from "./GlassCard";
import { useLanguage } from "../context/LanguageContext";

type CalculatorProps = {
  price: number;
};

const Calculator: React.FC<CalculatorProps> = ({ price }) => {
  const [budget, setBudget] = useState<string>("");
  const { t } = useLanguage();

  const handleBudgetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(event.target.value);
  };

  const pupusas = budget ? (parseFloat(budget) / price).toFixed(2) : "0.00";

  return (
    <GlassCard className="p-8">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <span className="material-symbols-outlined">calculate</span>
        {t("calculatorTitle")}
      </h2>
      <div className="flex flex-col md:flex-row gap-6 items-end">
        <div className="flex-1 w-full">
          <label className="block text-white/70 text-sm font-medium mb-2">
            {t("calculatorLabel")}
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 font-medium">
              $
            </span>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-8 pr-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
              placeholder="10.00"
            />
          </div>
        </div>
        <div className="flex-1 w-full">
          <div className="bg-white/10 rounded-xl p-4 flex items-center justify-between border border-white/5">
            <span className="text-white/60 font-medium">
              {t("calculatorResult")}
            </span>
            <div className="text-right">
              <span className="text-3xl font-bold text-white block leading-none">
                {pupusas}
              </span>
              <span className="text-xs text-white/50 uppercase tracking-wider">
                {t("calculatorPupusas")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default Calculator;
