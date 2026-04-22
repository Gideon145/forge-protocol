import type { QuorumReport } from "@/lib/types";

export default function InsightsPanel({ report }: { report: QuorumReport }) {
  const payPct = report.willingToPay.percentage;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Top Objections */}
      <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-5">
        <h3 className="text-red-400 font-semibold text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
          <span>⚠</span> Top Objections
        </h3>
        <ol className="space-y-3">
          {report.topObjections.map((obj, i) => (
            <li key={i} className="flex gap-3">
              <span className="text-red-400/60 font-bold text-sm shrink-0">0{i + 1}</span>
              <p className="text-white/70 text-sm">{obj}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Top Feature Requests */}
      <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-5">
        <h3 className="text-blue-400 font-semibold text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
          <span>★</span> Feature Requests
        </h3>
        <ol className="space-y-3">
          {report.topFeatureRequests.map((feat, i) => (
            <li key={i} className="flex gap-3">
              <span className="text-blue-400/60 font-bold text-sm shrink-0">0{i + 1}</span>
              <p className="text-white/70 text-sm">{feat}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Pay Willingness */}
      <div className="bg-white/3 border border-white/10 rounded-2xl p-5">
        <h3 className="text-white/60 font-semibold text-sm uppercase tracking-wide mb-4">
          Pay Willingness
        </h3>
        <div className="text-center mb-4">
          <p className="text-4xl font-bold text-white">{payPct}%</p>
          <p className="text-white/50 text-sm">would pay</p>
        </div>
        {/* Bar */}
        <div className="bg-white/10 rounded-full h-2 mb-3">
          <div
            className="bg-gradient-to-r from-blue-600 to-cyan-400 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${payPct}%` }}
          />
        </div>
        <p className="text-white/50 text-sm text-center">
          Avg. price: <span className="text-white font-semibold">{report.willingToPay.averagePrice}</span>
        </p>
      </div>
    </div>
  );
}
