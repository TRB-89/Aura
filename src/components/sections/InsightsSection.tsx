import React from 'react';
import { motion } from 'framer-motion';
import { ActiveRoute } from '../../types';
import { OBSERVATIONAL_INSIGHTS } from '../../data/mockData';
import { Compass, Clock, Sparkles, Feather } from 'lucide-react';

interface InsightsSectionProps {
  onRouteChange: (route: ActiveRoute) => void;
}

export const InsightsSection: React.FC<InsightsSectionProps> = ({ onRouteChange }) => {
  return (
    <section className="section-wrapper cream" id="insights">
      <div className="container">
        <motion.div
          style={{ textAlign: 'center', maxWidth: 820, margin: '0 auto 60px' }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="editorial-badge">NON-CLINICAL PATTERNS</span>

          <h2 style={{ marginBottom: 20 }}>
            {OBSERVATIONAL_INSIGHTS.headline}
          </h2>

          <p style={{ fontSize: '1.2rem', lineHeight: 1.6, color: 'var(--color-taupe-muted)' }}>
            {OBSERVATIONAL_INSIGHTS.subtext}
          </p>
        </motion.div>

        {/* 3 Large Observational Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 28,
            marginBottom: 48,
          }}
        >
          {OBSERVATIONAL_INSIGHTS.observations.map((obs, idx) => (
            <motion.div
              key={obs.label}
              className="card-premium"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: 'var(--color-bronze)',
                      fontWeight: 600,
                    }}
                  >
                    {obs.label}
                  </span>
                  <span
                    style={{
                      fontSize: '0.78rem',
                      padding: '4px 10px',
                      borderRadius: 9999,
                      background: 'var(--color-beige-soft)',
                      color: 'var(--color-brown-dark)',
                      fontWeight: 500,
                    }}
                  >
                    {obs.highlight}
                  </span>
                </div>

                <p
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.35rem',
                    lineHeight: 1.4,
                    color: 'var(--color-brown-dark)',
                    marginBottom: 16,
                  }}
                >
                  "{obs.text}"
                </p>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: '0.8rem',
                  color: 'var(--color-taupe-muted)',
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: 16,
                  marginTop: 16,
                }}
              >
                <Feather size={13} color="var(--color-sand-warm)" />
                <span>Observational reflection • Private & Local</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Weekly Cadence Observation Bar */}
        <motion.div
          className="card-translucent"
          style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
            <div style={{ textAlign: 'left' }}>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem' }}>Weekly Check-in Rhythm</h4>
              <p style={{ fontSize: '0.85rem' }}>Volume of pauses across the last seven days</p>
            </div>
            <button
              className="btn-pill btn-secondary"
              onClick={() => onRouteChange('insights')}
              style={{ padding: '6px 18px', fontSize: '0.82rem' }}
            >
              <span>Explore Insights</span>
              <Compass size={13} />
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: 8,
              alignItems: 'flex-end',
              height: 100,
              paddingTop: 20,
            }}
          >
            {OBSERVATIONAL_INSIGHTS.weeklyActivity.map((d) => (
              <div key={d.day} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div
                  style={{
                    width: '100%',
                    maxWidth: 32,
                    height: d.count * 16,
                    backgroundColor: d.count > 3 ? 'var(--color-bronze)' : 'var(--color-sand-warm)',
                    borderRadius: 6,
                    transition: 'var(--transition-smooth)',
                  }}
                  title={`${d.day}: ${d.count} check-ins (${d.theme})`}
                />
                <span style={{ fontSize: '0.75rem', color: 'var(--color-taupe-muted)' }}>{d.day}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
