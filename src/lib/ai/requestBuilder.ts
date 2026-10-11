import { PromptContext, SupportMode, SafetyState, ChatTurn } from './types';
import { buildDynamicSystemInstruction } from './prompts';

export interface BuildGeminiContextParams {
  userMessage: string;
  recentMessages?: Array<{ role: 'user' | 'model' | 'assistant'; content: string }>;
  supportMode?: SupportMode;
  safetyState?: SafetyState;
  userPreferences?: {
    preferredName?: string;
    topicsToAvoid?: string[];
    wantsActionOriented?: boolean;
    dislikesLongReplies?: boolean;
    dislikesQuestions?: boolean;
    prefersListeningFirst?: boolean;
    [key: string]: any;
  };
  approvedMemory?: string[];
  medium?: 'text' | 'voice';
}

export interface BuiltGeminiContext {
  userMessage: string;
  promptContext: PromptContext;
  systemInstruction: string;
  formattedContents: Array<{ role: 'user' | 'model'; parts: { text: string }[] }>;
  recentAiMessages: string[];
}

/**
 * Clean, decoupled builder for Gemini request context and alternating history.
 * Adheres to strict multiturn schema, anti-repetition tracking, and memory bounds.
 */
export function buildGeminiContext(params: BuildGeminiContextParams): BuiltGeminiContext {
  const mode = params.supportMode || 'listen';
  const safetyState = params.safetyState || 'NORMAL';
  const isVoice = params.medium === 'voice';

  const promptContext: PromptContext = {
    mode,
    tone: 'warm',
    responseLength: isVoice ? 'short' : 'concise',
    adviceAllowed: mode === 'help_think',
    safetyState,
    memoryEnabled: Boolean(params.approvedMemory && params.approvedMemory.length > 0),
    isVoiceMode: isVoice,
    activeMemoryItems: params.approvedMemory || [],
    userPreferences: params.userPreferences,
  };

  // Filter recent messages for repetition tracking
  const recentMessages = params.recentMessages || [];
  const recentAiMessages = recentMessages
    .filter((m) => m.role === 'model' || m.role === 'assistant')
    .map((m) => m.content)
    .slice(-3);

  const systemInstruction = buildDynamicSystemInstruction(promptContext, recentAiMessages);

  // Clean alternating turns strictly (user -> model -> user)
  const cleanTurns: { role: 'user' | 'model'; text: string }[] = [];
  for (const m of recentMessages) {
    if (m.content && m.content.trim()) {
      cleanTurns.push({
        role: m.role === 'user' ? 'user' : 'model',
        text: m.content.trim(),
      });
    }
  }

  // Must begin with user turn
  while (cleanTurns.length > 0 && cleanTurns[0].role !== 'user') {
    cleanTurns.shift();
  }

  const formattedContents: Array<{ role: 'user' | 'model'; parts: { text: string }[] }> = [];
  for (const t of cleanTurns) {
    if (formattedContents.length === 0) {
      formattedContents.push({ role: t.role, parts: [{ text: t.text }] });
    } else {
      const prev = formattedContents[formattedContents.length - 1];
      if (prev.role === t.role) {
        prev.parts[0].text += '\n' + t.text;
      } else {
        formattedContents.push({ role: t.role, parts: [{ text: t.text }] });
      }
    }
  }

  // Append new user turn
  if (formattedContents.length > 0 && formattedContents[formattedContents.length - 1].role === 'user') {
    formattedContents[formattedContents.length - 1].parts[0].text += '\n' + params.userMessage.trim();
  } else {
    formattedContents.push({ role: 'user', parts: [{ text: params.userMessage.trim() }] });
  }

  // Keep bounded recent history window (last 10 turns max)
  const boundedContents = formattedContents.slice(-11);

  return {
    userMessage: params.userMessage,
    promptContext,
    systemInstruction,
    formattedContents: boundedContents,
    recentAiMessages,
  };
}
