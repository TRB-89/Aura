import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BreathingRing } from '../BreathingRing';
import { ActiveRoute, ResetExercise } from '../../types';
import { RESET_EXERCISES } from '../../data/mockData';
import { Wind, ArrowLeft, Volume2, Sparkles } from 'lucide-react';

interface ResetViewProps {
  onRouteChange: (route: ActiveRoute) => void;
}

export const ResetView: React.FC<ResetViewProps> = ({ onRouteChange }) => {
  const [selectedExercise, setSelectedExercise] = useState<ResetExercise>(RESET_EXERCISES[0]); // 60s Reset

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-cream-primary)',
        paddingTop: 96,
        paddingBottom: 80,
      }}
    >
      <div className="container" style={{ maxWidth: 860, textAlign: 'center' }}>
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 24 }}>
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
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 36 }}
        >
          <span className="editorial-badge">AUTONOMIC REGULATION</span>
          <h2 style={{ fontSize: 'clamp(2.4rem, 4vw, 3.4rem)', marginBottom: 12 }}>
            Settle your nervous system.
          </h2>
          <p style={{ fontSize: '1.15rem', color: 'var(--color-taupe-muted)', maxWidth: 540, margin: '0 auto' }}>
            Choose an exercise below and follow the soft expanding circle.
          </p>
        </motion.div>

        {/* Exercise Switcher Pills */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 36 }}>
          {RESET_EXERCISES.map((ex) => (
            <button
              key={ex.id}
              onClick={() => setSelectedExercise(ex)}
              className="btn-pill"
              style={{
                backgroundColor: selectedExercise.id === ex.id ? 'var(--color-brown-dark)' : 'var(--color-white-cream)',
                color: selectedExercise.id === ex.id ? 'var(--color-white-cream)' : 'var(--color-brown-dark)',
                border: '1px solid var(--border-subtle)',
                padding: '10px 20px',
                fontSize: '0.85rem',
              }}
            >
              <Wind size={13} color={selectedExercise.id === ex.id ? 'var(--color-sand-warm)' : 'var(--color-bronze)'} />
              <span>{ex.title}</span>
            </button>
          ))}
        </div>

        {/* Large Centered Breathing Visual */}
        <motion.div
          key={selectedExercise.id}
          className="card-premium"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            padding: '48px 32px',
            background: 'linear-gradient(180deg, #FCF9F4 0%, #F6F0E6 100%)',
          }}
        >
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: 6 }}>
            {selectedExercise.title}
          </h3>
          <p style={{ fontSize: '0.92rem', color: 'var(--color-taupe-muted)', marginBottom: 28 }}>
            {selectedExercise.subtitle}
          </p>

          <BreathingRing
            exerciseName={selectedExercise.title}
            inhaleSec={selectedExercise.inhale}
            holdSec={selectedExercise.hold1}
            exhaleSec={selectedExercise.exhale}
            holdEmptySec={selectedExercise.hold2}
          />

          <p style={{ fontSize: '0.9rem', color: 'var(--color-taupe-muted)', maxWidth: 440, margin: '24px auto 0', lineHeight: 1.6 }}>
            {selectedExercise.description}
          </p>
        </motion.div>
      </div>
    </div>
  );
};
