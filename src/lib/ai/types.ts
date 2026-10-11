export type SupportMode = 'listen' | 'reflect' | 'help_think' | 'reset';

export type SafetyState = 'NORMAL' | 'DISTRESS' | 'HIGH_CONCERN' | 'CRISIS';

export interface PromptContext {
  mode: SupportMode;
  tone: 'warm' | 'gentle' | 'grounded' | 'clear';
  responseLength: 'short' | 'concise' | 'standard';
  adviceAllowed: boolean;
  safetyState: SafetyState;
  memoryEnabled: boolean;
  isVoiceMode: boolean;
  activeMemoryItems?: string[];
  recentConversationSummary?: string;
  userPreferences?: {
    preferredName?: string;
    topicsToAvoid?: string[];
    wantsActionOriented?: boolean;
  };
}

export interface ChatTurn {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  mode?: SupportMode;
  safetyState?: SafetyState;
  isTemporary?: boolean;
}

export interface StreamCallbacks {
  onChunk: (chunk: string) => void;
  onComplete: (fullText: string) => void;
  onError: (error: Error) => void;
}

export interface MemoryItem {
  id: string;
  content: string;
  category: 'preference' | 'theme' | 'boundary' | 'context';
  createdAt: string;
  approvedByUser: boolean;
}

export interface MemoryCandidate {
  content: string;
  category: 'preference' | 'theme' | 'boundary' | 'context';
  reason: string;
}

export interface SafetyEvaluation {
  state: SafetyState;
  requiresIntervention: boolean;
  suggestedAction?: 'slow_down' | 'grounding' | 'surface_resources' | 'emergency_hotline';
  reason?: string;
}

export interface AIProvider {
  name: string;
  isConfigured: () => boolean;
  generateText: (prompt: string, context: PromptContext, history?: ChatTurn[]) => Promise<string>;
  streamText: (prompt: string, context: PromptContext, history: ChatTurn[], callbacks: StreamCallbacks) => Promise<void>;
  reflectOnJournal: (journalText: string, context: PromptContext) => Promise<string>;
  extractMemoryCandidates: (conversation: ChatTurn[]) => Promise<MemoryCandidate[]>;
  evaluateSafety: (text: string) => Promise<SafetyEvaluation>;
}
