"use client";

import { useState } from "react";
import type { Persona } from "@/lib/types";

const SENTIMENT_BORDER: Record<Persona["sentiment"], string> = {
  positive: "border-l-green-400",
  neutral: "border-l-gray-500",
  negative: "border-l-red-400",
};

const TECH_BADGE: Record<Persona["techLiteracy"], string> = {
  low:    "bg-red-500/15 text-red-400",
  medium: "bg-yellow-500/15 text-yellow-400",
  high:   "bg-violet-500/15 text-violet-400",
};

export default function PersonaCard({ persona }: { persona: Persona }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
        className={`bg-white/[0.04] border border-white/10 border-l-4 ${SENTIMENT_BORDER[persona.sentiment]} rounded-xl p-4 cursor-pointer transition-all duration-200 hover:bg-blue-500/5 hover:border-blue-500/25`}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="font-semibold text-white text-sm">{persona.name}</p>
          <p className="text-white/50 text-xs">{persona.age} · {persona.occupation}</p>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded-full ${TECH_BADGE[persona.techLiteracy]}`}>
          {persona.techLiteracy}
        </span>
      </div>

      {/* Income */}
      <p className="text-white/40 text-xs mb-2">{persona.income}</p>

      {/* Quote */}
      <p className={`text-white/70 text-xs italic ${expanded ? "" : "line-clamp-2"}`}>
        {persona.quote}
      </p>

      {/* Would Use / Would Pay chips */}
      <div className="flex gap-2 mt-3">
        <span className={`text-xs px-2 py-0.5 rounded-full ${persona.wouldUse ? "bg-green-500/15 text-green-400" : "bg-red-500/15 text-red-400"}`}>
          {persona.wouldUse ? "Would Use" : "Won't Use"}
        </span>
        <span className={`text-xs px-2 py-0.5 rounded-full ${persona.wouldPay ? "bg-blue-500/15 text-blue-400" : "bg-white/10 text-white/40"}`}>
          {persona.wouldPay ? persona.suggestedPrice : "Won't Pay"}
        </span>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="mt-3 pt-3 border-t border-white/10 space-y-2">
          <div>
            <p className="text-white/40 text-xs uppercase tracking-wide mb-0.5">Main Objection</p>
            <p className="text-white/70 text-xs">{persona.mainObjection}</p>
          </div>
          <div>
            <p className="text-white/40 text-xs uppercase tracking-wide mb-0.5">Killer Feature</p>
            <p className="text-white/70 text-xs">{persona.killerFeature}</p>
          </div>
          <div>
            <p className="text-white/40 text-xs uppercase tracking-wide mb-0.5">Background</p>
            <p className="text-white/70 text-xs">{persona.background}</p>
          </div>
        </div>
      )}

      <p className="text-white/20 text-xs mt-2 text-right">{expanded ? "▲ collapse" : "▼ expand"}</p>
    </div>
  );
}
