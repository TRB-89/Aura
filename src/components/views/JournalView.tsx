import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { JournalEntry, ActiveRoute } from '../../types';
import { INITIAL_JOURNAL_ENTRIES } from '../../data/mockData';
import { geminiProvider } from '../../lib/ai/geminiProvider';
import {
  Sparkles,
  Lock,
  Clock,
  Plus,
  Tag,
  ArrowLeft,
  Check,
  BookOpen,
  Database,
} from 'lucide-react';

interface JournalViewProps {
  onRouteChange: (route: ActiveRoute) => void;
}

export const JournalView: React.FC<JournalViewProps> = ({ onRouteChange }) => {
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem('aura_journal_entries');
    return saved ? JSON.parse(saved) : INITIAL_JOURNAL_ENTRIES;
  });

  const [activeEntryId, setActiveEntryId] = useState<string>(entries[0]?.id || '');
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newMood, setNewMood] = useState<JournalEntry['moodTag']>('Quiet');
  const [isPrivate, setIsPrivate] = useState(true);
  const [isTemporary, setIsTemporary] = useState(false);
  const [isReflecting, setIsReflecting] = useState(false);
  const [memoryNotice, setMemoryNotice] = useState<string | null>(null);

  const activeEntry = entries.find((e) => e.id === activeEntryId) || entries[0];

  const handleSaveEntry = () => {
    if (!newTitle.trim() && !newContent.trim()) return;

    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      title: newTitle.trim() || 'Untitled Reflection',
      content: newContent.trim(),
      moodTag: newMood,
      isPrivate,
      isTemporary,
      aiReflection: undefined,
    };

    const updated = [entry, ...entries];
    setEntries(updated);
    if (!isTemporary) {
      localStorage.setItem('aura_journal_entries', JSON.stringify(updated));
    }
    setActiveEntryId(entry.id);
    setIsCreatingNew(false);
    setNewTitle('');
    setNewContent('');
  };

  const handleRequestAiReflection = async () => {
    if (!activeEntry) return;
    setIsReflecting(true);

    try {
      if (geminiProvider.isConfigured()) {
        const reflection = await geminiProvider.reflectOnJournal(activeEntry.content, {
          mode: 'reflect',
          tone: 'warm',
          responseLength: 'short',
          adviceAllowed: false,
          safetyState: 'NORMAL',
          memoryEnabled: !activeEntry.isTemporary,
          isVoiceMode: false,
        });

        const updated = entries.map((e) =>
          e.id === activeEntry.id ? { ...e, aiReflection: reflection } : e
        );
        setEntries(updated);
        localStorage.setItem('aura_journal_entries', JSON.stringify(updated));
      } else {
        setTimeout(() => {
          const generated =
            'Reading your words, there is a clear yearning for slower pacing. Notice how gently you observed your feelings without harsh judgment. That self-compassion is your anchor.';
          const updated = entries.map((e) =>
            e.id === activeEntry.id ? { ...e, aiReflection: generated } : e
          );
          setEntries(updated);
          localStorage.setItem('aura_journal_entries', JSON.stringify(updated));
          setIsReflecting(false);
        }, 900);
        return;
      }
    } catch (err) {
      console.warn('Reflection error:', err);
    } finally {
      setIsReflecting(false);
    }
  };

  const moodOptions: JournalEntry['moodTag'][] = [
    'Quiet',
    'Heavy',
    'Grounded',
    'Anxious',
    'Clear',
    'Seeking',
  ];

  return (
    <div
      style={{
        paddingTop: 96,
        paddingBottom: 80,
        minHeight: '100vh',
        backgroundColor: 'var(--color-cream-primary)',
      }}
    >
      <div className="container" style={{ maxWidth: 1040 }}>
        {/* Top Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 36,
            borderBottom: '1px solid var(--border-subtle)',
            paddingBottom: 20,
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              onClick={() => onRouteChange('dashboard')}
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'var(--color-beige-soft)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              title="Dashboard"
            >
              <ArrowLeft size={16} />
            </button>
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem' }}>
                Reflection Notebook
              </h2>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-taupe-muted)' }}>
                Private paper refuge • Powered by Gemini Reflection
              </span>
            </div>
          </div>

          <button
            className="btn-pill btn-primary"
            onClick={() => {
              setIsCreatingNew(true);
              setNewTitle('');
              setNewContent('');
            }}
            style={{ padding: '10px 22px' }}
          >
            <Plus size={16} />
            <span>New Entry</span>
          </button>
        </div>

        {/* 2-Column Split: Timeline & Paper Sheet */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: 36,
            alignItems: 'start',
          }}
        >
          {/* Timeline of Past Entries */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span
              style={{
                fontSize: '0.78rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--color-bronze)',
                fontWeight: 600,
              }}
            >
              PAST PAGES
            </span>

            {entries.map((entry) => (
              <div
                key={entry.id}
                onClick={() => {
                  setActiveEntryId(entry.id);
                  setIsCreatingNew(false);
                }}
                className="card-premium"
                style={{
                  padding: 20,
                  cursor: 'pointer',
                  borderColor:
                    !isCreatingNew && activeEntryId === entry.id
                      ? 'var(--color-bronze)'
                      : 'var(--border-subtle)',
                  background:
                    !isCreatingNew && activeEntryId === entry.id ? '#FFFDF9' : 'var(--color-white-cream)',
                  boxShadow:
                    !isCreatingNew && activeEntryId === entry.id
                      ? 'var(--shadow-soft)'
                      : 'var(--shadow-subtle)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-taupe-muted)' }}>
                    {entry.date}
                  </span>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      padding: '2px 8px',
                      borderRadius: 9999,
                      background: 'var(--color-beige-soft)',
                      color: 'var(--color-brown-dark)',
                    }}
                  >
                    {entry.moodTag}
                  </span>
                </div>

                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--color-brown-dark)', marginBottom: 4 }}>
                  {entry.title}
                </h4>

                <p
                  style={{
                    fontSize: '0.82rem',
                    color: 'var(--color-taupe-muted)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {entry.content}
                </p>
              </div>
            ))}
          </div>

          {/* Right: Paper Journal Sheet */}
          <div className="journal-sheet" style={{ minHeight: 480 }}>
            {isCreatingNew ? (
              /* Writing Mode */
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-taupe-muted)' }}>
                    New Reflection • Today
                  </span>

                  {/* Mood Selector */}
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {moodOptions.map((mood) => (
                      <button
                        key={mood}
                        onClick={() => setNewMood(mood)}
                        style={{
                          fontSize: '0.75rem',
                          padding: '3px 10px',
                          borderRadius: 9999,
                          background: newMood === mood ? 'var(--color-bronze)' : 'var(--color-beige-soft)',
                          color: newMood === mood ? '#fff' : 'var(--color-brown-dark)',
                        }}
                      >
                        {mood}
                      </button>
                    ))}
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="Give your thought a quiet name..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  style={{
                    width: '100%',
                    fontFamily: 'var(--font-serif)',
                    fontSize: '2rem',
                    fontWeight: 600,
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    color: 'var(--color-brown-dark)',
                    marginBottom: 20,
                  }}
                />

                <textarea
                  placeholder="What is resting on your chest or spinning in your thoughts today? There is no judgment here..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  rows={8}
                  style={{
                    width: '100%',
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    fontSize: '1.05rem',
                    lineHeight: 1.75,
                    fontFamily: 'var(--font-sans)',
                    color: '#382e27',
                    resize: 'vertical',
                    marginBottom: 24,
                  }}
                />

                <div
                  style={{
                    borderTop: '1px solid var(--border-subtle)',
                    paddingTop: 20,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 16,
                  }}
                >
                  <div style={{ display: 'flex', gap: 16 }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', color: 'var(--color-taupe-muted)', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={isPrivate}
                        onChange={(e) => setIsPrivate(e.target.checked)}
                      />
                      <Lock size={12} />
                      <span>Private Entry</span>
                    </label>

                    <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', color: 'var(--color-taupe-muted)', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={isTemporary}
                        onChange={(e) => setIsTemporary(e.target.checked)}
                      />
                      <Clock size={12} />
                      <span>Temporary (dissolves on exit)</span>
                    </label>
                  </div>

                  <div style={{ display: 'flex', gap: 10 }}>
                    <button
                      className="btn-pill btn-secondary"
                      onClick={() => setIsCreatingNew(false)}
                      style={{ padding: '8px 18px', fontSize: '0.85rem' }}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn-pill btn-primary"
                      onClick={handleSaveEntry}
                      style={{ padding: '8px 22px', fontSize: '0.85rem' }}
                    >
                      <Check size={14} />
                      <span>Keep Entry</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : activeEntry ? (
              /* Reading Active Entry */
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, borderBottom: '1px solid var(--border-subtle)', paddingBottom: 16 }}>
                  <div>
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-taupe-muted)' }}>
                      {activeEntry.date}
                    </span>
                    <span style={{ margin: '0 8px', color: 'var(--color-sand-warm)' }}>•</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-bronze)', fontWeight: 500 }}>
                      {activeEntry.moodTag}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: 8 }}>
                    {activeEntry.isPrivate && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: '0.75rem', color: 'var(--color-olive-soft)', background: 'rgba(138, 139, 114, 0.12)', padding: '2px 8px', borderRadius: 9999 }}>
                        <Lock size={10} />
                        <span>Private</span>
                      </span>
                    )}
                  </div>
                </div>

                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: 20 }}>
                  {activeEntry.title}
                </h3>

                <p style={{ fontSize: '1.08rem', lineHeight: 1.8, color: '#382e27', marginBottom: 32 }}>
                  {activeEntry.content}
                </p>

                {/* AI Reflection Drawer */}
                <div
                  style={{
                    background: 'rgba(212, 184, 146, 0.14)',
                    border: '1px solid rgba(169, 122, 77, 0.2)',
                    borderRadius: 16,
                    padding: 22,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Sparkles size={14} color="var(--color-bronze)" />
                      <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-bronze)', fontWeight: 600 }}>
                        Reflect with Gemini AI
                      </span>
                    </div>

                    <button
                      onClick={handleRequestAiReflection}
                      className="btn-pill btn-secondary"
                      style={{ padding: '4px 12px', fontSize: '0.78rem' }}
                      disabled={isReflecting}
                    >
                      {isReflecting ? 'Gemini is reflecting...' : 'Reflect on this'}
                    </button>
                  </div>

                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontStyle: 'italic', lineHeight: 1.6, color: 'var(--color-brown-dark)' }}>
                    "{activeEntry.aiReflection || 'Tap "Reflect on this" to receive an intimate, compassionate reflection on this entry.'}"
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
