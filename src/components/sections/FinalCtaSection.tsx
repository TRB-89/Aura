import React from 'react';
import { motion } from 'framer-motion';
import { ActiveRoute } from '../../types';
import { MessageSquare, Mic, Sparkles } from 'lucide-react';

interface FinalCtaSectionProps {
  onRouteChange: (route: ActiveRoute) => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onRouteChange }) => {
  return (
    <section
      className="hero-wrapper"
      style={{
        backgroundImage: `url('/images/final_cta.jpg')`,
        minHeight: '75vh',
        padding: '120px 24px',
      }}
    >
      <div
        className="hero-overlay"
        style={{
          background: 'linear-gradient(180deg, rgba(28, 24, 21, 0.55) 0%, rgba(44, 36, 31, 0.75) 50%, rgba(30, 24, 20, 0.92) 100%)',
        }}
      />

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span
          className="editorial-badge"
          style={{
            color: 'var(--color-sand-warm)',
            background: 'rgba(212, 184, 146, 0.16)',
            padding: '6px 16px',
            borderRadius: 9999,
          }}
        >
          <Sparkles size={12} />
          <span>BEGIN WHENEVER YOU ARE READY</span>
        </span>

        <h2
          style={{
            color: 'var(--color-white-cream)',
            fontSize: 'clamp(2.6rem, 5.2vw, 4.2rem)',
            marginBottom: 18,
          }}
        >
          You don't have to know what to say.
        </h2>

        <p
          style={{
            color: 'var(--color-beige-soft)',
            fontSize: 'clamp(1.15rem, 2vw, 1.45rem)',
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            marginBottom: 44,
            opacity: 0.95,
          }}
        >
          Start with whatever is on your mind.
        </p>

        <div className="hero-ctas">
          <button
            className="btn-pill btn-bronze"
            onClick={() => onRouteChange('chat')}
            style={{ padding: '14px 34px', fontSize: '1.02rem' }}
          >
            <MessageSquare size={16} />
            <span>Talk Now</span>
          </button>

          <button
            className="btn-pill"
            onClick={() => onRouteChange('voice')}
            style={{
              padding: '14px 30px',
              fontSize: '1.02rem',
              backgroundColor: 'rgba(255, 248, 240, 0.12)',
              color: 'var(--color-white-cream)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <Mic size={16} />
            <span>Use Voice</span>
          </button>
        </div>

        <p style={{ fontSize: '0.82rem', color: 'var(--color-sand-warm)', opacity: 0.85 }}>
          No account required to start a momentary dialogue.
        </p>
      </motion.div>
    </section>
  );
};
