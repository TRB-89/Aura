import { VoiceConfig } from './types';

export class AudioOutputManager {
  private isSpeaking: boolean = false;
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public speak(
    text: string,
    config: VoiceConfig,
    onStart?: () => void,
    onEnd?: () => void
  ): void {
    this.stop(); // Stop any pending speech immediately before starting new turn

    if (!this.synth) {
      onEnd?.();
      return;
    }

    // Strip any markdown symbols if present to ensure pure spoken phonetics
    const spokenText = text.replace(/[*_#`[\]()]/g, '').trim();
    if (!spokenText) {
      onEnd?.();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(spokenText);
    utterance.rate = config.speed;
    utterance.pitch = config.pitch;

    // Pick natural female voice
    const voices = this.synth.getVoices();
    const femaleVoice =
      voices.find(
        (v) =>
          v.lang.startsWith('en') &&
          (v.name.includes('Samantha') ||
            v.name.includes('Natural') ||
            v.name.includes('Female') ||
            v.name.includes('Google US English') ||
            v.name.includes('Victoria') ||
            v.name.includes('Zira'))
      ) || voices.find((v) => v.lang.startsWith('en'));

    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    utterance.onstart = () => {
      this.isSpeaking = true;
      onStart?.();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.currentUtterance = null;
      onEnd?.();
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      this.currentUtterance = null;
      onEnd?.();
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public stop(): void {
    if (this.synth) {
      this.synth.cancel();
    }
    this.isSpeaking = false;
    this.currentUtterance = null;
  }

  public getIsSpeaking(): boolean {
    return this.isSpeaking;
  }
}
