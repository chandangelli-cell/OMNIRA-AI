import React, { useState, useRef, useEffect } from "react";
import { aiOrchestrator } from "../../services/aiOrchestrator";
import { useAppData } from "../../context/AppDataContext";
import { ProductCard } from "./ProductCard";
import { Sparkles, Send, Mic, RefreshCw, Bot, User, Scale, ArrowRight, ShieldAlert, MapPin, ExternalLink, Star } from "lucide-react";

export const AIChatInterface = ({ onOpenProductDetail, onOpenShopProfile, onNavigateTab }) => {
  const { compareItems, toggleCompare, clearCompare } = useAppData();
  const [messages, setMessages] = useState([
    {
      id: "msg-welcome",
      sender: "ai",
      agentName: "Omnira Orchestrator AI",
      agentAvatar: "✨",
      text: "Hello! I am your Omnira Multi-Agent Assistant. Ask me anything about phones, laptops, product comparisons, hotels, food, local shops, or healthcare guidance.",
      suggestedQueries: [
        "Find me the best phone under ₹40,000",
        "Compare top laptops for AI/ML",
        "Find hotels near me",
        "Show restaurants nearby",
        "I have a headache and fever"
      ]
    }
  ]);
  const [inputQuery, setInputQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (queryText) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim()) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: textToSend
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery("");
    setIsTyping(true);

    try {
      const response = await aiOrchestrator.processQuery(textToSend);
      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: "ai",
          ...response
        }
      ]);
    } catch (e) {
      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: "ai",
          agentName: "Omnira Assistant",
          text: "Omnira couldn't find matching results right now. Try changing your search query."
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleVoiceSimulate = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      setInputQuery("Find me the best phone under ₹40,000");
    }, 2000);
  };

  return (
    <div className="w-full glass-card rounded-3xl border border-white/15 shadow-2xl flex flex-col h-[750px] overflow-hidden">
      {/* Chat Console Header */}
      <div className="px-5 py-3.5 bg-slate-950/80 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1px]">
            <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">Omnira AI Multi-Agent Console</h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <p className="text-[10px] text-slate-400">Connected to 10 Specialized Sub-Agents</p>
          </div>
        </div>

        {compareItems.length > 0 && (
          <button
            onClick={() => onNavigateTab("compare")}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-purple-200 text-xs font-bold transition shadow-lg animate-pulse"
          >
            <Scale className="w-4 h-4 text-purple-400" />
            <span>Compare Selected ({compareItems.length})</span>
          </button>
        )}
      </div>

      {/* Messages Stream Container */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex gap-3 max-w-4xl ${msg.sender === "user" ? "ml-auto flex-row-reverse" : ""}`}
          >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === "user" ? "bg-blue-600 text-white" : "bg-slate-900 border border-cyan-500/40 text-cyan-400"}`}>
              {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Bubble Content */}
            <div className={`space-y-3 max-w-[88%] ${msg.sender === "user" ? "text-right" : "text-left"}`}>
              <div className={`inline-block p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${msg.sender === "user" ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md rounded-tr-none" : "bg-slate-900/90 border border-slate-800 text-slate-200 shadow-xl rounded-tl-none"}`}>
                {msg.agentName && (
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-cyan-400 mb-1.5">
                    <span>{msg.agentAvatar || "🤖"}</span>
                    <span>{msg.agentName}</span>
                  </div>
                )}

                <p className="whitespace-pre-line">{msg.text || msg.message}</p>

                {/* Healthcare Medical Disclaimer */}
                {msg.disclaimer && (
                  <div className="mt-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2">
                    <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{msg.disclaimer}</span>
                  </div>
                )}
              </div>

              {/* Product Search Payload Cards */}
              {msg.products && msg.products.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                  {msg.products.map(prod => (
                    <ProductCard
                      key={prod.id}
                      product={prod}
                      onOpenDetail={onOpenProductDetail}
                      onOpenShop={onOpenShopProfile}
                    />
                  ))}
                </div>
              )}

              {/* Side-by-Side Comparison Payload */}
              {msg.productsToCompare && (
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-purple-500/30 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                      Side-by-Side Analysis
                    </span>
                    <button
                      onClick={() => onNavigateTab("compare")}
                      className="px-3 py-1 rounded-lg bg-purple-600 text-white text-xs font-bold hover:bg-purple-500 transition flex items-center gap-1"
                    >
                      Full Matrix View <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  {msg.useCaseAnalysis && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {msg.useCaseAnalysis.map((uc, i) => (
                        <div key={i} className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                          <p className="font-bold text-cyan-300 mb-0.5">{uc.useCase}</p>
                          <p className="text-white font-semibold">{uc.pick}</p>
                          <p className="text-[11px] text-slate-400 mt-1">{uc.rationale}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Hotel Discovery Cards Payload */}
              {msg.hotels && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {msg.hotels.map(h => (
                    <div key={h.id} className="glass-card rounded-2xl p-3 border border-white/10 text-left">
                      <img src={h.image} className="w-full h-28 object-cover rounded-xl mb-2" />
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold text-white truncate">{h.name}</span>
                        <span className="text-amber-400 font-bold flex items-center gap-1">
                          <Star className="w-3 h-3 fill-amber-400" /> {h.rating}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mb-2 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-cyan-400" /> {h.location} ({h.distanceKm} km)
                      </p>
                      <p className="text-xs font-bold text-emerald-400 mb-2">
                        ₹{h.pricePerNight.toLocaleString()} / night
                      </p>
                      <button
                        onClick={() => onNavigateTab("stay")}
                        className="w-full py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition"
                      >
                        View Rooms & Booking
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Food / Dining Payload */}
              {msg.restaurants && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {msg.restaurants.map(r => (
                    <div key={r.id} className="glass-card rounded-2xl p-3 border border-white/10 text-left">
                      <img src={r.image} className="w-full h-28 object-cover rounded-xl mb-2" />
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold text-white truncate">{r.name}</span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                          {r.type}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mb-2">{r.cuisine}</p>
                      <button
                        onClick={() => onNavigateTab("food")}
                        className="w-full py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition"
                      >
                        View Menu & Reserve
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Healthcare Symptom Guidance Payload */}
              {msg.symptomInfo && (
                <div className="p-4 rounded-2xl bg-slate-950/90 border border-cyan-500/30 text-left space-y-3">
                  <h4 className="text-sm font-bold text-cyan-300">{msg.symptomInfo.title}</h4>
                  
                  <div>
                    <p className="text-xs font-bold text-slate-300">Self-Care Steps:</p>
                    <ul className="list-disc list-inside text-xs text-slate-400 space-y-1 mt-1">
                      {msg.symptomInfo.selfCareSteps.map((sc, i) => (
                        <li key={i}>{sc}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-amber-400">Warning Signs to Seek Medical Care:</p>
                    <ul className="list-disc list-inside text-xs text-amber-300/80 space-y-1 mt-1">
                      {msg.symptomInfo.warningSigns.map((ws, i) => (
                        <li key={i}>{ws}</li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => onNavigateTab("healthcare")}
                    className="w-full py-2 rounded-xl bg-cyan-600/30 hover:bg-cyan-600/50 border border-cyan-500/40 text-cyan-200 text-xs font-bold transition text-center"
                  >
                    View Healthcare Finder & Nearby Emergency Clinics
                  </button>
                </div>
              )}

              {/* Suggested Prompt Chips */}
              {msg.suggestedQueries && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {msg.suggestedQueries.map((sq, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(sq)}
                      className="px-2.5 py-1 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-300 text-[11px] transition"
                    >
                      💡 {sq}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-slate-400 text-xs p-3 rounded-2xl bg-slate-900/60 w-fit">
            <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
            <span>Omnira Orchestrator is routing to specialized sub-agent...</span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Form Bar */}
      <div className="p-3 sm:p-4 bg-slate-950/90 border-t border-white/10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2 bg-slate-900 border border-slate-800 focus-within:border-cyan-500 rounded-2xl p-1.5 transition"
        >
          <button
            type="button"
            onClick={handleVoiceSimulate}
            className={`p-2.5 rounded-xl transition ${isListening ? "bg-rose-500 text-white animate-pulse" : "text-slate-400 hover:text-cyan-400 hover:bg-slate-800"}`}
            title="Simulate AI Voice Assistant Input"
          >
            <Mic className="w-4 h-4" />
          </button>

          <input
            type="text"
            placeholder={isListening ? "Listening... (e.g. Find me phones under ₹40,000)" : "Ask Omnira anything... (e.g. Find laptops for AI, hotels near me, sore throat guidance)"}
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            className="flex-1 bg-transparent px-2 py-1.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none"
          />

          <button
            type="submit"
            disabled={!inputQuery.trim()}
            className="p-2.5 rounded-xl glow-button text-white disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
