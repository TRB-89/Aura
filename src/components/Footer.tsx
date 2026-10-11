import React from 'react';
import { ActiveRoute } from '../types';

interface FooterProps {
  onRouteChange: (route: ActiveRoute) => void;
  onOpenSafety: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onRouteChange, onOpenSafety }) => {
  return (
    <footer
      style={{
        backgroundColor: 'var(--color-cream-primary)',
        borderTop: '1px solid var(--border-subtle)',
        padding: '80px 24px 48px',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 48,
            marginBottom: 64,
          }}
        >
          {/* Brand info */}
          <div style={{ maxWidth: 300 }}>
            <div
              className="navbar-brand"
              style={{ marginBottom: 16, cursor: 'pointer' }}
              onClick={() => onRouteChange('landing')}
            >
              <span className="navbar-brand-dot" />
              <span>Aura</span>
            </div>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.6, marginBottom: 20 }}>
              A quieter place for your mind. A private AI wellbeing companion for conversations, voice reflection, breathwork, and emotional clarity.
            </p>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 14px',
                borderRadius: 9999,
                background: 'var(--glass-surface-translucent)',
                border: '1px solid var(--border-subtle)',
                fontSize: '0.78rem',
                color: 'var(--color-taupe-muted)',
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#48bb78' }} />
              <span>Private by design • Local memory controls</span>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--color-brown-dark)',
                marginBottom: 20,
              }}
            >
              Product
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li>
                <button
                  onClick={() => onRouteChange('chat')}
                  style={{ color: 'var(--color-taupe-muted)', fontSize: '0.9rem' }}
                >
                  Talk (AI Conversation)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onRouteChange('voice')}
                  style={{ color: 'var(--color-taupe-muted)', fontSize: '0.9rem' }}
                >
                  Voice Companion
                </button>
              </li>
              <li>
                <button
                  onClick={() => onRouteChange('journal')}
                  style={{ color: 'var(--color-taupe-muted)', fontSize: '0.9rem' }}
                >
                  Reflection Journal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onRouteChange('reset')}
                  style={{ color: 'var(--color-taupe-muted)', fontSize: '0.9rem' }}
                >
                  Reset & Breathing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onRouteChange('presence')}
                  style={{ color: 'var(--color-taupe-muted)', fontSize: '0.9rem' }}
                >
                  Presence Mode
                </button>
              </li>
              <li>
                <button
                  onClick={() => onRouteChange('insights')}
                  style={{ color: 'var(--color-taupe-muted)', fontSize: '0.9rem' }}
                >
                  Emotional Insights
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--color-brown-dark)',
                marginBottom: 20,
              }}
            >
              Support & Care
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li>
                <button
                  onClick={onOpenSafety}
                  style={{ color: 'var(--color-bronze)', fontSize: '0.9rem', fontWeight: 500 }}
                >
                  Safety & Crisis Resources
                </button>
              </li>
              <li>
                <a
                  href="tel:988"
                  style={{ color: 'var(--color-taupe-muted)', fontSize: '0.9rem' }}
                >
                  988 Suicide & Crisis Lifeline
                </a>
              </li>
              <li>
                <button
                  onClick={() => onRouteChange('privacy')}
                  style={{ color: 'var(--color-taupe-muted)', fontSize: '0.9rem' }}
                >
                  Privacy Controls
                </button>
              </li>
              <li>
                <span style={{ color: 'var(--color-taupe-muted)', fontSize: '0.9rem' }}>
                  24/7 De-escalation Protocol
                </span>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--color-brown-dark)',
                marginBottom: 20,
              }}
            >
              Philosophy
            </h4>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--color-taupe-muted)' }}>
              Built on the belief that wellbeing technology should be calm, unhurried, and deeply respectful of personal sovereignty.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: 32,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            fontSize: '0.85rem',
            color: 'var(--color-taupe-muted)',
          }}
        >
          <div>
            © {new Date().getFullYear()} Aura Wellbeing Companion. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            <button onClick={() => onRouteChange('privacy')}>Privacy Policy</button>
            <button onClick={() => onRouteChange('privacy')}>Data Sovereignty</button>
            <button onClick={onOpenSafety}>Terms & Clinical Disclaimer</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
