import React, { useState } from "react";
import { dataService } from "../../services/dataService";
import { useAppData } from "../../context/AppDataContext";
import { useAuth } from "../../context/AuthContext";
import { ADVERTISING_PLANS } from "../../mockData/advertisements";
import { X, Megaphone, CheckCircle2, ShieldCheck, DollarSign } from "lucide-react";

export const CreateAdModal = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const { refreshData } = useAppData();

  const [selectedPlan, setSelectedPlan] = useState(ADVERTISING_PLANS[1]);
  const [formData, setFormData] = useState({
    title: "Samsung Galaxy Flagship Deal — Flat ₹6,000 Off!",
    description: "Exclusive festive sale at our store. Complimentary charger and 0% EMI.",
    productName: "Aero X Pro 5G",
    offerPrice: "37499",
    originalPrice: "42999",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    targetLocation: "Jubilee Hills, Hyderabad"
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    dataService.createAd({
      shopkeeperId: user?.id || "SHOP-000001",
      shopName: user?.shopName || user?.name || "Apex Mobiles",
      title: formData.title,
      description: formData.description,
      productName: formData.productName,
      offerPrice: parseFloat(formData.offerPrice),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
      image: formData.image,
      targetCategory: "Smartphones",
      targetLocation: formData.targetLocation,
      durationDays: selectedPlan.durationDays,
      pricePaid: selectedPlan.price
    });

    refreshData();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
      <div className="relative w-full max-w-2xl glass-card rounded-3xl p-6 border border-amber-500/30 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto text-left">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 p-[1px] shadow-lg">
            <div className="w-full h-full bg-slate-950 rounded-[15px] flex items-center justify-center">
              <Megaphone className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-white">Create Business Advertisement</h3>
            <p className="text-xs text-slate-400">Promote offers in the customer carousel feed with targeted location matching.</p>
          </div>
        </div>

        {/* Plan Selection */}
        <div className="mb-6 space-y-2">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
            1. Select Advertising Duration & Plan:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {ADVERTISING_PLANS.map(plan => (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition relative ${selectedPlan.id === plan.id ? 'bg-amber-600/20 border-amber-500 text-white shadow-lg' : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'}`}
              >
                {plan.badge && (
                  <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-amber-500 text-black font-extrabold text-[9px] uppercase">
                    {plan.badge}
                  </span>
                )}
                <p className="text-xs font-bold text-amber-400">{plan.name}</p>
                <p className="text-lg font-extrabold text-white my-1">
                  ₹{plan.price.toLocaleString()} <span className="text-[10px] text-slate-500 font-normal">/ {plan.durationDays} Days</span>
                </p>
                <p className="text-[10px] text-slate-400 leading-tight">{plan.recommendedFor}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Ad Content Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
            2. Advertisement Details:
          </label>

          <div>
            <label className="block font-medium text-slate-300 mb-1">Headline / Offer Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block font-medium text-slate-300 mb-1">Offer Description</label>
            <textarea
              rows={2}
              required
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-300 mb-1">Offer Price (₹)</label>
              <input
                type="number"
                required
                value={formData.offerPrice}
                onChange={e => setFormData({ ...formData, offerPrice: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-300 mb-1">Original Price (₹)</label>
              <input
                type="number"
                value={formData.originalPrice}
                onChange={e => setFormData({ ...formData, originalPrice: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-slate-300 mb-1">Target Location</label>
            <input
              type="text"
              value={formData.targetLocation}
              onChange={e => setFormData({ ...formData, targetLocation: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Cost Summary Box */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-amber-500/30 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400">Total Campaign Billing Amount:</p>
              <p className="text-xl font-extrabold text-amber-400">₹{selectedPlan.price.toLocaleString()}</p>
            </div>

            <button
              type="submit"
              className="py-3 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 font-bold text-xs text-white shadow-xl hover:from-amber-600 hover:to-orange-700 transition"
            >
              SUBMIT & LAUNCH CAMPAIGN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
