import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause, RotateCcw } from 'lucide-react';
import { soundEngine } from '../audio/soundEngine';

interface BreathingRingProps {
  exerciseName?: string;
  inhaleSec?: number;
  holdSec?: number;
  exhaleSec?: number;
  holdEmptySec?: number;
  isDarkTheme?: boolean;
}

export const BreathingRing: React.FC<BreathingRingProps> = ({
  exerciseName = 'Box Breathing',
  inhaleSec = 4,
  holdSec = 4,
  exhaleSec = 4,
  holdEmptySec = 4,
  isDarkTheme = false,
}) => {
  type Phase = 'Inhale' | 'Hold' | 'Exhale' | 'Rest';
  const [phase, setPhase] = useState<Phase>('Inhale');
  const [countdown, setCountdown] = useState(inhaleSec);
  const [isActive, setIsActive] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState<number>(4); // minutes

  // Toggle audio
  const handleToggleSound = () => {
    if (soundEnabled) {
      soundEngine.stopCalmDrone();
      setSoundEnabled(false);
    } else {
      soundEngine.startCalmDrone();
      soundEngine.playGentleChime(432);
      setSoundEnabled(true);
    }
  };

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev > 1) {
          return prev - 1;
        }

        // Transition phase
        if (phase === 'Inhale') {
          if (soundEnabled) soundEngine.playGentleChime(528);
          if (holdSec > 0) {
            setPhase('Hold');
            return holdSec;
          } else {
            setPhase('Exhale');
            return exhaleSec;
          }
        } else if (phase === 'Hold') {
          if (soundEnabled) soundEngine.playGentleChime(396);
          setPhase('Exhale');
          return exhaleSec;
        } else if (phase === 'Exhale') {
          if (holdEmptySec > 0) {
            setPhase('Rest');
            return holdEmptySec;
          } else {
            if (soundEnabled) soundEngine.playGentleChime(432);
            setPhase('Inhale');
            return inhaleSec;
          }
        } else {
          // Rest -> Inhale
          if (soundEnabled) soundEngine.playGentleChime(432);
          setPhase('Inhale');
          return inhaleSec;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, phase, inhaleSec, holdSec, exhaleSec, holdEmptySec, soundEnabled]);

  // Dynamic scale calculation based on breath state
  const ringScale =
    phase === 'Inhale' ? 1.45 :
    phase === 'Hold' ? 1.45 :
    phase === 'Exhale' ? 0.95 : 0.95;

  const currentDurationForScale =
    phase === 'Inhale' ? inhaleSec :
    phase === 'Hold' ? holdSec :
    phase === 'Exhale' ? exhaleSec : holdEmptySec;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 0',
      }}
    >
      {/* Exercise badge */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '6px 14px',
          borderRadius: 9999,
          background: isDarkTheme ? 'rgba(255, 248, 240, 0.08)' : 'rgba(65, 50, 40, 0.06)',
          border: '1px solid var(--border-subtle)',
          fontSize: '0.8rem',
          color: isDarkTheme ? 'var(--color-sand-warm)' : 'var(--color-taupe-muted)',
          marginBottom: 16,
        }}
      >
        <span>{exerciseName}</span>
        <span>•</span>
        <span>{phase}</span>
      </div>

      {/* Animated breathing graphic */}
      <div className="breathing-ring-wrapper">
        {/* Static outer ring */}
        <div
          className="breathing-ring-track"
          style={{
            borderColor: isDarkTheme ? 'rgba(212, 184, 146, 0.25)' : 'var(--border-subtle)',
          }}
        />

        {/* Pulsing breathing aura */}
        <motion.div
          className="breathing-ring-pulse"
          animate={{
            scale: ringScale,
            opacity: phase === 'Inhale' || phase === 'Hold' ? 0.95 : 0.45,
          }}
          transition={{
            duration: currentDurationForScale,
            ease: 'easeInOut',
          }}
          style={{
            background: isDarkTheme
              ? 'radial-gradient(circle, rgba(201, 155, 100, 0.35) 0%, rgba(169, 122, 77, 0.12) 65%, transparent 80%)'
              : 'radial-gradient(circle, rgba(201, 155, 100, 0.24) 0%, rgba(212, 184, 146, 0.09) 65%, transparent 80%)',
          }}
        />

        {/* Center core */}
        <div
          className="breathing-ring-core"
          style={{
            backgroundColor: isDarkTheme ? '#241D18' : 'var(--color-white-cream)',
            borderColor: isDarkTheme ? 'rgba(212, 184, 146, 0.25)' : 'var(--border-subtle)',
            boxShadow: isDarkTheme
              ? '0 10px 30px rgba(0, 0, 0, 0.4)'
              : 'var(--shadow-soft)',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={phase}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.35 }}
              style={{ textAlign: 'center' }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.65rem',
                  fontWeight: 600,
                  color: isDarkTheme ? 'var(--color-white-cream)' : 'var(--color-brown-dark)',
                  display: 'block',
                  lineHeight: 1.1,
                }}
              >
                {phase}
              </span>
              <span
                style={{
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-sans)',
                  color: isDarkTheme ? 'var(--color-sand-warm)' : 'var(--color-bronze)',
                  fontWeight: 500,
                  marginTop: 4,
                  display: 'block',
                }}
              >
                {countdown}s
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Controls & Duration Pills */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginTop: 20,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <button
          className="btn-pill btn-secondary"
          onClick={() => setIsActive(!isActive)}
          style={{
            padding: '8px 16px',
            fontSize: '0.82rem',
            background: isDarkTheme ? 'rgba(255, 248, 240, 0.1)' : undefined,
            color: isDarkTheme ? 'var(--color-white-cream)' : undefined,
            borderColor: isDarkTheme ? 'rgba(255, 248, 240, 0.15)' : undefined,
          }}
        >
          {isActive ? <Pause size={13} /> : <Play size={13} />}
          <span>{isActive ? 'Pause' : 'Resume'}</span>
        </button>

        <button
          className="btn-pill btn-secondary"
          onClick={handleToggleSound}
          style={{
            padding: '8px 16px',
            fontSize: '0.82rem',
            background: soundEnabled ? (isDarkTheme ? 'rgba(201, 155, 100, 0.25)' : 'rgba(201, 155, 100, 0.15)') : undefined,
            borderColor: soundEnabled ? 'var(--color-bronze)' : undefined,
            color: isDarkTheme ? 'var(--color-white-cream)' : undefined,
          }}
          title="Toggle gentle harmonic ambient drone"
        >
          {soundEnabled ? <Volume2 size={13} color="var(--color-bronze)" /> : <VolumeX size={13} />}
          <span>{soundEnabled ? 'Chimes On' : 'Silent'}</span>
        </button>

        <button
          className="btn-pill btn-secondary"
          onClick={() => {
            setPhase('Inhale');
            setCountdown(inhaleSec);
          }}
          style={{
            padding: '8px 12px',
            fontSize: '0.82rem',
            color: isDarkTheme ? 'var(--color-white-cream)' : undefined,
          }}
          title="Restart breath cycle"
        >
          <RotateCcw size={13} />
        </button>
      </div>

      {/* Selectable Duration Pills: 2 min, 4 min, 5 min */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginTop: 16,
        }}
      >
        <span
          style={{
            fontSize: '0.78rem',
            color: isDarkTheme ? 'var(--color-sand-warm)' : 'var(--color-taupe-muted)',
            marginRight: 4,
          }}
        >
          Target:
        </span>
        {[2, 4, 5].map((mins) => (
          <button
            key={mins}
            onClick={() => setSelectedDuration(mins)}
            style={{
              padding: '4px 12px',
              borderRadius: 9999,
              fontSize: '0.78rem',
              fontWeight: selectedDuration === mins ? 600 : 400,
              background: selectedDuration === mins
                ? 'var(--color-bronze)'
                : isDarkTheme ? 'rgba(255, 248, 240, 0.08)' : 'rgba(65, 50, 40, 0.06)',
              color: selectedDuration === mins
                ? '#fff'
                : isDarkTheme ? 'var(--color-beige-soft)' : 'var(--color-taupe-muted)',
              border: 'none',
              transition: 'var(--transition-smooth)',
            }}
          >
            {mins} min
          </button>
        ))}
      </div>
    </div>
  );
};
