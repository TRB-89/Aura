import React from 'react';
import { motion } from 'framer-motion';
import { PhoneMockup } from '../PhoneMockup';
import { ActiveRoute } from '../../types';

interface ProductIntroSectionProps {
  onRouteChange: (route: ActiveRoute) => void;
}

export const ProductIntroSection: React.FC<ProductIntroSectionProps> = ({ onRouteChange }) => {
  return (
    <section className="section-wrapper cream" id="intro">
      <div className="container">
        <motion.div
          style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 48px' }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="editorial-badge">THE SANCTUARY</span>

          <h2 style={{ marginBottom: 20 }}>
            Wellbeing, without the pressure.
          </h2>

          <p style={{ fontSize: '1.25rem', lineHeight: 1.6, color: 'var(--color-taupe-muted)' }}>
            Talk when you want to talk.<br />
            Write when you want to write.<br />
            Slow down when you need a minute.
          </p>
        </motion.div>

        {/* Centered phone mockup with real interactive app interface */}
        <motion.div
          className="mockup-container"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <PhoneMockup initialScreen="chat" onNavigateApp={onRouteChange} />
        </motion.div>
      </div>
    </section>
  );
};
