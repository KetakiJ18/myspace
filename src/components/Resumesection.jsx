import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
};

// TODO: drop your resume PDF in /public and point this at it, e.g. "/resume.pdf"
const RESUME_PATH = '/resume.pdf';
const LAST_UPDATED = 'Sept 2026';

export function ResumeSection({ isDark }) {
  return (
    <section id="resume" style={{ padding: '7rem 2rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.p
          {...fade}
          className="mono"
          style={{ fontSize: '0.85rem', color: 'var(--accent)', marginBottom: 16 }}
        >
          Resume
        </motion.p>

        <motion.div
          {...fade}
          transition={{ ...fade.transition, delay: 0.1 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
            flexWrap: 'wrap',
            border: '1px solid var(--line)',
            borderRadius: 6,
            padding: '2rem 2.5rem',
            background: 'var(--bg-elevated)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 4,
                border: '1px solid var(--line)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent)',
                flexShrink: 0,
              }}
            >
              <FileText size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 600, fontFamily: "'Inter', sans-serif", color: 'var(--ink)', marginBottom: 2 }}>
                Ketaki Joshi — Resume
              </h3>
              <p className="mono" style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
                last updated {LAST_UPDATED}
              </p>
            </div>
          </div>

          <a href={RESUME_PATH} download className="btn-primary" style={{ textDecoration: 'none' }}>
            Download PDF <Download size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}