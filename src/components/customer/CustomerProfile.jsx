import React from "react";
import { useAuth } from "../../context/AuthContext";
import { User, Mail, Phone, MapPin, ShieldCheck, Heart, LogOut, Key } from "lucide-react";

export const CustomerProfile = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-6 text-left">
      <div className="glass-card p-6 rounded-3xl border border-white/15 shadow-2xl relative overflow-hidden">
        <div className="flex items-center gap-4 mb-6">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-20 h-20 rounded-2xl object-cover border-2 border-blue-500/50 shadow-xl"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-extrabold text-white">{user.name}</h2>
              <span className="px-2.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-mono font-bold">
                {user.role}
              </span>
            </div>
            <p className="text-xs font-mono text-cyan-400 font-bold mt-1">ID: {user.id}</p>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" /> {user.city || "Jubilee Hills, Hyderabad"}
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-slate-800 text-xs">
          <div className="flex items-center justify-between py-2 border-b border-slate-800/60">
            <span className="text-slate-400 flex items-center gap-2">
              <Mail className="w-4 h-4 text-cyan-400" /> Email Address:
            </span>
            <span className="font-semibold text-white">{user.email}</span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-slate-800/60">
            <span className="text-slate-400 flex items-center gap-2">
              <Phone className="w-4 h-4 text-cyan-400" /> Phone Number:
            </span>
            <span className="font-semibold text-white">{user.phone}</span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-slate-800/60">
            <span className="text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Tenant Data Isolation:
            </span>
            <span className="font-bold text-emerald-400">Isolated & Encrypted</span>
          </div>

          {user.interests && (
            <div className="py-2">
              <span className="text-slate-400 flex items-center gap-2 mb-2">
                <Heart className="w-4 h-4 text-rose-400" /> Stored AI Interests & Preferences:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {user.interests.map((int, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-full bg-slate-900 text-slate-300 text-[11px] border border-slate-800">
                    ✨ {int}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={logout}
          className="w-full mt-6 py-3 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 font-bold text-xs flex items-center justify-center gap-2 transition"
        >
          <LogOut className="w-4 h-4" /> Log Out of Account
        </button>
      </div>
    </div>
  );
};
