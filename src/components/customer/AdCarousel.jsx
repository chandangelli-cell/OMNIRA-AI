import React, { useState, useEffect } from "react";
import { useAppData } from "../../context/AppDataContext";
import { dataService } from "../../services/dataService";
import { Megaphone, ExternalLink, MapPin, Store, ChevronLeft, ChevronRight, Tag } from "lucide-react";

export const AdCarousel = ({ onViewShop, onViewProduct }) => {
  const { ads } = useAppData();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!ads || ads.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % ads.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [ads]);

  if (!ads || ads.length === 0) return null;

  const currentAd = ads[currentIndex];

  const handleAdClick = (type) => {
    dataService.incrementAdMetrics(currentAd.id, "click");
    if (type === "shop" && onViewShop) onViewShop(currentAd.shopkeeperId);
    if (type === "product" && onViewProduct) onViewProduct(currentAd.productName);
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden glass-card border border-amber-500/30 p-1 mb-8 shadow-xl bg-gradient-to-r from-amber-950/30 via-slate-900/90 to-purple-950/30">
      <div className="p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Ad Image / Poster */}
        <div className="relative w-full md:w-48 h-36 rounded-xl overflow-hidden shrink-0 border border-white/10 group">
          <img
            src={currentAd.image}
            alt={currentAd.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-amber-500 text-black font-extrabold text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-md">
            <Megaphone className="w-3 h-3" /> ADVERTISEMENT
          </div>
        </div>

        {/* Ad Details */}
        <div className="flex-1 text-left">
          <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold mb-1">
            <Store className="w-3.5 h-3.5" />
            <span>{currentAd.shopName}</span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1 text-slate-400">
              <MapPin className="w-3 h-3 text-cyan-400" /> {currentAd.targetLocation}
            </span>
          </div>

          <h4 className="text-base sm:text-lg font-bold text-white mb-1 leading-snug">
            {currentAd.title}
          </h4>

          <p className="text-xs text-slate-300 line-clamp-2 mb-3">
            {currentAd.description}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-extrabold text-emerald-400">
                ₹{currentAd.offerPrice.toLocaleString()}
              </span>
              {currentAd.originalPrice && (
                <span className="text-xs text-slate-500 line-through">
                  ₹{currentAd.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={() => handleAdClick("shop")}
                className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-semibold text-xs transition flex items-center gap-1.5"
              >
                <span>View Store</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Navigation Arrows & Dots */}
      <div className="flex items-center justify-between px-4 pb-2 text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          {ads.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all ${i === currentIndex ? "w-6 bg-amber-400" : "w-1.5 bg-slate-700"}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentIndex((currentIndex - 1 + ads.length) % ads.length)}
            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setCurrentIndex((currentIndex + 1) % ads.length)}
            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
