import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export function HeroSection({ isDark }) {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem',
        position: 'relative',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
      >
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.7rem',
          letterSpacing: '0.35em',
          color: isDark ? '#6EE7FF' : '#7C3AED',
          marginBottom: 16,
          fontWeight: 500,
          textTransform: 'uppercase',
        }}>
          WELCOME TO MY UNIVERSE
        </p>

        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
          fontWeight: 600,
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
          marginBottom: 24,
          background: isDark
            ? 'linear-gradient(135deg, #fff 0%, #6EE7FF 50%, #8B5CF6 100%)'
            : 'linear-gradient(135deg, #1E293B 0%, #7C3AED 50%, #0EA5E9 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          Hello there!<br/>I am Ketaki Joshi
        </h1>

        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
          color: isDark ? '#94A3B8' : '#64748B',
          fontWeight: 300,
          maxWidth: 500,
          lineHeight: 1.7,
          margin: '0 auto',
        }}>
          Building at the intersection of technology and creativity.
          Scroll to explore my universe.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="scroll-indicator"
        style={{ position: 'absolute', bottom: 48 }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: '0.6rem', letterSpacing: '0.3em', color: isDark ? '#475569' : '#94A3B8' }}>
            SCROLL
          </span>
          <ChevronDown size={16} style={{ color: isDark ? '#6EE7FF' : '#8B5CF6', opacity: 0.4 }} />
        </div>
      </motion.div>
    </section>
  );
}
