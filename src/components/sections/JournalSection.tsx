import React from 'react';
import { motion } from 'framer-motion';
import { ActiveRoute } from '../../types';
import { BookOpen, Sparkles, Lock, Clock, Tag } from 'lucide-react';

interface JournalSectionProps {
  onRouteChange: (route: ActiveRoute) => void;
}

export const JournalSection: React.FC<JournalSectionProps> = ({ onRouteChange }) => {
  return (
    <section className="section-wrapper soft-beige" id="journal">
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 64,
            alignItems: 'center',
          }}
        >
          {/* Left: Editorial copy */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="editorial-badge">INTIMATE REFLECTION</span>

            <h2 style={{ marginBottom: 24 }}>
              Some things are easier to write.
            </h2>

            <p style={{ fontSize: '1.2rem', lineHeight: 1.65, color: 'var(--color-brown-dark)', opacity: 0.85, marginBottom: 32 }}>
              A sanctuary for unstructured thoughts. Capture messy mornings, honest frustrations, or quiet realizations on a digital linen page designed to feel as intimate as your personal notebook.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--color-cream-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Sparkles size={14} color="var(--color-bronze)" />
                </div>
                <span style={{ fontSize: '0.95rem', color: 'var(--color-brown-dark)' }}>
                  <strong>Reflect with AI:</strong> Receive gentle, non-clinical reflections when requested.
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--color-cream-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Lock size={14} color="var(--color-olive-soft)" />
                </div>
                <span style={{ fontSize: '0.95rem', color: 'var(--color-brown-dark)' }}>
                  <strong>Private Entries:</strong> Encrypted locally, isolated from any AI model training.
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--color-cream-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Clock size={14} color="var(--color-taupe-muted)" />
                </div>
                <span style={{ fontSize: '0.95rem', color: 'var(--color-brown-dark)' }}>
                  <strong>Temporary Entries:</strong> Write to decompress and let the entry dissolve when closed.
                </span>
              </div>
            </div>

            <button
              className="btn-pill btn-primary"
              onClick={() => onRouteChange('journal')}
              style={{ padding: '14px 32px' }}
            >
              <BookOpen size={16} />
              <span>Open Reflection Journal</span>
            </button>
          </motion.div>

          {/* Right: Paper-like journal mockup */}
          <motion.div
            className="journal-sheet"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Header: Date and Tags */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 24,
                borderBottom: '1px solid rgba(139, 123, 108, 0.12)',
                paddingBottom: 16,
              }}
            >
              <div>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-taupe-muted)' }}>
                  Saturday, October 10, 2026
                </span>
                <span style={{ margin: '0 8px', color: 'var(--color-sand-warm)' }}>•</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-bronze)', fontWeight: 500 }}>
                  Evening Reflection
                </span>
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    padding: '4px 10px',
                    borderRadius: 9999,
                    background: 'var(--color-beige-soft)',
                    fontSize: '0.75rem',
                    color: 'var(--color-brown-dark)',
                  }}
                >
                  <Tag size={10} />
                  <span>Heavy</span>
                </span>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    padding: '4px 10px',
                    borderRadius: 9999,
                    background: 'rgba(138, 139, 114, 0.15)',
                    fontSize: '0.75rem',
                    color: 'var(--color-olive-soft)',
                  }}
                >
                  <Lock size={10} />
                  <span>Private</span>
                </span>
              </div>
            </div>

            {/* Title */}
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.8rem',
                color: 'var(--color-brown-dark)',
                marginBottom: 16,
                fontWeight: 600,
              }}
            >
              The weight of deadlines and morning fog
            </h3>

            {/* Content body */}
            <p
              style={{
                fontSize: '1.05rem',
                lineHeight: 1.75,
                color: '#382e27',
                marginBottom: 28,
              }}
            >
              Woke up before my alarm with my chest feeling tight. It felt like ten different things demanded an immediate answer before I even had coffee. I took five minutes on the balcony just watching the wind move the leaves. It helped a little.
            </p>

            {/* AI Reflection Drawer */}
            <div
              style={{
                background: 'rgba(212, 184, 146, 0.14)',
                border: '1px solid rgba(169, 122, 77, 0.2)',
                borderRadius: 16,
                padding: '20px',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <Sparkles size={14} color="var(--color-bronze)" />
                <span
                  style={{
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'var(--color-bronze)',
                  }}
                >
                  Reflect with AI
                </span>
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.05rem',
                  lineHeight: 1.6,
                  color: 'var(--color-brown-dark)',
                  fontStyle: 'italic',
                }}
              >
                "You noticed the physical sensation in your chest before the thoughts took over. Stepping onto the balcony was an intentional pause—it shows your natural instinct to find quiet ground."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
