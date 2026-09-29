import React from "react";
import { useAppData } from "../../context/AppDataContext";
import { MapPin, ShieldCheck, X } from "lucide-react";

export const LocationModal = () => {
  const { locationModalOpen, setLocationModalOpen, requestLocationPermission } = useAppData();

  if (!locationModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-fade-in">
      <div className="relative w-full max-w-md glass-card rounded-2xl p-6 border border-cyan-500/30 shadow-2xl text-slate-100">
        <button
          onClick={() => setLocationModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4 border border-cyan-500/40 shadow-lg shadow-cyan-500/20">
          <MapPin className="w-6 h-6 animate-bounce" />
        </div>

        <h3 className="text-xl font-bold text-white mb-2">Enable Location Access</h3>
        <p className="text-sm text-slate-300 mb-4 leading-relaxed">
          Omnira needs your location to discover nearby registered shopkeepers, food dining options, hotels, and emergency healthcare facilities.
        </p>

        <div className="bg-slate-900/80 rounded-xl p-3 mb-6 border border-slate-800 flex items-start gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <span>
            Your precise GPS coordinates remain strictly private and are never permanently shared or sold to shopkeepers.
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => requestLocationPermission()}
            className="flex-1 py-2.5 px-4 rounded-xl glow-button font-bold text-sm text-white text-center shadow-lg"
          >
            ALLOW LOCATION
          </button>
          <button
            onClick={() => setLocationModalOpen(false)}
            className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 font-semibold text-sm text-slate-300 text-center transition"
          >
            NOT NOW
          </button>
        </div>
      </div>
    </div>
  );
};
