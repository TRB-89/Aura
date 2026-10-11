import React from 'react';
import { motion } from 'framer-motion';
import { ActiveRoute } from '../../types';
import { MessageSquare, HeartHandshake, Shield, Sparkles } from 'lucide-react';

interface AiConversationSectionProps {
  onRouteChange: (route: ActiveRoute) => void;
}

export const AiConversationSection: React.FC<AiConversationSectionProps> = ({ onRouteChange }) => {
  return (
    <section className="section-wrapper cream" id="chat">
      <div className="container">
        <motion.div
          style={{ textAlign: 'center', maxWidth: 820, margin: '0 auto 60px' }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="editorial-badge">INTENTIONAL DIALOGUE</span>

          <h2 style={{ marginBottom: 20 }}>
            Conversation that feels less like a chatbot.
          </h2>

          <p style={{ fontSize: '1.2rem', lineHeight: 1.6, color: 'var(--color-taupe-muted)' }}>
            No cheerful corporate boilerplate. No robotic bullet lists.<br />
            Just attentive, gentle presence that meets you right where you are.
          </p>
        </motion.div>

        {/* Editorial Chat Demonstration Showcase */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 48,
            alignItems: 'center',
          }}
        >
          {/* Left: Philosophy highlights */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
          >
            <div className="card-premium">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, color: 'var(--color-bronze)' }}>
                <HeartHandshake size={20} />
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--color-brown-dark)' }}>
                  Brief, Human Pacing
                </h4>
              </div>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
                Real listeners don't answer every struggle with five paragraphs of generic coping exercises. Aura asks simple, grounded questions and leaves room for you to breathe.
              </p>
            </div>

            <div className="card-premium">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, color: 'var(--color-olive-soft)' }}>
                <Shield size={20} />
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--color-brown-dark)' }}>
                  Zero Diagnostic Judgment
                </h4>
              </div>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
                You are never reduced to a psychiatric score or treated like a clinical problem to resolve. Conversations remain intimate, private, and restorative.
              </p>
            </div>

            <div>
              <button
                className="btn-pill btn-primary"
                onClick={() => onRouteChange('chat')}
                style={{ padding: '14px 30px' }}
              >
                <span>Talk to Aura</span>
                <MessageSquare size={16} />
              </button>
            </div>
          </motion.div>

          {/* Right: Editorial clean chat card mockup */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              background: 'var(--color-white-cream)',
              borderRadius: 32,
              padding: '40px 32px',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-elevation)',
              position: 'relative',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: 20,
                borderBottom: '1px solid var(--border-subtle)',
                marginBottom: 28,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="navbar-brand-dot" />
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 600 }}>
                  Aura Companion
                </span>
              </div>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-taupe-muted)' }}>
                Private session
              </span>
            </div>

            {/* Conversation Flow */}
            <div className="chat-editorial-container">
              <div className="chat-bubble-user">
                Today was honestly awful.
              </div>

              <div className="chat-bubble-ai">
                Yeah? What happened?
              </div>

              <div className="chat-bubble-user">
                My presentation went badly.
              </div>

              <div className="chat-bubble-ai">
                Oh. What went wrong?
              </div>
            </div>

            {/* Subtle composer simulation */}
            <div style={{ marginTop: 32 }} className="chat-composer">
              <input
                type="text"
                placeholder="Write your thoughts..."
                readOnly
                onClick={() => onRouteChange('chat')}
                style={{ cursor: 'pointer' }}
              />
              <button
                onClick={() => onRouteChange('chat')}
                className="btn-pill btn-bronze"
                style={{ padding: '6px 14px', fontSize: '0.8rem' }}
              >
                Open Chat
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
