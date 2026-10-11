import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ActiveRoute } from '../../types';
import { ArrowLeft, Lock, EyeOff, MicOff, Trash2, Database, Download, Check, Shield } from 'lucide-react';

interface PrivacyViewProps {
  onRouteChange: (route: ActiveRoute) => void;
}

export const PrivacyView: React.FC<PrivacyViewProps> = ({ onRouteChange }) => {
  const [memoryOff, setMemoryOff] = useState(false);
  const [tempSession, setTempSession] = useState(false);
  const [rawAudioOff, setRawAudioOff] = useState(true);
  const [feedback, setFeedback] = useState<string | null>(null);

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <div
      style={{
        paddingTop: 96,
        paddingBottom: 80,
        minHeight: '100vh',
        backgroundColor: 'var(--color-cream-primary)',
      }}
    >
      <div className="container" style={{ maxWidth: 840 }}>
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
              SECURITY & RETENTION
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem' }}>
              Data Sovereignty
            </h2>
          </div>
        </div>

        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: 'var(--color-brown-dark)',
              color: 'var(--color-white-cream)',
              borderRadius: 14,
              padding: '12px 20px',
              marginBottom: 24,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: '0.9rem',
            }}
          >
            <Check size={16} color="var(--color-sand-warm)" />
            <span>{feedback}</span>
          </motion.div>
        )}

        {/* Toggles & Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Toggle 1: Memory */}
          <div className="card-premium" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 28 }}>
            <div style={{ maxWidth: 540 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <EyeOff size={18} color="var(--color-bronze)" />
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem' }}>Memory Off</h4>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-taupe-muted)' }}>
                When enabled, Aura will not recall context from past days. Every conversation starts completely fresh.
              </p>
            </div>
            <button
              onClick={() => {
                setMemoryOff(!memoryOff);
                showFeedback(!memoryOff ? 'Memory paused.' : 'Memory resumed.');
              }}
              style={{
                width: 48,
                height: 28,
                borderRadius: 9999,
                background: memoryOff ? 'var(--color-bronze)' : 'rgba(65, 50, 40, 0.2)',
                padding: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: memoryOff ? 'flex-end' : 'flex-start',
                transition: 'var(--transition-smooth)',
              }}
            >
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#fff' }} />
            </button>
          </div>

          {/* Toggle 2: Temporary Session */}
          <div className="card-premium" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 28 }}>
            <div style={{ maxWidth: 540 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <Lock size={18} color="var(--color-olive-soft)" />
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem' }}>Temporary Session</h4>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-taupe-muted)' }}>
                All current dialogue will be immediately purged when you close or refresh this browser window.
              </p>
            </div>
            <button
              onClick={() => {
                setTempSession(!tempSession);
                showFeedback(!tempSession ? 'Temporary session active.' : 'Standard session resumed.');
              }}
              style={{
                width: 48,
                height: 28,
                borderRadius: 9999,
                background: tempSession ? 'var(--color-bronze)' : 'rgba(65, 50, 40, 0.2)',
                padding: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: tempSession ? 'flex-end' : 'flex-start',
                transition: 'var(--transition-smooth)',
              }}
            >
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#fff' }} />
            </button>
          </div>

          {/* Toggle 3: Raw Audio Off */}
          <div className="card-premium" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 28 }}>
            <div style={{ maxWidth: 540 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <MicOff size={18} color="var(--color-amber-muted)" />
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem' }}>Raw Audio Off</h4>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-taupe-muted)' }}>
                Audio streams are converted to transient text in memory and immediately discarded. Never stored to disk.
              </p>
            </div>
            <button
              onClick={() => {
                setRawAudioOff(!rawAudioOff);
                showFeedback(rawAudioOff ? 'Audio retention enabled.' : 'Audio retention disabled.');
              }}
              style={{
                width: 48,
                height: 28,
                borderRadius: 9999,
                background: rawAudioOff ? 'var(--color-bronze)' : 'rgba(65, 50, 40, 0.2)',
                padding: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: rawAudioOff ? 'flex-end' : 'flex-start',
                transition: 'var(--transition-smooth)',
              }}
            >
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#fff' }} />
            </button>
          </div>

          {/* Immediate Actions */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 20,
              marginTop: 10,
            }}
          >
            <div className="card-premium" style={{ padding: 24, textAlign: 'center' }}>
              <Trash2 size={24} color="var(--color-taupe-muted)" style={{ margin: '0 auto 12px' }} />
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: 6 }}>Delete Conversation</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--color-taupe-muted)', marginBottom: 16 }}>
                Purge all active messages immediately.
              </p>
              <button
                className="btn-pill btn-secondary"
                onClick={() => {
                  localStorage.removeItem('aura_chat_messages');
                  showFeedback('Conversation transcript permanently deleted.');
                }}
                style={{ width: '100%', fontSize: '0.82rem' }}
              >
                Delete Conversation
              </button>
            </div>

            <div className="card-premium" style={{ padding: 24, textAlign: 'center' }}>
              <Database size={24} color="var(--color-taupe-muted)" style={{ margin: '0 auto 12px' }} />
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: 6 }}>Clear Long-Term Memory</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--color-taupe-muted)', marginBottom: 16 }}>
                Reset all remembered preferences.
              </p>
              <button
                className="btn-pill btn-secondary"
                onClick={() => {
                  localStorage.clear();
                  showFeedback('All local preferences and memory cleared.');
                }}
                style={{ width: '100%', fontSize: '0.82rem' }}
              >
                Clear All Memory
              </button>
            </div>

            <div className="card-premium" style={{ padding: 24, textAlign: 'center' }}>
              <Download size={24} color="var(--color-bronze)" style={{ margin: '0 auto 12px' }} />
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: 6 }}>Export Data</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--color-taupe-muted)', marginBottom: 16 }}>
                Download a clean JSON archive of your entries.
              </p>
              <button
                className="btn-pill btn-primary"
                onClick={() => {
                  const dump = {
                    date: new Date().toISOString(),
                    entries: localStorage.getItem('aura_journal_entries') || '[]',
                  };
                  const blob = new Blob([JSON.stringify(dump, null, 2)], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'aura-data-export.json';
                  a.click();
                  showFeedback('Export downloaded.');
                }}
                style={{ width: '100%', fontSize: '0.82rem' }}
              >
                Export JSON
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
