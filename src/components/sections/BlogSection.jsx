import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, ArrowUpRight } from 'lucide-react';

const fade = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-80px' } };

const posts = [
  { title: 'Why I love Three.js', excerpt: 'Exploring the creative boundaries of 3D on the web.', date: 'Mar 2026', tag: 'Tech' },
  { title: 'Coffee & Code Rituals', excerpt: 'My morning routine for staying productive and creative.', date: 'Feb 2026', tag: 'Life' },
  { title: 'From Cricket to Code', excerpt: 'How competitive sports shaped my approach to problem solving.', date: 'Jan 2026', tag: 'Story' },
];

export function BlogSection({ isDark }) {
  const glass = {
    background: isDark ? 'rgba(5,7,10,0.5)' : 'rgba(255,255,255,0.5)',
    backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
    border: `1px solid ${isDark ? 'rgba(110,231,255,0.06)' : 'rgba(139,92,246,0.1)'}`,
    borderRadius: 20, overflow: 'hidden',
  };

  return (
    <section id="blog" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 2rem' }}>
      <div style={{ maxWidth: 900, width: '100%' }}>
        <motion.div {...fade} transition={{ duration: 0.7 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <Coffee size={14} style={{ color: '#F472B6' }} />
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.3em', color: '#F472B6', fontFamily: "'Inter'", fontWeight: 500 }}>
              05 — COFFEE BREAK
            </p>
          </div>
          <h2 style={{ fontFamily: "'Space Grotesk'", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, color: isDark ? '#E2E8F0' : '#1E293B', marginBottom: 48, lineHeight: 1.15 }}>
            Thoughts & <span style={{ color: '#F472B6' }}>notes</span>
          </h2>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {posts.map((post, i) => (
            <motion.div key={i} {...fade} transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{ ...glass, padding: '1.5rem 2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 20, transition: 'transform 0.3s ease' }}
              whileHover={{ x: 8 }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: '0.6rem', padding: '3px 8px', borderRadius: 4, background: `rgba(244,114,182,0.1)`, color: '#F472B6', fontWeight: 500 }}>
                    {post.tag}
                  </span>
                  <span style={{ fontSize: '0.6rem', color: isDark ? '#475569' : '#94A3B8' }}>{post.date}</span>
                </div>
                <h3 style={{ fontFamily: "'Space Grotesk'", fontSize: '1.05rem', fontWeight: 600, color: isDark ? '#E2E8F0' : '#1E293B', marginBottom: 6 }}>
                  {post.title}
                </h3>
                <p style={{ fontSize: '0.8rem', color: isDark ? '#94A3B8' : '#64748B', fontWeight: 300 }}>
                  {post.excerpt}
                </p>
              </div>
              <ArrowUpRight size={18} style={{ color: isDark ? '#475569' : '#94A3B8', flexShrink: 0 }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
