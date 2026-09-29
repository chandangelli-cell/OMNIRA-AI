import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { UserCheck, Shield, Store, User, RefreshCw, X } from "lucide-react";

export const DemoUserSwitcher = ({ isOpen, onClose }) => {
  const { user, loginAs, logout, PRESET_USERS } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-fade-in">
      <div className="relative w-full max-w-xl glass-card rounded-2xl p-6 border border-white/20 shadow-2xl text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-purple-600/30 flex items-center justify-center text-purple-400 border border-purple-500/30">
            <RefreshCw className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Multi-Tenant Account Switcher</h3>
            <p className="text-xs text-slate-400">
              Test strict role isolation between Customer & Shopkeeper accounts.
            </p>
          </div>
        </div>

        {/* Current logged in status */}
        <div className="bg-slate-900/80 rounded-xl p-3 mb-6 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-700 overflow-hidden">
              {user?.avatar ? (
                <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <User className="w-5 h-5 m-2 text-slate-300" />
              )}
            </div>
            <div>
              <p className="text-xs text-slate-400">Active Account:</p>
              <p className="text-sm font-semibold text-white">
                {user ? `${user.name} (${user.id})` : "Guest / Not Logged In"}
              </p>
            </div>
          </div>
          {user ? (
            <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${user.role === 'CUSTOMER' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`}>
              {user.role}
            </span>
          ) : (
            <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-slate-800 text-slate-400">
              LANDING PAGE
            </span>
          )}
        </div>

        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Customer Test Accounts (Isolated Data)
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => {
                loginAs(PRESET_USERS.CUSTOMER_A);
                onClose();
              }}
              className={`flex items-center gap-3 p-3 rounded-xl border text-left transition ${user?.id === PRESET_USERS.CUSTOMER_A.id ? 'bg-blue-600/20 border-blue-500 text-white' : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 text-slate-300'}`}
            >
              <img src={PRESET_USERS.CUSTOMER_A.avatar} className="w-10 h-10 rounded-full object-cover" />
              <div className="overflow-hidden">
                <p className="text-sm font-bold truncate">{PRESET_USERS.CUSTOMER_A.name}</p>
                <p className="text-xs text-blue-400 font-mono">{PRESET_USERS.CUSTOMER_A.id}</p>
                <p className="text-[10px] text-slate-400 truncate">Customer A (Orders & Saved Items)</p>
              </div>
            </button>

            <button
              onClick={() => {
                loginAs(PRESET_USERS.CUSTOMER_B);
                onClose();
              }}
              className={`flex items-center gap-3 p-3 rounded-xl border text-left transition ${user?.id === PRESET_USERS.CUSTOMER_B.id ? 'bg-blue-600/20 border-blue-500 text-white' : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 text-slate-300'}`}
            >
              <img src={PRESET_USERS.CUSTOMER_B.avatar} className="w-10 h-10 rounded-full object-cover" />
              <div className="overflow-hidden">
                <p className="text-sm font-bold truncate">{PRESET_USERS.CUSTOMER_B.name}</p>
                <p className="text-xs text-blue-400 font-mono">{PRESET_USERS.CUSTOMER_B.id}</p>
                <p className="text-[10px] text-slate-400 truncate">Customer B (Separate Storage)</p>
              </div>
            </button>
          </div>

          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 pt-2">
            Shopkeeper Test Accounts (Isolated Business Dashboards)
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => {
                loginAs(PRESET_USERS.SHOPKEEPER_A);
                onClose();
              }}
              className={`flex items-center gap-3 p-3 rounded-xl border text-left transition ${user?.id === PRESET_USERS.SHOPKEEPER_A.id ? 'bg-amber-600/20 border-amber-500 text-white' : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 text-slate-300'}`}
            >
              <img src={PRESET_USERS.SHOPKEEPER_A.avatar} className="w-10 h-10 rounded-full object-cover" />
              <div className="overflow-hidden">
                <p className="text-sm font-bold truncate">{PRESET_USERS.SHOPKEEPER_A.shopName}</p>
                <p className="text-xs text-amber-400 font-mono">{PRESET_USERS.SHOPKEEPER_A.id}</p>
                <p className="text-[10px] text-slate-400 truncate">Shop A (Products, Ads & Analytics)</p>
              </div>
            </button>

            <button
              onClick={() => {
                loginAs(PRESET_USERS.SHOPKEEPER_B);
                onClose();
              }}
              className={`flex items-center gap-3 p-3 rounded-xl border text-left transition ${user?.id === PRESET_USERS.SHOPKEEPER_B.id ? 'bg-amber-600/20 border-amber-500 text-white' : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 text-slate-300'}`}
            >
              <img src={PRESET_USERS.SHOPKEEPER_B.avatar} className="w-10 h-10 rounded-full object-cover" />
              <div className="overflow-hidden">
                <p className="text-sm font-bold truncate">{PRESET_USERS.SHOPKEEPER_B.shopName}</p>
                <p className="text-xs text-amber-400 font-mono">{PRESET_USERS.SHOPKEEPER_B.id}</p>
                <p className="text-[10px] text-slate-400 truncate">Shop B (Private Store Data)</p>
              </div>
            </button>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            onClick={() => {
              logout();
              onClose();
            }}
            className="px-4 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 rounded-lg transition"
          >
            Switch to Landing Page (Guest)
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
