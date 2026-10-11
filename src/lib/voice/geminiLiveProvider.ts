import { geminiProvider } from '../ai/geminiProvider';
import { PromptContext } from '../ai/types';
import { MicrophoneManager } from './microphone';
import { AudioOutputManager } from './audioOutput';
import { VoiceActivityDetector } from './vad';
import { InterruptionManager } from './interruptionManager';
import { TranscriptManager } from './transcript';
import { SpeechAnalyzer } from './speechAnalyzer';
import { DEFAULT_VOICE_CONFIG } from './voiceConfig';
import { VoiceConfig, VoiceSessionCallbacks, VoiceState, VoiceTranscriptTurn } from './types';

export class GeminiLiveSession {
  private mic: MicrophoneManager;
  private audioOutput: AudioOutputManager;
  private vad: VoiceActivityDetector;
  private interruptionMgr: InterruptionManager;
  private transcriptMgr: TranscriptManager;
  private analyzer: SpeechAnalyzer;
  private config: VoiceConfig;
  private state: VoiceState = 'READY';
  private callbacks: VoiceSessionCallbacks | null = null;
  private animationFrameId: number | null = null;

  constructor(config: VoiceConfig = DEFAULT_VOICE_CONFIG) {
    this.config = config;
    this.mic = new MicrophoneManager();
    this.audioOutput = new AudioOutputManager();
    this.vad = new VoiceActivityDetector();
    this.interruptionMgr = new InterruptionManager(this.audioOutput);
    this.transcriptMgr = new TranscriptManager();
    this.analyzer = new SpeechAnalyzer();
  }

  public async start(callbacks: VoiceSessionCallbacks): Promise<boolean> {
    this.callbacks = callbacks;
    this.setState('CONNECTING');

    const micOk = await this.mic.start();
    if (!micOk) {
      this.setState('ERROR');
      callbacks.onError(new Error('Microphone permission required for voice session.'));
      return false;
    }

    this.setState('LISTENING');

    // Start energy & activity polling loop
    this.startAudioLoop();

    // Start silence monitor
    this.vad.startSilenceMonitor({
      onSpeechStart: () => {
        // Barge-in check
        this.interruptionMgr.checkAndHandleInterruption(true, () => {
          this.setState('INTERRUPTED');
        });
        this.setState('USER_SPEAKING');
      },
      onSpeechEnd: (durationMs) => {
        this.analyzer.recordUtterance(durationMs);
        this.setState('LISTENING');
      },
      onSilenceMilestone: (silenceSec) => {
        if (silenceSec >= 8 && this.state === 'LISTENING') {
          this.analyzer.recordLongPause();
        }
      },
    });

    return true;
  }

  private startAudioLoop(): void {
    const loop = () => {
      if (this.state === 'ENDED') return;

      const energy = this.mic.getEnergy();
      const metrics = this.analyzer.recordEnergySample(energy);
      this.callbacks?.onSignalUpdate?.(metrics);

      // Process VAD
      this.vad.processEnergy(energy, {
        onSpeechStart: () => {
          this.interruptionMgr.checkAndHandleInterruption(true, () => {
            this.setState('INTERRUPTED');
          });
          this.setState('USER_SPEAKING');
        },
        onSpeechEnd: (durationMs) => {
          this.analyzer.recordUtterance(durationMs);
          if (this.state === 'USER_SPEAKING') {
            this.setState('LISTENING');
          }
        },
        onSilenceMilestone: () => {},
      });

      this.animationFrameId = requestAnimationFrame(loop);
    };

    this.animationFrameId = requestAnimationFrame(loop);
  }

  public async handleUserSpeechTurn(
    userText: string,
    context: PromptContext
  ): Promise<string> {
    // 1. Finalize user speech in transcript
    const turns = this.transcriptMgr.finalizeUserTurn(userText);
    this.callbacks?.onTranscriptUpdate(turns);

    // 2. Set thinking state
    this.setState('THINKING');

    // 3. Generate response using Gemini
    let aiResponse = '';
    try {
      if (geminiProvider.isConfigured()) {
        const historyTurns = this.transcriptMgr
          .getTurns()
          .slice(0, -1)
          .map((t) => ({
            id: t.id,
            role: (t.sender === 'user' ? 'user' : 'model') as 'user' | 'model',
            content: t.text,
            timestamp: t.timestamp,
          }));

        aiResponse = await geminiProvider.generateText(
          userText,
          {
            ...context,
            isVoiceMode: true,
          },
          historyTurns
        );
      } else {
        aiResponse = "I need your Gemini API key to connect. Please add it in settings.";
      }
    } catch (err: any) {
      console.warn('Voice Gemini generation error:', err);
      const errMsg = err?.message || '';
      if (errMsg.includes('429') || errMsg.includes('quota')) {
        aiResponse = "My Gemini connection reached its rate limit for a moment. Give me just a few seconds to reconnect.";
      } else {
        aiResponse = "I had trouble connecting to Gemini. Feel free to speak again whenever you're ready.";
      }
    }

    // 4. Update transcript
    const updatedTurns = this.transcriptMgr.addAiTurn(aiResponse);
    this.callbacks?.onTranscriptUpdate(updatedTurns);

    // 5. Automatic Spoken Audio (AI_SPEAKING)
    this.setState('AI_SPEAKING');
    this.audioOutput.speak(
      aiResponse,
      this.config,
      () => {
        this.setState('AI_SPEAKING');
      },
      () => {
        if (this.state === 'AI_SPEAKING') {
          this.setState('LISTENING');
          this.vad.resetSilence();
        }
      }
    );

    return aiResponse;
  }

  public interrupt(): void {
    this.interruptionMgr.forceInterrupt(() => {
      this.setState('INTERRUPTED');
      setTimeout(() => {
        if (this.state === 'INTERRUPTED') {
          this.setState('LISTENING');
        }
      }, 500);
    });
  }

  public toggleMute(): boolean {
    const isMuted = this.mic.toggleMute();
    if (isMuted) {
      this.setState('PAUSED');
    } else {
      this.setState('LISTENING');
    }
    return isMuted;
  }

  public end(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this.vad.stopSilenceMonitor();
    this.audioOutput.stop();
    this.mic.stop();
    this.setState('ENDED');
  }

  public getState(): VoiceState {
    return this.state;
  }

  public getTranscript(): VoiceTranscriptTurn[] {
    return this.transcriptMgr.getTurns();
  }

  private setState(state: VoiceState): void {
    this.state = state;
    this.callbacks?.onStateChange(state);
  }
}
