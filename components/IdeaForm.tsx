"use client";

import { useEffect, useRef, useState } from "react";

const PLACEHOLDERS = [
  "A DEX aggregator with built-in MEV protection...",
  "An AI copilot for Solidity smart contract audits...",
  "A yield optimizer that auto-rebalances DeFi positions...",
  "A no-code tool for launching token-gated communities...",
  "A B2B SaaS for automating procurement workflows...",
  "A mobile app that turns voice notes into structured tasks...",
  "A marketplace for fractional ownership of music royalties...",
  "An API that detects and blocks prompt injection attacks...",
];

interface IdeaFormProps {
  onSubmit: (description: string) => void;
  isLoading: boolean;
}

export default function IdeaForm({ onSubmit, isLoading }: IdeaFormProps) {
  const [value, setValue] = useState("");
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIdx((i) => (i + 1) % PLACEHOLDERS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim().length >= 5 && !isLoading) {
      onSubmit(value.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value.slice(0, 500))}
          placeholder={PLACEHOLDERS[placeholderIdx]}
          rows={4}
          className="w-full bg-white/5 border border-white/12 rounded-2xl px-5 py-4 text-white placeholder-white/25 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 transition-all duration-200 text-sm leading-relaxed hover:border-white/20"
          disabled={isLoading}
        />
        <div className="absolute bottom-3 right-4 text-white/25 text-xs tabular-nums">
          {value.length}/500
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <p className="text-white/35 text-xs">
          20 synthetic users will stress-test your idea in seconds.
        </p>
        <button
          type="submit"
          disabled={value.trim().length < 5 || isLoading}
          className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-6 py-2.5 rounded-xl transition-all duration-200 active:scale-95 text-sm shadow-lg shadow-blue-600/25 hover:scale-105"
        >
          Run Quorum
          <span className="ml-1.5">→</span>
        </button>
      </div>
    </form>
  );
}
