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
      <p className="text-white/70 leading-relaxed mb-6">{t("aboutContent")}</p>

      <div className="flex flex-col gap-2 text-sm text-white/60">
        <div className="flex items-center gap-2">
          <span>{t("inspirationLabel")}</span>
          <a
            href="https://github.com/TheEconomist/big-mac-data"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-white transition-colors underline"
          >
            {t("bigMacLinkText")}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <span>{t("projectRepoLabel")}</span>
          <a
            href="https://github.com/RicardoFv2/pupusa-index"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-white transition-colors underline"
          >
            {t("projectRepoLinkText")}
          </a>
        </div>
      </div>
    </GlassCard>
  );
};

export default About;
