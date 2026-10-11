import { GoogleGenerativeAI } from '@google/generative-ai';
import {
  AIProvider,
  ChatTurn,
  MemoryCandidate,
  PromptContext,
  SafetyEvaluation,
  StreamCallbacks,
} from './types';
import {
  buildDynamicSystemInstruction,
  buildJournalReflectionPrompt,
  buildMemoryExtractionPrompt,
} from './prompts';
import { SafetyLayer } from './safety';

export class GeminiProvider implements AIProvider {
  public readonly name = 'Google Gemini';
  private client: GoogleGenerativeAI | null = null;
  private currentKey: string = '';
  // Supported Gemini models with automatic fallback
  private activeModelName: string = 'gemini-3.8-flash';

  constructor() {
    this.refreshClient();
  }

  public getApiKey(): string {
    const envKey = (import.meta as any).env?.VITE_GEMINI_API_KEY;
    if (envKey && typeof envKey === 'string' && envKey.trim().length > 0) {
      return envKey.trim();
    }
    const userConfigured = localStorage.getItem('aura_user_gemini_key');
    if (userConfigured && userConfigured.trim().length > 0) {
      return userConfigured.trim();
    }
    return '';
  }

  public setApiKey(key: string): void {
    if (key.trim()) {
      localStorage.setItem('aura_user_gemini_key', key.trim());
    } else {
      localStorage.removeItem('aura_user_gemini_key');
    }
    this.refreshClient();
  }

  public isConfigured(): boolean {
    return Boolean(this.getApiKey());
  }

  private refreshClient(): void {
    const key = this.getApiKey();
    if (key && key !== this.currentKey) {
      this.currentKey = key;
      this.client = new GoogleGenerativeAI(key);
    } else if (!key) {
      this.currentKey = '';
      this.client = null;
    }
  }

  private getModel(systemInstruction?: string, modelOverride?: string) {
    this.refreshClient();
    if (!this.client) {
      throw new Error(
        'Gemini API key is not configured. Please supply your API key in Settings or .env.'
      );
    }
    return this.client.getGenerativeModel({
      model: modelOverride || this.activeModelName,
      systemInstruction: systemInstruction
        ? { role: 'system', parts: [{ text: systemInstruction }] }
        : undefined,
    });
  }

  /**
   * Cleans and sanitizes multiturn history to strictly adhere to Gemini's
   * alternating user/model specification, appending the new user message as the final turn.
   */
  private formatContentsForGemini(history: ChatTurn[], currentPrompt: string) {
    const cleanTurns: { role: 'user' | 'model'; text: string }[] = [];

    // Filter valid turns
    for (const turn of history) {
      if (turn.content && turn.content.trim()) {
        cleanTurns.push({
          role: turn.role === 'user' ? 'user' : 'model',
          text: turn.content.trim(),
        });
      }
    }

    // Must start with user
    while (cleanTurns.length > 0 && cleanTurns[0].role !== 'user') {
      cleanTurns.shift();
    }

    const contents: { role: 'user' | 'model'; parts: { text: string }[] }[] = [];

    // Merge adjacent duplicates and alternate strictly
    for (const t of cleanTurns) {
      if (contents.length === 0) {
        contents.push({ role: t.role, parts: [{ text: t.text }] });
      } else {
        const prev = contents[contents.length - 1];
        if (prev.role === t.role) {
          prev.parts[0].text += '\n' + t.text;
        } else {
          contents.push({ role: t.role, parts: [{ text: t.text }] });
        }
      }
    }

    // Append new prompt
    if (contents.length > 0 && contents[contents.length - 1].role === 'user') {
      contents[contents.length - 1].parts[0].text += '\n' + currentPrompt.trim();
    } else {
      contents.push({ role: 'user', parts: [{ text: currentPrompt.trim() }] });
    }

    // Limit to last 10 turns to keep prompt bounded and fast
    return contents.slice(-11);
  }

  /**
   * Check if newly generated text repeats recent assistant turns
   */
  private isRepetitive(text: string, recentAssistantMessages: string[]): boolean {
    if (recentAssistantMessages.length === 0) return false;
    const cleanNew = text.trim().toLowerCase();
    const newWords = cleanNew.split(/\s+/).slice(0, 5).join(' ');

    for (const past of recentAssistantMessages) {
      const cleanPast = past.trim().toLowerCase();
      // Exact or near-identical reply
      if (cleanNew === cleanPast) return true;
      // Reused opening phrase
      const pastWords = cleanPast.split(/\s+/).slice(0, 5).join(' ');
      if (newWords.length > 10 && newWords === pastWords) return true;
    }
    return false;
  }

  public async evaluateSafety(text: string): Promise<SafetyEvaluation> {
    const localEval = SafetyLayer.evaluateFast(text);
    if (localEval.requiresIntervention) {
      return localEval;
    }
    return localEval;
  }

  public async generateText(
    prompt: string,
    context: PromptContext,
    history: ChatTurn[] = []
  ): Promise<string> {
    if (!this.isConfigured()) {
      throw new Error('Gemini API key is not configured.');
    }

    const recentAiMessages = history
      .filter((h) => h.role === 'model')
      .map((h) => h.content)
      .slice(-3);

    const systemInstruction = buildDynamicSystemInstruction(context, recentAiMessages);
    const contents = this.formatContentsForGemini(history, prompt);

    let model = this.getModel(systemInstruction);
    let result;

    try {
      result = await model.generateContent({
        contents,
        generationConfig: {
          maxOutputTokens: 600,
          temperature: 0.85,
        },
      });
    } catch (err: any) {
      // If primary model is unavailable or rate limited, try fallback model
      if (err?.message?.includes('404') || err?.message?.includes('not found')) {
        model = this.getModel(systemInstruction, 'gemini-flash-latest');
        result = await model.generateContent({
          contents,
          generationConfig: { maxOutputTokens: 600, temperature: 0.85 },
        });
      } else {
        throw err;
      }
    }

    let text = result.response.text().trim();

    // Repetition check: if repetitive, attempt one corrective generation
    if (this.isRepetitive(text, recentAiMessages)) {
      try {
        const retryContents = [
          ...contents,
          { role: 'model' as const, parts: [{ text }] },
          {
            role: 'user' as const,
            parts: [{ text: 'Respond differently. Do not reuse wording or structure from recent responses.' }],
          },
        ];
        const retryResult = await model.generateContent({
          contents: retryContents,
          generationConfig: { maxOutputTokens: 600, temperature: 0.95 },
        });
        const retryText = retryResult.response.text().trim();
        if (retryText) text = retryText;
      } catch {
        // Keep original if retry fails
      }
    }

    return text;
  }

  public async streamText(
    prompt: string,
    context: PromptContext,
    history: ChatTurn[],
    callbacks: StreamCallbacks
  ): Promise<void> {
    if (!this.isConfigured()) {
      callbacks.onError(new Error('Gemini API key is not configured.'));
      return;
    }

    const recentAiMessages = history
      .filter((h) => h.role === 'model')
      .map((h) => h.content)
      .slice(-3);

    const systemInstruction = buildDynamicSystemInstruction(context, recentAiMessages);
    const contents = this.formatContentsForGemini(history, prompt);

    let model = this.getModel(systemInstruction);

    try {
      const resultStream = await model.generateContentStream({
        contents,
        generationConfig: {
          maxOutputTokens: 600,
          temperature: 0.85,
        },
      });

      let accumulated = '';
      for await (const chunk of resultStream.stream) {
        const text = chunk.text();
        accumulated += text;
        callbacks.onChunk(text);
      }

      callbacks.onComplete(accumulated.trim());
    } catch (err: any) {
      if (err?.message?.includes('404') || err?.message?.includes('not found')) {
        try {
          model = this.getModel(systemInstruction, 'gemini-flash-latest');
          const fallbackStream = await model.generateContentStream({
            contents,
            generationConfig: { maxOutputTokens: 600, temperature: 0.85 },
          });
          let accumulated = '';
          for await (const chunk of fallbackStream.stream) {
            const text = chunk.text();
            accumulated += text;
            callbacks.onChunk(text);
          }
          callbacks.onComplete(accumulated.trim());
          return;
        } catch (fallbackErr: any) {
          callbacks.onError(fallbackErr instanceof Error ? fallbackErr : new Error(String(fallbackErr)));
          return;
        }
      }
      callbacks.onError(err instanceof Error ? err : new Error(String(err)));
    }
  }

  public async reflectOnJournal(journalText: string, context: PromptContext): Promise<string> {
    if (!this.isConfigured()) {
      throw new Error('Gemini API key is not configured.');
    }

    const systemInstruction = buildDynamicSystemInstruction({
      ...context,
      mode: 'reflect',
      adviceAllowed: false,
    });
    const model = this.getModel(systemInstruction);
    const prompt = buildJournalReflectionPrompt(journalText);

    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  }

  public async extractMemoryCandidates(conversation: ChatTurn[]): Promise<MemoryCandidate[]> {
    if (!this.isConfigured() || conversation.length < 2) {
      return [];
    }

    try {
      const turnsText = conversation
        .slice(-6)
        .map((t) => `${t.role.toUpperCase()}: ${t.content}`)
        .join('\n');

      const model = this.getModel();
      const prompt = buildMemoryExtractionPrompt(turnsText);

      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json' },
      });

      const text = result.response.text();
      return JSON.parse(text) as MemoryCandidate[];
    } catch {
      return [];
    }
  }
}

export const geminiProvider = new GeminiProvider();
