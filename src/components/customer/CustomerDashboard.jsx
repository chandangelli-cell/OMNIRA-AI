import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useAppData } from "../../context/AppDataContext";
import { AIChatInterface } from "./AIChatInterface";
import { AdCarousel } from "./AdCarousel";
import { ProductCard } from "./ProductCard";
import { ProductDetailModal } from "./ProductDetailModal";
import { ComparisonView } from "./ComparisonView";
import { LocalDiscoveryView } from "./LocalDiscoveryView";
import { HotelDiscoveryView } from "./HotelDiscoveryView";
import { FoodDiscoveryView } from "./FoodDiscoveryView";
import { HealthcareView } from "./HealthcareView";
import { CustomerOrdersView } from "./CustomerOrdersView";
import { SavedItemsView } from "./SavedItemsView";
import { CustomerProfile } from "./CustomerProfile";
import {
  Sparkles,
  Search,
  ShoppingBag,
  Utensils,
  Hotel,
  Stethoscope,
  Store,
  Scale,
  Package,
  Bookmark,
  User,
  MapPin,
  ArrowRight
} from "lucide-react";

export const CustomerDashboard = ({ initialTab = "ai" }) => {
  const { user } = useAuth();
  const { products, compareItems } = useAppData();

  const [activeTab, setActiveTab] = useState(initialTab); // ai, shopping, food, stay, healthcare, nearby, compare, orders, saved, profile
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleOpenDetail = (product) => {
    setSelectedProduct(product);
    setDetailModalOpen(true);
  };

  const handleOpenShop = (shopId) => {
    setActiveTab("nearby");
  };

  const categories = [
    { id: "ai", label: "Omnira AI Assistant", icon: Sparkles, color: "text-cyan-400" },
    { id: "shopping", label: "Shopping", icon: ShoppingBag, color: "text-blue-400" },
    { id: "food", label: "Food", icon: Utensils, color: "text-rose-400" },
    { id: "stay", label: "Stay", icon: Hotel, color: "text-amber-400" },
    { id: "healthcare", label: "Healthcare", icon: Stethoscope, color: "text-emerald-400" },
    { id: "nearby", label: "Local Services", icon: Store, color: "text-purple-400" },
    { id: "compare", label: `Compare (${compareItems.length})`, icon: Scale, color: "text-indigo-400" },
    { id: "orders", label: "Orders", icon: Package, color: "text-amber-300" },
    { id: "saved", label: "Saved", icon: Bookmark, color: "text-rose-300" },
    { id: "profile", label: "Profile", icon: User, color: "text-slate-300" }
  ];

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto px-4 py-4">
      {/* Top Greeting Header */}
      <div className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Hello, {user?.name || "Chandan"} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-light mt-1">
            How can Omnira AI help you today? Search products, compare specs, discover nearby stays & dining.
          </p>
        </div>

        {/* Universal Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          <input
            type="text"
            placeholder="Search products, shops, hotels..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/90 border border-slate-800 focus:border-cyan-500 rounded-2xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition shadow-inner"
          />
        </div>
      </div>

      {/* Category Shortcut Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => {
          const IconComp = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition ${activeTab === cat.id ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/20" : "bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700"}`}
            >
              <IconComp className={`w-4 h-4 ${cat.color}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Shopkeeper Ad Carousel Banner */}
      <AdCarousel onViewShop={handleOpenShop} onViewProduct={() => setActiveTab("shopping")} />

      {/* Dynamic Tab Content */}
      {activeTab === "ai" && (
        <AIChatInterface
          onOpenProductDetail={handleOpenDetail}
          onOpenShopProfile={handleOpenShop}
          onNavigateTab={setActiveTab}
        />
      )}

      {activeTab === "shopping" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-extrabold text-white">All Verified Products</h2>
            <span className="text-xs text-slate-400">{products.length} products available</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map(prod => (
              <ProductCard
                key={prod.id}
                product={prod}
                onOpenDetail={handleOpenDetail}
                onOpenShop={handleOpenShop}
              />
            ))}
          </div>
        </div>
      )}

      {activeTab === "food" && <FoodDiscoveryView />}
      {activeTab === "stay" && <HotelDiscoveryView />}
      {activeTab === "healthcare" && <HealthcareView />}
      {activeTab === "nearby" && <LocalDiscoveryView onOpenShop={handleOpenShop} />}
      {activeTab === "compare" && (
        <ComparisonView onOpenDetail={handleOpenDetail} onOpenShop={handleOpenShop} />
      )}
      {activeTab === "orders" && <CustomerOrdersView />}
      {activeTab === "saved" && (
        <SavedItemsView onOpenDetail={handleOpenDetail} onOpenShop={handleOpenShop} />
      )}
      {activeTab === "profile" && <CustomerProfile />}

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        onOpenShop={handleOpenShop}
      />
    </div>
  );
};
