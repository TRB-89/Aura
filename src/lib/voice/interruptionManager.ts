import { AudioOutputManager } from './audioOutput';

export class InterruptionManager {
  private outputManager: AudioOutputManager;

  constructor(outputManager: AudioOutputManager) {
    this.outputManager = outputManager;
  }

  public checkAndHandleInterruption(
    isUserSpeaking: boolean,
    onInterrupted: () => void
  ): boolean {
    if (isUserSpeaking && this.outputManager.getIsSpeaking()) {
      // Immediate cancellation of current AI speech output
      this.outputManager.stop();
      onInterrupted();
      return true;
    }
    return false;
  }

  public forceInterrupt(onInterrupted: () => void): void {
    if (this.outputManager.getIsSpeaking()) {
      this.outputManager.stop();
    }
    onInterrupted();
  }
}
