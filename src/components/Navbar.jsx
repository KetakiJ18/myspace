import React, { useState, useEffect } from 'react';

const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar({ isDark }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        transition: 'background 0.4s ease, border-color 0.4s ease',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        background: scrolled ? 'color-mix(in srgb, var(--bg) 85%, transparent)' : 'transparent',
        borderBottom: `1px solid ${scrolled ? 'var(--line)' : 'transparent'}`,
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '0 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 64,
        }}
      >
        <button
          onClick={() => scrollTo('hero')}
          className="mono"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.95rem',
            fontWeight: 500,
            color: 'var(--accent)',
            letterSpacing: '0.02em',
          }}
        >
          [KJ]
        </button>

        <div style={{ display: 'flex', gap: 28 }}>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="nav-link"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px 0',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.85rem',
                fontWeight: 400,
                color: 'var(--ink-muted)',
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}