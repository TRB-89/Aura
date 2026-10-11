import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ActiveRoute } from '../../types';
import { geminiProvider } from '../../lib/ai/geminiProvider';
import { GEMINI_LIVE_VOICES } from '../../lib/voice/voiceConfig';
import { SUPPORT_MODES } from '../../lib/ai/modes';
import { SupportMode } from '../../lib/ai/types';
import {
  ArrowLeft,
  Key,
  ShieldCheck,
  Volume2,
  Sliders,
  Database,
  Lock,
  Heart,
  Eye,
  Check,
  Sparkles,
} from 'lucide-react';

interface SettingsViewProps {
  onRouteChange: (route: ActiveRoute) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onRouteChange }) => {
  const [apiKeyInput, setApiKeyInput] = useState(geminiProvider.getApiKey());
  const [isSavedKey, setIsSavedKey] = useState(geminiProvider.isConfigured());
  const [activeTab, setActiveTab] = useState<
    'gemini' | 'voice' | 'modes' | 'memory' | 'privacy' | 'accessibility'
  >('gemini');
  const [feedback, setFeedback] = useState<string | null>(null);

  // User preferences
  const [selectedVoice, setSelectedVoice] = useState('Aoede');
  const [defaultMode, setDefaultMode] = useState<SupportMode>('listen');
  const [adviceAllowed, setAdviceAllowed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [trustedName, setTrustedName] = useState('Maya');
  const [trustedPhone, setTrustedPhone] = useState('+1 555-0192');

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleSaveGeminiKey = (e: React.FormEvent) => {
    e.preventDefault();
    geminiProvider.setApiKey(apiKeyInput.trim());
    setIsSavedKey(geminiProvider.isConfigured());
    showFeedback(
      apiKeyInput.trim()
        ? 'Gemini API key connected securely.'
        : 'Gemini API key cleared.'
    );
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
      <div className="container" style={{ maxWidth: 880 }}>
        {/* Top Header */}
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
            <span
              style={{
                fontSize: '0.78rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--color-bronze)',
                fontWeight: 600,
              }}
            >
              PREFERENCES & ARCHITECTURE
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem' }}>
              Companion Settings
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

        {/* Tab Pills */}
        <div
          style={{
            display: 'flex',
            gap: 8,
            overflowX: 'auto',
            paddingBottom: 12,
            marginBottom: 32,
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          {[
            { id: 'gemini', label: 'Gemini AI', icon: <Key size={14} /> },
            { id: 'voice', label: 'Voice & Speech', icon: <Volume2 size={14} /> },
            { id: 'modes', label: 'Support Modes', icon: <Sliders size={14} /> },
            { id: 'memory', label: 'Memory', icon: <Database size={14} /> },
            { id: 'privacy', label: 'Privacy', icon: <Lock size={14} /> },
            { id: 'accessibility', label: 'Accessibility', icon: <Eye size={14} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className="btn-pill"
              style={{
                backgroundColor:
                  activeTab === tab.id ? 'var(--color-brown-dark)' : 'var(--color-white-cream)',
                color: activeTab === tab.id ? '#fff' : 'var(--color-brown-dark)',
                padding: '8px 16px',
                fontSize: '0.84rem',
                border: '1px solid var(--border-subtle)',
                whiteSpace: 'nowrap',
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab 1: Gemini AI Key Configuration */}
        {activeTab === 'gemini' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card-premium"
            style={{ padding: 36 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <Sparkles size={20} color="var(--color-bronze)" />
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem' }}>
                Google Gemini API Connection
              </h3>
            </div>

            <p style={{ fontSize: '0.95rem', color: 'var(--color-taupe-muted)', marginBottom: 24, lineHeight: 1.6 }}>
              Aura connects directly to Google Gemini for realtime natural conversations, journal reflections, and memory extraction. Provide your Gemini API key below, or set it via <code>VITE_GEMINI_API_KEY</code> in your environment file.
            </p>

            <form onSubmit={handleSaveGeminiKey}>
              <div style={{ marginBottom: 20 }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: 8,
                    color: 'var(--color-brown-dark)',
                  }}
                >
                  Gemini API Key
                </label>
                <input
                  type="password"
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  placeholder="AIzaSy..."
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: 14,
                    border: '1px solid var(--border-subtle)',
                    background: 'var(--color-cream-primary)',
                    fontFamily: 'monospace',
                    fontSize: '0.95rem',
                    color: 'var(--color-brown-dark)',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: isSavedKey ? '#48bb78' : '#e53e3e',
                    }}
                  />
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-taupe-muted)' }}>
                    {isSavedKey ? 'Connected to Google Gemini' : 'Awaiting Gemini API Key'}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    type="submit"
                    className="btn-pill btn-primary"
                    style={{ padding: '8px 24px', fontSize: '0.88rem' }}
                  >
                    Save Key
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        )}

        {/* Tab 2: Voice & Speech */}
        {activeTab === 'voice' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card-premium" style={{ padding: 36 }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: 12 }}>
              Voice & Audio Presets
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--color-taupe-muted)', marginBottom: 24 }}>
              Natural female voices for spoken conversational turns.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {GEMINI_LIVE_VOICES.map((v) => (
                <div
                  key={v.id}
                  onClick={() => {
                    setSelectedVoice(v.id);
                    showFeedback(`Voice set to ${v.name}`);
                  }}
                  style={{
                    padding: 16,
                    borderRadius: 14,
                    border: '1px solid',
                    borderColor: selectedVoice === v.id ? 'var(--color-bronze)' : 'var(--border-subtle)',
                    background: selectedVoice === v.id ? '#FFFDF9' : 'var(--color-cream-primary)',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <span style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--color-brown-dark)' }}>
                      {v.name}
                    </span>
                    {v.recommended && (
                      <span style={{ marginLeft: 8, fontSize: '0.72rem', padding: '2px 8px', borderRadius: 9999, background: 'var(--color-sand-warm)', color: '#fff' }}>
                        Default Female
                      </span>
                    )}
                  </div>
                  {selectedVoice === v.id && <Check size={16} color="var(--color-bronze)" />}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tab 3: Support Modes */}
        {activeTab === 'modes' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card-premium" style={{ padding: 36 }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: 12 }}>
              Default Support Mode
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--color-taupe-muted)', marginBottom: 24 }}>
              Choose how Aura greets and guides your discussions by default.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 28 }}>
              {Object.values(SUPPORT_MODES).map((mode) => (
                <div
                  key={mode.id}
                  onClick={() => setDefaultMode(mode.id)}
                  style={{
                    padding: 20,
                    borderRadius: 16,
                    border: '1px solid',
                    borderColor: defaultMode === mode.id ? 'var(--color-bronze)' : 'var(--border-subtle)',
                    background: defaultMode === mode.id ? '#FFFDF9' : 'var(--color-cream-primary)',
                    cursor: 'pointer',
                  }}
                >
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: 4 }}>
                    {mode.name}
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--color-taupe-muted)' }}>{mode.description}</p>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, borderTop: '1px solid var(--border-subtle)' }}>
              <div>
                <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-brown-dark)' }}>
                  Allow Unsolicited Advice
                </span>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-taupe-muted)' }}>
                  When disabled, Aura will never suggest solutions unless explicitly asked.
                </p>
              </div>
              <input
                type="checkbox"
                checked={adviceAllowed}
                onChange={(e) => setAdviceAllowed(e.target.checked)}
              />
            </div>
          </motion.div>
        )}

        {/* Tab 4: Memory */}
        {activeTab === 'memory' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card-premium" style={{ padding: 36 }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: 12 }}>
              Memory Center
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--color-taupe-muted)', marginBottom: 20 }}>
              Review remembered boundaries, themes, and preferences. You control every item.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
              {[
                'Prefers no breathing exercises when actively in panic',
                'Works as an architect, evenings are most reflective',
                'PrefersMaya as trusted emergency friend contact',
              ].map((mem, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '12px 16px',
                    borderRadius: 12,
                    background: 'var(--color-cream-primary)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.88rem',
                  }}
                >
                  <span>{mem}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-olive-soft)', fontWeight: 600 }}>Approved</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => showFeedback('All stored memories cleared.')}
              className="btn-pill btn-secondary"
              style={{ fontSize: '0.85rem' }}
            >
              Clear All Memory
            </button>
          </motion.div>
        )}

        {/* Tab 5: Privacy & Trusted Contact */}
        {activeTab === 'privacy' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card-premium" style={{ padding: 36 }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: 12 }}>
              Trusted Support Contact
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--color-taupe-muted)', marginBottom: 20 }}>
              Designate a trusted person to pre-fill when using the "Reach Out" crisis pathway.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: 6 }}>
                  Contact Name
                </label>
                <input
                  type="text"
                  value={trustedName}
                  onChange={(e) => setTrustedName(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid var(--border-subtle)' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: 6 }}>
                  Contact Phone / Handle
                </label>
                <input
                  type="text"
                  value={trustedPhone}
                  onChange={(e) => setTrustedPhone(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid var(--border-subtle)' }}
                />
              </div>
            </div>

            <button
              onClick={() => showFeedback('Trusted contact saved.')}
              className="btn-pill btn-primary"
              style={{ padding: '8px 20px', fontSize: '0.85rem' }}
            >
              Save Contact
            </button>
          </motion.div>
        )}

        {/* Tab 6: Accessibility */}
        {activeTab === 'accessibility' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card-premium" style={{ padding: 36 }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: 12 }}>
              Accessibility & Comfort
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--color-brown-dark)' }}>
                    Reduced Motion
                  </span>
                  <p style={{ fontSize: '0.82rem', color: 'var(--color-taupe-muted)' }}>
                    Minimize pulsing orbs and scale animations.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={reducedMotion}
                  onChange={(e) => setReducedMotion(e.target.checked)}
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
