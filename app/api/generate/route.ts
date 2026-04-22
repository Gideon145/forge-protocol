import { NextRequest, NextResponse } from "next/server";
import { runQuorum } from "@/lib/locus";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { description } = body as { description?: string };

  if (!description || typeof description !== "string" || description.trim().length < 5) {
    return NextResponse.json({ error: "Please describe your idea (at least 5 characters)" }, { status: 400 });
  }

  try {
    const report = await runQuorum(description.trim().slice(0, 500));
    return NextResponse.json({ report });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Generation failed";
    console.error("[generate]", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
