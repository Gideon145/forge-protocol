// Server-side in-memory report store.
// Module-level singleton — persists for the lifetime of the Node.js process.
// Only import this from API routes (server-side code).
import type { QuorumReport } from "./types";

const store = new Map<string, QuorumReport>();

export function saveReport(report: QuorumReport): string {
  const id = crypto.randomUUID().replace(/-/g, "").slice(0, 10);
  store.set(id, report);
  return id;
}

export function getReport(id: string): QuorumReport | null {
  return store.get(id) ?? null;
}
