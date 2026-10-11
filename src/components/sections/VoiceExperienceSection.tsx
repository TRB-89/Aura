import React from 'react';
import { motion } from 'framer-motion';
import { PhoneMockup } from '../PhoneMockup';
import { ActiveRoute } from '../../types';
import { Mic, Radio, Volume2, Shield, Sparkles } from 'lucide-react';

interface VoiceExperienceSectionProps {
  onRouteChange: (route: ActiveRoute) => void;
}

export const VoiceExperienceSection: React.FC<VoiceExperienceSectionProps> = ({ onRouteChange }) => {
  return (
    <section
      className="section-wrapper"
      style={{
        background: 'linear-gradient(180deg, #2A231E 0%, #1E1916 100%)',
        color: 'var(--color-white-cream)',
      }}
      id="voice"
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 64,
            alignItems: 'center',
          }}
        >
          {/* Left: Editorial Storytelling */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span
              className="editorial-badge"
              style={{
                color: 'var(--color-sand-warm)',
                background: 'rgba(212, 184, 146, 0.15)',
                padding: '6px 14px',
                borderRadius: 9999,
              }}
            >
              <Radio size={12} />
              <span>NATURAL VOICE PRESENCE</span>
            </span>

            <h2
              style={{
                color: 'var(--color-white-cream)',
                marginBottom: 24,
                lineHeight: 1.15,
              }}
            >
              Talk naturally.<br />
              No typing required.
            </h2>

            <p
              style={{
                fontSize: '1.18rem',
                lineHeight: 1.65,
                color: 'var(--color-beige-soft)',
                marginBottom: 36,
                opacity: 0.9,
              }}
            >
              Start a live conversation and speak normally. The companion listens, responds with voice, and can be interrupted whenever you need.
            </p>

            {/* Voice Feature Indicators */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 20,
                marginBottom: 40,
              }}
            >
              <div
                style={{
                  background: 'rgba(255, 248, 240, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 16,
                  padding: 16,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-sand-warm)', marginBottom: 6 }}>
                  <Volume2 size={16} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Warm Natural Voice</span>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'rgba(232, 220, 203, 0.75)' }}>
                  Calibrated pacing and gentle inflection, never rushed.
                </p>
              </div>

              <div
                style={{
                  background: 'rgba(255, 248, 240, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 16,
                  padding: 16,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-sand-warm)', marginBottom: 6 }}>
                  <Radio size={16} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Instant Interruption</span>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'rgba(232, 220, 203, 0.75)' }}>
                  Jump in mid-sentence whenever a new thought strikes.
                </p>
              </div>
            </div>

            <button
              className="btn-pill btn-bronze"
              onClick={() => onRouteChange('voice')}
              style={{ padding: '14px 32px' }}
            >
              <Mic size={16} />
              <span>Start Voice Session</span>
            </button>
          </motion.div>

          {/* Right: Large Phone Mockup showing Voice Orb */}
          <motion.div
            className="mockup-container"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ marginTop: 0 }}
          >
            <PhoneMockup initialScreen="voice" onNavigateApp={onRouteChange} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
