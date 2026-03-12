import React from 'react';
import { motion } from 'framer-motion';
import { User, Code, Coffee, Guitar } from 'lucide-react';

const fade = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-100px' }, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } };

export function AboutSection({ isDark }) {
  const glass = {
    background: isDark ? 'rgba(5,7,10,0.5)' : 'rgba(255,255,255,0.5)',
    backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
    border: `1px solid ${isDark ? 'rgba(110,231,255,0.06)' : 'rgba(139,92,246,0.1)'}`,
    borderRadius: 20,
  };

  const interests = [
    { icon: <Code size={18} />, label: 'Technology', color: '#6EE7FF' },
    { icon: <Guitar size={18} />, label: 'Music', color: '#F59E0B' },
    { icon: <Coffee size={18} />, label: 'Coffee', color: '#F472B6' },
  ];

  return (
    <section id="about" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 2rem' }}>
      <div style={{ maxWidth: 900, width: '100%' }}>
        <motion.div {...fade}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.3em', color: '#6EE7FF', fontFamily: "'Inter'", fontWeight: 500, marginBottom: 12 }}>
            01 — ABOUT
          </p>
          <h2 style={{ fontFamily: "'Space Grotesk'", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, color: isDark ? '#E2E8F0' : '#1E293B', marginBottom: 32, lineHeight: 1.15 }}>
            A developer exploring the<br />
            <span className="text-gradient-cyan">universe of code</span>
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          <motion.div {...fade} transition={{ ...fade.transition, delay: 0.1 }} style={{ ...glass, padding: '2rem' }}>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.9, color: isDark ? '#CBD5E1' : '#475569', fontWeight: 300 }}>
              I'm a developer driven by curiosity.
              I love building things that live at the intersection of technology,
              creativity, and design. Whether it's crafting AI-powered platforms or
              strumming chords on my guitar, I'm always exploring.
            </p>
          </motion.div>

          <motion.div {...fade} transition={{ ...fade.transition, delay: 0.2 }} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {interests.map((item, i) => (
              <div key={i} style={{ ...glass, padding: '1.2rem 1.5rem', display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `${item.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.color }}>
                  {item.icon}
                </div>
                <span style={{ fontFamily: "'Inter'", fontSize: '0.85rem', fontWeight: 400, color: isDark ? '#E2E8F0' : '#1E293B' }}>
                  {item.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
