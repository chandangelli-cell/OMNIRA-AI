import React from "react";
import { ShoppingBag, Scale, Hotel, UtensilsCrossed, Stethoscope, Store, Megaphone, ShieldCheck, Cpu } from "lucide-react";

export const FeatureGrid = () => {
  const features = [
    {
      title: "Multi-Agent AI Orchestrator",
      desc: "Intent-routed sub-agents specialized for shopping, tech specs, local business, stays, dining, and healthcare.",
      icon: Cpu,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Product Search & Compare",
      desc: "Side-by-side spec comparison matrix with use-case breakdowns for gaming, camera, AI/ML, and battery.",
      icon: Scale,
      color: "from-purple-500 to-indigo-500"
    },
    {
      title: "Local Business Discovery",
      desc: "Connect directly with verified nearby shopkeepers for instant in-store pickup and same-day delivery.",
      icon: Store,
      color: "from-emerald-500 to-teal-500"
    },
    {
      title: "Hotel & Room Discovery",
      desc: "Find verified stays, resorts, and rooms nearby with synthesized review sentiment summaries.",
      icon: Hotel,
      color: "from-amber-500 to-orange-500"
    },
    {
      title: "Food & Dining Discovery",
      desc: "Discover top-rated restaurants, veg/non-veg cuisines, and live open status around your location.",
      icon: UtensilsCrossed,
      color: "from-rose-500 to-pink-500"
    },
    {
      title: "Healthcare AI Assistant",
      desc: "Educational symptom guidance, safe OTC information, clear disclaimers, and emergency clinic finder.",
      icon: Stethoscope,
      color: "from-cyan-500 to-blue-600"
    },
    {
      title: "Shopkeeper Ad Platform",
      desc: "Targeted advertising system with 7, 15, and 30-day billing plans, auto-rotating banners, and click analytics.",
      icon: Megaphone,
      color: "from-violet-500 to-purple-600"
    },
    {
      title: "Strict Tenant Isolation",
      desc: "Role-based security ensuring customer and shopkeeper private data remain 100% isolated.",
      icon: ShieldCheck,
      color: "from-sky-500 to-indigo-600"
    }
  ];

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
          Powered by Multi-Agent AI Architecture
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          An AI operating layer connecting customers, businesses, products, stays, and local services.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feat, idx) => {
          const IconComp = feat.icon;
          return (
            <div
              key={idx}
              className="glass-card rounded-2xl p-5 border border-white/10 hover:border-cyan-500/40 transition flex flex-col justify-between"
            >
              <div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${feat.color} p-0.5 mb-4 shadow-lg`}>
                  <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                    <IconComp className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-base font-bold text-white mb-2">{feat.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
