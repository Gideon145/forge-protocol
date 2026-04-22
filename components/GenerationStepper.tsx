"use client";

import { useEffect, useState } from "react";

const STEPS = [
  { label: "Generating 20 personas", sub: "Building diverse user archetypes..." },
  { label: "Running interviews",      sub: "Stress-testing your idea with each persona..." },
  { label: "Synthesizing insights",  sub: "Computing PMF score and surfacing patterns..." },
];

export default function GenerationStepper() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setActiveStep(1), 2000);
    const t2 = setTimeout(() => setActiveStep(2), 5000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-full max-w-sm space-y-4">
        {STEPS.map((step, i) => {
          const done = i < activeStep;
          const active = i === activeStep;

          return (
            <div
              key={i}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-500 ${
                done
                  ? "border-blue-500/30 bg-blue-500/5"
                  : active
                  ? "border-blue-500/50 bg-blue-500/10"
                  : "border-white/5 bg-white/3 opacity-40"
              }`}
            >
              {/* Icon */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                done ? "bg-blue-500" : active ? "bg-blue-500/20 border border-blue-500/50" : "bg-white/5"
              }`}>
                {done ? (
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : active ? (
                  <span className="w-3 h-3 rounded-full bg-blue-400 animate-pulse" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-white/20" />
                )}
              </div>

              {/* Text */}
              <div>
                <p className={`text-sm font-medium ${done || active ? "text-white" : "text-white/40"}`}>
                  {step.label}
                </p>
                {active && (
                  <p className="text-blue-400/70 text-xs mt-0.5">{step.sub}</p>
                )}
                {done && (
                  <p className="text-blue-400/50 text-xs mt-0.5">Done</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-white/30 text-xs mt-8">This takes 10–20 seconds. Hang tight.</p>
    </div>
  );
}
