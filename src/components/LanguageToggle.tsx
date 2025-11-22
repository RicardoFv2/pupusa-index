import React from "react";
import { useLanguage } from "../context/LanguageContext";

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === "en" ? "es" : "en")}
      className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/20 text-white text-sm font-medium"
    >
      <span className="material-symbols-outlined text-lg">translate</span>
      {language === "en" ? "ES" : "EN"}
    </button>
  );
};

export default LanguageToggle;
