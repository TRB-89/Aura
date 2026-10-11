// Web Audio API ambient sound engine for calm breathing and presence mode

class SoundEngine {
  private ctx: AudioContext | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private isPlaying: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public startCalmDrone() {
    try {
      this.initContext();
      if (!this.ctx || this.isPlaying) return;

      const now = this.ctx.currentTime;

      // Master gain
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.001, now);
      this.gainNode.gain.exponentialRampToValueAtTime(0.04, now + 3);
      this.gainNode.connect(this.ctx.destination);

      // Low soothing drone
      this.osc1 = this.ctx.createOscillator();
      this.osc1.type = 'sine';
      this.osc1.frequency.setValueAtTime(108, now); // Warm base frequency
      this.osc1.connect(this.gainNode);
      this.osc1.start(now);

      // Gentle harmonic overtone
      this.osc2 = this.ctx.createOscillator();
      this.osc2.type = 'sine';
      this.osc2.frequency.setValueAtTime(162, now); // Fifth harmonic
      this.osc2.connect(this.gainNode);
      this.osc2.start(now);

      this.isPlaying = true;
    } catch {
      // Audio autoplay policy catch
    }
  }

  public stopCalmDrone() {
    if (!this.ctx || !this.isPlaying || !this.gainNode) return;
    try {
      const now = this.ctx.currentTime;
      this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, now);
      this.gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);
      setTimeout(() => {
        try {
          this.osc1?.stop();
          this.osc2?.stop();
          this.osc1?.disconnect();
          this.osc2?.disconnect();
          this.isPlaying = false;
        } catch {
          // ignore
        }
      }, 1600);
    } catch {
      this.isPlaying = false;
    }
  }

  public playGentleChime(freq = 528) {
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const chimeOsc = this.ctx.createOscillator();
      const chimeGain = this.ctx.createGain();

      chimeOsc.type = 'sine';
      chimeOsc.frequency.setValueAtTime(freq, now);

      chimeGain.gain.setValueAtTime(0.001, now);
      chimeGain.gain.exponentialRampToValueAtTime(0.06, now + 0.05);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

      chimeOsc.connect(chimeGain);
      chimeGain.connect(this.ctx.destination);

      chimeOsc.start(now);
      chimeOsc.stop(now + 3);
    } catch {
      // ignore
    }
  }

  public getIsPlaying() {
    return this.isPlaying;
  }
}

export const soundEngine = new SoundEngine();
