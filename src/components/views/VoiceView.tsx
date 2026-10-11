import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Orb } from '../Orb';
import { ActiveRoute } from '../../types';
import { realtimeSession } from '../../lib/voice/realtimeSession';
import { VoiceState, VoiceTranscriptTurn } from '../../lib/voice/types';
import { geminiProvider } from '../../lib/ai/geminiProvider';
import {
  Mic,
  MicOff,
  MessageSquare,
  PhoneOff,
  Radio,
  FileText,
  Volume2,
  Sparkles,
  Key,
} from 'lucide-react';

interface VoiceViewProps {
  onRouteChange: (route: ActiveRoute) => void;
  onOpenSafety: () => void;
}

export const VoiceView: React.FC<VoiceViewProps> = ({ onRouteChange, onOpenSafety }) => {
  const [voiceState, setVoiceState] = useState<VoiceState>('READY');
  const [isMuted, setIsMuted] = useState(false);
  const [transcriptTurns, setTranscriptTurns] = useState<VoiceTranscriptTurn[]>([]);
  const [showTranscript, setShowTranscript] = useState(false);
  const [manualInput, setManualInput] = useState('');
  const sessionRef = useRef(realtimeSession.getLiveSession());

  useEffect(() => {
    const session = sessionRef.current;

    session.start({
      onStateChange: (state) => {
        setVoiceState(state);
      },
      onTranscriptUpdate: (turns) => {
        setTranscriptTurns([...turns]);
      },
      onError: (err) => {
        console.warn('Voice session error:', err);
      },
    });

    return () => {
      session.end();
    };
  }, []);

  const handleManualSpeakSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualInput.trim()) return;
    const text = manualInput.trim();
    setManualInput('');

    const context = realtimeSession.getContext();
    await sessionRef.current.handleUserSpeechTurn(text, context);
  };

  const handleInterrupt = () => {
    sessionRef.current.interrupt();
  };

  const handleToggleMute = () => {
    const muted = sessionRef.current.toggleMute();
    setIsMuted(muted);
  };

  const latestTurn = transcriptTurns[transcriptTurns.length - 1];

  const orbStateText =
    voiceState === 'CONNECTING'
      ? 'Connecting...'
      : voiceState === 'USER_SPEAKING'
      ? 'Listening to you...'
      : voiceState === 'THINKING'
      ? 'Thinking...'
      : voiceState === 'AI_SPEAKING'
      ? 'Speaking softly...'
      : voiceState === 'INTERRUPTED'
      ? 'Listening...'
      : isMuted
      ? 'Microphone muted'
      : "I'm listening.";

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#1E1916',
        color: 'var(--color-white-cream)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '90px 24px 40px',
        overflow: 'hidden',
      }}
    >
      {/* Blurred warm ambient background aura */}
      <div
        style={{
          position: 'absolute',
          top: '35%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 540,
          height: 540,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(169, 122, 77, 0.22) 0%, rgba(201, 155, 100, 0.08) 55%, transparent 75%)',
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
          maxWidth: 760,
          width: '100%',
          margin: '0 auto',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="navbar-brand-dot" />
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem' }}>Aura Voice</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {!geminiProvider.isConfigured() && (
            <button
              onClick={() => onRouteChange('settings')}
              style={{
                padding: '5px 12px',
                borderRadius: 9999,
                background: 'rgba(212, 184, 146, 0.2)',
                border: '1px solid var(--color-sand-warm)',
                color: 'var(--color-sand-warm)',
                fontSize: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
              }}
            >
              <Key size={11} />
              <span>Connect Gemini Key</span>
            </button>
          )}

          <button
            onClick={() => setShowTranscript(!showTranscript)}
            style={{
              padding: '6px 14px',
              borderRadius: 9999,
              background: showTranscript ? 'rgba(201, 155, 100, 0.25)' : 'rgba(255, 248, 240, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: 'var(--color-sand-warm)',
              fontSize: '0.78rem',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <FileText size={13} />
            <span>{showTranscript ? 'Hide Text' : 'Show Text'}</span>
          </button>
        </div>
      </div>

      {/* Center: The Glowing Bronze Orb */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 'auto 0',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Barge-in / Interruption pill */}
        {voiceState === 'AI_SPEAKING' && (
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={handleInterrupt}
            style={{
              marginBottom: 20,
              padding: '6px 16px',
              borderRadius: 9999,
              background: 'rgba(201, 155, 100, 0.25)',
              border: '1px solid var(--color-bronze)',
              color: 'var(--color-sand-warm)',
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              cursor: 'pointer',
            }}
          >
            <Radio size={13} />
            <span>Tap or speak to interrupt</span>
          </motion.button>
        )}

        <Orb
          stateText={orbStateText}
          isListening={voiceState === 'LISTENING' || voiceState === 'USER_SPEAKING'}
          isSpeaking={voiceState === 'AI_SPEAKING'}
          size="normal"
          onClick={voiceState === 'AI_SPEAKING' ? handleInterrupt : undefined}
        />

        {/* Live Subtitle Transcript */}
        <div
          style={{
            maxWidth: 520,
            textAlign: 'center',
            marginTop: 20,
            padding: '14px 22px',
            background: 'rgba(255, 248, 240, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 20,
            minHeight: 52,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <p
            style={{
              fontSize: '0.92rem',
              color: 'var(--color-beige-soft)',
              fontStyle: 'italic',
              lineHeight: 1.5,
            }}
          >
            {latestTurn
              ? `${latestTurn.sender === 'user' ? 'You' : 'Aura'}: "${latestTurn.text}"`
              : "Take your time... I can hear you clearly."}
          </p>
        </div>

        {/* Spoken Turn Shortcuts */}
        <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            'Today was honestly awful.',
            'My presentation went badly.',
            'No, wait. That is not it.',
          ].map((sample) => (
            <button
              key={sample}
              onClick={() => {
                sessionRef.current.handleUserSpeechTurn(sample, realtimeSession.getContext());
              }}
              style={{
                fontSize: '0.74rem',
                color: 'var(--color-sand-warm)',
                background: 'rgba(212, 184, 146, 0.08)',
                border: '1px solid rgba(212, 184, 146, 0.18)',
                borderRadius: 9999,
                padding: '4px 12px',
              }}
            >
              "{sample}"
            </button>
          ))}
        </div>
      </div>

      {/* Transcript Drawer Overlay if opened */}
      {showTranscript && (
        <div
          style={{
            maxWidth: 580,
            width: '100%',
            margin: '0 auto 20px',
            background: 'rgba(30, 24, 20, 0.95)',
            border: '1px solid rgba(212, 184, 146, 0.2)',
            borderRadius: 20,
            padding: 18,
            maxHeight: 180,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            zIndex: 20,
          }}
        >
          {transcriptTurns.map((turn) => (
            <div
              key={turn.id}
              style={{
                fontSize: '0.82rem',
                color: turn.sender === 'user' ? 'var(--color-sand-warm)' : 'var(--color-white-cream)',
              }}
            >
              <strong>{turn.sender === 'user' ? 'You' : 'Aura'}:</strong> {turn.text}
            </div>
          ))}
        </div>
      )}

      {/* Minimal Bottom Controls: Mute, Text, End */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          position: 'relative',
          zIndex: 10,
        }}
      >
        <button
          onClick={handleToggleMute}
          className="btn-pill"
          style={{
            backgroundColor: isMuted ? 'rgba(220, 38, 38, 0.2)' : 'rgba(255, 248, 240, 0.08)',
            color: isMuted ? '#fca5a5' : 'var(--color-white-cream)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            padding: '12px 22px',
          }}
        >
          {isMuted ? <MicOff size={16} /> : <Mic size={16} />}
          <span>{isMuted ? 'Unmute' : 'Mute'}</span>
        </button>

        <button
          onClick={() => {
            sessionRef.current.end();
            onRouteChange('chat');
          }}
          className="btn-pill"
          style={{
            backgroundColor: 'rgba(255, 248, 240, 0.08)',
            color: 'var(--color-white-cream)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            padding: '12px 22px',
          }}
        >
          <MessageSquare size={16} />
          <span>Text Mode</span>
        </button>

        <button
          onClick={() => {
            sessionRef.current.end();
            onRouteChange('dashboard');
          }}
          className="btn-pill"
          style={{
            backgroundColor: 'rgba(169, 122, 77, 0.25)',
            color: 'var(--color-sand-warm)',
            border: '1px solid var(--color-bronze)',
            padding: '12px 22px',
          }}
        >
          <PhoneOff size={16} />
          <span>End Session</span>
        </button>
      </div>
    </div>
  );
};
