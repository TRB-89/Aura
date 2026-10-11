import { SpeechSignalMetrics } from './types';

export class SpeechAnalyzer {
  private energyHistory: number[] = [];
  private utteranceDurations: number[] = [];
  private longPausesCount: number = 0;
  private sessionBaselineEnergy: number = 0.12;

  public recordEnergySample(energy: number): SpeechSignalMetrics {
    this.energyHistory.push(energy);
    if (this.energyHistory.length > 60) {
      this.energyHistory.shift();
    }

    const sum = this.energyHistory.reduce((a, b) => a + b, 0);
    const avg = sum / this.energyHistory.length;

    return {
      currentEnergy: energy,
      averageEnergy: avg,
      pauseDurationMs: 0,
      utteranceDurationMs:
        this.utteranceDurations.length > 0
          ? this.utteranceDurations[this.utteranceDurations.length - 1]
          : 0,
      speechRateWordsPerMin: 120, // baseline estimation
      sessionBaselineEnergy: this.sessionBaselineEnergy,
      longPauseCount: this.longPausesCount,
    };
  }

  public recordUtterance(durationMs: number): void {
    this.utteranceDurations.push(durationMs);
    if (this.utteranceDurations.length > 20) {
      this.utteranceDurations.shift();
    }
  }

  public recordLongPause(): void {
    this.longPausesCount += 1;
  }

  public reset(): void {
    this.energyHistory = [];
    this.utteranceDurations = [];
    this.longPausesCount = 0;
  }
}
