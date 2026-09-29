import React from "react";
import { useAppData } from "../../context/AppDataContext";
import { useAuth } from "../../context/AuthContext";
import { Star, Scale, Bookmark, Store, ExternalLink, CheckCircle, ShieldCheck } from "lucide-react";

export const ProductCard = ({ product, onOpenDetail, onOpenShop }) => {
  const { compareItems, toggleCompare, savedItemIds, toggleSave } = useAppData();
  const { user } = useAuth();

  const isCompared = compareItems.some(p => p.id === product.id);
  const isSaved = savedItemIds.includes(product.id);

  const localSeller = product.sellers?.find(s => s.type === "local");

  return (
    <div className="glass-card rounded-2xl p-4 border border-white/10 flex flex-col justify-between hover:border-cyan-500/40 transition group relative text-left">
      {/* Save / Compare Top Actions */}
      <div className="flex items-center justify-between mb-3">
        <span className="px-2 py-0.5 rounded-full bg-slate-900/90 text-cyan-400 text-[10px] font-bold uppercase tracking-wider border border-slate-800">
          {product.category}
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleCompare(product)}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold border transition ${isCompared ? "bg-purple-600/30 border-purple-500 text-purple-300" : "bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white"}`}
            title="Toggle side-by-side comparison"
          >
            <Scale className="w-3 h-3" />
            <span>{isCompared ? "Compared" : "Compare"}</span>
          </button>

          {user && (
            <button
              onClick={() => toggleSave(product.id)}
              className={`p-1.5 rounded-lg border transition ${isSaved ? "bg-amber-500/20 border-amber-500 text-amber-400" : "bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white"}`}
              title="Save item to personal storage"
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
            </button>
          )}
        </div>
      </div>

      {/* Product Image */}
      <div
        onClick={() => onOpenDetail && onOpenDetail(product)}
        className="w-full h-40 rounded-xl overflow-hidden bg-slate-900 mb-3 cursor-pointer group-hover:scale-105 transition-transform duration-300 relative"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.discount && (
          <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-emerald-500 text-black font-extrabold text-[10px]">
            {product.discount} OFF
          </span>
        )}
      </div>

      {/* Title & Brand */}
      <div>
        <p className="text-[10px] text-slate-400 font-semibold uppercase">{product.brand}</p>
        <h4
          onClick={() => onOpenDetail && onOpenDetail(product)}
          className="text-sm font-bold text-white hover:text-cyan-400 cursor-pointer transition line-clamp-1 mb-1"
        >
          {product.name}
        </h4>

        {/* Rating */}
        <div className="flex items-center gap-1 text-xs text-amber-400 mb-2">
          <Star className="w-3.5 h-3.5 fill-amber-400" />
          <span className="font-bold">{product.rating}</span>
          <span className="text-[10px] text-slate-500">({product.reviewCount})</span>
        </div>

        {/* Spec Pill Highlights */}
        {product.specs && (
          <div className="flex flex-wrap gap-1 mb-3 text-[10px] text-slate-300">
            {product.specs.processor && (
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 truncate max-w-[130px]">
                ⚡ {product.specs.processor}
              </span>
            )}
            {product.specs.ram && (
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                💾 {product.specs.ram}
              </span>
            )}
          </div>
        )}

        {/* Price & Original Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-base font-extrabold text-white">
            ₹{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-slate-500 line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>

      {/* Seller & Buying Channels */}
      <div className="pt-2 border-t border-slate-800/80 space-y-2">
        {localSeller ? (
          <div className="flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1 text-emerald-400 font-medium truncate">
              <Store className="w-3 h-3 shrink-0" />
              <span className="truncate">{localSeller.name}</span>
            </div>
            <span className="text-[10px] text-slate-400 shrink-0 font-mono">
              {localSeller.distanceKm} km
            </span>
          </div>
        ) : (
          <p className="text-[10px] text-slate-400">Available Online Direct</p>
        )}

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onOpenDetail && onOpenDetail(product)}
            className="py-1.5 px-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 transition text-center"
          >
            Buy Online
          </button>
          <button
            onClick={() => {
              if (localSeller && onOpenShop) {
                onOpenShop(localSeller.shopId);
              } else if (onOpenDetail) {
                onOpenDetail(product);
              }
            }}
            className="py-1.5 px-2 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/40 text-xs font-semibold text-cyan-300 transition text-center"
          >
            Buy Nearby
          </button>
        </div>
      </div>
    </div>
  );
};
