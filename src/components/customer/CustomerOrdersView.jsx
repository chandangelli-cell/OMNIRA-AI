import React, { useState } from "react";
import { useAppData } from "../../context/AppDataContext";
import { useAuth } from "../../context/AuthContext";
import { Package, MessageSquare, Clock, CheckCircle2, AlertCircle, Phone, Store } from "lucide-react";

export const CustomerOrdersView = () => {
  const { user } = useAuth();
  const { userOrders, userEnquiries } = useAppData();
  const [activeTab, setActiveTab] = useState("orders"); // 'orders' or 'enquiries'

  if (!user) {
    return (
      <div className="glass-card p-12 rounded-3xl text-center space-y-4 max-w-lg mx-auto my-12">
        <Package className="w-12 h-12 text-slate-600 mx-auto" />
        <h3 className="text-xl font-bold text-white">Log in to Track Orders</h3>
        <p className="text-xs text-slate-400">
          Sign in as Customer A or Customer B to view isolated personal order tracking and shopkeeper enquiries.
        </p>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "CONFIRMED":
        return <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-bold">CONFIRMED</span>;
      case "READY":
        return <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold animate-pulse">READY FOR PICKUP</span>;
      case "COMPLETED":
        return <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 text-xs font-bold">COMPLETED</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold">PENDING</span>;
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Orders & Store Enquiries</h2>
          <p className="text-xs text-slate-400 mt-1">
            Private tracking for <span className="text-blue-400 font-mono">{user.name} ({user.id})</span>
          </p>
        </div>

        <div className="flex gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${activeTab === "orders" ? "bg-blue-600 text-white shadow-lg" : "text-slate-400 hover:text-white"}`}
          >
            My Orders ({userOrders.length})
          </button>
          <button
            onClick={() => setActiveTab("enquiries")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${activeTab === "enquiries" ? "bg-blue-600 text-white shadow-lg" : "text-slate-400 hover:text-white"}`}
          >
            Enquiries ({userEnquiries.length})
          </button>
        </div>
      </div>

      {activeTab === "orders" ? (
        <div className="space-y-4">
          {userOrders.length === 0 ? (
            <div className="glass-card p-12 rounded-3xl text-center text-slate-400 text-sm">
              You haven't placed any store orders yet. Select a product to order in-store pickup!
            </div>
          ) : (
            userOrders.map(ord => (
              <div
                key={ord.id}
                className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  {ord.productImage && (
                    <img src={ord.productImage} className="w-16 h-16 rounded-xl object-cover border border-slate-800" />
                  )}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-slate-400 font-bold">{ord.id}</span>
                      {getStatusBadge(ord.status)}
                    </div>
                    <h4 className="text-base font-bold text-white">{ord.productName}</h4>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <Store className="w-3.5 h-3.5 text-amber-400" /> {ord.shopName}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:items-end gap-2 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-slate-800">
                  <p className="text-lg font-extrabold text-emerald-400">₹{ord.amount?.toLocaleString()}</p>
                  <button
                    onClick={() => alert(`Contacting shopkeeper ${ord.shopName}`)}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition"
                  >
                    <Phone className="w-3.5 h-3.5 text-cyan-400" /> Contact Shopkeeper
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {userEnquiries.length === 0 ? (
            <div className="glass-card p-12 rounded-3xl text-center text-slate-400 text-sm">
              No store enquiries submitted yet.
            </div>
          ) : (
            userEnquiries.map(enq => (
              <div key={enq.id} className="glass-card p-5 rounded-2xl border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-bold text-white">{enq.productName}</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${enq.status === 'RESPONDED' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                    {enq.status}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 text-xs text-slate-300 border border-slate-800">
                  <p className="font-semibold text-slate-400 mb-1">Your Question to {enq.shopName}:</p>
                  <p>"{enq.message}"</p>
                </div>

                {enq.response && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 text-xs text-emerald-300 border border-emerald-500/30">
                    <p className="font-bold text-emerald-400 mb-1">Shopkeeper Response ({enq.shopName}):</p>
                    <p>"{enq.response}"</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
