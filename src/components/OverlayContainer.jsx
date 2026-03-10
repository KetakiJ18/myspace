import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Zap } from 'lucide-react';

const contentMap = {
  about: {
    title: "About Me",
    subtitle: "The Core Planet",
    content: "I'm a developer exploring the universe of code and creativity. Driven by curiosity, fueled by coffee, and always orbiting new ideas.",
    accent: '#6EE7FF',
  },
  projects: {
    title: "Projects Orbit",
    subtitle: "Technical Rockets",
    content: "Here are some of the technical rockets I've built — from AI-powered platforms to interactive web experiences.",
    accent: '#10B981',
  },
  blog: {
    title: "Coffee Break",
    subtitle: "Thoughts & Notes",
    content: "Thoughts, notes, and fuel for the mind. A space to reflect on tech, design, and the journey.",
    accent: '#F472B6',
  },
  hobbies: {
    title: "Stats Dashboard",
    subtitle: "Cricket Analytics",
    content: null,
    accent: '#EF4444',
    stats: [
      { label: 'Projects Completed', mapped: 'Runs Scored', value: '1200' },
      { label: 'Years Coding', mapped: 'Matches Played', value: '45' },
      { label: 'Major Achievements', mapped: 'Centuries', value: '2' },
    ],
  },
  music: {
    title: "Creative Side",
    subtitle: "Strumming Code & Chords",
    content: "Music and code share the same rhythm — patterns, loops, and the joy of creating something from nothing.",
    accent: '#F59E0B',
  },
  skills: {
    title: "Skills Playlist",
    subtitle: "Now Playing",
    content: null,
    accent: '#8B5CF6',
    tracks: [
      { name: 'React', duration: '∞', level: 90 },
      { name: 'Three.js', duration: '∞', level: 80 },
      { name: 'Python', duration: '∞', level: 85 },
      { name: 'Machine Learning', duration: '∞', level: 75 },
      { name: 'Tailwind CSS', duration: '∞', level: 95 },
      { name: 'Node.js', duration: '∞', level: 80 },
    ],
  },
};

export function OverlayContainer({ activeObject, setActiveObject, theme }) {
  if (!activeObject) return null;

  const data = contentMap[activeObject.name];
  const isDark = theme === 'dark';

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeObject.name}
        initial={{ opacity: 0, y: 40, scale: 0.95, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: 40, scale: 0.95, filter: 'blur(10px)' }}
        transition={{ duration: 0.6, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-lg mx-4"
      >
        <div
          className="glass-panel relative overflow-hidden"
          style={{
            padding: '2.5rem',
            background: isDark ? 'rgba(5, 7, 10, 0.75)' : 'rgba(255, 255, 255, 0.7)',
            border: `1px solid ${isDark ? 'rgba(110, 231, 255, 0.08)' : 'rgba(139, 92, 246, 0.12)'}`,
          }}
        >
          {/* Accent glow line at top */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: '10%',
            right: '10%',
            height: 1,
            background: `linear-gradient(90deg, transparent, ${data?.accent || '#6EE7FF'}, transparent)`,
            opacity: 0.6,
          }} />

          {/* Close button */}
          <button 
            onClick={() => setActiveObject(null)}
            className="btn-cosmic"
            style={{
              position: 'absolute',
              top: 16,
              right: 16,
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
              color: isDark ? '#94A3B8' : '#64748B',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
            }}
          >
            <X size={14} />
          </button>
          
          {/* Subtitle */}
          <p style={{
            fontSize: '0.65rem',
            letterSpacing: '0.25em',
            color: data?.accent || '#6EE7FF',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            marginBottom: 8,
            textTransform: 'uppercase',
          }}>
            {data?.subtitle}
          </p>

          {/* Title */}
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '2rem',
            fontWeight: 600,
            marginBottom: '1.25rem',
            lineHeight: 1.2,
            background: `linear-gradient(135deg, ${data?.accent || '#6EE7FF'}, #8B5CF6)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            {data?.title}
          </h2>
          
          {/* Content / Stats / Tracks */}
          {data?.content && (
            <p style={{
              fontSize: '0.95rem',
              lineHeight: 1.8,
              color: isDark ? '#CBD5E1' : '#475569',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
            }}>
              {data.content}
            </p>
          )}

          {/* Stats Dashboard */}
          {data?.stats && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {data.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.15 }}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 16px',
                    borderRadius: 12,
                    background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`,
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.75rem', color: isDark ? '#94A3B8' : '#64748B' }}>{stat.mapped}</span>
                    <br />
                    <span style={{ fontSize: '0.65rem', color: isDark ? '#475569' : '#94A3B8' }}>{stat.label}</span>
                  </div>
                  <span style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    fontFamily: "'Space Grotesk', sans-serif",
                    color: data.accent,
                  }}>
                    {stat.value}
                  </span>
                </motion.div>
              ))}
            </div>
          )}

          {/* Skills Tracks */}
          {data?.tracks && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {data.tracks.map((track, i) => (
                <motion.div
                  key={track.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '8px 12px',
                    borderRadius: 10,
                    background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`,
                  }}
                >
                  <Zap size={12} style={{ color: data.accent, opacity: 0.7 }} />
                  <span style={{ 
                    flex: 1, 
                    fontSize: '0.8rem', 
                    color: isDark ? '#E2E8F0' : '#1E293B',
                    fontFamily: "'Inter', sans-serif",
                  }}>
                    {track.name}
                  </span>
                  {/* Progress bar */}
                  <div style={{
                    width: 80,
                    height: 3,
                    borderRadius: 2,
                    background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
                    overflow: 'hidden',
                  }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${track.level}%` }}
                      transition={{ delay: 1 + i * 0.1, duration: 0.8, ease: 'easeOut' }}
                      style={{
                        height: '100%',
                        background: `linear-gradient(90deg, ${data.accent}, #8B5CF6)`,
                        borderRadius: 2,
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          
          {/* Footer */}
          <div style={{
            marginTop: '2rem',
            paddingTop: '1rem',
            borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.6rem',
            letterSpacing: '0.1em',
            color: isDark ? '#475569' : '#94A3B8',
            fontFamily: "'Inter', sans-serif",
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <MapPin size={10} />
              {activeObject.position.map(n => n.toFixed(1)).join(', ')}
            </span>
            <span style={{ color: data?.accent, opacity: 0.6 }}>● ACTIVE</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
