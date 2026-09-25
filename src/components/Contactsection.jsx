import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Github, Linkedin, CheckCircle, AlertCircle } from 'lucide-react';

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
};

const links = [
  {
    icon: Mail,
    label: 'joshiketaki101@gmail.com',
    href: 'mailto:joshiketaki101@gmail.com',
  },
  {
    icon: Github,
    label: 'github.com/KetakiJ18',
    href: 'https://github.com/KetakiJ18',
  },
  {
    icon: Linkedin,
    label: 'linkedin.com/in/ketaki-joshi',
    href: 'https://www.linkedin.com/in/ketaki-joshi-0b380b20a/',
  },
];

export function ContactSection({ isDark }) {
  const [focused, setFocused] = useState(null);
  const [status, setStatus] = useState('idle');

  const inputStyle = (field) => ({
    width: '100%',
    padding: '12px 14px',
    borderRadius: 4,
    fontSize: '0.9rem',
    fontFamily: "'Inter', sans-serif",
    background: 'var(--bg-elevated)',
    border: `1px solid ${
      focused === field ? 'var(--accent)' : 'var(--line)'
    }`,
    color: 'var(--ink)',
    outline: 'none',
    transition: 'border-color 0.25s ease',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (status === 'loading') return;

    setStatus('loading');

    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch(import.meta.env.VITE_FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" style={{ padding: '7rem 2rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        <motion.p
          {...fade}
          className="mono"
          style={{
            fontSize: '0.85rem',
            color: 'var(--accent)',
            marginBottom: 16,
          }}
        >
          Contact
        </motion.p>

        <motion.h2
          {...fade}
          style={{
            fontSize: 'clamp(1.8rem, 3.4vw, 2.4rem)',
            fontWeight: 500,
            color: 'var(--ink)',
            marginBottom: 16,
          }}
        >
          Let's talk
        </motion.h2>

        <motion.p
          {...fade}
          transition={{ ...fade.transition, delay: 0.05 }}
          style={{
            fontSize: '0.95rem',
            color: 'var(--ink-muted)',
            fontWeight: 300,
            marginBottom: 48,
            maxWidth: '50ch',
          }}
        >
          Open to internship and new-grad conversations. The fastest way to reach
          me is email — the form works too.
        </motion.p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(220px, 0.7fr)',
            gap: '3rem',
          }}
          className="contact-grid"
        >

          {/* FORM / STATUS */}
          <motion.div
            {...fade}
            transition={{ ...fade.transition, delay: 0.1 }}
          >

            {/* SUCCESS STATE */}
            {status === 'success' && (
              <div
                style={{
                  minHeight: 260,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  padding: '2rem',
                  border: '1px solid var(--line-soft)',
                  background: 'var(--surface-subtle)',
                }}
              >
                <CheckCircle
                  size={28}
                  style={{
                    color: 'var(--accent)',
                    marginBottom: 20,
                  }}
                />

                <h3
                  style={{
                    fontSize: '1.35rem',
                    fontWeight: 500,
                    color: 'var(--ink)',
                    marginBottom: 10,
                  }}
                >
                  Message sent.
                </h3>

                <p
                  style={{
                    color: 'var(--ink-muted)',
                    fontSize: '0.9rem',
                    lineHeight: 1.7,
                    maxWidth: '42ch',
                    margin: 0,
                  }}
                >
                  Thanks for reaching out. I'll get back to you as soon as I can.
                </p>

                <button
                  onClick={() => setStatus('idle')}
                  className="btn-secondary"
                  style={{
                    marginTop: 24,
                  }}
                >
                  Send another message
                </button>
              </div>
            )}

            {/* FORM */}
            {status !== 'success' && (
              <form onSubmit={handleSubmit}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 14,
                  }}
                >
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    required
                    style={inputStyle('name')}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    required
                    style={inputStyle('email')}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                  />

                  <textarea
                    name="message"
                    placeholder="Your message"
                    rows={4}
                    required
                    style={{
                      ...inputStyle('msg'),
                      resize: 'none',
                    }}
                    onFocus={() => setFocused('msg')}
                    onBlur={() => setFocused(null)}
                  />

                  {/* ERROR MESSAGE */}
                  {status === 'error' && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 9,
                        padding: '12px 14px',
                        border: '1px solid var(--line)',
                        background: 'var(--surface-subtle)',
                        color: 'var(--ink-muted)',
                        fontSize: '0.85rem',
                        lineHeight: 1.5,
                      }}
                    >
                      <AlertCircle
                        size={16}
                        style={{
                          color: 'var(--accent-warm)',
                          flexShrink: 0,
                          marginTop: 2,
                        }}
                      />

                      <span>
                        Something went wrong while sending your message.
                        Please try again or email me directly.
                      </span>
                    </div>
                  )}

                  <button 
                    type="submit"
                    className="btn-primary"
                    disabled={status === 'loading'}
                    style={{
                      alignSelf: 'flex-start',
                      opacity: status === 'loading' ? 0.7 : 1,
                      cursor:
                        status === 'loading' ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {status === 'loading' ? (
                      <>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send message
                        <Send size={16} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>

          {/* CONTACT LINKS */}
          <motion.div
            {...fade}
            transition={{ ...fade.transition, delay: 0.15 }}
          >
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
                <link.icon
                  size={16}
                  style={{
                    color: 'var(--accent)',
                    flexShrink: 0,
                  }}
                />

                {link.label}
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}