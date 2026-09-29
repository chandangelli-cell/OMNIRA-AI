import React from "react";
import { useAppData } from "../../context/AppDataContext";
import { useAuth } from "../../context/AuthContext";
import { ProductCard } from "./ProductCard";
import { Bookmark, Sparkles } from "lucide-react";

export const SavedItemsView = ({ onOpenDetail, onOpenShop }) => {
  const { user } = useAuth();
  const { savedItemIds, products } = useAppData();

  const savedProducts = products.filter(p => savedItemIds.includes(p.id));

  if (!user) {
    return (
      <div className="glass-card p-12 rounded-3xl text-center space-y-4 max-w-lg mx-auto my-12 text-slate-300">
        <Bookmark className="w-12 h-12 text-slate-600 mx-auto" />
        <h3 className="text-xl font-bold text-white">Log in to Access Saved Items</h3>
        <p className="text-xs text-slate-400">Each customer profile has private persistent storage for saved products and stays.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left">
      <div className="glass-panel p-6 rounded-3xl border border-white/10 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Bookmark className="w-5 h-5 text-amber-400" />
            <h2 className="text-2xl font-extrabold text-white">Saved Products & Items</h2>
          </div>
          <p className="text-xs text-slate-400">
            Personal storage for <span className="text-blue-400 font-mono">{user.name} ({user.id})</span>
          </p>
        </div>
        <span className="px-3 py-1.5 rounded-full bg-slate-900 text-amber-400 text-xs font-bold border border-slate-800">
          {savedProducts.length} Saved Items
        </span>
      </div>

      {savedProducts.length === 0 ? (
        <div className="glass-card p-12 rounded-3xl text-center text-slate-400 text-sm">
          Save products, shops and stays to find them quickly later. Click the bookmark icon on any product card!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedProducts.map(prod => (
            <ProductCard
              key={prod.id}
              product={prod}
              onOpenDetail={onOpenDetail}
              onOpenShop={onOpenShop}
            />
          ))}
        </div>
      )}
    </div>
  );
};
