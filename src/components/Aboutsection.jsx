import React from 'react';
import { motion } from 'framer-motion';

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] },
};

// TODO: replace with your real facts
const facts = [
  { label: 'Based in', value: 'Mumbai, India' },
  { label: 'Currently', value: 'B.Tech, Computer Science — final year' },
  { label: 'Focus areas', value: 'Machine learning, full-stack web' },
  { label: 'Outside of code', value: 'Guitar, coffee, cricket' },
];

export function AboutSection({ isDark }) {
  return (
    <section id="about" style={{ padding: '7rem 2rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.p
          {...fade}
          className="mono"
          style={{ fontSize: '0.85rem', color: 'var(--accent)', marginBottom: 16 }}
        >
          About
        </motion.p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.4fr) minmax(220px, 0.9fr)',
            gap: '4rem',
          }}
          className="about-grid"
        >
          <motion.p
            {...fade}
            style={{
              fontSize: 'clamp(1.15rem, 2vw, 1.4rem)',
              lineHeight: 1.7,
              color: 'var(--ink)',
              fontWeight: 400,
              maxWidth: '58ch',
            }}
          >
            I'm a developer who likes working close to the point where a system
            meets the person using it — the model that actually informs a
            decision, the dashboard someone checks every morning. Most of my
            work sits between machine learning and product engineering, and I'm
            looking for an internship where I can do more of both.
          </motion.p>

          <motion.dl
            {...fade}
            transition={{ ...fade.transition, delay: 0.1 }}
            style={{ margin: 0 }}
          >
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="row-divider"
                style={{ display: 'flex', justifyContent: 'space-between', gap: 16, padding: '14px 0' }}
              >
                <dt style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', fontWeight: 400 }}>
                  {fact.label}
                </dt>
                <dd
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--ink)',
                    fontWeight: 500,
                    textAlign: 'right',
                    margin: 0,
                  }}
                >
                  {fact.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}