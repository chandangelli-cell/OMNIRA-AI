import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { dataService } from "../../services/dataService";
import { Store, MapPin, Clock, Phone, Mail, ShieldCheck, Save } from "lucide-react";

export const ShopProfileEdit = () => {
  const { user } = useAuth();
  const shopData = dataService.getShopByKeeperId(user?.id || "SHOP-000001");

  const [form, setForm] = useState({
    name: shopData.name,
    category: shopData.category,
    address: shopData.address,
    phone: shopData.phone,
    email: shopData.email,
    openingHours: shopData.openingHours,
    description: shopData.description
  });

  const [savedMessage, setSavedMessage] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 text-left">
      <div className="glass-panel p-6 rounded-3xl border border-white/10">
        <h2 className="text-2xl font-extrabold text-white">Shop Profile & Store Location</h2>
        <p className="text-xs text-slate-400 mt-1">Configure public business details visible to nearby customers.</p>
      </div>

      <form onSubmit={handleSave} className="glass-card p-6 rounded-3xl border border-white/15 space-y-4 text-xs">
        <div>
          <label className="block font-bold text-slate-300 mb-1">Store / Business Name</label>
          <input
            type="text"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white font-bold focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-300 mb-1">Category</label>
            <input
              type="text"
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">Contact Phone</label>
            <input
              type="text"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-300 mb-1">Store Physical Address</label>
          <input
            type="text"
            value={form.address}
            onChange={e => setForm({ ...form, address: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-300 mb-1">Opening Hours</label>
          <input
            type="text"
            value={form.openingHours}
            onChange={e => setForm({ ...form, openingHours: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-300 mb-1">Business Description</label>
          <textarea
            rows={3}
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 font-bold text-xs text-white shadow-xl flex items-center justify-center gap-2 hover:from-amber-600 hover:to-orange-700 transition"
        >
          <Save className="w-4 h-4" /> Save Business Profile
        </button>

        {savedMessage && (
          <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs text-center font-bold">
            ✅ Shop profile updated successfully!
          </div>
        )}
      </form>
    </div>
  );
};
