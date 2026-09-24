import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Github, Linkedin } from 'lucide-react';

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
};

// TODO: point these at your real accounts
const links = [
  { icon: Mail, label: 'joshiketaki101@gmail.com', href: 'joshiketaki101@gmail.com' },
  { icon: Github, label: 'github.com/KetakiJ18', href: 'https://github.com/KetakiJ18'},
  { icon: Linkedin, label: 'linkedin.com/in/ketaki-joshi', href: 'https://www.linkedin.com/in/ketaki-joshi-0b380b20a/' },
];

export function ContactSection({ isDark }) {
  const [focused, setFocused] = useState(null);

  const inputStyle = (field) => ({
    width: '100%',
    padding: '12px 14px',
    borderRadius: 4,
    fontSize: '0.9rem',
    fontFamily: "'Inter', sans-serif",
    background: 'var(--bg-elevated)',
    border: `1px solid ${focused === field ? 'var(--accent)' : 'var(--line)'}`,
    color: 'var(--ink)',
    outline: 'none',
    transition: 'border-color 0.25s ease',
  });

  return (
    <section id="contact" style={{ padding: '7rem 2rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.p {...fade} className="mono" style={{ fontSize: '0.85rem', color: 'var(--accent)', marginBottom: 16 }}>
          Contact
        </motion.p>
        <motion.h2
          {...fade}
          style={{ fontSize: 'clamp(1.8rem, 3.4vw, 2.4rem)', fontWeight: 500, color: 'var(--ink)', marginBottom: 16 }}
        >
          Let's talk
        </motion.h2>
        <motion.p
          {...fade}
          transition={{ ...fade.transition, delay: 0.05 }}
          style={{ fontSize: '0.95rem', color: 'var(--ink-muted)', fontWeight: 300, marginBottom: 48, maxWidth: '50ch' }}
        >
          Open to internship and new-grad conversations. The fastest way to reach
          me is email — the form works too.
        </motion.p>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(220px, 0.7fr)', gap: '3rem' }} className="contact-grid">
          <motion.form
            {...fade}
            transition={{ ...fade.transition, delay: 0.1 }}
            onSubmit={(e) => e.preventDefault()}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <input
                placeholder="Your name"
                style={inputStyle('name')}
                onFocus={() => setFocused('name')}
                onBlur={() => setFocused(null)}
              />
              <input
                type="email"
                placeholder="Your email"
                style={inputStyle('email')}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
              />
              <textarea
                placeholder="Your message"
                rows={4}
                style={{ ...inputStyle('msg'), resize: 'none' }}
                onFocus={() => setFocused('msg')}
                onBlur={() => setFocused(null)}
              />
              <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>
                Send message <Send size={16} />
              </button>
            </div>
          </motion.form>

          <motion.div {...fade} transition={{ ...fade.transition, delay: 0.15 }}>
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="row-divider"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '14px 0',
                  textDecoration: 'none',
                  color: 'var(--ink-muted)',
                  fontSize: '0.88rem',
                }}
              >
                <link.icon size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                {link.label}
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}