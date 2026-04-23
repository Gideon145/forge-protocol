export type Tier = "quick" | "full" | "deep-dive";

export interface TierConfig {
  label: string;
  amount: string;
  personaCount: number;
  useBraveSearch: boolean;
  description: string;
}

export const TIERS: Record<Tier, TierConfig> = {
  "quick": {
    label: "Quick Scan",
    amount: "0.10",
    personaCount: 10,
    useBraveSearch: false,
    description: "10 personas · fast feedback",
  },
  "full": {
    label: "Full Panel",
    amount: "0.25",
    personaCount: 20,
    useBraveSearch: false,
    description: "20 diverse personas · full PMF score",
  },
  "deep-dive": {
    label: "Deep Dive",
    amount: "0.50",
    personaCount: 20,
    useBraveSearch: true,
    description: "20 personas · live market data",
  },
};

export interface Persona {
  id: number;
  name: string;
  age: number;
  occupation: string;
  income: string;
  background: string;
  techLiteracy: "low" | "medium" | "high";
  wouldUse: boolean;
  wouldPay: boolean;
  suggestedPrice: string;
  mainObjection: string;
  killerFeature: string;
  quote: string;
  sentiment: "positive" | "neutral" | "negative";
}

export interface QuorumReport {
  idea: string;
  pmfScore: number;
  verdict: "Strong Fit" | "Niche Viable" | "Needs Pivoting" | "Don't Build";
  personas: Persona[];
  topObjections: string[];
  topFeatureRequests: string[];
  willingToPay: { percentage: number; averagePrice: string };
  targetSegment: string;
  pivotSuggestion: string;
  summary: string;
}

export interface ReinterviewResponse {
  answer: string;
  relevantPersonas: number[];
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  relevantPersonas?: number[];
}

export interface PersonaChatMessage {
  role: "user" | "assistant";
  content: string;
}
