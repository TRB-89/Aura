import { VoiceTranscriptTurn } from './types';

export class TranscriptManager {
  private turns: VoiceTranscriptTurn[] = [];

  public addPartialUserTurn(text: string): VoiceTranscriptTurn[] {
    const last = this.turns[this.turns.length - 1];
    if (last && last.sender === 'user' && last.isPartial) {
      last.text = text;
      last.timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      this.turns.push({
        id: Date.now().toString(),
        sender: 'user',
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isPartial: true,
      });
    }
    return [...this.turns];
  }

  public finalizeUserTurn(text: string): VoiceTranscriptTurn[] {
    const last = this.turns[this.turns.length - 1];
    if (last && last.sender === 'user' && last.isPartial) {
      last.text = text;
      last.isPartial = false;
    } else {
      this.turns.push({
        id: Date.now().toString(),
        sender: 'user',
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isPartial: false,
      });
    }
    return [...this.turns];
  }

  public addAiTurn(text: string): VoiceTranscriptTurn[] {
    this.turns.push({
      id: Date.now().toString(),
      sender: 'ai',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isPartial: false,
    });
    return [...this.turns];
  }

  public getTurns(): VoiceTranscriptTurn[] {
    return [...this.turns];
  }

  public clear(): void {
    this.turns = [];
  }
}
