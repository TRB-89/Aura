import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ActiveRoute } from '../../types';
import { MessageSquare, Mic, BookOpen, Wind, Sparkles, Compass, Shield, ArrowRight } from 'lucide-react';

interface DashboardViewProps {
  onRouteChange: (route: ActiveRoute) => void;
  onOpenSafety: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onRouteChange,
  onOpenSafety,
}) => {
  const [quickThought, setQuickThought] = useState('');

  const handleStartChatWithThought = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickThought.trim()) {
      localStorage.setItem('aura_pending_thought', quickThought.trim());
    }
    onRouteChange('chat');
  };

  return (
    <div style={{ paddingTop: 100, paddingBottom: 100, minHeight: '100vh', backgroundColor: 'var(--color-cream-primary)' }}>
      <div className="container" style={{ maxWidth: 1040 }}>
        {/* Header Greetings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 40 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span className="navbar-brand-dot" />
            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--color-bronze)', fontWeight: 600 }}>
              YOUR EVENING SPACE
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', marginBottom: 12 }}>
            Good evening, Alex.
          </h1>

          <p style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--color-taupe-muted)' }}>
            How are things feeling right now?
          </p>
        </motion.div>

        {/* Primary Interaction Prompt Card */}
        <motion.div
          className="card-premium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            padding: '36px 32px',
            marginBottom: 44,
            background: 'linear-gradient(180deg, #FCF9F4 0%, #F6F0E6 100%)',
            border: '1px solid rgba(169, 122, 77, 0.2)',
          }}
        >
          <form onSubmit={handleStartChatWithThought}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <Sparkles size={18} color="var(--color-bronze)" />
              <label
                htmlFor="dashboard-thought"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.45rem',
                  color: 'var(--color-brown-dark)',
                  fontWeight: 500,
                }}
              >
                Tell me what's on your mind...
              </label>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                background: '#fff',
                border: '1px solid var(--border-subtle)',
                borderRadius: 20,
                padding: '12px 18px',
                gap: 12,
                boxShadow: 'var(--shadow-subtle)',
              }}
            >
              <input
                id="dashboard-thought"
                type="text"
                value={quickThought}
                onChange={(e) => setQuickThought(e.target.value)}
                placeholder="I had a long meeting today... / My thoughts feel scattered..."
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  fontSize: '1.02rem',
                  color: 'var(--color-brown-dark)',
                  background: 'transparent',
                }}
              />
              <button
                type="submit"
                className="btn-pill btn-primary"
                style={{ padding: '8px 22px', fontSize: '0.88rem' }}
              >
                <span>Talk</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </form>
        </motion.div>

        {/* 4 Quick Action Cards with Soft Visuals */}
        <div style={{ marginBottom: 44 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)' }}>
              Intimate Practices
            </h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-taupe-muted)' }}>
              Pick what fits your energy
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
              gap: 20,
            }}
          >
            {/* Talk Card */}
            <motion.div
              className="card-premium"
              whileHover={{ y: -4 }}
              onClick={() => onRouteChange('chat')}
              style={{ cursor: 'pointer', padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 14,
                    background: 'var(--color-cream-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 16,
                    color: 'var(--color-bronze)',
                  }}
                >
                  <MessageSquare size={20} />
                </div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', marginBottom: 6 }}>
                  Talk
                </h4>
                <p style={{ fontSize: '0.86rem', lineHeight: 1.5, color: 'var(--color-taupe-muted)' }}>
                  A grounded, editorial dialogue with Aura. No rush, no clinical judgment.
                </p>
              </div>
              <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 6, color: 'var(--color-bronze)', fontSize: '0.82rem', fontWeight: 600 }}>
                <span>Start Session</span>
                <ArrowRight size={12} />
              </div>
            </motion.div>

            {/* Voice Card */}
            <motion.div
              className="card-premium"
              whileHover={{ y: -4 }}
              onClick={() => onRouteChange('voice')}
              style={{
                cursor: 'pointer',
                padding: 28,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: 'linear-gradient(145deg, #2A231E 0%, #1E1916 100%)',
                color: 'var(--color-white-cream)',
                borderColor: 'rgba(212, 184, 146, 0.2)',
              }}
            >
              <div>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 14,
                    background: 'rgba(255, 248, 240, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 16,
                    color: 'var(--color-sand-warm)',
                  }}
                >
                  <Mic size={20} />
                </div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--color-white-cream)', marginBottom: 6 }}>
                  Voice
                </h4>
                <p style={{ fontSize: '0.86rem', lineHeight: 1.5, color: 'var(--color-beige-soft)', opacity: 0.85 }}>
                  Speak out loud into the glowing bronze orb. Interrupt whenever you like.
                </p>
              </div>
              <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 6, color: 'var(--color-sand-warm)', fontSize: '0.82rem', fontWeight: 600 }}>
                <span>Live Voice</span>
                <ArrowRight size={12} />
              </div>
            </motion.div>

            {/* Journal Card */}
            <motion.div
              className="card-premium"
              whileHover={{ y: -4 }}
              onClick={() => onRouteChange('journal')}
              style={{ cursor: 'pointer', padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 14,
                    background: 'var(--color-cream-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 16,
                    color: 'var(--color-olive-soft)',
                  }}
                >
                  <BookOpen size={20} />
                </div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', marginBottom: 6 }}>
                  Journal
                </h4>
                <p style={{ fontSize: '0.86rem', lineHeight: 1.5, color: 'var(--color-taupe-muted)' }}>
                  A paper-like refuge for messy thoughts, private entries, and gentle AI synthesis.
                </p>
              </div>
              <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 6, color: 'var(--color-bronze)', fontSize: '0.82rem', fontWeight: 600 }}>
                <span>Open Notebook</span>
                <ArrowRight size={12} />
              </div>
            </motion.div>

            {/* Reset Card */}
            <motion.div
              className="card-premium"
              whileHover={{ y: -4 }}
              onClick={() => onRouteChange('reset')}
              style={{ cursor: 'pointer', padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 14,
                    background: 'var(--color-cream-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 16,
                    color: 'var(--color-sand-warm)',
                  }}
                >
                  <Wind size={20} />
                </div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', marginBottom: 6 }}>
                  Reset
                </h4>
                <p style={{ fontSize: '0.86rem', lineHeight: 1.5, color: 'var(--color-taupe-muted)' }}>
                  Box breathing and nervous system calming cycles with soothing chimes.
                </p>
              </div>
              <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 6, color: 'var(--color-bronze)', fontSize: '0.82rem', fontWeight: 600 }}>
                <span>Breathe</span>
                <ArrowRight size={12} />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Presence & Observational Note Banner */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 20,
          }}
        >
          {/* Presence Banner */}
          <div
            className="card-translucent"
            onClick={() => onRouteChange('presence')}
            style={{ cursor: 'pointer', padding: 28, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <div>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-bronze)', fontWeight: 600 }}>
                SILENT HOLDING
              </span>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginTop: 4 }}>
                Presence Sanctuary
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-taupe-muted)', marginTop: 4 }}>
                No words needed. Just breathe alongside a slow golden aura.
              </p>
            </div>
            <ArrowRight size={18} color="var(--color-bronze)" />
          </div>

          {/* Observational Insight Note */}
          <div
            className="card-translucent"
            onClick={() => onRouteChange('insights')}
            style={{ cursor: 'pointer', padding: 28, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <div>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-olive-soft)', fontWeight: 600 }}>
                OBSERVATION
              </span>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginTop: 4 }}>
                Evening Wind-down Trend
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-taupe-muted)', marginTop: 4 }}>
                You frequently find calm clarity after 8:30 PM.
              </p>
            </div>
            <Compass size={18} color="var(--color-olive-soft)" />
          </div>
        </div>
      </div>
    </div>
  );
};
