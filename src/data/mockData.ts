import { ChatMessage, JournalEntry, ResetExercise } from '../types';

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: '1',
    sender: 'user',
    text: 'Today was honestly awful.',
    timestamp: '8:42 PM',
  },
  {
    id: '2',
    sender: 'ai',
    text: 'Yeah? What happened?',
    timestamp: '8:42 PM',
  },
  {
    id: '3',
    sender: 'user',
    text: 'My presentation went badly. Everyone looked bored and I stumbled over my words.',
    timestamp: '8:43 PM',
  },
  {
    id: '4',
    sender: 'ai',
    text: 'That sinking feeling is so heavy. Take a slow breath with me. Did something go specifically wrong, or does it just feel unbearable right now?',
    timestamp: '8:43 PM',
  },
];

export const INITIAL_JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: 'j1',
    date: 'October 10, 2026',
    title: 'The weight of deadlines and morning fog',
    content:
      'Woke up before my alarm with my chest feeling tight. It felt like ten different things demanded an immediate answer before I even had coffee. I took five minutes on the balcony just watching the wind move the leaves. It helped a little.',
    moodTag: 'Heavy',
    isPrivate: true,
    isTemporary: false,
    aiReflection:
      'You noticed the physical sensation in your chest before the thoughts took over. Stepping onto the balcony was an intentional pause—it shows your natural instinct to find quiet ground.',
  },
  {
    id: 'j2',
    date: 'October 8, 2026',
    title: 'A conversation that felt honest',
    content:
      'Finally told Maya how drained I have been feeling lately instead of giving my usual "I am good, just busy" response. She did not try to fix it, which was a relief. Just sat with me.',
    moodTag: 'Grounded',
    isPrivate: false,
    isTemporary: false,
    aiReflection:
      'Honesty without the urge to perform can be surprisingly restorative. Allowing someone else to simply sit with you creates rare breathing room.',
  },
  {
    id: 'j3',
    date: 'October 5, 2026',
    title: 'Evening walk after sunset',
    content:
      'Left my phone on the kitchen counter and went around the block twice. The streetlamps were just turning warm amber. My mind felt less crowded afterwards.',
    moodTag: 'Clear',
    isPrivate: true,
    isTemporary: false,
    aiReflection:
      'Physical disconnection from screens continues to be your most reliable trigger for mental unwinding.',
  },
];

export const RESET_EXERCISES: ResetExercise[] = [
  {
    id: '60sec',
    title: '60-Second Reset',
    subtitle: 'Quick autonomic regulation',
    description: 'A gentle 4-second inhale followed by an elongated 6-second exhale to trigger your parasympathetic nervous system.',
    inhale: 4,
    hold1: 0,
    exhale: 6,
    hold2: 0,
    defaultMinutes: 1,
  },
  {
    id: 'box',
    title: 'Box Breathing',
    subtitle: 'Steady focus & grounding',
    description: 'Four equal quarters of breath: inhale, hold with full lungs, exhale, hold with empty lungs.',
    inhale: 4,
    hold1: 4,
    exhale: 4,
    hold2: 4,
    defaultMinutes: 4,
  },
  {
    id: 'grounding',
    title: '5-4-3-2-1 Grounding',
    subtitle: 'Sensory orientation',
    description: 'Deep centered breaths coupled with sensory presence: 5 sights, 4 physical sensations, 3 sounds, 2 scents, 1 breath.',
    inhale: 5,
    hold1: 2,
    exhale: 7,
    hold2: 2,
    defaultMinutes: 5,
  },
  {
    id: 'quiet',
    title: 'Quiet Room',
    subtitle: 'Stillness without timing',
    description: 'Unstructured resting space. An unhurried rhythmic wave that lets your lungs naturally settle into peace.',
    inhale: 4,
    hold1: 3,
    exhale: 5,
    hold2: 2,
    defaultMinutes: 2,
  },
  {
    id: 'thought_dump',
    title: 'Thought Dump',
    subtitle: 'Exhaling mental clutter',
    description: 'Rhythmic breath while releasing swirling thoughts onto the exhale, giving your active mind permission to pause.',
    inhale: 4,
    hold1: 2,
    exhale: 6,
    hold2: 1,
    defaultMinutes: 3,
  },
  {
    id: 'sleep',
    title: 'Sleep Wind Down',
    subtitle: '4-7-8 Somatic Transition',
    description: 'Inhale for 4 seconds, hold gently for 7, and release a soft sighing exhale for 8 seconds to prepare for sleep.',
    inhale: 4,
    hold1: 7,
    exhale: 8,
    hold2: 0,
    defaultMinutes: 5,
  },
  {
    id: 'pmr',
    title: 'Progressive Muscle Relaxation',
    subtitle: 'Body tension release',
    description: 'Inhale while noticing body tension; exhale while deliberately relaxing your jaw, shoulders, and chest.',
    inhale: 5,
    hold1: 3,
    exhale: 6,
    hold2: 2,
    defaultMinutes: 6,
  },
];

export const OBSERVATIONAL_INSIGHTS = {
  headline: 'Notice patterns without turning yourself into a score.',
  subtext: 'We never grade your mental health or assign clinical percentages. Instead, we reflect gentle observations to help you understand your rhythms.',
  observations: [
    {
      label: 'Check-in Rhythm',
      text: 'You tend to check in more during late evenings between 8:30 PM and 11:00 PM, especially following high-demand work days.',
      highlight: 'Late evening wind-down',
    },
    {
      label: 'Recurring Themes',
      text: 'Recent reflections frequently touch on boundaries with work communications and craving unhurried quiet mornings.',
      highlight: 'Space & Boundaries',
    },
    {
      label: 'Helpful Moments',
      text: 'Brief 2-minute breathwork resets and leaving devices behind during evening walks have consistently corresponded to clearer journal reflections.',
      highlight: 'Unplugged resets',
    },
  ],
  weeklyActivity: [
    { day: 'Mon', count: 3, theme: 'Work re-entry' },
    { day: 'Tue', count: 2, theme: 'Quiet check-in' },
    { day: 'Wed', count: 4, theme: 'Meeting fatigue' },
    { day: 'Thu', count: 5, theme: 'Breath reset' },
    { day: 'Fri', count: 2, theme: 'Decompressing' },
    { day: 'Sat', count: 1, theme: 'Rest' },
    { day: 'Sun', count: 3, theme: 'Week ahead' },
  ],
};

export const SAFETY_RESOURCES = [
  {
    name: '988 Suicide & Crisis Lifeline',
    desc: 'Free, confidential support available 24/7 across the US and Canada. Call or text 988.',
    contact: 'Call / Text 988',
    url: 'https://988lifeline.org',
  },
  {
    name: 'Crisis Text Line',
    desc: 'Text HOME to 741741 to connect with a volunteer crisis counselor 24/7.',
    contact: 'Text HOME to 741741',
    url: 'https://www.crisistextline.org',
  },
  {
    name: 'The Trevor Project',
    desc: 'Support for LGBTQ young people available 24/7 via call, text, or chat.',
    contact: 'Call 1-866-488-7386 or Text START to 678-678',
    url: 'https://www.thetrevorproject.org',
  },
  {
    name: 'Befrienders Worldwide',
    desc: 'Confidential emotional support for anyone in distress or despair worldwide.',
    contact: 'Find your country helpline',
    url: 'https://www.befrienders.org',
  },
];
