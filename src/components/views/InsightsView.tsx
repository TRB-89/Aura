import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ActiveRoute } from '../../types';
import { OBSERVATIONAL_INSIGHTS } from '../../data/mockData';
import { Compass, ArrowLeft, Clock, Feather, ShieldCheck } from 'lucide-react';

interface InsightsViewProps {
  onRouteChange: (route: ActiveRoute) => void;
}

export const InsightsView: React.FC<InsightsViewProps> = ({ onRouteChange }) => {
  const [selectedDay, setSelectedDay] = useState<string>('Thu');

  const selectedDayData = OBSERVATIONAL_INSIGHTS.weeklyActivity.find((d) => d.day === selectedDay);

  return (
    <div
      style={{
        paddingTop: 96,
        paddingBottom: 80,
        minHeight: '100vh',
        backgroundColor: 'var(--color-cream-primary)',
      }}
    >
      <div className="container" style={{ maxWidth: 880 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
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
            <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-bronze)', fontWeight: 600 }}>
              NON-DIAGNOSTIC REFLECTION
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem' }}>
              Gentle Patterns & Rhythms
            </h2>
          </div>
        </div>

        {/* Philosophy Statement */}
        <div
          className="card-translucent"
          style={{ marginBottom: 40, borderLeft: '3px solid var(--color-bronze)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, color: 'var(--color-bronze)' }}>
            <ShieldCheck size={16} />
            <span style={{ fontSize: '0.82rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Ethical AI Standard
            </span>
          </div>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.6, color: 'var(--color-brown-dark)' }}>
            We deliberately do not calculate anxiety percentages, depression scores, or predictive risk metrics. Emotional health cannot be flattened into a dashboard KPI. Instead, we offer calm observations about your natural rhythms.
          </p>
        </div>

        {/* One Focused Chart at a Time: Weekly Activity Distribution */}
        <div className="card-premium" style={{ padding: '36px 32px', marginBottom: 40 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem' }}>
                Weekly Check-in Cadence
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-taupe-muted)' }}>
                Tap any day to see the observed thematic tone
              </p>
            </div>

            <span
              style={{
                fontSize: '0.8rem',
                padding: '4px 12px',
                borderRadius: 9999,
                background: 'var(--color-beige-soft)',
                color: 'var(--color-brown-dark)',
              }}
            >
              Selected: {selectedDayData?.theme}
            </span>
          </div>

          {/* Interactive Bars */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: 12,
              alignItems: 'flex-end',
              height: 140,
              paddingTop: 20,
              borderBottom: '1px solid var(--border-subtle)',
              paddingBottom: 16,
            }}
          >
            {OBSERVATIONAL_INSIGHTS.weeklyActivity.map((d) => (
              <div
                key={d.day}
                onClick={() => setSelectedDay(d.day)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    maxWidth: 42,
                    height: d.count * 24,
                    backgroundColor: selectedDay === d.day ? 'var(--color-bronze)' : 'var(--color-sand-warm)',
                    borderRadius: 8,
                    transition: 'var(--transition-smooth)',
                    opacity: selectedDay === d.day ? 1 : 0.65,
                  }}
                />
                <span style={{ fontSize: '0.82rem', fontWeight: selectedDay === d.day ? 600 : 400, color: 'var(--color-brown-dark)' }}>
                  {d.day}
                </span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', color: 'var(--color-taupe-muted)' }}>
            <Clock size={14} color="var(--color-bronze)" />
            <span>Highest pause volume occurs mid-week and Sunday evening.</span>
          </div>
        </div>

        {/* Large Editorial Statements */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {OBSERVATIONAL_INSIGHTS.observations.map((obs) => (
            <div
              key={obs.label}
              className="card-premium"
              style={{ padding: 28 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-bronze)', fontWeight: 600 }}>
                  {obs.label}
                </span>
                <span
                  style={{
                    fontSize: '0.78rem',
                    padding: '3px 10px',
                    borderRadius: 9999,
                    background: 'var(--color-cream-primary)',
                    color: 'var(--color-brown-dark)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  {obs.highlight}
                </span>
              </div>

              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', lineHeight: 1.45, color: 'var(--color-brown-dark)' }}>
                "{obs.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
