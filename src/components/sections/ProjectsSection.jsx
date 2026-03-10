import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Cpu, Globe, BarChart3 } from 'lucide-react';

const fade = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-80px' } };

const projects = [
  { title: 'FinSight', desc: 'An Agentic AI financial analytics dashboard that automates KPI extraction, risk assessment, and executive insights from raw financial data.', tags: ['Python'], category: 'AI/ML', icon: <Cpu size={16} />, accent: '#6EE7FF' },
  { title: 'SoulLens', desc: 'An AI-driven depression analysis platform that integrates multimodal inputs for the evaluation of mood and behavior.', tags: ['Python', 'React', 'Flask'], category: 'AI/ML', icon: <Globe size={16} />, accent: '#8B5CF6' },
  { title: 'VARSA', desc: 'An offline virtual assistant for file searching and routine task automation.', tags: ['Python'], category: 'Data Science', icon: <BarChart3 size={16} />, accent: '#F472B6' },
];

export function ProjectsSection({ isDark }) {
  const glass = {
    background: isDark ? 'rgba(5,7,10,0.5)' : 'rgba(255,255,255,0.5)',
    backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
    border: `1px solid ${isDark ? 'rgba(110,231,255,0.06)' : 'rgba(139,92,246,0.1)'}`,
    borderRadius: 20, overflow: 'hidden',
  };

  return (
    <section id="projects" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 2rem' }}>
      <div style={{ maxWidth: 1000, width: '100%' }}>
        <motion.div {...fade} transition={{ duration: 0.7 }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.3em', color: '#10B981', fontFamily: "'Inter'", fontWeight: 500, marginBottom: 12 }}>
            02 — PROJECTS
          </p>
          <h2 style={{ fontFamily: "'Space Grotesk'", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, color: isDark ? '#E2E8F0' : '#1E293B', marginBottom: 48, lineHeight: 1.15 }}>
            Technical rockets <span style={{ color: '#10B981' }}>I've built</span>
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {projects.map((proj, i) => (
            <motion.div key={i} {...fade} transition={{ duration: 0.7, delay: i * 0.12 }}
              style={{ ...glass, padding: 0, cursor: 'pointer', transition: 'transform 0.4s ease, box-shadow 0.4s ease' }}
              whileHover={{ y: -6, boxShadow: `0 16px 40px ${proj.accent}15` }}
            >
              {/* Accent top line */}
              <div style={{ height: 2, background: `linear-gradient(90deg, transparent, ${proj.accent}, transparent)` }} />

              <div style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: `${proj.accent}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: proj.accent }}>
                    {proj.icon}
                  </div>
                  <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: proj.accent, fontWeight: 500 }}>
                    {proj.category}
                  </span>
                </div>

                <h3 style={{ fontFamily: "'Space Grotesk'", fontSize: '1.15rem', fontWeight: 600, color: isDark ? '#E2E8F0' : '#1E293B', marginBottom: 10 }}>
                  {proj.title}
                </h3>
                <p style={{ fontSize: '0.85rem', lineHeight: 1.7, color: isDark ? '#94A3B8' : '#64748B', fontWeight: 300, marginBottom: 20 }}>
                  {proj.desc}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {proj.tags.map(tag => (
                    <span key={tag} style={{
                      fontSize: '0.65rem', padding: '4px 10px', borderRadius: 6,
                      background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                      color: isDark ? '#94A3B8' : '#64748B',
                      border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
