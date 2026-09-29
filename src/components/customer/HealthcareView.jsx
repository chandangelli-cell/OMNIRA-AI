import React, { useState } from "react";
import { COMMON_SYMPTOMS_DB, MEDICAL_DISCLAIMER, NEARBY_HEALTHCARE_FACILITIES } from "../../mockData/healthcare";
import { Stethoscope, ShieldAlert, AlertTriangle, Phone, MapPin, Pill, Hospital, Search } from "lucide-react";

export const HealthcareView = () => {
  const [selectedSymptom, setSelectedSymptom] = useState(COMMON_SYMPTOMS_DB[0]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSymptoms = COMMON_SYMPTOMS_DB.filter(s =>
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.keywords.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-white/10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">Healthcare AI Assistant</h2>
            <p className="text-xs text-slate-400">
              General symptom education, self-care guidance & emergency healthcare resource discovery.
            </p>
          </div>
        </div>

        {/* Mandatory Medical Disclaimer Banner */}
        <div className="mt-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/40 text-amber-300 text-xs flex items-start gap-3 shadow-lg">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">{MEDICAL_DISCLAIMER}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Symptom Topics */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Common Symptom Guidance</h3>
          
          <div className="relative mb-3">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search symptoms (headache, fever, stomach)..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {filteredSymptoms.map((sym, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedSymptom(sym)}
              className={`p-4 rounded-2xl border cursor-pointer transition ${selectedSymptom.symptomKey === sym.symptomKey ? "bg-cyan-600/20 border-cyan-500 text-white" : "bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700"}`}
            >
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-bold">{sym.title}</h4>
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${sym.urgencyBadgeColor === 'green' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                  {sym.urgencyLevel}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-1">
                {sym.possibleCauses.join(" • ")}
              </p>
            </div>
          ))}

          {/* Emergency Box */}
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/40 text-rose-300 space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-rose-400">
              <AlertTriangle className="w-4 h-4" /> Medical Emergency Hotline
            </div>
            <p className="text-xs text-rose-200">
              Call <span className="font-extrabold text-white">108</span> or <span className="font-extrabold text-white">112</span> immediately for urgent ambulance or trauma care.
            </p>
          </div>
        </div>

        {/* Right Column: Detailed Guidance View */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6 rounded-3xl border border-white/15 space-y-5">
            <div>
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold uppercase">
                EDUCATIONAL GUIDANCE
              </span>
              <h3 className="text-xl font-extrabold text-white mt-2">{selectedSymptom.title}</h3>
              <p className="text-xs text-slate-400 mt-1">Recommended Specialist: {selectedSymptom.recommendedSpecialist}</p>
            </div>

            {/* Possible Causes */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">Possible Common Causes (Possibilities, Not Diagnosis)</h4>
              <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                {selectedSymptom.possibleCauses.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>

            {/* Self-Care Steps */}
            <div>
              <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-2">Basic Self-Care & Hydration Steps</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {selectedSymptom.selfCareSteps.map((sc, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300">
                    💡 {sc}
                  </div>
                ))}
              </div>
            </div>

            {/* Safe OTC Information */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Pill className="w-4 h-4 text-emerald-400" /> Over-The-Counter (OTC) Product Educational Info
              </h4>
              <ul className="list-disc list-inside text-xs text-slate-300 space-y-1.5">
                {selectedSymptom.safeOtcEducation.map((otc, i) => (
                  <li key={i}>{otc}</li>
                ))}
              </ul>
            </div>

            {/* Warning Signs */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">When to Seek Urgent Professional Care</h4>
              <ul className="list-disc list-inside text-xs text-amber-200 space-y-1">
                {selectedSymptom.warningSigns.map((ws, i) => (
                  <li key={i}>{ws}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Nearby Emergency Healthcare Facilities */}
          <div className="glass-card p-6 rounded-3xl border border-white/15 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Hospital className="w-5 h-5 text-cyan-400" /> Nearby Hospitals & 24/7 Pharmacies
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {NEARBY_HEALTHCARE_FACILITIES.map(fac => (
                <div key={fac.id} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-cyan-400 uppercase">{fac.type}</span>
                      <span className="text-xs text-emerald-400 font-semibold">{fac.openStatus}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1">{fac.name}</h4>
                    <p className="text-xs text-slate-400 mb-3 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>{fac.address} ({fac.distanceKm} km)</span>
                    </p>
                  </div>

                  <button
                    onClick={() => alert(`Dialing ${fac.name} emergency hotline: ${fac.phone}`)}
                    className="w-full py-2 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/40 text-cyan-300 font-bold text-xs flex items-center justify-center gap-1.5 transition"
                  >
                    <Phone className="w-3.5 h-3.5" /> Call Hospital ({fac.phone})
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
