import { VoiceConfig } from './types';

// Gemini Live officially supported natural voices
export const GEMINI_LIVE_VOICES = [
  { id: 'Aoede', name: 'Aoede (Warm & Serene Female)', gender: 'female', recommended: true },
  { id: 'Kore', name: 'Kore (Calm & Reflective Female)', gender: 'female', recommended: false },
  { id: 'Fenrir', name: 'Fenrir (Deep & Grounded Male)', gender: 'male', recommended: false },
  { id: 'Puck', name: 'Puck (Gentle & Engaging Neutral)', gender: 'neutral', recommended: false },
];

export const DEFAULT_VOICE_CONFIG: VoiceConfig = {
  voiceName: 'Aoede', // Official Gemini natural serene female voice
  pitch: 1.0,
  speed: 0.92, // Calm, unhurried pacing
  silenceThresholdSeconds: 2.5,
  autoSpeak: true,
  bargeInEnabled: true,
};
