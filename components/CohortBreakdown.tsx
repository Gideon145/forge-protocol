import type { QuorumReport } from "@/lib/types";

export default function CohortBreakdown({ report }: { report: QuorumReport }) {
  const personas = report.personas;
  const total = personas.length;

  // Sentiment breakdown
  const positive = personas.filter((p) => p.sentiment === "positive").length;
  const neutral  = personas.filter((p) => p.sentiment === "neutral").length;
  const negative = personas.filter((p) => p.sentiment === "negative").length;

  // Tech literacy
  const techHigh   = personas.filter((p) => p.techLiteracy === "high").length;
  const techMedium = personas.filter((p) => p.techLiteracy === "medium").length;
  const techLow    = personas.filter((p) => p.techLiteracy === "low").length;

  // Income bands (parse from persona.income string)
  const highIncome = personas.filter(
    (p) => /\$[1-9][0-9]{4,}|100k|150k|200k|250k|300k|\$[5-9]\d{4}/i.test(p.income)
  ).length;
  const midIncome = personas.filter(
    (p) => /\$[3-9][0-9]{3}|\$[1-4]\d{4}|40k|50k|60k|70k|80k|90k/i.test(p.income)
  ).length;
  const lowIncome = total - highIncome - midIncome;

  // Would-use vs would-pay gap
  const wouldUse = personas.filter((p) => p.wouldUse).length;
  const wouldPay = personas.filter((p) => p.wouldPay).length;

  // Price willingness distribution (bucket suggestions)
  const priceBuckets = {
    free:     personas.filter((p) => !p.wouldPay).length,
    "$1–$10": personas.filter((p) => {
      const match = p.suggestedPrice?.match(/\$(\d+)/);
      const n = match ? parseInt(match[1]) : 0;
      return p.wouldPay && n >= 1 && n <= 10;
    }).length,
    "$11–$30": personas.filter((p) => {
      const match = p.suggestedPrice?.match(/\$(\d+)/);
      const n = match ? parseInt(match[1]) : 0;
      return p.wouldPay && n >= 11 && n <= 30;
    }).length,
    "$31+": personas.filter((p) => {
      const match = p.suggestedPrice?.match(/\$(\d+)/);
      const n = match ? parseInt(match[1]) : 0;
      return p.wouldPay && n > 30;
    }).length,
  };

  const pct = (n: number) => Math.round((n / total) * 100);

  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-6">
      <h2 className="text-white font-bold text-lg">Cohort Breakdown</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sentiment */}
        <section>
          <h3 className="text-white/50 text-xs uppercase tracking-wide font-semibold mb-3">Sentiment</h3>
          <BarRow label="Positive" value={positive} total={total} color="bg-green-500" textColor="text-green-400" />
          <BarRow label="Neutral"  value={neutral}  total={total} color="bg-gray-500"  textColor="text-gray-400" />
          <BarRow label="Negative" value={negative} total={total} color="bg-red-500"   textColor="text-red-400" />
        </section>

        {/* Tech literacy */}
        <section>
          <h3 className="text-white/50 text-xs uppercase tracking-wide font-semibold mb-3">Tech Literacy</h3>
          <BarRow label="High"   value={techHigh}   total={total} color="bg-violet-500" textColor="text-violet-400" />
          <BarRow label="Medium" value={techMedium} total={total} color="bg-yellow-500" textColor="text-yellow-400" />
          <BarRow label="Low"    value={techLow}    total={total} color="bg-red-400"    textColor="text-red-400" />
        </section>

        {/* Use vs Pay gap */}
        <section>
          <h3 className="text-white/50 text-xs uppercase tracking-wide font-semibold mb-3">Adoption Gap</h3>
          <BarRow label="Would Use" value={wouldUse} total={total} color="bg-blue-500"   textColor="text-blue-400" />
          <BarRow label="Would Pay" value={wouldPay} total={total} color="bg-cyan-500"   textColor="text-cyan-400" />
          <p className="text-white/30 text-xs mt-2">
            {wouldUse > wouldPay
              ? `${pct(wouldUse - wouldPay)}% conversion gap — typical for early-stage SaaS`
              : "Strong conversion signal"}
          </p>
        </section>

        {/* Price willingness */}
        <section>
          <h3 className="text-white/50 text-xs uppercase tracking-wide font-semibold mb-3">Price Sensitivity</h3>
          {Object.entries(priceBuckets).map(([label, count]) => (
            <BarRow
              key={label}
              label={label}
              value={count}
              total={total}
              color={label === "free" ? "bg-white/25" : "bg-blue-500"}
              textColor={label === "free" ? "text-white/40" : "text-blue-400"}
            />
          ))}
        </section>
      </div>
    </div>
  );
}

function BarRow({
  label, value, total, color, textColor,
}: {
  label: string; value: number; total: number; color: string; textColor: string;
}) {
  const pct = total === 0 ? 0 : Math.round((value / total) * 100);
  return (
    <div className="flex items-center gap-3 mb-2.5">
      <span className="text-white/55 text-xs w-20 shrink-0 text-right">{label}</span>
      <div className="flex-1 h-2 bg-white/8 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all duration-700`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className={`text-xs font-semibold ${textColor} w-10 text-right shrink-0`}>
        {value}/{total}
      </span>
    </div>
  );
}
