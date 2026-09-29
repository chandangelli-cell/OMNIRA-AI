import React, { useState } from "react";
import { MOCK_HOTELS } from "../../mockData/hotels";
import { Hotel, Star, MapPin, Phone, Check, ShieldCheck, Filter } from "lucide-react";

export const HotelDiscoveryView = () => {
  const [categoryFilter, setCategoryFilter] = useState("All");

  const categories = ["All", "Luxury Hotel & Resort", "Boutique / Business Stay", "Budget Stay / Hostel"];

  const filtered = categoryFilter === "All"
    ? MOCK_HOTELS
    : MOCK_HOTELS.filter(h => h.category === categoryFilter);

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Hotel className="w-5 h-5 text-amber-400" />
            <h2 className="text-2xl font-extrabold text-white">Hotel & Room Discovery</h2>
          </div>
          <p className="text-xs text-slate-400">
            Find verified rooms, luxury resorts, boutique business stays & budget hostels nearby.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${categoryFilter === cat ? "bg-amber-600 text-white" : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"}`}
            >
              {cat.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Hotel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(hotel => (
          <div
            key={hotel.id}
            className="glass-card rounded-3xl p-5 border border-white/10 hover:border-amber-500/40 transition flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 rounded-2xl overflow-hidden mb-4 bg-slate-900">
                <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-slate-900/90 backdrop-blur-md text-amber-400 font-extrabold text-xs flex items-center gap-1 border border-slate-800">
                  <Star className="w-3.5 h-3.5 fill-amber-400" /> {hotel.rating} ({hotel.reviewCount})
                </span>
              </div>

              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">{hotel.category}</span>
              <h3 className="text-lg font-bold text-white mb-1">{hotel.name}</h3>
              
              <p className="text-xs text-slate-400 mb-3 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{hotel.location} ({hotel.distanceKm} km away)</span>
              </p>

              <div className="mb-4 space-y-1">
                <p className="text-xs font-bold text-slate-300">Room Types:</p>
                <div className="flex flex-wrap gap-1">
                  {hotel.roomTypes.map((rt, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 text-[10px] border border-slate-800">
                      🛏️ {rt}
                    </span>
                  ))}
                </div>
              </div>

              {/* Review Summary */}
              {hotel.reviewSummary && (
                <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs mb-4">
                  <p className="font-bold text-cyan-300 mb-1">Omnira AI Sentiment Summary:</p>
                  <p className="text-[11px] text-slate-400 italic mb-2">"{hotel.reviewSummary.overallSentiment}"</p>
                  <div className="space-y-1 text-[11px]">
                    {hotel.reviewSummary.positive.map((pos, idx) => (
                      <p key={idx} className="text-emerald-400 flex items-center gap-1">
                        <Check className="w-3 h-3" /> {pos}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-400">Starting from</p>
                <p className="text-lg font-extrabold text-emerald-400">
                  ₹{hotel.pricePerNight.toLocaleString()} <span className="text-xs text-slate-500 font-normal">/ night</span>
                </p>
              </div>

              <button
                onClick={() => alert(`Connecting with ${hotel.name} at ${hotel.contactPhone}`)}
                className="py-2.5 px-4 rounded-xl glow-button font-bold text-xs text-white"
              >
                Contact & Book
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
