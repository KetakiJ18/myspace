import React from 'react';
import { motion } from 'framer-motion';

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
};

// TODO: replace with your real internships / roles, most recent first
const roles = [
  {
    date: '2026',
    title: 'Software Engineering Intern',
    org: '[Company Name]',
    description:
      'One or two lines on what you owned — a system you built, a metric you moved, a problem you were the one who noticed.',
    tags: ['Python', 'React', 'PostgreSQL'],
  },
  {
    date: '2025',
    title: 'Machine Learning Intern',
    org: '[Company Name]',
    description:
      'What the model was for, what you shipped, and how it was actually used once it left your notebook.',
    tags: ['PyTorch', 'Pandas', 'AWS'],
  },
  {
    date: '2024',
    title: 'Research Assistant',
    org: '[Lab / Department Name]',
    description: 'The question you were helping answer, and what you contributed to answering it.',
    tags: ['Data Analysis', 'R'],
  },
];

export function ExperienceSection({ isDark }) {
  return (
    <section id="experience" style={{ padding: '7rem 2rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.p
          {...fade}
          className="mono"
          style={{ fontSize: '0.85rem', color: 'var(--accent)', marginBottom: 16 }}
        >
          Experience
        </motion.p>
        <motion.h2
          {...fade}
          style={{
            fontSize: 'clamp(1.8rem, 3.4vw, 2.4rem)',
            fontWeight: 500,
            color: 'var(--ink)',
            marginBottom: 48,
          }}
        >
          Where I've worked
        </motion.h2>

        <div style={{ position: 'relative', paddingLeft: 28 }}>
          <div
            style={{
              position: 'absolute',
              left: 4,
              top: 6,
              bottom: 6,
              width: 1,
              background: 'var(--line)',
            }}
          />
          {roles.map((role, i) => (
            <motion.div
              key={i}
              {...fade}
              transition={{ ...fade.transition, delay: i * 0.08 }}
              style={{ position: 'relative', paddingBottom: i === roles.length - 1 ? 0 : 40 }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: -28,
                  top: 6,
                  width: 9,
                  height: 9,
                  borderRadius: '50%',
                  background: 'var(--accent)',
                }}
              />
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '110px 1fr',
                  gap: 24,
                }}
                className="role-row"
              >
                <span className="mono" style={{ fontSize: '0.85rem', color: 'var(--ink-muted)' }}>
                  {role.date}
                </span>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 600, fontFamily: "'Inter', sans-serif", color: 'var(--ink)', marginBottom: 4 }}>
                    {role.title} <span style={{ color: 'var(--ink-muted)', fontWeight: 400 }}>· {role.org}</span>
                  </h3>
                  <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--ink-muted)', fontWeight: 300, marginBottom: 12, maxWidth: '60ch' }}>
                    {role.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {role.tags.map((tag) => (
                      <span
                        key={tag}
                        className="mono"
                        style={{
                          fontSize: '0.7rem',
                          padding: '3px 10px',
                          borderRadius: 3,
                          border: '1px solid var(--line)',
                          color: 'var(--ink-muted)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 620px) {
          .role-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}