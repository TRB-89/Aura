import React from 'react';
import { motion } from 'framer-motion';
import { Orb } from '../Orb';
import { ActiveRoute } from '../../types';
import { Moon, Sparkles } from 'lucide-react';

interface PresenceModeSectionProps {
  onRouteChange: (route: ActiveRoute) => void;
}

export const PresenceModeSection: React.FC<PresenceModeSectionProps> = ({ onRouteChange }) => {
  return (
    <section
      className="section-wrapper"
      style={{
        backgroundColor: '#1C1815',
        color: 'var(--color-white-cream)',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
        padding: '140px 0',
      }}
      id="presence"
    >
      {/* Background radial warmth */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(169, 122, 77, 0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          style={{ maxWidth: 780, margin: '0 auto 56px' }}
        >
          <span
            className="editorial-badge"
            style={{
              color: 'var(--color-sand-warm)',
              background: 'rgba(212, 184, 146, 0.12)',
              padding: '6px 16px',
              borderRadius: 9999,
            }}
          >
            <Moon size={12} />
            <span>PRESENCE MODE</span>
          </span>

          <h2
            style={{
              color: 'var(--color-white-cream)',
              marginBottom: 16,
              fontSize: 'clamp(2.4rem, 4.8vw, 3.8rem)',
            }}
          >
            Sometimes you don't need answers.
          </h2>

          <p
            style={{
              fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)',
              fontFamily: 'var(--font-serif)',
              color: 'var(--color-sand-warm)',
              fontStyle: 'italic',
              opacity: 0.95,
            }}
          >
            You just need somewhere to stay for a while.
          </p>
        </motion.div>

        {/* Large breathing presence orb */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          style={{ marginBottom: 48 }}
        >
          <Orb
            stateText="I'm here."
            size="large"
            isListening={false}
            isSpeaking={false}
          />
        </motion.div>

        {/* Minimal helper copy */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}
        >
          <p
            style={{
              fontSize: '0.95rem',
              color: 'var(--color-beige-soft)',
              opacity: 0.75,
              maxWidth: 420,
              lineHeight: 1.6,
            }}
          >
            No prompt to answer. No session goal to achieve. Hold space, breathe in unison, or speak whenever you are ready.
          </p>

          <button
            className="btn-pill btn-bronze"
            onClick={() => onRouteChange('presence')}
            style={{ padding: '14px 34px' }}
          >
            <span>Enter Presence Sanctuary</span>
            <Sparkles size={16} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
