import React from "react";
import { useLanguage } from "../context/LanguageContext";

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="text-center space-y-4">
      <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 tracking-tight">
        {t("heroTitle")}
      </h1>
      <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
        {t("heroSubtitle")}
      </p>
    </div>
  );
};

export default Hero;
