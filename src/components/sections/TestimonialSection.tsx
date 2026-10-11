import React from 'react';
import { motion } from 'framer-motion';

export const TestimonialSection: React.FC = () => {
  return (
    <section className="section-wrapper cream" style={{ padding: '100px 0' }}>
      <div className="container-narrow" style={{ textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Label */}
          <span
            className="editorial-badge"
            style={{
              marginBottom: 24,
              color: 'var(--color-taupe-muted)',
              fontSize: '0.72rem',
            }}
          >
            ILLUSTRATIVE EXPERIENCE
          </span>

          {/* Large Centered Quote */}
          <blockquote
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 4.2vw, 3.25rem)',
              lineHeight: 1.25,
              color: 'var(--color-brown-dark)',
              fontWeight: 500,
              fontStyle: 'italic',
              marginBottom: 32,
            }}
          >
            "This gave me somewhere to talk without feeling like I had to explain everything perfectly."
          </blockquote>

          {/* Calming descriptor note */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: '0.85rem',
              color: 'var(--color-taupe-muted)',
            }}
          >
            <span style={{ width: 8, height: 1, background: 'var(--color-sand-warm)' }} />
            <span>Reflecting on early evening voice sessions</span>
            <span style={{ width: 8, height: 1, background: 'var(--color-sand-warm)' }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
