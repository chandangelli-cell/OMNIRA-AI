import React from "react";
import { Sparkles, ShoppingBag, Hotel, Utensils, Stethoscope, Search, Store, ArrowRight, Shield, Flame, Zap } from "lucide-react";

export const LandingHero = ({ onSelectPrompt, onOpenCustomerAuth, onOpenShopkeeperAuth }) => {
  const samplePrompts = [
    { text: "Find me the best phone under ₹40,000", icon: "📱", category: "Shopping" },
    { text: "Compare these top laptops for AI/ML", icon: "💻", category: "Compare" },
    { text: "Find hotels near me", icon: "🏨", category: "Stay" },
    { text: "Find restaurants nearby", icon: "🍽️", category: "Food" },
    { text: "Find a nearby medical store", icon: "💊", category: "Healthcare" },
    { text: "Help me understand these symptoms", icon: "🩺", category: "Healthcare" },
    { text: "Find local shops selling this product", icon: "🏪", category: "Local Shops" }
  ];

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 py-12">
      {/* Background Glowing Ambient Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-500/20 via-blue-600/20 to-purple-600/20 rounded-full blur-3xl pointer-events-none glow-orb" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Futuristic Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold tracking-wide mb-6 backdrop-blur-md shadow-lg shadow-cyan-500/10">
        <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
        <span>NEXT-GEN MULTI-AGENT AI ECOSYSTEM</span>
      </div>

      {/* Main Branding Title */}
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-tight mb-4">
        OMNIRA-AI
      </h1>

      <p className="text-2xl sm:text-3xl font-extrabold text-gradient mb-6">
        "One AI. Every Need."
      </p>

      {/* Supporting Text */}
      <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mb-8 font-light">
        Your intelligent companion for shopping, discovery, comparison, local businesses, food, stays, healthcare guidance, and everyday decisions.
      </p>

      {/* Small Captions Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mb-10 text-xs text-slate-300 font-medium">
        <span className="px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-amber-400" /> Search smarter.
        </span>
        <span className="px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-blue-400" /> Compare better.
        </span>
        <span className="px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-cyan-400" /> Discover nearby.
        </span>
        <span className="px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-emerald-400" /> Connect directly.
        </span>
        <span className="px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-purple-400" /> Grow your business.
        </span>
      </div>

      {/* Dual Role Authentication Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-14 w-full max-w-md">
        <button
          onClick={onOpenCustomerAuth}
          className="w-full py-4 px-6 rounded-2xl glow-button text-white font-bold text-base flex items-center justify-center gap-3 shadow-xl group"
        >
          <span>CUSTOMER LOGIN</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={onOpenShopkeeperAuth}
          className="w-full py-4 px-6 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-amber-500/40 text-amber-300 hover:text-amber-200 font-bold text-base flex items-center justify-center gap-3 transition shadow-xl"
        >
          <Store className="w-5 h-5 text-amber-400" />
          <span>SHOPKEEPER LOGIN</span>
        </button>
      </div>

      {/* Interactive AI Interface Hero Card */}
      <div className="w-full max-w-3xl glass-card rounded-3xl p-6 border border-white/15 shadow-2xl relative">
        <div className="flex items-center gap-3 mb-4 text-left border-b border-slate-800 pb-3">
          <div className="w-3 h-3 rounded-full bg-rose-500" />
          <div className="w-3 h-3 rounded-full bg-amber-500" />
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="text-xs font-mono text-slate-400 ml-2">Omnira AI Assistant v2.4</span>
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-white mb-4 text-left">
          What can I help you with today?
        </h3>

        {/* Animated Prompt Triggers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-left">
          {samplePrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => onSelectPrompt(prompt.text)}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/80 text-slate-200 text-xs sm:text-sm transition group"
            >
              <span className="flex items-center gap-2.5">
                <span className="text-base">{prompt.icon}</span>
                <span className="group-hover:text-cyan-300 transition-colors">{prompt.text}</span>
              </span>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-transform shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
