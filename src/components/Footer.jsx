import React from 'react';

export function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer style={{ padding: '2.5rem 2rem', borderTop: '1px solid var(--line-soft)' }}>
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <p className="mono" style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
          © 2026 Ketaki Joshi
        </p>
        <button
          onClick={scrollTop}
          className="mono"
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.75rem', color: 'var(--ink-muted)' }}
        >
          back to top
        </button>
      </div>
    </footer>
  );
}