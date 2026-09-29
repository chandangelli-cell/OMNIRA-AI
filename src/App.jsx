import React, { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { AppDataProvider } from "./context/AppDataContext";
import { Header } from "./components/common/Header";
import { ParticleBackground } from "./components/common/ParticleBackground";
import { LocationModal } from "./components/common/LocationModal";
import { LandingHero } from "./components/landing/LandingHero";
import { FeatureGrid } from "./components/landing/FeatureGrid";
import { CustomerAuthModal } from "./components/auth/CustomerAuthModal";
import { ShopkeeperAuthModal } from "./components/auth/ShopkeeperAuthModal";
import { CustomerDashboard } from "./components/customer/CustomerDashboard";
import { ShopkeeperDashboard } from "./components/shopkeeper/ShopkeeperDashboard";

const MainLayout = () => {
  const { user } = useAuth();
  const [customerAuthOpen, setCustomerAuthOpen] = useState(false);
  const [shopkeeperAuthOpen, setShopkeeperAuthOpen] = useState(false);
  const [navigationView, setNavigationView] = useState("auto"); // auto, home, customer, shopkeeper

  const handlePromptSelect = (promptText) => {
    setNavigationView("customer");
  };

  // Determine active view mode based on auth state or explicit navigation override
  const renderContent = () => {
    if (navigationView === "home") {
      return (
        <>
          <LandingHero
            onSelectPrompt={handlePromptSelect}
            onOpenCustomerAuth={() => setCustomerAuthOpen(true)}
            onOpenShopkeeperAuth={() => setShopkeeperAuthOpen(true)}
          />
          <FeatureGrid />
        </>
      );
    }

    if (user?.role === "SHOPKEEPER") {
      return <ShopkeeperDashboard />;
    }

    if (user?.role === "CUSTOMER" || navigationView === "customer") {
      return <CustomerDashboard />;
    }

    // Default Landing View
    return (
      <>
        <LandingHero
          onSelectPrompt={handlePromptSelect}
          onOpenCustomerAuth={() => setCustomerAuthOpen(true)}
          onOpenShopkeeperAuth={() => setShopkeeperAuthOpen(true)}
        />
        <FeatureGrid />
      </>
    );
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between selection:bg-cyan-500 selection:text-black">
      <ParticleBackground />

      <div>
        <Header
          onNavigate={(view) => {
            if (view === "auth_customer") setCustomerAuthOpen(true);
            else if (view === "auth_shopkeeper") setShopkeeperAuthOpen(true);
            else setNavigationView(view);
          }}
        />

        <main className="relative z-10 pb-16">
          {renderContent()}
        </main>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-6 px-4 border-t border-white/10 text-center text-xs text-slate-400 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-semibold text-slate-300">
            © 2026 OMNIRA-AI — <span className="text-cyan-400 font-light">"One AI. Every Need."</span>
          </p>
          <p className="text-[11px] text-slate-500">
            AI Operating Layer for Customers, Products, Stays, Dining, Healthcare & Local Businesses.
          </p>
        </div>
      </footer>

      {/* Modals */}
      <CustomerAuthModal
        isOpen={customerAuthOpen}
        onClose={() => setCustomerAuthOpen(false)}
      />
      <ShopkeeperAuthModal
        isOpen={shopkeeperAuthOpen}
        onClose={() => setShopkeeperAuthOpen(false)}
      />
      <LocationModal />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppDataProvider>
          <MainLayout />
        </AppDataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
