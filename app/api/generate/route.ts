import { NextRequest, NextResponse } from "next/server";
import { runQuorum } from "@/lib/locus";
import type { Tier } from "@/lib/types";
import { TIERS } from "@/lib/types";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { description, tier, demo } = body as {
    description?: string;
    tier?: Tier;
    demo?: boolean;
  };

  if (!description || typeof description !== "string" || description.trim().length < 5) {
    return NextResponse.json({ error: "Please describe your idea (at least 5 characters)" }, { status: 400 });
  }

  const resolvedTier: Tier =
    tier && tier in TIERS ? tier : "full";

  // demo=true skips the API and returns the stub report immediately
  const effectiveTier: Tier = demo ? "full" : resolvedTier;
  const effectiveDesc = description.trim().slice(0, 500);

  try {
    const report = await runQuorum(effectiveDesc, effectiveTier);
    return NextResponse.json({ report });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Generation failed";
    console.error("[generate]", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
