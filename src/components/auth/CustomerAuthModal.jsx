import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { User, Lock, Mail, Phone, MapPin, X, ArrowRight, ShieldCheck } from "lucide-react";

export const CustomerAuthModal = ({ isOpen, onClose }) => {
  const { signupCustomer, loginAs, PRESET_USERS } = useAuth();
  const [mode, setMode] = useState("login"); // 'login' or 'signup'

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    location: "Jubilee Hills, Hyderabad",
    interests: "Smartphones, Laptops"
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "signup") {
      signupCustomer({
        name: formData.name || "Customer User",
        email: formData.email,
        phone: formData.phone,
        city: formData.location,
        interests: formData.interests.split(",").map(s => s.trim())
      });
    } else {
      // Default to Customer A on quick submit if blank
      loginAs(PRESET_USERS.CUSTOMER_A);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
      <div className="relative w-full max-w-md glass-card rounded-3xl p-6 border border-blue-500/30 shadow-2xl text-slate-100">
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
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${mode === "login" ? "bg-blue-600 text-white shadow-lg" : "text-slate-400 hover:text-white"}`}
          >
            CUSTOMER LOGIN
          </button>
          <button
            onClick={() => setMode("signup")}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${mode === "signup" ? "bg-blue-600 text-white shadow-lg" : "text-slate-400 hover:text-white"}`}
          >
            SIGN UP
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-extrabold text-white">
            {mode === "login" ? "Welcome Back to Omnira" : "Create Customer Account"}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {mode === "login"
              ? "Access your isolated AI search history, saved items & orders."
              : "Get a unique Customer ID (e.g. CUSTOMER-000001) with private database isolation."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === "signup" && (
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Chandan Kumar"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                placeholder="customer@example.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
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
                className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {mode === "signup" && (
            <>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Mobile Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Preferred Location</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Jubilee Hills, Hyderabad"
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl glow-button font-bold text-xs text-white mt-4 flex items-center justify-center gap-2 shadow-lg"
          >
            <span>{mode === "login" ? "LOG IN AS CUSTOMER" : "REGISTER CUSTOMER ACCOUNT"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Demo Test Presets */}
        <div className="mt-6 pt-4 border-t border-slate-800">
          <p className="text-[11px] text-slate-400 font-semibold mb-2">QUICK DEMO ACCOUNTS:</p>
          <div className="flex gap-2">
            <button
              onClick={() => {
                loginAs(PRESET_USERS.CUSTOMER_A);
                onClose();
              }}
              className="flex-1 py-2 px-3 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 text-xs font-semibold text-left"
            >
              <p className="font-bold">Customer A</p>
              <p className="text-[10px] opacity-80">CUSTOMER-000001</p>
            </button>

            <button
              onClick={() => {
                loginAs(PRESET_USERS.CUSTOMER_B);
                onClose();
              }}
              className="flex-1 py-2 px-3 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 text-xs font-semibold text-left"
            >
              <p className="font-bold">Customer B</p>
              <p className="text-[10px] opacity-80">CUSTOMER-000002</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
