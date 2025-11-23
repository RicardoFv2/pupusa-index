import React, { useState, useEffect } from "react";
import Hero from "./components/Hero";
import KeyMetric from "./components/KeyMetric";
import ContextualData from "./components/ContextualData";
import Calculator from "./components/Calculator";
import GlassCard from "./components/GlassCard";
import About from "./components/About";
import AdminDashboard from "./components/AdminDashboard";
import LoginModal from "./components/LoginModal";
import LaborTimeMetric from "./components/LaborTimeMetric";
import GlobalParity from "./components/GlobalParity";
import CustomNotification from "./components/Notification";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import LanguageToggle from "./components/LanguageToggle";
import SubmitPriceModal from "./components/SubmitPriceModal";

// ... (inside App function)

function AppContent() {
  const { t } = useLanguage();
  const [pupusaPrices, setPupusaPrices] = useState<Record<string, number>>({}); // Store all pupusa prices
  const [mainPupusaPrice, setMainPupusaPrice] = useState(0); // Price for 'Revueltas' or a default
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSubmitPrice, setShowSubmitPrice] = useState(false);
  const [adminPassword, setAdminPassword] = useState<string | null>(null);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);
  const minimumWage = 12.0;

  // Fallback data from pupusa_prices.txt
  const fallbackPrices: Record<string, number> = {
    revueltas: 0.5,
    queso: 0.7,
    "frijol con queso": 0.5,
    chicharrón: 0.6,
  };

  const fetchPupusaPrices = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/pupusa-prices");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Record<string, number> = await response.json();
      setPupusaPrices(data);

      // Set the main pupusa price (e.g., 'revueltas' or the first one available)
      if (data && data["pupusa revuelta"]) {
        // Adjusted to match the scraper's output if 'revueltas' becomes 'pupusa revuelta'
        setMainPupusaPrice(data["pupusa revuelta"]);
      } else if (data && data["revueltas"]) {
        setMainPupusaPrice(data["revueltas"]);
      } else if (Object.keys(data).length > 0) {
        setMainPupusaPrice(Object.values(data)[0]); // Fallback to the first available price
      } else {
        throw new Error("No pupusa prices found in response");
      }
      setLoading(false);
    } catch (e) {
      // Use fallback data
      const errorMessage = e instanceof Error ? e.message : "Unknown error";
      console.warn("Using fallback pupusa prices:", errorMessage);
      setPupusaPrices(fallbackPrices);
      setMainPupusaPrice(
        fallbackPrices["revueltas"] || Object.values(fallbackPrices)[0]
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPupusaPrices();
  }, []);

  const showNotification = (
    message: string,
    type: "success" | "error" | "info"
  ) => {
    setNotification({ message, type });
  };

  const handleAdminLogin = (password: string) => {
    if (password === "pupusa123") {
      setAdminPassword(password);
      setShowLogin(false);
      setShowAdmin(true);
      showNotification("Login Successful!", "success");
    } else {
      showNotification("Incorrect password!", "error");
    }
  };

  const handleLogout = () => {
    setAdminPassword(null);
    setShowAdmin(false);
    showNotification("Logged out successfully", "info");
  };

  if (loading) {
    return (
      <div className="text-white text-center p-8">Loading pupusa prices...</div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-8">Error: {error}</div>;
  }

  return (
    <>
      <div className="gradient-bg" />
      <div className="relative flex min-h-screen w-full flex-col items-center overflow-x-hidden">
        <header className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between whitespace-nowrap">
            <div className="flex items-center gap-3 text-white">
              <div className="size-6 text-white">
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
                  <path d="M12 17.27l-4.15 2.51c-.76.46-1.68-.21-1.49-1.08l1.07-4.89-3.72-3.21c-.67-.58-.31-1.68.57-1.75l4.95-.42 2.02-4.58c.35-.79 1.5-.79 1.85 0l2.02 4.58 4.95.42c.88.07 1.24 1.17.57 1.75l-3.72 3.21 1.07 4.89c.19.87-.73 1.54-1.49 1.08L12 17.27z"></path>
                </svg>
              </div>
              <h2 className="text-white text-xl font-bold leading-tight">
                {t("appTitle")}
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowSubmitPrice(true)}
                className="text-sm font-medium text-[#00d1ff] hover:text-white transition-colors"
              >
                {t("submitButton")}
              </button>
              <LanguageToggle />
            </div>
          </div>
        </header>

        <main className="flex h-full grow flex-col items-center justify-center w-full px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col max-w-4xl w-full gap-12">
            <Hero />

            {showAdmin && adminPassword && (
              <AdminDashboard
                onUpdate={fetchPupusaPrices}
                password={adminPassword}
              />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <KeyMetric price={mainPupusaPrice} />
              <ContextualData price={mainPupusaPrice} wage={minimumWage} />
              <LaborTimeMetric
                price={mainPupusaPrice}
                minimumWage={minimumWage}
              />
              <GlobalParity localPrice={mainPupusaPrice} />
            </div>
            <Calculator price={mainPupusaPrice} />
            <About />
          </div>
        </main>

        <footer className="w-full text-center py-8 px-4">
          <p className="text-white/50 text-xs">
            {t("dataSource")} |{" "}
            <button
              onClick={showAdmin ? handleLogout : () => setShowLogin(true)}
              className="hover:text-white/80 underline"
            >
              {showAdmin ? t("adminLogout") : t("adminLogin")}
            </button>
          </p>
        </footer>

        {showLogin && (
          <LoginModal
            onLogin={handleAdminLogin}
            onCancel={() => setShowLogin(false)}
          />
        )}

        {showSubmitPrice && (
          <SubmitPriceModal
            onClose={() => setShowSubmitPrice(false)}
            onSubmitSuccess={() => {
              showNotification(t("submitSuccess"), "success");
            }}
          />
        )}

        {notification && (
          <CustomNotification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
      </div>
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
