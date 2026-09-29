import React from "react";
import { useAppData } from "../../context/AppDataContext";
import { Scale, CheckCircle2, X, Star, ShoppingCart, Store, AlertCircle } from "lucide-react";

export const ComparisonView = ({ onOpenDetail, onOpenShop }) => {
  const { compareItems, toggleCompare, clearCompare, products } = useAppData();

  // If user hasn't selected items, populate with default phones
  const displayItems = compareItems.length >= 2 ? compareItems : products.slice(0, 3);

  const specKeys = [
    { label: "Price", key: "price", format: v => `₹${v?.toLocaleString()}` },
    { label: "Processor", path: ["specs", "processor"] },
    { label: "RAM", path: ["specs", "ram"] },
    { label: "Storage", path: ["specs", "storage"] },
    { label: "Display", path: ["specs", "display"] },
    { label: "Camera", path: ["specs", "camera"] },
    { label: "Battery", path: ["specs", "battery"] },
    { label: "Fast Charging", path: ["specs", "charging"] },
    { label: "OS", path: ["specs", "os"] },
    { label: "Warranty", path: ["specs", "warranty"] },
    { label: "Rating", key: "rating", format: v => `⭐ ${v} / 5` }
  ];

  const getSpecValue = (item, specDef) => {
    if (specDef.key) {
      return specDef.format ? specDef.format(item[specDef.key]) : item[specDef.key];
    }
    if (specDef.path) {
      let val = item;
      for (const p of specDef.path) {
        val = val ? val[p] : undefined;
      }
      return val || "N/A";
    }
    return "N/A";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Scale className="w-5 h-5 text-purple-400" />
            <h2 className="text-2xl font-extrabold text-white">Side-by-Side Comparison Engine</h2>
          </div>
          <p className="text-xs text-slate-400">
            Comparing {displayItems.length} products objectively based on specs, benchmarks, and sentiment.
          </p>
        </div>

        {compareItems.length > 0 && (
          <button
            onClick={clearCompare}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-rose-400 transition"
          >
            Clear Selected ({compareItems.length})
          </button>
        )}
      </div>

      {/* Side by Side Matrix Table */}
      <div className="glass-card rounded-3xl border border-white/15 overflow-x-auto shadow-2xl">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-white/10 bg-slate-950/80">
              <th className="p-4 text-xs font-extrabold text-slate-400 uppercase tracking-wider w-44">
                Specifications
              </th>
              {displayItems.map(item => (
                <th key={item.id} className="p-4 w-64 align-top">
                  <div className="relative p-3 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                    <button
                      onClick={() => toggleCompare(item)}
                      className="absolute top-2 right-2 p-1 rounded-full bg-slate-800 text-slate-400 hover:text-white"
                      title="Remove from comparison"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <img src={item.image} className="w-full h-28 object-cover rounded-xl" />
                    <p className="text-xs font-semibold text-slate-400 uppercase">{item.brand}</p>
                    <p className="text-sm font-bold text-white line-clamp-1">{item.name}</p>
                    <p className="text-base font-extrabold text-emerald-400">
                      ₹{item.price?.toLocaleString()}
                    </p>
                    <button
                      onClick={() => onOpenDetail && onOpenDetail(item)}
                      className="w-full py-1.5 rounded-lg glow-button font-bold text-xs text-white"
                    >
                      View Sellers
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-xs">
            {specKeys.map((spec, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? "bg-slate-950/30" : "bg-slate-900/20"}>
                <td className="p-4 font-bold text-slate-300">{spec.label}</td>
                {displayItems.map(item => (
                  <td key={item.id} className="p-4 text-slate-200 font-medium">
                    {getSpecValue(item, spec)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Why these products differ & Use Case Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
          <h3 className="text-base font-bold text-cyan-300 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-cyan-400" />
            Why These Products Differ
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Rather than endorsing a generic "winner", Omnira AI evaluates architectural differences:
          </p>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="font-bold text-white">Display & Refresh Rate:</span> {displayItems[0]?.name} uses curved 120Hz AMOLED, while {displayItems[1]?.name || 'others'} feature flat 144Hz OLED for latency-sensitive gaming.
            </li>
            <li className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="font-bold text-white">Charging & Battery:</span> {displayItems[1]?.name || 'Nexus'} supports 100W HyperCharge, while {displayItems[2]?.name || 'Starlight'} prioritizes battery density with 6000 mAh.
            </li>
          </ul>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
          <h3 className="text-base font-bold text-purple-300 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-purple-400" />
            Based on Your Requirements
          </h3>
          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <p className="font-bold text-amber-400 mb-0.5">🎮 For Heavy Mobile Gaming:</p>
              <p className="text-white font-medium">{displayItems[1]?.name || displayItems[0]?.name}</p>
              <p className="text-[11px] text-slate-400 mt-1">Recommended due to 144Hz refresh rate & Dimensity 9200+ CPU.</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <p className="font-bold text-cyan-400 mb-0.5">📸 For Photography & Video:</p>
              <p className="text-white font-medium">{displayItems[0]?.name}</p>
              <p className="text-[11px] text-slate-400 mt-1">Recommended for 50MP Sony OIS sensor + Telephoto optical zoom.</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <p className="font-bold text-emerald-400 mb-0.5">🔋 For Long Travel & All-Day Battery:</p>
              <p className="text-white font-medium">{displayItems[2]?.name || displayItems[0]?.name}</p>
              <p className="text-[11px] text-slate-400 mt-1">Recommended for massive 6000 mAh power cell capacity.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
