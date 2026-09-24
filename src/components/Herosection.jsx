import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { HeroScene } from './Heroscene';

// TODO: replace with your real name, role line, and summary
export function HeroSection({ isDark }) {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '7rem 2rem 4rem',
        position: 'relative',
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.15fr) minmax(280px, 0.85fr)',
          gap: '3rem',
          alignItems: 'center',
        }}
        className="hero-grid"
      >
        {/* Text column */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <p className="mono" style={{ fontSize: '0.85rem', color: 'var(--accent)', marginBottom: 20 }}>
            open to internships & new-grad roles — 2027
          </p>

          <h1
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
              fontWeight: 500,
              lineHeight: 1.08,
              color: 'var(--ink)',
              marginBottom: 8,
            }}
          >
            Ketaki Joshi
          </h1>
          <h2
            style={{
              fontSize: 'clamp(1.3rem, 2.6vw, 1.8rem)',
              fontWeight: 400,
              lineHeight: 1.3,
              color: 'var(--ink-muted)',
              marginBottom: 28,
              maxWidth: '20ch',
            }}
          >
            Software engineer building AI-powered products
          </h2>

          <p
            style={{
              fontSize: '1rem',
              lineHeight: 1.75,
              color: 'var(--ink-muted)',
              fontWeight: 300,
              maxWidth: '52ch',
              marginBottom: 36,
            }}
          >
            I'm a computer science student who works across machine learning, web
            development, and data — most recently building an agentic analytics
            dashboard and a multimodal mood-analysis platform. I like taking a
            project from a rough idea to something people can actually use.
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a href="#resume" className="btn-primary" style={{ textDecoration: 'none' }}>
              View resume
            </a>
            <a href="#contact" className="btn-secondary" style={{ textDecoration: 'none' }}>
              Get in touch
            </a>
          </div>
        </motion.div>

        {/* Interactive 3D column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
        >
          <div
            style={{
              aspectRatio: '1 / 1',
              border: '1px solid var(--line)',
              borderRadius: 6,
              overflow: 'hidden',
              background: 'var(--bg-elevated)',
            }}
          >
            <Suspense fallback={null}>
              <HeroScene isDark={isDark} />
            </Suspense>
          </div>
          <p
            className="mono"
            style={{
              textAlign: 'center',
              fontSize: '0.7rem',
              color: 'var(--ink-muted)',
              marginTop: 10,
              letterSpacing: '0.02em',
            }}
          >
            move to tilt · hold to compile
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)' }}
      >
        <ArrowDown size={16} style={{ color: 'var(--ink-muted)', opacity: 0.5 }} />
      </motion.div>

      <style>{`
        @media (max-width: 820px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}