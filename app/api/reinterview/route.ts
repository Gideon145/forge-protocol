import { NextRequest, NextResponse } from "next/server";
import { reinterviewPersonas } from "@/lib/locus";
import type { QuorumReport } from "@/lib/types";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { report, question } = body as { report?: QuorumReport; question?: string };

  if (!report || !question || typeof question !== "string" || question.trim().length < 3) {
    return NextResponse.json({ error: "report and question are required" }, { status: 400 });
  }

  try {
    const response = await reinterviewPersonas(report, question.trim().slice(0, 300));
    return NextResponse.json({ response });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Re-interview failed";
    console.error("[reinterview]", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
