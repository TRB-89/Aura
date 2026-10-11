import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Orb } from '../Orb';
import { ActiveRoute } from '../../types';
import { ArrowLeft, Volume2, VolumeX, Moon } from 'lucide-react';
import { soundEngine } from '../../audio/soundEngine';

interface PresenceViewProps {
  onRouteChange: (route: ActiveRoute) => void;
}

export const PresenceView: React.FC<PresenceViewProps> = ({ onRouteChange }) => {
  const [ambientAudio, setAmbientAudio] = useState(false);

  useEffect(() => {
    return () => {
      soundEngine.stopCalmDrone();
    };
  }, []);

  const toggleSound = () => {
    if (ambientAudio) {
      soundEngine.stopCalmDrone();
      setAmbientAudio(false);
    } else {
      soundEngine.startCalmDrone();
      setAmbientAudio(true);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#191512',
        color: 'var(--color-white-cream)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '90px 24px 48px',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      {/* Background warm glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 580,
          height: 580,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(169, 122, 77, 0.16) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />

      {/* Top Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: 820,
          width: '100%',
          margin: '0 auto',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <button
          onClick={() => onRouteChange('dashboard')}
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'rgba(255, 248, 240, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-white-cream)',
          }}
          title="Return"
        >
          <ArrowLeft size={16} />
        </button>

        <span
          style={{
            fontSize: '0.78rem',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            color: 'var(--color-sand-warm)',
          }}
        >
          Silent Holding Sanctuary
        </span>

        <button
          onClick={toggleSound}
          style={{
            padding: '6px 14px',
            borderRadius: 9999,
            background: ambientAudio ? 'rgba(201, 155, 100, 0.25)' : 'rgba(255, 248, 240, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            color: 'var(--color-sand-warm)',
            fontSize: '0.78rem',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          {ambientAudio ? <Volume2 size={13} /> : <VolumeX size={13} />}
          <span>{ambientAudio ? 'Drone On' : 'Silent'}</span>
        </button>
      </div>

      {/* Center Sanctuary */}
      <div style={{ margin: 'auto 0', position: 'relative', zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          style={{ maxWidth: 640, margin: '0 auto 40px' }}
        >
          <h2
            style={{
              color: 'var(--color-white-cream)',
              fontSize: 'clamp(2.2rem, 4.4vw, 3.4rem)',
              marginBottom: 12,
            }}
          >
            Sometimes you don't need answers.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.35rem',
              color: 'var(--color-sand-warm)',
              fontStyle: 'italic',
            }}
          >
            You just need somewhere to stay for a while.
          </p>
        </motion.div>

        {/* Large Slow Breathing Orb */}
        <Orb
          stateText="I'm here."
          size="large"
          isListening={false}
          isSpeaking={false}
        />
      </div>

      {/* Bottom Quiet Note */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: 440, margin: '0 auto' }}>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-beige-soft)', opacity: 0.7 }}>
          No session timer. No goals. Leave whenever your chest feels a little lighter.
        </p>
      </div>
    </div>
  );
};
