import React, { useState } from "react";
import { MOCK_RESTAURANTS } from "../../mockData/restaurants";
import { UtensilsCrossed, Star, MapPin, Clock, Phone, Flame } from "lucide-react";

export const FoodDiscoveryView = () => {
  const [filterType, setFilterType] = useState("All");

  const filtered = filterType === "All"
    ? MOCK_RESTAURANTS
    : filterType === "Veg"
    ? MOCK_RESTAURANTS.filter(r => r.type.includes("Pure Veg"))
    : MOCK_RESTAURANTS.filter(r => r.type.includes("Non-Veg"));

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <UtensilsCrossed className="w-5 h-5 text-rose-400" />
            <h2 className="text-2xl font-extrabold text-white">Food & Dining Discovery</h2>
          </div>
          <p className="text-xs text-slate-400">
            Find top-rated restaurants, cuisines, veg/non-veg spots, and live dining nearby.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {["All", "Veg", "Non-Veg"].map((f, i) => (
            <button
              key={i}
              onClick={() => setFilterType(f)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${filterType === f ? "bg-rose-600 text-white" : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(rest => (
          <div
            key={rest.id}
            className="glass-card rounded-3xl p-5 border border-white/10 hover:border-rose-500/40 transition flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 rounded-2xl overflow-hidden mb-4 bg-slate-900">
                <img src={rest.image} alt={rest.name} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/90 text-emerald-400 font-bold text-[10px] border border-slate-800">
                  {rest.type}
                </span>
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-900/90 text-amber-400 font-bold text-xs flex items-center gap-1 border border-slate-800">
                  <Star className="w-3.5 h-3.5 fill-amber-400" /> {rest.rating} ({rest.reviewCount})
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-1">{rest.name}</h3>
              <p className="text-xs font-semibold text-rose-400 mb-2">{rest.cuisine}</p>
              
              <p className="text-xs text-slate-400 mb-3 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{rest.address} ({rest.distanceKm} km away)</span>
              </p>

              {/* Top Dishes */}
              <div className="mb-4">
                <p className="text-xs font-bold text-slate-300 mb-1">Top Signature Dishes:</p>
                <div className="flex flex-wrap gap-1">
                  {rest.topDishes.map((dish, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 text-[10px] border border-slate-800">
                      🍲 {dish}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-xs text-slate-300 italic p-3 rounded-2xl bg-slate-900/80 border border-slate-800 mb-4">
                "{rest.reviewSummary}"
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-400">Avg. for two</p>
                <p className="text-base font-extrabold text-white">₹{rest.priceForTwo}</p>
              </div>

              <button
                onClick={() => alert(`Opening menu for ${rest.name}`)}
                className="py-2 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 font-bold text-xs text-white shadow-md transition"
              >
                View Menu & Reserve
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
