export interface VADCallbacks {
  onSpeechStart: () => void;
  onSpeechEnd: (durationMs: number) => void;
  onSilenceMilestone: (silenceSeconds: number) => void;
}

export class VoiceActivityDetector {
  private isSpeaking: boolean = false;
  private speechStartTime: number = 0;
  private lastSpeechEndTime: number = Date.now();
  private silenceCheckInterval: number | null = null;
  private energyThreshold: number = 0.08;

  public processEnergy(energy: number, callbacks: VADCallbacks): void {
    const now = Date.now();

    if (energy > this.energyThreshold) {
      if (!this.isSpeaking) {
        this.isSpeaking = true;
        this.speechStartTime = now;
        callbacks.onSpeechStart();
      }
    } else {
      if (this.isSpeaking) {
        // Speech ended
        this.isSpeaking = false;
        const duration = now - this.speechStartTime;
        this.lastSpeechEndTime = now;
        callbacks.onSpeechEnd(duration);
      }
    }
  }

  public startSilenceMonitor(callbacks: VADCallbacks): void {
    this.stopSilenceMonitor();
    this.lastSpeechEndTime = Date.now();

    this.silenceCheckInterval = window.setInterval(() => {
      if (this.isSpeaking) return;
      const silenceSec = (Date.now() - this.lastSpeechEndTime) / 1000;
      callbacks.onSilenceMilestone(silenceSec);
    }, 1000);
  }

  public stopSilenceMonitor(): void {
    if (this.silenceCheckInterval) {
      clearInterval(this.silenceCheckInterval);
      this.silenceCheckInterval = null;
    }
  }

  public resetSilence(): void {
    this.lastSpeechEndTime = Date.now();
  }
}
