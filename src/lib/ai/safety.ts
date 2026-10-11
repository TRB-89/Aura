import { SafetyEvaluation, SafetyState } from './types';

// Fast local heuristic safety keywords (non-diagnostic, triage only)
const CRISIS_PATTERNS = [
  /\b(suicide|kill myself|end my life|end it all|want to die|better off dead)\b/i,
  /\b(hang myself|overdose|slit my wrist|jump off|shoot myself)\b/i,
  /\b(give up on living|no reason to live|goodbye forever)\b/i,
];

const HIGH_CONCERN_PATTERNS = [
  /\b(can'?t go on|hurting myself|self[- ]harm|cutting myself)\b/i,
  /\b(feel like disappearing|nobody would care if I died)\b/i,
  /\b(unbearable pain|drowning inside|hopelessness)\b/i,
];

const DISTRESS_PATTERNS = [
  /\b(panic attack|hyperventilating|can'?t breathe|shaking uncontrollably)\b/i,
  /\b(so overwhelmed|breaking down|falling apart|crying all day)\b/i,
  /\b(terrified|so scared|awful day|completely exhausted)\b/i,
];

export class SafetyLayer {
  public static evaluateFast(text: string): SafetyEvaluation {
    const trimmed = text.trim();
    if (!trimmed) {
      return { state: 'NORMAL', requiresIntervention: false };
    }

    for (const pattern of CRISIS_PATTERNS) {
      if (pattern.test(trimmed)) {
        return {
          state: 'CRISIS',
          requiresIntervention: true,
          suggestedAction: 'emergency_hotline',
          reason: 'Severe immediate crisis language detected',
        };
      }
    }

    for (const pattern of HIGH_CONCERN_PATTERNS) {
      if (pattern.test(trimmed)) {
        return {
          state: 'HIGH_CONCERN',
          requiresIntervention: true,
          suggestedAction: 'surface_resources',
          reason: 'High distress or self-harm ideation detected',
        };
      }
    }

    for (const pattern of DISTRESS_PATTERNS) {
      if (pattern.test(trimmed)) {
        return {
          state: 'DISTRESS',
          requiresIntervention: false,
          suggestedAction: 'grounding',
          reason: 'Elevated emotional strain or panic symptoms detected',
        };
      }
    }

    return {
      state: 'NORMAL',
      requiresIntervention: false,
    };
  }

  public static getCalmDeescalationMessage(state: SafetyState): string {
    switch (state) {
      case 'CRISIS':
        return "I am hearing how intensely overwhelming and painful things feel right now. Your life and your presence matter deeply. You do not have to carry this alone—please let me connect you with caring, confidential human support right now.";
      case 'HIGH_CONCERN':
        return "It sounds like things feel especially heavy right now. I'm right here with you. Let's take a slow breath together, and remember there are trusted people and resources ready to support you.";
      case 'DISTRESS':
        return "Let's slow right down together. Take a gentle breath with me. There is no rush to fix anything right this second.";
      default:
        return '';
    }
  }
}
