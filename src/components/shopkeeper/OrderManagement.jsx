import React, { useState } from "react";
import { useAppData } from "../../context/AppDataContext";
import { useAuth } from "../../context/AuthContext";
import { dataService } from "../../services/dataService";
import { CheckCircle2, XCircle, MessageSquare, Phone, User, Package, Clock } from "lucide-react";

export const OrderManagement = () => {
  const { user } = useAuth();
  const { userOrders, userEnquiries, refreshData } = useAppData();
  const [responseTextMap, setResponseTextMap] = useState({});

  const handleApproveOrder = (orderId) => {
    dataService.updateOrderStatus(orderId, "CONFIRMED");
    refreshData();
  };

  const handleMarkReady = (orderId) => {
    dataService.updateOrderStatus(orderId, "READY");
    refreshData();
  };

  const handleRejectOrder = (orderId) => {
    dataService.updateOrderStatus(orderId, "CANCELLED");
    refreshData();
  };

  const handleSendResponse = (enquiryId) => {
    const text = responseTextMap[enquiryId];
    if (!text || !text.trim()) return;
    dataService.respondToEnquiry(enquiryId, text);
    refreshData();
  };

  return (
    <div className="space-y-6 text-left">
      <div className="glass-panel p-6 rounded-3xl border border-white/10">
        <h2 className="text-2xl font-extrabold text-white">Order & Customer Enquiry Inbox</h2>
        <p className="text-xs text-slate-400 mt-1">
          Isolated store manager inbox for <span className="text-amber-400 font-bold">{user?.shopName || user?.name}</span>
        </p>
      </div>

      {/* Orders Section */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Package className="w-5 h-5 text-amber-400" /> Incoming Product Pickup Orders ({userOrders.length})
        </h3>

        {userOrders.length === 0 ? (
          <div className="glass-card p-12 rounded-3xl text-center text-slate-400 text-sm">
            No incoming customer orders yet. Customers discovering your products can place instant store pickup requests.
          </div>
        ) : (
          userOrders.map(ord => (
            <div key={ord.id} className="glass-card p-5 rounded-2xl border border-white/10 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-300">{ord.id}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${ord.status === 'CONFIRMED' ? 'bg-blue-500/20 text-blue-300' : ord.status === 'READY' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                      {ord.status}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white mt-1">{ord.productName}</h4>
                </div>

                <div className="text-left sm:text-right">
                  <p className="text-xs text-slate-400">Order Amount</p>
                  <p className="text-lg font-extrabold text-emerald-400">₹{ord.amount?.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-300">
                <div>
                  <p className="font-semibold text-slate-400">Customer Details:</p>
                  <p className="text-white font-bold">{ord.customerName} ({ord.customerId})</p>
                  <p className="text-slate-400 flex items-center gap-1 mt-0.5">
                    <Phone className="w-3 h-3 text-cyan-400" /> {ord.customerPhone}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {ord.status === "PENDING" && (
                    <>
                      <button
                        onClick={() => handleApproveOrder(ord.id)}
                        className="py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-4 h-4" /> APPROVE ORDER
                      </button>
                      <button
                        onClick={() => handleRejectOrder(ord.id)}
                        className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-400 font-semibold text-xs transition"
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {ord.status === "CONFIRMED" && (
                    <button
                      onClick={() => handleMarkReady(ord.id)}
                      className="py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition"
                    >
                      MARK READY FOR PICKUP
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Customer Enquiries */}
      <div className="space-y-4 pt-6">
        <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-cyan-400" /> Direct Customer Enquiries ({userEnquiries.length})
        </h3>

        {userEnquiries.length === 0 ? (
          <div className="glass-card p-8 rounded-3xl text-center text-slate-400 text-xs">
            No customer enquiries pending.
          </div>
        ) : (
          userEnquiries.map(enq => (
            <div key={enq.id} className="glass-card p-5 rounded-2xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">Customer: {enq.customerName} ({enq.customerId})</span>
                <span className="text-slate-400 font-mono">{enq.productName}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 text-xs text-slate-300 border border-slate-800">
                <p className="font-bold text-amber-400 mb-1">Customer Question:</p>
                <p>"{enq.message}"</p>
              </div>

              {enq.response ? (
                <div className="p-3 rounded-xl bg-emerald-500/10 text-xs text-emerald-300 border border-emerald-500/30">
                  <p className="font-bold text-emerald-400 mb-1">Your Response:</p>
                  <p>"{enq.response}"</p>
                </div>
              ) : (
                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    placeholder="Type your response to customer..."
                    value={responseTextMap[enq.id] || ""}
                    onChange={e => setResponseTextMap({ ...responseTextMap, [enq.id]: e.target.value })}
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                  <button
                    onClick={() => handleSendResponse(enq.id)}
                    className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs transition"
                  >
                    Send Response
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
