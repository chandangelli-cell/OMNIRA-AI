import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Store, User, Lock, Mail, Phone, MapPin, X, ArrowRight, Building2 } from "lucide-react";

export const ShopkeeperAuthModal = ({ isOpen, onClose }) => {
  const { signupShopkeeper, loginAs, PRESET_USERS } = useAuth();
  const [mode, setMode] = useState("login");

  const [formData, setFormData] = useState({
    ownerName: "",
    shopName: "",
    email: "",
    phone: "",
    password: "",
    category: "Mobile & Electronics",
    address: "Jubilee Hills Main Rd, Hyderabad"
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "signup") {
      signupShopkeeper({
        name: formData.ownerName || "Shop Owner",
        shopName: formData.shopName || "New Shopkeeper Store",
        email: formData.email,
        phone: formData.phone,
        category: formData.category,
        address: formData.address
      });
    } else {
      loginAs(PRESET_USERS.SHOPKEEPER_A);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
      <div className="relative w-full max-w-md glass-card rounded-3xl p-6 border border-amber-500/30 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tab Headers */}
        <div className="flex items-center gap-2 mb-6 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setMode("login")}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${mode === "login" ? "bg-amber-600 text-white shadow-lg" : "text-slate-400 hover:text-white"}`}
          >
            SHOPKEEPER LOGIN
          </button>
          <button
            onClick={() => setMode("signup")}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${mode === "signup" ? "bg-amber-600 text-white shadow-lg" : "text-slate-400 hover:text-white"}`}
          >
            REGISTER BUSINESS
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-extrabold text-white">
            {mode === "login" ? "Shopkeeper Portal" : "Register Business on Omnira"}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {mode === "login"
              ? "Manage your product listings, advertisement campaigns & customer orders."
              : "Obtain a unique Shopkeeper ID (e.g. SHOP-000001) and digital business profile."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === "signup" && (
            <>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Owner Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Kumar"
                    value={formData.ownerName}
                    onChange={e => setFormData({ ...formData, ownerName: e.target.value })}
                    className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Shop / Business Name</label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Mobiles & Electronics"
                    value={formData.shopName}
                    onChange={e => setFormData({ ...formData, shopName: e.target.value })}
                    className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Business Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                placeholder="shopkeeper@example.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {mode === "signup" && (
            <>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Mobile & Electronics">Mobile & Electronics</option>
                  <option value="Computer & Accessories">Computer & Accessories</option>
                  <option value="Consumer Electronics">Consumer Electronics</option>
                  <option value="Medical & Pharmacy">Medical & Pharmacy</option>
                  <option value="Restaurants & Food">Restaurants & Food</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Shop Address</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Shop 14, Central Market, Jubilee Hills"
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 font-bold text-xs text-white mt-4 flex items-center justify-center gap-2 shadow-lg hover:from-amber-600 hover:to-orange-700 transition"
          >
            <span>{mode === "login" ? "LOG IN AS SHOPKEEPER" : "REGISTER SHOPKEEPER ACCOUNT"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Demo Test Presets */}
        <div className="mt-6 pt-4 border-t border-slate-800">
          <p className="text-[11px] text-slate-400 font-semibold mb-2">DEMO BUSINESS ACCOUNTS:</p>
          <div className="flex gap-2">
            <button
              onClick={() => {
                loginAs(PRESET_USERS.SHOPKEEPER_A);
                onClose();
              }}
              className="flex-1 py-2 px-3 rounded-xl bg-amber-600/20 hover:bg-amber-600/30 border border-amber-500/40 text-amber-300 text-xs font-semibold text-left"
            >
              <p className="font-bold truncate">Apex Mobiles</p>
              <p className="text-[10px] opacity-80">SHOP-000001</p>
            </button>

            <button
              onClick={() => {
                loginAs(PRESET_USERS.SHOPKEEPER_B);
                onClose();
              }}
              className="flex-1 py-2 px-3 rounded-xl bg-orange-600/20 hover:bg-orange-600/30 border border-orange-500/40 text-orange-300 text-xs font-semibold text-left"
            >
              <p className="font-bold truncate">Digital World</p>
              <p className="text-[10px] opacity-80">SHOP-000002</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
