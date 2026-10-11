import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ActiveRoute } from '../../types';
import { Lock, EyeOff, MicOff, Trash2, Database, Download, Check } from 'lucide-react';

interface PrivacySectionProps {
  onRouteChange: (route: ActiveRoute) => void;
}

export const PrivacySection: React.FC<PrivacySectionProps> = ({ onRouteChange }) => {
  const [memoryOff, setMemoryOff] = useState(false);
  const [tempSession, setTempSession] = useState(false);
  const [rawAudioOff, setRawAudioOff] = useState(true);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const triggerFeedback = (msg: string) => {
    setActionFeedback(msg);
    setTimeout(() => setActionFeedback(null), 3000);
  };

  const privacyCards = [
    {
      id: 'memory',
      title: 'Memory Off',
      desc: 'Pause all memory retention. Conversations happen purely in the moment without building long-term context.',
      icon: <EyeOff size={20} color="var(--color-bronze)" />,
      type: 'toggle',
      checked: memoryOff,
      onToggle: () => setMemoryOff(!memoryOff),
    },
    {
      id: 'temporary',
      title: 'Temporary Session',
      desc: 'All dialog and voice interactions are wiped completely from memory upon closing the tab or window.',
      icon: <Lock size={20} color="var(--color-olive-soft)" />,
      type: 'toggle',
      checked: tempSession,
      onToggle: () => setTempSession(!tempSession),
    },
    {
      id: 'raw_audio',
      title: 'Raw Audio Off',
      desc: 'Voice is processed entirely in ephemeral streaming buffers. Raw voice recordings are never stored on any disk.',
      icon: <MicOff size={20} color="var(--color-amber-muted)" />,
      type: 'toggle',
      checked: rawAudioOff,
      onToggle: () => setRawAudioOff(!rawAudioOff),
    },
    {
      id: 'delete_convo',
      title: 'Delete Conversation',
      desc: 'Instantly purge your current discussion transcript with a single tap. Non-recoverable.',
      icon: <Trash2 size={20} color="var(--color-taupe-muted)" />,
      type: 'button',
      actionLabel: 'Delete Now',
      onClick: () => triggerFeedback('Current conversation transcript purged.'),
    },
    {
      id: 'clear_memory',
      title: 'Clear Long-Term Memory',
      desc: 'Erase all recalled preferences, journal themes, and historical context permanently.',
      icon: <Database size={20} color="var(--color-taupe-muted)" />,
      type: 'button',
      actionLabel: 'Clear All',
      onClick: () => triggerFeedback('All stored memories and preferences cleared.'),
    },
    {
      id: 'export',
      title: 'Export Your Data',
      desc: 'Download a clean JSON archive containing your private reflections and conversation history.',
      icon: <Download size={20} color="var(--color-bronze)" />,
      type: 'button',
      actionLabel: 'Download JSON',
      onClick: () => {
        const dummyData = {
          exportedAt: new Date().toISOString(),
          privacyStandard: 'Aura Zero-Knowledge Local Retention',
          entriesCount: 3,
        };
        const blob = new Blob([JSON.stringify(dummyData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'aura-wellbeing-export.json';
        a.click();
        triggerFeedback('Export downloaded to your device.');
      },
    },
  ];

  return (
    <section className="section-wrapper soft-beige" id="privacy">
      <div className="container">
        <motion.div
          style={{ textAlign: 'center', maxWidth: 820, margin: '0 auto 60px' }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="editorial-badge">DATA SOVEREIGNTY</span>

          <h2 style={{ marginBottom: 20 }}>
            Your thoughts stay under your control.
          </h2>

          <p style={{ fontSize: '1.2rem', lineHeight: 1.6, color: 'var(--color-brown-dark)', opacity: 0.85 }}>
            No ad tracking. No selling transcripts to data brokers. No forced memory persistence.<br />
            You determine what is held and what dissolves.
          </p>
        </motion.div>

        {/* Feedback Banner */}
        {actionFeedback && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              maxWidth: 500,
              margin: '0 auto 32px',
              padding: '12px 20px',
              borderRadius: 9999,
              background: 'var(--color-brown-dark)',
              color: 'var(--color-white-cream)',
              textAlign: 'center',
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <Check size={16} color="var(--color-sand-warm)" />
            <span>{actionFeedback}</span>
          </motion.div>
        )}

        {/* 6-Card Stack Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 24,
          }}
        >
          {privacyCards.map((card, idx) => (
            <motion.div
              key={card.id}
              className="card-premium"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 12,
                        background: 'var(--color-cream-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {card.icon}
                    </div>
                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--color-brown-dark)' }}>
                      {card.title}
                    </h4>
                  </div>

                  {card.type === 'toggle' && (
                    <button
                      onClick={card.onToggle}
                      style={{
                        width: 46,
                        height: 26,
                        borderRadius: 9999,
                        background: card.checked ? 'var(--color-bronze)' : 'rgba(65, 50, 40, 0.2)',
                        padding: 3,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: card.checked ? 'flex-end' : 'flex-start',
                        transition: 'var(--transition-smooth)',
                      }}
                      aria-label={`Toggle ${card.title}`}
                    >
                      <div
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: '50%',
                          background: '#fff',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                        }}
                      />
                    </button>
                  )}
                </div>

                <p style={{ fontSize: '0.92rem', lineHeight: 1.55, color: 'var(--color-taupe-muted)' }}>
                  {card.desc}
                </p>
              </div>

              {card.type === 'button' && (
                <div style={{ marginTop: 20, borderTop: '1px solid var(--border-subtle)', paddingTop: 14 }}>
                  <button
                    onClick={card.onClick}
                    className="btn-pill btn-secondary"
                    style={{ padding: '8px 18px', fontSize: '0.82rem', width: '100%' }}
                  >
                    <span>{card.actionLabel}</span>
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
