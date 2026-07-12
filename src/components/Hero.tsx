import React from "react";
import { useLanguage } from "../context/LanguageContext";

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="text-center">
      <p className="eyebrow mb-4">{t("mastheadLabel")}</p>
      <h1 className="font-serif text-5xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/55 md:text-7xl">
        {t("heroTitle")}
      </h1>
      <p className="mx-auto mt-5 max-w-2xl text-lg font-light leading-relaxed text-white/70 md:text-xl">
        {t("heroSubtitle")}
      </p>
    </div>
  );
};

export default Hero;
