import { NextRequest, NextResponse } from "next/server";
import { refineIdea } from "@/lib/locus";
import type { QuorumReport } from "@/lib/types";

export async function POST(req: NextRequest) {
  let report: QuorumReport;

  try {
    const body = await req.json();
    report = body.report;
    if (!report?.idea) throw new Error("Missing report");
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  try {
    const refinedIdea = await refineIdea(report);
    return NextResponse.json({ refinedIdea });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Refinement failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
