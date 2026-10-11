import { ChatTurn, PromptContext } from '../ai/types';
import { GeminiLiveSession } from './geminiLiveProvider';
import { DEFAULT_VOICE_CONFIG } from './voiceConfig';

class RealtimeSessionContext {
  private activeTurns: ChatTurn[] = [];
  private activeContext: PromptContext = {
    mode: 'listen',
    tone: 'warm',
    responseLength: 'short',
    adviceAllowed: false,
    safetyState: 'NORMAL',
    memoryEnabled: true,
    isVoiceMode: false,
  };
  private liveSession: GeminiLiveSession | null = null;

  public getContext(): PromptContext {
    return { ...this.activeContext };
  }

  public updateContext(partial: Partial<PromptContext>): void {
    this.activeContext = { ...this.activeContext, ...partial };
  }

  public getTurns(): ChatTurn[] {
    return [...this.activeTurns];
  }

  public addTurn(turn: ChatTurn): void {
    this.activeTurns.push(turn);
  }

  public clearTurns(): void {
    this.activeTurns = [];
  }

  public getLiveSession(): GeminiLiveSession {
    if (!this.liveSession) {
      this.liveSession = new GeminiLiveSession(DEFAULT_VOICE_CONFIG);
    }
    return this.liveSession;
  }
}

export const realtimeSession = new RealtimeSessionContext();
