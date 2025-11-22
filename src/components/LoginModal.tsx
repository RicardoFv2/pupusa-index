import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

type LoginModalProps = {
  onLogin: (password: string) => void;
  onCancel: () => void;
};

const LoginModal: React.FC<LoginModalProps> = ({ onLogin, onCancel }) => {
  const [password, setPassword] = useState("");
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(password);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          {t("loginModalTitle")}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("loginPlaceholder")}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#00d1ff]/50 transition-all"
            autoFocus
          />
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-3 rounded-xl text-white/70 hover:bg-white/5 transition-colors font-medium"
            >
              {t("cancelButton")}
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#00d1ff] hover:bg-[#00b8e6] text-black font-bold py-3 rounded-xl transition-colors shadow-lg shadow-[#00d1ff]/20"
            >
              {t("loginButton")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
