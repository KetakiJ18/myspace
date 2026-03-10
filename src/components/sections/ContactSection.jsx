import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, User, MessageSquare } from 'lucide-react';

const fade = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-80px' } };

export function ContactSection({ isDark }) {
  const [focused, setFocused] = useState(null);

  const glass = {
    background: isDark ? 'rgba(5,7,10,0.5)' : 'rgba(255,255,255,0.5)',
    backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
    border: `1px solid ${isDark ? 'rgba(110,231,255,0.06)' : 'rgba(139,92,246,0.1)'}`,
    borderRadius: 20,
  };

  const inputStyle = (field) => ({
    width: '100%', padding: '14px 16px', paddingLeft: 44,
    borderRadius: 12, fontSize: '0.85rem', fontFamily: "'Inter'",
    background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
    border: `1px solid ${focused === field ? (isDark ? '#6EE7FF40' : '#8B5CF640') : (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)')}`,
    color: isDark ? '#E2E8F0' : '#1E293B', outline: 'none',
    transition: 'all 0.3s ease',
    boxShadow: focused === field ? `0 0 16px ${isDark ? 'rgba(110,231,255,0.06)' : 'rgba(139,92,246,0.06)'}` : 'none',
  });

  return (
    <section id="contact" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 2rem' }}>
      <div style={{ maxWidth: 600, width: '100%' }}>
        <motion.div {...fade} transition={{ duration: 0.7 }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.3em', color: '#6EE7FF', fontFamily: "'Inter'", fontWeight: 500, marginBottom: 12 }}>
            06 — CONTACT
          </p>
          <h2 style={{ fontFamily: "'Space Grotesk'", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, color: isDark ? '#E2E8F0' : '#1E293B', marginBottom: 16, lineHeight: 1.15 }}>
            Let's <span className="text-gradient-cyan">connect</span>
          </h2>
          <p style={{ fontSize: '0.9rem', color: isDark ? '#94A3B8' : '#64748B', fontWeight: 300, marginBottom: 40, lineHeight: 1.7 }}>
            Have a project in mind? Want to collaborate? Send a signal through the cosmos.
          </p>
        </motion.div>

        <motion.form {...fade} transition={{ duration: 0.7, delay: 0.15 }} style={{ ...glass, padding: '2.5rem' }} onSubmit={e => e.preventDefault()}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {/* Name */}
            <div style={{ position: 'relative' }}>
              <User size={16} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: isDark ? '#475569' : '#94A3B8' }} />
              <input placeholder="Your name" style={inputStyle('name')} onFocus={() => setFocused('name')} onBlur={() => setFocused(null)} />
            </div>

            {/* Email */}
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: isDark ? '#475569' : '#94A3B8' }} />
              <input type="email" placeholder="Your email" style={inputStyle('email')} onFocus={() => setFocused('email')} onBlur={() => setFocused(null)} />
            </div>

            {/* Message */}
            <div style={{ position: 'relative' }}>
              <MessageSquare size={16} style={{ position: 'absolute', left: 16, top: 18, color: isDark ? '#475569' : '#94A3B8' }} />
              <textarea 
                placeholder="Your message" rows={4}
                style={{ ...inputStyle('msg'), resize: 'none', paddingTop: 14 }}
                onFocus={() => setFocused('msg')} onBlur={() => setFocused(null)}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 24px rgba(110,231,255,0.12)' }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              style={{
                padding: '14px 28px', borderRadius: 12,
                background: 'linear-gradient(135deg, #6EE7FF, #8B5CF6)',
                color: '#05070A', fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: '0.85rem',
                border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                letterSpacing: '0.05em',
              }}
            >
              Send Signal <Send size={16} />
            </motion.button>
          </div>
        </motion.form>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: 60, paddingBottom: 40 }}>
          <p style={{ fontSize: '0.65rem', color: isDark ? '#334155' : '#CBD5E1', letterSpacing: '0.15em' }}>
            © 2026 — Built with React, Three.js, and ☕
          </p>
        </div>
      </div>
    </section>
  );
}
