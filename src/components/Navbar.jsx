import React, { useState, useEffect } from 'react';

const navLinks = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'hobbies', label: 'Hobbies' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar({ isDark, scrollRef }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const container = scrollRef?.current;
    if (!container) return;
    const handler = () => setScrolled(container.scrollTop > 100);
    container.addEventListener('scroll', handler, { passive: true });
    return () => container.removeEventListener('scroll', handler);
  }, [scrollRef]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
      style={{
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
        background: scrolled
          ? (isDark ? 'rgba(5,7,10,0.6)' : 'rgba(255,255,255,0.5)')
          : 'transparent',
        borderBottom: scrolled
          ? `1px solid ${isDark ? 'rgba(110,231,255,0.06)' : 'rgba(139,92,246,0.08)'}`
          : '1px solid transparent',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>

        {/* Logo */}
        <button onClick={() => scrollTo('hero')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            background: `linear-gradient(135deg, #6EE7FF, #8B5CF6)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 700, color: '#05070A',
            fontFamily: "'Space Grotesk', sans-serif",
          }}>
            K
          </div>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 500,
            fontSize: '0.9rem',
            color: isDark ? '#E2E8F0' : '#1E293B',
            letterSpacing: '0.05em',
          }}>
            Portfolio
          </span>
        </button>

        {/* Links */}
        <div style={{ display: 'flex', gap: 8 }}>
          {navLinks.slice(1).map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="btn-cosmic"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '6px 14px',
                borderRadius: 8,
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.72rem',
                fontWeight: 400,
                letterSpacing: '0.06em',
                color: isDark ? '#94A3B8' : '#64748B',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => { e.target.style.color = isDark ? '#6EE7FF' : '#7C3AED'; e.target.style.background = isDark ? 'rgba(110,231,255,0.06)' : 'rgba(139,92,246,0.06)'; }}
              onMouseLeave={e => { e.target.style.color = isDark ? '#94A3B8' : '#64748B'; e.target.style.background = 'none'; }}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
