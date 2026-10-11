export type ActiveRoute = 
  | 'landing' 
  | 'dashboard' 
  | 'chat' 
  | 'voice' 
  | 'journal' 
  | 'reset' 
  | 'presence' 
  | 'insights' 
  | 'privacy'
  | 'settings';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  moodTag: 'Quiet' | 'Heavy' | 'Grounded' | 'Anxious' | 'Clear' | 'Seeking';
  isPrivate: boolean;
  isTemporary: boolean;
  aiReflection?: string;
}

export interface ResetExercise {
  id: 'box' | '60sec' | 'grounding' | 'quiet' | 'thought_dump' | 'sleep' | 'pmr';
  title: string;
  subtitle: string;
  description: string;
  inhale: number;
  hold1: number;
  exhale: number;
  hold2: number;
  defaultMinutes: number;
}

export interface PrivacySettings {
  memoryEnabled: boolean;
  temporarySession: boolean;
  rawAudioSaved: boolean;
}
