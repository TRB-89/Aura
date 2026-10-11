export type VoiceState =
  | 'READY'
  | 'CONNECTING'
  | 'LISTENING'
  | 'USER_SPEAKING'
  | 'THINKING'
  | 'AI_SPEAKING'
  | 'INTERRUPTED'
  | 'PAUSED'
  | 'ERROR'
  | 'ENDED';

export interface VoiceConfig {
  voiceName: string; // Supported Gemini Voice preset e.g. 'Aoede' / 'Kore' or browser natural female
  pitch: number;
  speed: number;
  silenceThresholdSeconds: number;
  autoSpeak: boolean;
  bargeInEnabled: boolean;
}

export interface SpeechSignalMetrics {
  currentEnergy: number; // 0..1
  averageEnergy: number;
  pauseDurationMs: number;
  utteranceDurationMs: number;
  speechRateWordsPerMin: number;
  sessionBaselineEnergy: number;
  longPauseCount: number;
}

export interface VoiceTranscriptTurn {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  isPartial: boolean;
}

export interface VoiceSessionCallbacks {
  onStateChange: (state: VoiceState) => void;
  onTranscriptUpdate: (turns: VoiceTranscriptTurn[]) => void;
  onSignalUpdate?: (metrics: SpeechSignalMetrics) => void;
  onError: (error: Error) => void;
}
