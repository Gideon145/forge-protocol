"use client";

import { useRef, useState } from "react";
import type { ChatMessage, QuorumReport } from "@/lib/types";

export default function ReinterviewChat({ report }: { report: QuorumReport }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const sendQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const question = input.trim();
    setInput("");
    setError("");
    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setLoading(true);

    try {
      const res = await fetch("/api/reinterview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ report, question }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed");

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.response.answer,
          relevantPersonas: data.response.relevantPersonas,
        },
      ]);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Re-interview failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-500/5 to-transparent border border-blue-500/15 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
        <h3 className="text-white font-semibold">Re-interview the Quorum</h3>
        <span className="text-white/30 text-xs ml-auto">Ask your 20 personas a follow-up question</span>
      </div>

      {/* Message thread */}
      <div className="px-6 py-4 space-y-4 max-h-80 overflow-y-auto">
        {messages.length === 0 && (
          <p className="text-white/25 text-sm text-center py-6">
            What would make the skeptics convert? What would they pay more for? Ask anything.
          </p>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "user" ? (
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2.5 rounded-2xl rounded-tr-sm max-w-xs text-sm shadow-lg shadow-blue-600/20">
                {msg.content}
              </div>
            ) : (
              <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl rounded-tl-sm max-w-lg">
                <p className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                {msg.relevantPersonas && msg.relevantPersonas.length > 0 && (
                  <p className="text-blue-400/50 text-xs mt-2">
                    Citing personas #{msg.relevantPersonas.join(", #")}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl rounded-tl-sm">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}
        {error && <p className="text-red-400 text-xs text-center">{error}</p>}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={sendQuestion} className="px-6 py-4 border-t border-white/10 flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value.slice(0, 300))}
          placeholder="e.g. What would make the skeptics change their mind?"
          className="flex-1 bg-white/5 border border-white/12 rounded-xl px-4 py-2.5 text-white placeholder-white/25 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 hover:border-white/20 transition-colors"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 text-sm shadow-lg shadow-blue-600/20"
        >
          Ask
        </button>
      </form>
    </div>
  );
}
