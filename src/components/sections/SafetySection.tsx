import React from 'react';
import { motion } from 'framer-motion';
import { ActiveRoute } from '../../types';
import { ShieldAlert, HeartHandshake, PhoneCall, Sparkles } from 'lucide-react';

interface SafetySectionProps {
  onOpenSafetyModal: () => void;
  onRouteChange: (route: ActiveRoute) => void;
}

export const SafetySection: React.FC<SafetySectionProps> = ({
  onOpenSafetyModal,
  onRouteChange,
}) => {
  return (
    <section className="section-wrapper soft-beige" id="safety">
      <div className="container">
        <motion.div
          style={{ textAlign: 'center', maxWidth: 780, margin: '0 auto 54px' }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span
            className="editorial-badge"
            style={{
              color: 'var(--color-bronze)',
              background: 'rgba(169, 122, 77, 0.1)',
              padding: '6px 14px',
              borderRadius: 9999,
            }}
          >
            <ShieldAlert size={12} />
            <span>RESPONSIBLE COMPANIONSHIP</span>
          </span>

          <h2 style={{ marginBottom: 20 }}>
            When things feel more serious.
          </h2>

          <p style={{ fontSize: '1.2rem', lineHeight: 1.6, color: 'var(--color-brown-dark)', opacity: 0.85 }}>
            The companion can adapt its tone and surface support options when conversations suggest significant distress. We never use alarming sirens or sterile institutional barricades.
          </p>
        </motion.div>

        {/* 3 Calm Pathways */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 28,
            maxWidth: 1040,
            margin: '0 auto',
          }}
        >
          {/* Pathway 1 */}
          <motion.div
            className="card-premium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
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
                  marginBottom: 20,
                  color: 'var(--color-bronze)',
                }}
              >
                <Sparkles size={20} />
              </div>

              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', marginBottom: 12 }}>
                Stay Here and Talk
              </h4>

              <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--color-taupe-muted)' }}>
                Aura slows down its tempo, removes challenging reflections, and focuses on grounding, safety, and sensory de-escalation with you.
              </p>
            </div>

            <div style={{ marginTop: 24, borderTop: '1px solid var(--border-subtle)', paddingTop: 16 }}>
              <button
                className="btn-pill btn-secondary"
                onClick={() => onRouteChange('chat')}
                style={{ width: '100%', fontSize: '0.85rem' }}
              >
                Continue Dialogue
              </button>
            </div>
          </motion.div>

          {/* Pathway 2 */}
          <motion.div
            className="card-premium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
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
                  marginBottom: 20,
                  color: 'var(--color-olive-soft)',
                }}
              >
                <HeartHandshake size={20} />
              </div>

              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', marginBottom: 12 }}>
                Reach Out to Someone
              </h4>

              <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--color-taupe-muted)' }}>
                Simple, low-friction templates to message a friend, family member, or trusted person when words feel impossible to assemble alone.
              </p>
            </div>

            <div style={{ marginTop: 24, borderTop: '1px solid var(--border-subtle)', paddingTop: 16 }}>
              <button
                className="btn-pill btn-secondary"
                onClick={onOpenSafetyModal}
                style={{ width: '100%', fontSize: '0.85rem' }}
              >
                View Gentle Prompts
              </button>
            </div>
          </motion.div>

          {/* Pathway 3 */}
          <motion.div
            className="card-premium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
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
                  marginBottom: 20,
                  color: 'var(--color-sand-warm)',
                }}
              >
                <PhoneCall size={20} />
              </div>

              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', marginBottom: 12 }}>
                Support Resources
              </h4>

              <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--color-taupe-muted)' }}>
                Direct access to confidential 24/7 human professionals via text or call (988 Lifeline, Crisis Text Line, international options).
              </p>
            </div>

            <div style={{ marginTop: 24, borderTop: '1px solid var(--border-subtle)', paddingTop: 16 }}>
              <button
                className="btn-pill btn-primary"
                onClick={onOpenSafetyModal}
                style={{ width: '100%', fontSize: '0.85rem', backgroundColor: 'var(--color-brown-dark)' }}
              >
                View Support Contacts
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
