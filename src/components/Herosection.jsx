import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

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
        className="hero-content"
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '5rem',
        }}
      >

        {/* ── Text column ───────────────────────────── */}
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          style={{
            flex: 1,
          }}
        >
          <p
            className="mono"
            style={{
              fontSize: '0.85rem',
              color: 'var(--accent)',
              marginBottom: 20,
            }}
          >
            Open to internships & New-grad roles
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
            I'm a computer science student who works across machine learning,
            data analysis and web development. I like taking a project from a
            rough idea to something people can actually use.
          </p>

          <div
            style={{
              display: 'flex',
              gap: 14,
              flexWrap: 'wrap',
            }}
          >
            <a
              href="#resume"
              className="btn-primary"
              style={{ textDecoration: 'none' }}
            >
              View resume
            </a>

            <a
              href="#contact"
              className="btn-secondary"
              style={{ textDecoration: 'none' }}
            >
              Get in touch
            </a>
          </div>
        </motion.div>


        {/* ── Image column ──────────────────────────── */}
        <motion.div
          className="hero-image"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: 0.2,
            duration: 0.9,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          <img
            src="/Ketaki_Joshi_Photo.jpeg"
            alt="Ketaki Joshi"
          />
        </motion.div>

      </div>


      {/* ── Scroll indicator ───────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <ArrowDown
          size={16}
          style={{
            color: 'var(--ink-muted)',
            opacity: 0.5,
          }}
        />
      </motion.div>

    </section>
  );
}