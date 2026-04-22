import type { QuorumReport } from "@/lib/types";

const CONFIG: Record<
  QuorumReport["verdict"],
  { bg: string; text: string; border: string; dot: string; glow: string }
> = {
  "Strong Fit":    { bg: "bg-green-500/12",  text: "text-green-400",  border: "border-green-500/30",  dot: "bg-green-400",  glow: "shadow-green-500/20" },
  "Niche Viable":  { bg: "bg-yellow-500/12", text: "text-yellow-400", border: "border-yellow-500/30", dot: "bg-yellow-400", glow: "shadow-yellow-500/20" },
  "Needs Pivoting":{ bg: "bg-orange-500/12", text: "text-orange-400", border: "border-orange-500/30", dot: "bg-orange-400", glow: "shadow-orange-500/20" },
  "Don't Build":   { bg: "bg-red-500/12",    text: "text-red-400",    border: "border-red-500/30",    dot: "bg-red-400",   glow: "shadow-red-500/20" },
};

export default function VerdictBadge({ verdict }: { verdict: QuorumReport["verdict"] }) {
  const c = CONFIG[verdict];
  return (
    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold shadow-lg ${c.bg} ${c.text} ${c.border} ${c.glow}`}>
      <span className={`w-2 h-2 rounded-full ${c.dot} animate-pulse`} />
      {verdict}
    </span>
  );
}
