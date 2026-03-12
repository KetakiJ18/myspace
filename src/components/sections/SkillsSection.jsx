import React from 'react';
import { motion } from 'framer-motion';

const fade = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-80px' } };

const skills = [
  { name: 'Python', level: 92, color: '#6EE7FF' },
  { name: 'React', level: 88, color: '#F59E0B' },
  { name: 'Machine Learning', level: 82, color: '#F472B6' },
  { name: 'Computer Vision', level: 50, color: '#10B981' },
  { name: 'Node.js', level: 62, color: '#6EE7FF' },
  { name: 'Data Science', level: 90, color: '#F59E0B' },
];

export function SkillsSection({ isDark }) {
  const glass = {
    background: isDark ? 'rgba(5,7,10,0.5)' : 'rgba(255,255,255,0.5)',
    backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
    border: `1px solid ${isDark ? 'rgba(110,231,255,0.06)' : 'rgba(139,92,246,0.1)'}`,
    borderRadius: 20,
  };

  return (
    <section id="skills" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 2rem' }}>
      <div style={{ maxWidth: 800, width: '100%' }}>
        <motion.div {...fade} transition={{ duration: 0.7 }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.3em', color: '#8B5CF6', fontFamily: "'Inter'", fontWeight: 500, marginBottom: 12 }}>
            03 — SKILLS
          </p>
          <h2 style={{ fontFamily: "'Space Grotesk'", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, color: isDark ? '#E2E8F0' : '#1E293B', marginBottom: 48, lineHeight: 1.15 }}>
            Now <span style={{ color: '#8B5CF6' }}>playing</span>
          </h2>
        </motion.div>

        <motion.div {...fade} transition={{ duration: 0.7, delay: 0.1 }} style={{ ...glass, padding: '2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                style={{ display: 'flex', alignItems: 'center', gap: 16 }}
              >
                <span style={{
                  width: 130, fontSize: '0.8rem', fontFamily: "'Inter'", fontWeight: 400,
                  color: isDark ? '#CBD5E1' : '#334155', flexShrink: 0,
                }}>
                  {skill.name}
                </span>

                <div style={{
                  flex: 1, height: 4, borderRadius: 2,
                  background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                  overflow: 'hidden',
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.08, duration: 1, ease: 'easeOut' }}
                    style={{
                      height: '100%', borderRadius: 2,
                      background: `linear-gradient(90deg, ${skill.color}60, ${skill.color})`,
                      boxShadow: `0 0 8px ${skill.color}30`,
                    }}
                  />
                </div>

              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
