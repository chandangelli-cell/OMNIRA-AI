import React, { useState } from "react";
import { useAppData } from "../../context/AppDataContext";
import { Store, MapPin, Phone, Star, ShieldCheck, Clock, ArrowRight } from "lucide-react";

export const LocalDiscoveryView = ({ onOpenShop }) => {
  const { shops, location, setLocationModalOpen } = useAppData();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Mobile & Electronics", "Computer & Accessories", "Consumer Electronics"];

  const filteredShops = selectedCategory === "All"
    ? shops
    : shops.filter(s => s.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Store className="w-5 h-5 text-emerald-400" />
            <h2 className="text-2xl font-extrabold text-white">Local Business Discovery</h2>
          </div>
          <p className="text-xs text-slate-400">
            Connect directly with verified local shopkeepers in {location.city || "Jubilee Hills, Hyderabad"}.
          </p>
        </div>

        <button
          onClick={() => setLocationModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-cyan-300 text-xs font-semibold flex items-center gap-2 transition"
        >
          <MapPin className="w-4 h-4 text-cyan-400" />
          <span>Change Location</span>
        </button>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${selectedCategory === cat ? "bg-emerald-600 text-white shadow-lg" : "bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Shops Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredShops.map(shop => (
          <div
            key={shop.id}
            className="glass-card rounded-2xl p-5 border border-white/10 hover:border-emerald-500/40 transition flex flex-col justify-between text-left group"
          >
            <div>
              <div className="relative h-44 rounded-xl overflow-hidden mb-4 bg-slate-900 border border-white/10">
                <img src={shop.image} alt={shop.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {shop.verified && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-emerald-500/90 text-black font-extrabold text-[10px] flex items-center gap-1 shadow-md">
                    <ShieldCheck className="w-3 h-3" /> VERIFIED STORE
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">{shop.category}</span>
                <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" /> {shop.rating} ({shop.reviewCount})
                </span>
              </div>

              <h3 className="text-base font-bold text-white mb-1 group-hover:text-emerald-400 transition">
                {shop.name}
              </h3>

              <p className="text-xs text-slate-400 mb-2 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="truncate">{shop.address}</span>
              </p>

              <p className="text-[11px] text-slate-300 line-clamp-2 mb-4 leading-relaxed">
                {shop.description}
              </p>

              {/* Service Badges */}
              <div className="flex flex-wrap gap-1 mb-4">
                {shop.services?.slice(0, 3).map((srv, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 text-[10px] border border-slate-800">
                    ✓ {srv}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-emerald-400 font-mono font-bold">
                {shop.distanceKm} km away
              </span>
              <button
                onClick={() => onOpenShop && onOpenShop(shop.id)}
                className="px-4 py-2 rounded-xl glow-button text-xs font-bold text-white flex items-center gap-1.5"
              >
                <span>View Store Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
