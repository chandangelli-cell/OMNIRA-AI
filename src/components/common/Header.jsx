import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useAppData } from "../../context/AppDataContext";
import { DemoUserSwitcher } from "./DemoUserSwitcher";
import { Sparkles, MapPin, Moon, Sun, Users, LogOut, ShieldCheck, User } from "lucide-react";

export const Header = ({ onNavigate, activeTab }) => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { location, setLocationModalOpen } = useAppData();
  const [switcherOpen, setSwitcherOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 backdrop-blur-xl px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div
          onClick={() => onNavigate && onNavigate("home")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-[1px] shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-wider text-gradient">
                OMNIRA<span className="text-cyan-400 font-light">-AI</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 font-mono">
                ECOSYSTEM
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block font-medium tracking-wide">
              One AI. Every Need.
            </p>
          </div>
        </div>

        {/* Location Selector */}
        <button
          onClick={() => setLocationModalOpen(true)}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-300 text-xs transition shadow-inner"
        >
          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
          <span className="truncate max-w-[160px] font-medium">
            {location.city || "Jubilee Hills"}
          </span>
        </button>

        {/* Right Action Icons & User Status */}
        <div className="flex items-center gap-3">
          {/* Quick Account Switcher Button */}
          <button
            onClick={() => setSwitcherOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-300 text-xs font-semibold transition"
            title="Switch User Role to test Tenant Isolation"
          >
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Switch User</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-amber-300 transition"
            title="Toggle Light / Dark Mode"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-purple-400" />}
          </button>

          {/* Active User Badge & Logout */}
          {user ? (
            <div className="flex items-center gap-2">
              <div
                onClick={() => onNavigate && onNavigate("profile")}
                className="flex items-center gap-2.5 p-1 pr-3 rounded-full bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 cursor-pointer transition"
              >
                <img
                  src={user.avatar}
                  alt="Avatar"
                  className="w-7 h-7 rounded-full object-cover border border-blue-500/50"
                />
                <div className="hidden lg:block text-left">
                  <p className="text-xs font-bold text-slate-200 truncate max-w-[100px]">
                    {user.name}
                  </p>
                  <p className="text-[10px] text-blue-400 font-mono">{user.id}</p>
                </div>
              </div>

              <button
                onClick={logout}
                className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate && onNavigate("auth_customer")}
                className="px-3.5 py-1.5 rounded-xl bg-blue-600/80 hover:bg-blue-600 text-white font-semibold text-xs transition shadow-md"
              >
                Customer Login
              </button>
              <button
                onClick={() => onNavigate && onNavigate("auth_shopkeeper")}
                className="px-3.5 py-1.5 rounded-xl bg-amber-600/80 hover:bg-amber-600 text-white font-semibold text-xs transition shadow-md"
              >
                Shopkeeper Login
              </button>
            </div>
          )}
        </div>
      </div>

      <DemoUserSwitcher isOpen={switcherOpen} onClose={() => setSwitcherOpen(false)} />
    </header>
  );
};
