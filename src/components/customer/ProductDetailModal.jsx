import React, { useState } from "react";
import { useAppData } from "../../context/AppDataContext";
import { useAuth } from "../../context/AuthContext";
import { dataService } from "../../services/dataService";
import { X, Star, Store, ShieldCheck, MapPin, Truck, Check, MessageSquare, ShoppingCart } from "lucide-react";

export const ProductDetailModal = ({ product, isOpen, onClose, onOpenShop }) => {
  const { user } = useAuth();
  const { refreshData } = useAppData();
  const [enquiryText, setEnquiryText] = useState("");
  const [enquirySent, setEnquirySent] = useState(false);
  const [orderCreated, setOrderCreated] = useState(false);

  if (!isOpen || !product) return null;

  const localSeller = product.sellers?.find(s => s.type === "local");

  const handlePlaceOrder = (seller) => {
    if (!user) {
      alert("Please log in as a Customer to place orders.");
      return;
    }
    dataService.createOrder({
      customerId: user.id,
      customerName: user.name,
      customerPhone: user.phone || "+91 98765 43210",
      shopkeeperId: seller.shopId || "SHOP-000001",
      shopName: seller.name,
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      amount: seller.price || product.price,
      type: "Store Pickup"
    });
    refreshData();
    setOrderCreated(true);
  };

  const handleSendEnquiry = (seller) => {
    if (!user) {
      alert("Please log in as a Customer to send enquiries.");
      return;
    }
    if (!enquiryText.trim()) return;

    dataService.createEnquiry({
      customerId: user.id,
      customerName: user.name,
      shopkeeperId: seller.shopId || "SHOP-000001",
      shopName: seller.name,
      productName: product.name,
      message: enquiryText
    });
    refreshData();
    setEnquirySent(true);
    setEnquiryText("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
      <div className="relative w-full max-w-3xl glass-card rounded-3xl p-6 border border-white/20 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Image */}
          <div className="rounded-2xl overflow-hidden bg-slate-900 border border-white/10 h-72">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between">
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold uppercase">
                {product.category}
              </span>
              <h2 className="text-2xl font-extrabold text-white mt-2">{product.name}</h2>
              <p className="text-xs text-slate-400 font-semibold uppercase mb-3">{product.brand}</p>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center text-amber-400 text-sm font-bold">
                  <Star className="w-4 h-4 fill-amber-400 mr-1" />
                  {product.rating}
                </div>
                <span className="text-xs text-slate-500">({product.reviewCount} customer reviews)</span>
              </div>

              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-2xl font-extrabold text-white">
                  ₹{product.price?.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-500 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* Overall Sentiment */}
            {product.reviewSummary && (
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
                <p className="font-bold text-cyan-300 mb-1">Omnira AI Sentiment Summary:</p>
                <p className="text-slate-300 mb-2">{product.reviewSummary.overallSentiment}</p>
                <div className="space-y-1 text-[11px]">
                  {product.reviewSummary.positive?.map((p, i) => (
                    <p key={i} className="text-emerald-400 flex items-center gap-1">
                      <Check className="w-3 h-3" /> {p}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Specifications Table */}
        {product.specs && (
          <div className="mb-6">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              Full Specifications
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
              {Object.entries(product.specs).map(([key, val]) => (
                <div key={key} className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400 capitalize">{key.replace(/([A-Z])/g, " $1")}:</span>
                  <span className="font-medium text-white text-right max-w-[200px] truncate">{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sellers Channel */}
        <div className="mb-6">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
            Where Can I Buy This? (Available Sellers)
          </h4>
          <div className="space-y-3">
            {product.sellers?.map((seller, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{seller.name}</span>
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${seller.type === 'local' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-blue-500/20 text-blue-300'}`}>
                      {seller.type === 'local' ? 'Local Store' : 'Online Platform'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {seller.distanceKm ? `Distance: ${seller.distanceKm} km away • ${seller.stockStatus}` : seller.shipping}
                  </p>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="font-extrabold text-white text-sm mr-2">
                    ₹{seller.price.toLocaleString()}
                  </span>

                  {seller.type === "local" ? (
                    <>
                      <button
                        onClick={() => handlePlaceOrder(seller)}
                        className="py-1.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition flex items-center gap-1 shadow-md"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" /> Order Pickup
                      </button>

                      {seller.shopId && onOpenShop && (
                        <button
                          onClick={() => {
                            onClose();
                            onOpenShop(seller.shopId);
                          }}
                          className="py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition"
                        >
                          View Store
                        </button>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={() => alert(`Redirecting to official online platform: ${seller.name}`)}
                      className="py-1.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition"
                    >
                      Buy Online
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {orderCreated && (
            <div className="mt-3 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
              ✅ Order placed successfully! The shopkeeper has been notified. Check your Orders tab for status updates.
            </div>
          )}
        </div>

        {/* Customer Enquiry Section */}
        {localSeller && (
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <h5 className="text-xs font-bold text-white mb-2 flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              Ask {localSeller.name} a Direct Question:
            </h5>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. Is this product available in stock today?"
                value={enquiryText}
                onChange={e => setEnquiryText(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
              <button
                onClick={() => handleSendEnquiry(localSeller)}
                className="px-4 py-2 rounded-xl glow-button font-bold text-xs text-white"
              >
                Send Enquiry
              </button>
            </div>
            {enquirySent && (
              <p className="text-xs text-emerald-400 font-semibold mt-2">
                Enquiry sent! The shopkeeper will respond via platform notification.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
