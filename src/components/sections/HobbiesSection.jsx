import React from 'react';
import { motion } from 'framer-motion';

const fade = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-80px' } };

const stats = [
  { label: 'Projects Completed', mapped: 'Runs Scored', value: '1200', accent: '#EF4444' },
  { label: 'Years Coding', mapped: 'Matches Played', value: '45', accent: '#F59E0B' },
  { label: 'Major Achievements', mapped: 'Centuries', value: '2', accent: '#10B981' },
  { label: 'Open Source PRs', mapped: 'Wickets', value: '30', accent: '#6EE7FF' },
];

export function HobbiesSection({ isDark }) {
  const glass = {
    background: isDark ? 'rgba(5,7,10,0.5)' : 'rgba(255,255,255,0.5)',
    backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
    border: `1px solid ${isDark ? 'rgba(110,231,255,0.06)' : 'rgba(139,92,246,0.1)'}`,
    borderRadius: 20,
  };

  return (
    <section id="hobbies" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 2rem' }}>
      <div style={{ maxWidth: 900, width: '100%' }}>
        <motion.div {...fade} transition={{ duration: 0.7 }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.3em', color: '#EF4444', fontFamily: "'Inter'", fontWeight: 500, marginBottom: 12 }}>
            04 — STATS
          </p>
          <h2 style={{ fontFamily: "'Space Grotesk'", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, color: isDark ? '#E2E8F0' : '#1E293B', marginBottom: 48, lineHeight: 1.15 }}>
            Cricket-style <span style={{ color: '#EF4444' }}>scoreboard</span>
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20 }}>
          {stats.map((stat, i) => (
            <motion.div key={i} {...fade} transition={{ duration: 0.7, delay: i * 0.1 }}
              style={{ ...glass, padding: '2rem', textAlign: 'center' }}
              whileHover={{ y: -4, boxShadow: `0 12px 32px ${stat.accent}12` }}
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5, type: 'spring' }}
                style={{
                  display: 'block',
                  fontFamily: "'Space Grotesk'", fontSize: '2.5rem', fontWeight: 700,
                  color: stat.accent, marginBottom: 8, lineHeight: 1,
                }}
              >
                {stat.value}
              </motion.span>
              <span style={{ display: 'block', fontSize: '0.8rem', color: isDark ? '#CBD5E1' : '#334155', fontWeight: 500, marginBottom: 4 }}>
                {stat.mapped}
              </span>
              <span style={{ display: 'block', fontSize: '0.65rem', color: isDark ? '#475569' : '#94A3B8' }}>
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
