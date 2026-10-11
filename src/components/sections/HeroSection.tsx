import React from 'react';
import { motion } from 'framer-motion';
import { ActiveRoute } from '../../types';
import { Sparkles, Mic, Shield } from 'lucide-react';

interface HeroSectionProps {
  onRouteChange: (route: ActiveRoute) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onRouteChange }) => {
  return (
    <section
      className="hero-wrapper"
      style={{
        backgroundImage: `url('/images/hero_cinematic.jpg')`,
      }}
    >
      <div className="hero-overlay" />

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        {/* Editorial Top Label */}
        <span
          className="editorial-badge"
          style={{
            color: 'var(--color-sand-warm)',
            background: 'rgba(212, 184, 146, 0.16)',
            padding: '6px 16px',
            borderRadius: 9999,
            border: '1px solid rgba(212, 184, 146, 0.25)',
          }}
        >
          <Sparkles size={12} />
          <span>AI WELLBEING COMPANION</span>
        </span>

        {/* Main Headline */}
        <h1 className="hero-title">
          Support for your mind,<br />
          whenever you need it.
        </h1>

        {/* Supporting Text */}
        <p className="hero-subtext">
          A private AI companion for conversations, reflection, voice support, and moments when everything feels a little too much.
        </p>

        {/* CTAs */}
        <div className="hero-ctas">
          <button
            className="btn-pill btn-bronze"
            onClick={() => onRouteChange('chat')}
            style={{ padding: '14px 34px', fontSize: '1.02rem' }}
          >
            <span>Start a Conversation</span>
            <Sparkles size={16} />
          </button>

          <button
            className="btn-pill"
            onClick={() => onRouteChange('voice')}
            style={{
              padding: '14px 30px',
              fontSize: '1.02rem',
              backgroundColor: 'rgba(255, 248, 240, 0.12)',
              color: 'var(--color-white-cream)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <Mic size={16} />
            <span>Try Voice</span>
          </button>
        </div>

        {/* Subtle Privacy Message */}
        <div className="hero-footer-note">
          <Shield size={14} color="var(--color-sand-warm)" />
          <span>Private by design • You control what is remembered</span>
        </div>
      </motion.div>
    </section>
  );
};
