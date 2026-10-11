# Aura — AI Emotional Wellbeing Companion

Aura is an editorial, luxury-styled AI emotional wellbeing companion built with React, TypeScript, Vite, and Google Gemini. Aura provides authentic, contextual, and grounded conversations across voice and text without robotic scripts, clinical diagnosis, or canned emotional fallbacks.

![Aura Preview](public/images/hero_cinematic.jpg)

## Features

- **Warm Human Conversation Layer**: Powered by Google Gemini with reaction-first grounding, anti-repetition tracking, strict multiturn alternation, and adaptive word counts.
- **Multimodal Voice Mode**: Continuous live voice session with Web Audio energy polling, Voice Activity Detection (VAD), speech-rate analysis, and instant barge-in / interruption handling.
- **Support Modes**:
  - `Listen`: Quiet, non-prescriptive validation.
  - `Reflect`: Non-diagnostic pattern mirroring.
  - `Help Me Think`: Calm, practical decision sorting.
  - `Reset`: Low cognitive load somatic grounding.
- **Autonomic Nervous System Resets**: 7 guided somatic exercises (60-second Reset, Box Breathing, 5-4-3-2-1 Grounding, Quiet Room, Thought Dump, Sleep Wind Down, Progressive Muscle Relaxation) with Web Audio soundscapes.
- **Digital Paper Journal**: Linen-textured notebook with mood categorization, private entries, and gentle margin-note reflections.
- **Privacy & Safety First**: Ephemeral session modes, raw audio discarding, client-side data sovereignty, crisis de-escalation protocols, and immediate safety hotline resources.

## Quick Start

### 1. Installation

```bash
npm install
```

### 2. Configure Environment

Create a `.env` file in the root directory:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Development Server

```bash
npm run dev
```

Visit `http://localhost:5173/` in your browser.

### 4. Build for Production

```bash
npm run build
```

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Vanilla CSS with custom editorial design tokens (Warm Cream `#F6F0E6`, Warm Amber `#C47D42`, Editorial Serif Typography)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **AI Core**: `@google/generative-ai` (Google Gemini)
