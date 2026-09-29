import React from "react";
import { useAppData } from "../../context/AppDataContext";
import { useAuth } from "../../context/AuthContext";
import { TrendingUp, Eye, MousePointer, ShoppingCart, MessageSquare, Award } from "lucide-react";

export const BusinessAnalytics = () => {
  const { user } = useAuth();
  const { userOrders, userEnquiries, ads } = useAppData();

  const shopAds = ads.filter(a => a.shopkeeperId === user?.id || a.shopkeeperId === "SHOP-000001");
  const totalAdViews = shopAds.reduce((acc, a) => acc + (a.views || 0), 0);
  const totalAdClicks = shopAds.reduce((acc, a) => acc + (a.clicks || 0), 0);
  const ctr = totalAdViews > 0 ? ((totalAdClicks / totalAdViews) * 100).toFixed(1) : "0.0";

  return (
    <div className="space-y-6 text-left">
      <div className="glass-panel p-6 rounded-3xl border border-white/10">
        <h2 className="text-2xl font-extrabold text-white">Business Analytics & Metrics</h2>
        <p className="text-xs text-slate-400 mt-1">
          Performance metrics for <span className="text-amber-400 font-bold">{user?.shopName || user?.name}</span>
        </p>
      </div>

      {/* High-level KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span>Total Ad Views</span>
            <Eye className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-2xl font-extrabold text-white">{totalAdViews.toLocaleString()}</p>
          <span className="text-[10px] text-emerald-400 font-medium">↑ +14% vs last week</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span>Ad Click Through Rate</span>
            <MousePointer className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-extrabold text-amber-400">{ctr}%</p>
          <span className="text-[10px] text-slate-400 font-medium">{totalAdClicks} total clicks</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span>Customer Enquiries</span>
            <MessageSquare className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl font-extrabold text-white">{userEnquiries.length}</p>
          <span className="text-[10px] text-blue-400 font-medium">Active customer chats</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span>Store Orders</span>
            <ShoppingCart className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-400">{userOrders.length}</p>
          <span className="text-[10px] text-emerald-400 font-medium">Verified pickup requests</span>
        </div>
      </div>

      {/* Visual Analytics Performance Breakdown */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-amber-400" /> Omnira AI Discovery conversion funnel
        </h3>

        <div className="space-y-3 text-xs">
          <div>
            <div className="flex justify-between text-slate-300 font-medium mb-1">
              <span>Customer AI Search Impressions</span>
              <span className="font-bold text-white">4,820</span>
            </div>
            <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full w-[90%]" />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-slate-300 font-medium mb-1">
              <span>Product Profile Clicks</span>
              <span className="font-bold text-white">1,420</span>
            </div>
            <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500 rounded-full w-[55%]" />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-slate-300 font-medium mb-1">
              <span>Direct Store Enquiries & Pickup Requests</span>
              <span className="font-bold text-emerald-400">184</span>
            </div>
            <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full w-[25%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
