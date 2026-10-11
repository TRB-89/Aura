import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BreathingRing } from '../BreathingRing';
import { ActiveRoute, ResetExercise } from '../../types';
import { RESET_EXERCISES } from '../../data/mockData';
import { Wind, Sparkles } from 'lucide-react';

interface ResetBreathingSectionProps {
  onRouteChange: (route: ActiveRoute) => void;
}

export const ResetBreathingSection: React.FC<ResetBreathingSectionProps> = ({ onRouteChange }) => {
  const [selectedExercise, setSelectedExercise] = useState<ResetExercise>(RESET_EXERCISES[1]); // Box Breathing default

  return (
    <section className="section-wrapper cream" id="reset">
      <div className="container">
        <motion.div
          style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 48px' }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="editorial-badge">NERVOUS SYSTEM REGULATION</span>

          <h2 style={{ marginBottom: 16 }}>
            Reset your breathing.
          </h2>

          <p style={{ fontSize: '1.2rem', lineHeight: 1.6, color: 'var(--color-taupe-muted)' }}>
            When thoughts race, logic rarely slows them down. A few steady respiratory cycles tell your autonomic nervous system that you are safe.
          </p>
        </motion.div>

        {/* Exercise Selection Pills */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 12,
            flexWrap: 'wrap',
            marginBottom: 40,
          }}
        >
          {RESET_EXERCISES.map((ex) => (
            <button
              key={ex.id}
              onClick={() => setSelectedExercise(ex)}
              className="btn-pill"
              style={{
                backgroundColor: selectedExercise.id === ex.id ? 'var(--color-brown-dark)' : 'var(--color-white-cream)',
                color: selectedExercise.id === ex.id ? 'var(--color-white-cream)' : 'var(--color-brown-dark)',
                border: '1px solid var(--border-subtle)',
                padding: '10px 22px',
                fontSize: '0.88rem',
                boxShadow: selectedExercise.id === ex.id ? 'var(--shadow-subtle)' : 'none',
              }}
            >
              <Wind size={14} color={selectedExercise.id === ex.id ? 'var(--color-sand-warm)' : 'var(--color-bronze)'} />
              <span>{ex.title}</span>
            </button>
          ))}
        </div>

        {/* Center: The Breathing Ring Visual */}
        <motion.div
          className="card-premium"
          style={{
            maxWidth: 680,
            margin: '0 auto',
            padding: '48px 32px',
            textAlign: 'center',
            background: 'linear-gradient(180deg, #FCF9F4 0%, #F6F0E6 100%)',
          }}
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <BreathingRing
            exerciseName={selectedExercise.title}
            inhaleSec={selectedExercise.inhale}
            holdSec={selectedExercise.hold1}
            exhaleSec={selectedExercise.exhale}
            holdEmptySec={selectedExercise.hold2}
          />

          <p
            style={{
              fontSize: '0.92rem',
              color: 'var(--color-taupe-muted)',
              maxWidth: 480,
              margin: '24px auto 20px',
              lineHeight: 1.6,
            }}
          >
            {selectedExercise.description}
          </p>

          <button
            className="btn-pill btn-secondary"
            onClick={() => onRouteChange('reset')}
            style={{ fontSize: '0.88rem', padding: '10px 24px' }}
          >
            <span>Full-Screen Immersive Breathwork</span>
            <Sparkles size={14} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
