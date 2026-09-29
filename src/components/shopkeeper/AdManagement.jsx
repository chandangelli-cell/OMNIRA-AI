import React from "react";
import { useAppData } from "../../context/AppDataContext";
import { useAuth } from "../../context/AuthContext";
import { Megaphone, Plus, Eye, MousePointer, Calendar, CheckCircle2 } from "lucide-react";

export const AdManagement = ({ onOpenCreateAd }) => {
  const { user } = useAuth();
  const { ads } = useAppData();

  const shopAds = ads.filter(a => a.shopkeeperId === user?.id || a.shopkeeperId === "SHOP-000001");

  return (
    <div className="space-y-6 text-left">
      <div className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Business Advertisements</h2>
          <p className="text-xs text-slate-400 mt-1">
            Active carousel ad campaigns for <span className="text-amber-400 font-bold">{user?.shopName || user?.name}</span>
          </p>
        </div>

        <button
          onClick={onOpenCreateAd}
          className="py-3 px-5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 font-bold text-xs text-white shadow-xl flex items-center gap-2 hover:from-amber-600 hover:to-orange-700 transition"
        >
          <Plus className="w-4 h-4" />
          <span>+ CREATE ADVERTISEMENT</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {shopAds.length === 0 ? (
          <div className="col-span-2 glass-card p-12 rounded-3xl text-center text-slate-400 text-sm">
            You haven't launched any advertisements yet. Click "+ CREATE ADVERTISEMENT" to start promoting offers!
          </div>
        ) : (
          shopAds.map(ad => (
            <div key={ad.id} className="glass-card rounded-2xl p-5 border border-white/10 space-y-4">
              <div className="flex items-start gap-4">
                <img src={ad.image} className="w-24 h-20 rounded-xl object-cover border border-slate-800" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                      {ad.status}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{ad.durationDays} Days Plan</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mt-1 line-clamp-1">{ad.title}</h4>
                  <p className="text-xs font-extrabold text-emerald-400 mt-1">₹{ad.offerPrice.toLocaleString()}</p>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center text-xs">
                <div>
                  <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                    <Eye className="w-3 h-3 text-cyan-400" /> Views
                  </p>
                  <p className="font-extrabold text-white text-sm mt-0.5">{ad.views}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                    <MousePointer className="w-3 h-3 text-amber-400" /> Clicks
                  </p>
                  <p className="font-extrabold text-white text-sm mt-0.5">{ad.clicks}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400">CTR %</p>
                  <p className="font-extrabold text-emerald-400 text-sm mt-0.5">
                    {ad.views > 0 ? ((ad.clicks / ad.views) * 100).toFixed(1) : "0"}%
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-500" /> Active: {ad.startDate} to {ad.endDate}
                </span>
                <span className="font-semibold text-amber-400">Paid: ₹{ad.pricePaid}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
