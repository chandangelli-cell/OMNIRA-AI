import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useAppData } from "../../context/AppDataContext";
import { ProductUploadModal } from "./ProductUploadModal";
import { CreateAdModal } from "./CreateAdModal";
import { OrderManagement } from "./OrderManagement";
import { AdManagement } from "./AdManagement";
import { BusinessAnalytics } from "./BusinessAnalytics";
import { ShopProfileEdit } from "./ShopProfileEdit";
import { Store, Plus, Package, Megaphone, TrendingUp, ShoppingCart, MessageSquare, Settings, Eye, CheckCircle2 } from "lucide-react";

export const ShopkeeperDashboard = () => {
  const { user } = useAuth();
  const { products, userOrders, userEnquiries, ads } = useAppData();

  const [activeTab, setActiveTab] = useState("overview"); // overview, products, orders, ads, analytics, profile
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [createAdModalOpen, setCreateAdModalOpen] = useState(false);

  const shopkeeperProducts = products.filter(p =>
    p.sellers?.some(s => s.shopId === user?.id || s.name === user?.shopName)
  );

  const pendingOrders = userOrders.filter(o => o.status === "PENDING").length;

  return (
    <div className="space-y-6 text-left">
      {/* Top Banner Greeting */}
      <div className="glass-card p-6 rounded-3xl border border-amber-500/30 bg-gradient-to-r from-slate-950 via-amber-950/20 to-slate-950 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono font-bold border border-amber-500/30">
            SHOPKEEPER PORTAL • {user?.id}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Welcome, {user?.shopName || user?.name || "Shopkeeper"} 👋
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage product catalog, order approvals, advertising campaigns, and customer enquiries.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setUploadModalOpen(true)}
            className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-xs text-white shadow-lg flex items-center gap-1.5 transition"
          >
            <Plus className="w-4 h-4" /> + UPLOAD PRODUCT
          </button>

          <button
            onClick={() => setCreateAdModalOpen(true)}
            className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 font-bold text-xs text-white shadow-lg flex items-center gap-1.5 hover:from-amber-600 hover:to-orange-700 transition"
          >
            <Megaphone className="w-4 h-4" /> + CREATE AD
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        {[
          { id: "overview", label: "Business Overview", icon: Store },
          { id: "products", label: `Catalog (${shopkeeperProducts.length})`, icon: Package },
          { id: "orders", label: `Orders (${userOrders.length})`, badge: pendingOrders, icon: ShoppingCart },
          { id: "ads", label: "Advertisements", icon: Megaphone },
          { id: "analytics", label: "Analytics", icon: TrendingUp },
          { id: "profile", label: "Shop Settings", icon: Settings }
        ].map(tab => {
          const IconComp = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition relative ${activeTab === tab.id ? "bg-amber-600 text-white shadow-lg" : "bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white"}`}
            >
              <IconComp className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge > 0 && (
                <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-extrabold animate-bounce">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content Rendering */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-card p-5 rounded-2xl border border-white/10">
              <p className="text-xs text-slate-400 font-semibold mb-1">Total Store Products</p>
              <p className="text-2xl font-extrabold text-white">{shopkeeperProducts.length}</p>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-white/10">
              <p className="text-xs text-slate-400 font-semibold mb-1">Pending Orders</p>
              <p className="text-2xl font-extrabold text-amber-400">{pendingOrders}</p>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-white/10">
              <p className="text-xs text-slate-400 font-semibold mb-1">Customer Enquiries</p>
              <p className="text-2xl font-extrabold text-blue-400">{userEnquiries.length}</p>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-white/10">
              <p className="text-xs text-slate-400 font-semibold mb-1">Active Ad Campaigns</p>
              <p className="text-2xl font-extrabold text-emerald-400">{ads.length}</p>
            </div>
          </div>

          <OrderManagement />
        </div>
      )}

      {activeTab === "products" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-white uppercase tracking-wider">Your Inventory Catalog</h3>
            <button
              onClick={() => setUploadModalOpen(true)}
              className="py-2 px-4 rounded-xl bg-amber-600 text-white font-bold text-xs flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add Product
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {shopkeeperProducts.map(prod => (
              <div key={prod.id} className="glass-card p-4 rounded-2xl border border-white/10 flex gap-3">
                <img src={prod.image} className="w-20 h-20 rounded-xl object-cover border border-slate-800 shrink-0" />
                <div className="overflow-hidden">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase">{prod.category}</span>
                  <h4 className="text-sm font-bold text-white truncate">{prod.name}</h4>
                  <p className="text-sm font-extrabold text-emerald-400 mt-1">₹{prod.price?.toLocaleString()}</p>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 inline-block mt-1">
                    In Stock
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "orders" && <OrderManagement />}
      {activeTab === "ads" && <AdManagement onOpenCreateAd={() => setCreateAdModalOpen(true)} />}
      {activeTab === "analytics" && <BusinessAnalytics />}
      {activeTab === "profile" && <ShopProfileEdit />}

      <ProductUploadModal isOpen={uploadModalOpen} onClose={() => setUploadModalOpen(false)} />
      <CreateAdModal isOpen={createAdModalOpen} onClose={() => setCreateAdModalOpen(false)} />
    </div>
  );
};
