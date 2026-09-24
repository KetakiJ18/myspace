import React from 'react';
import { motion } from 'framer-motion';

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
};

// TODO: adjust to your real stack
const groups = [
  { label: 'Languages', items: ['Python', 'JavaScript / TypeScript', 'SQL', 'R'] },
  { label: 'Frameworks & libraries', items: ['React', 'Flask', 'PyTorch', 'Pandas'] },
  { label: 'Tools & platforms', items: ['Git', 'Docker', 'AWS', 'PostgreSQL'] },
];

export function SkillsSection({ isDark }) {
  return (
    <section id="skills" style={{ padding: '7rem 2rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.p
          {...fade}
          className="mono"
          style={{ fontSize: '0.85rem', color: 'var(--accent)', marginBottom: 16 }}
        >
          Skills
        </motion.p>
        <motion.h2
          {...fade}
          style={{ fontSize: 'clamp(1.8rem, 3.4vw, 2.4rem)', fontWeight: 500, color: 'var(--ink)', marginBottom: 48 }}
        >
          What I work with
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem' }}>
          {groups.map((group, i) => (
            <motion.div key={group.label} {...fade} transition={{ ...fade.transition, delay: i * 0.08 }}>
              <h3
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  color: 'var(--ink-muted)',
                  marginBottom: 16,
                  paddingBottom: 10,
                  borderBottom: '1px solid var(--line-soft)',
                }}
              >
                {group.label}
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {group.items.map((item) => (
                  <span
                    key={item}
                    style={{
                      fontSize: '0.85rem',
                      padding: '7px 14px',
                      borderRadius: 4,
                      border: '1px solid var(--line)',
                      color: 'var(--ink)',
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}