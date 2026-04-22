import { NextResponse } from "next/server";
import { saveReport } from "@/lib/store";
import type { QuorumReport } from "@/lib/types";

export async function POST(req: Request) {
  try {
    const body = await req.json() as { report: QuorumReport };
    if (!body?.report) {
      return NextResponse.json({ error: "Missing report" }, { status: 400 });
    }
    const id = saveReport(body.report);
    return NextResponse.json({ id });
  } catch {
    return NextResponse.json({ error: "Failed to save report" }, { status: 500 });
  }
}
