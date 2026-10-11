import React, { useState } from 'react';
import { ActiveRoute } from '../types';
import { Sparkles, Menu, X, ShieldAlert, Lock, Compass } from 'lucide-react';

interface NavbarProps {
  currentRoute: ActiveRoute;
  onRouteChange: (route: ActiveRoute) => void;
  onOpenSafety: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onRouteChange,
  onOpenSafety,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; route: ActiveRoute }[] = [
    { label: 'Talk', route: 'chat' },
    { label: 'Voice', route: 'voice' },
    { label: 'Journal', route: 'journal' },
    { label: 'Reset', route: 'reset' },
    { label: 'Presence', route: 'presence' },
    { label: 'Insights', route: 'insights' },
  ];

  return (
    <header className="floating-navbar">
      <div 
        className="navbar-brand"
        style={{ cursor: 'pointer' }}
        onClick={() => onRouteChange('landing')}
      >
        <span className="navbar-brand-dot" />
        <span>Aura</span>
      </div>

      <nav>
        <ul className="navbar-links">
          {navItems.map((item) => (
            <li key={item.route}>
              <button
                className={`navbar-link ${currentRoute === item.route ? 'active' : ''}`}
                onClick={() => onRouteChange(item.route)}
                style={{
                  fontWeight: currentRoute === item.route ? 600 : 400,
                  color: currentRoute === item.route ? 'var(--color-brown-dark)' : 'var(--color-taupe-muted)',
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
          <li>
            <button
              className="navbar-link"
              onClick={() => onRouteChange('privacy')}
              title="Privacy Controls"
              style={{ display: 'flex', alignItems: 'center', gap: 4 }}
            >
              <Lock size={13} />
              <span>Privacy</span>
            </button>
          </li>
          <li>
            <button
              className="navbar-link"
              onClick={() => onRouteChange('settings')}
              title="Companion & Gemini Settings"
              style={{ display: 'flex', alignItems: 'center', gap: 4 }}
            >
              <Sparkles size={13} color="var(--color-bronze)" />
              <span>Settings</span>
            </button>
          </li>
          <li>
            <button
              className="navbar-link"
              onClick={onOpenSafety}
              title="Support & Crisis Guidance"
              style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--color-bronze)' }}
            >
              <ShieldAlert size={14} />
              <span>Safety</span>
            </button>
          </li>
        </ul>
      </nav>

      <div className="navbar-actions">
        {currentRoute !== 'landing' ? (
          <button
            className="btn-pill btn-secondary"
            onClick={() => onRouteChange('landing')}
            style={{ padding: '8px 18px', fontSize: '0.85rem' }}
          >
            Overview
          </button>
        ) : (
          <button
            className="btn-pill btn-secondary"
            onClick={() => onRouteChange('dashboard')}
            style={{ padding: '8px 18px', fontSize: '0.85rem' }}
          >
            Dashboard
          </button>
        )}

        <button
          className="btn-pill btn-primary"
          onClick={() => onRouteChange('chat')}
          style={{ padding: '8px 20px', fontSize: '0.85rem' }}
        >
          <span>Start</span>
          <Sparkles size={14} />
        </button>

        {/* Mobile toggle button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'none',
            padding: 6,
            color: 'var(--color-brown-dark)',
          }}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 12px)',
            left: 0,
            right: 0,
            background: 'var(--color-white-cream)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 24,
            padding: '24px 20px',
            boxShadow: 'var(--shadow-elevation)',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            zIndex: 1001,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <button
              onClick={() => { onRouteChange('landing'); setMobileMenuOpen(false); }}
              style={{ textAlign: 'left', padding: '8px 0', fontSize: '1rem', color: 'var(--color-brown-dark)' }}
            >
              Landing Story
            </button>
            <button
              onClick={() => { onRouteChange('dashboard'); setMobileMenuOpen(false); }}
              style={{ textAlign: 'left', padding: '8px 0', fontSize: '1rem', color: 'var(--color-brown-dark)', fontWeight: 600 }}
            >
              App Dashboard
            </button>
            {navItems.map((item) => (
              <button
                key={item.route}
                onClick={() => { onRouteChange(item.route); setMobileMenuOpen(false); }}
                style={{ textAlign: 'left', padding: '8px 0', fontSize: '1rem', color: 'var(--color-taupe-muted)' }}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => { onRouteChange('privacy'); setMobileMenuOpen(false); }}
              style={{ textAlign: 'left', padding: '8px 0', fontSize: '1rem', color: 'var(--color-taupe-muted)' }}
            >
              Privacy & Memory
            </button>
            <button
              onClick={() => { onOpenSafety(); setMobileMenuOpen(false); }}
              style={{ textAlign: 'left', padding: '8px 0', fontSize: '1rem', color: 'var(--color-bronze)', fontWeight: 500 }}
            >
              Safety Resources
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
