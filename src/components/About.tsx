import React from "react";
import GlassCard from "./GlassCard";
import { useLanguage } from "../context/LanguageContext";

const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <GlassCard className="p-8">
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
        <span className="material-symbols-outlined">info</span>
        {t("aboutTitle")}
      </h2>
      <p className="text-white/70 leading-relaxed">{t("aboutContent")}</p>
    </GlassCard>
  );
};

export default About;
