import { AIProvider } from './types';
import { geminiProvider } from './geminiProvider';

// Active AI Provider: Configured strictly to Google Gemini as required
export const activeAIProvider: AIProvider = geminiProvider;

export function isGeminiConnected(): boolean {
  return geminiProvider.isConfigured();
}

export function setGeminiApiKey(key: string): void {
  geminiProvider.setApiKey(key);
}

export function getGeminiApiKey(): string {
  return geminiProvider.getApiKey();
}
