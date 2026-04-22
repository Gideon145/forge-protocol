"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { QuorumReport } from "@/lib/types";

export default function RefinePanel({ report }: { report: QuorumReport }) {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [refinedIdea, setRefinedIdea] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleRefine() {
    setState("loading");
    setError("");
    try {
      const res = await fetch("/api/refine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ report }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error ?? "Refinement failed");
      setRefinedIdea(data.refinedIdea);
      setState("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setState("error");
    }
  }

  function handleRerun() {
    const params = new URLSearchParams({ idea: refinedIdea });
    router.push(`/run?${params.toString()}`);
  }

  return (
    <div className="bg-gradient-to-br from-violet-500/5 to-blue-500/5 border border-violet-500/20 rounded-2xl p-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-white font-bold text-lg mb-1">Refine & Re-run</h2>
          <p className="text-white/45 text-sm">
            Let AI rewrite your idea to address the top objections and requested features — then run a fresh quorum.
          </p>
        </div>

        {state === "idle" && (
          <button
            onClick={handleRefine}
            className="shrink-0 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-violet-600/25 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refine idea
          </button>
        )}

        {state === "loading" && (
          <div className="flex items-center gap-2 text-violet-400 text-sm">
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Refining...
          </div>
        )}
      </div>

      {state === "error" && (
        <p className="mt-4 text-red-400 text-sm">{error}</p>
      )}

      {state === "done" && (
        <div className="mt-5 space-y-4">
          {/* Diff-style display */}
          <div className="space-y-2">
            <div className="bg-red-500/8 border border-red-500/15 rounded-xl p-4">
              <p className="text-red-400/60 text-xs uppercase tracking-wide font-semibold mb-1.5">Original</p>
              <p className="text-white/50 text-sm italic">{report.idea}</p>
            </div>
            <div className="flex justify-center">
              <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div className="bg-green-500/8 border border-green-500/15 rounded-xl p-4">
              <p className="text-green-400/60 text-xs uppercase tracking-wide font-semibold mb-1.5">Refined</p>
              <p className="text-white/85 text-sm">{refinedIdea}</p>
            </div>
          </div>

          <div className="flex gap-3 flex-wrap">
            <button
              onClick={handleRerun}
              className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/25 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Re-run quorum with this idea
            </button>
            <button
              onClick={() => { setState("idle"); setRefinedIdea(""); }}
              className="bg-white/5 hover:bg-white/10 text-white/50 hover:text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all duration-200 border border-white/10"
            >
              Discard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
