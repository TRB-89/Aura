import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldAlert, Phone, MessageSquare, Copy, Check, Heart, ExternalLink } from 'lucide-react';
import { SAFETY_RESOURCES } from '../data/mockData';

interface SafetyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStayAndTalk: () => void;
}

export const SafetyModal: React.FC<SafetyModalProps> = ({
  isOpen,
  onClose,
  onStayAndTalk,
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyTemplate = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const messageTemplates = [
    "Hey, I'm having a really difficult time right now and just don't want to be alone with my thoughts. Are you around to talk?",
    "Things are feeling a bit overwhelming tonight. Do you have a few minutes for a brief call or coffee tomorrow?",
    "I'm feeling really drained and having a tough day. Just wanted to reach out and let someone know.",
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
        }}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(28, 24, 21, 0.75)',
            backdropFilter: 'blur(8px)',
          }}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'relative',
            background: 'var(--color-cream-primary)',
            borderRadius: 32,
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-elevation)',
            width: '100%',
            maxWidth: 680,
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '36px 32px',
            zIndex: 10,
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 24,
              right: 24,
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'var(--color-beige-soft)',
              color: 'var(--color-brown-dark)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Close"
          >
            <X size={18} />
          </button>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 28, maxWidth: 520, margin: '0 auto 28px' }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: 'rgba(169, 122, 77, 0.15)',
                color: 'var(--color-bronze)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
              }}
            >
              <ShieldAlert size={24} />
            </div>

            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.1rem', marginBottom: 10 }}>
              When things feel more serious
            </h3>

            <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--color-taupe-muted)' }}>
              You do not have to carry everything by yourself. Whether you prefer to stay quietly here with Aura, reach out to someone you know, or talk with a trained professional, help is always present.
            </p>
          </div>

          {/* 3 Pathway Action Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 32 }}>
            {/* Stay and Talk */}
            <div
              className="card-premium"
              style={{ padding: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}
            >
              <div style={{ maxWidth: 380 }}>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: 4 }}>
                  Stay Here and Ground
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-taupe-muted)' }}>
                  Continue gentle conversation. Aura will slow down and focus on calm sensory stability with you.
                </p>
              </div>
              <button
                className="btn-pill btn-secondary"
                onClick={() => {
                  onStayAndTalk();
                  onClose();
                }}
                style={{ padding: '8px 20px', fontSize: '0.85rem' }}
              >
                <span>Stay with Aura</span>
              </button>
            </div>

            {/* Reach out message helpers */}
            <div className="card-premium" style={{ padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <Heart size={16} color="var(--color-bronze)" />
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem' }}>
                  Reach Out to a Friend
                </h4>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-taupe-muted)', marginBottom: 14 }}>
                When writing feels impossible, tap any template below to copy it:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {messageTemplates.map((template, idx) => (
                  <div
                    key={idx}
                    onClick={() => copyTemplate(template, idx)}
                    style={{
                      background: 'var(--color-cream-primary)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 12,
                      padding: '12px 14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      gap: 12,
                      transition: 'var(--transition-smooth)',
                    }}
                  >
                    <span style={{ fontSize: '0.84rem', color: 'var(--color-brown-dark)', fontStyle: 'italic', lineHeight: 1.5 }}>
                      "{template}"
                    </span>
                    <button style={{ color: copiedIndex === idx ? 'var(--color-bronze)' : 'var(--color-taupe-muted)' }}>
                      {copiedIndex === idx ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Professional Hotlines */}
            <div className="card-premium" style={{ padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <Phone size={16} color="var(--color-sand-warm)" />
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem' }}>
                  Immediate Support Lifelines (24/7 Free & Confidential)
                </h4>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
                {SAFETY_RESOURCES.map((res) => (
                  <div
                    key={res.name}
                    style={{
                      background: 'var(--color-cream-primary)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 14,
                      padding: 16,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <span style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--color-brown-dark)' }}>
                        {res.name}
                      </span>
                      <p style={{ fontSize: '0.8rem', color: 'var(--color-taupe-muted)', marginTop: 4, lineHeight: 1.45 }}>
                        {res.desc}
                      </p>
                    </div>

                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-pill btn-primary"
                      style={{
                        padding: '6px 14px',
                        fontSize: '0.78rem',
                        marginTop: 14,
                        width: 'fit-content',
                        backgroundColor: 'var(--color-brown-dark)',
                      }}
                    >
                      <span>{res.contact}</span>
                      <ExternalLink size={11} />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: 16 }}>
            <p style={{ fontSize: '0.78rem', color: 'var(--color-taupe-muted)' }}>
              Aura is an AI wellbeing companion designed for reflection, de-escalation, and mindfulness. It is not an emergency psychiatric clinic.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
