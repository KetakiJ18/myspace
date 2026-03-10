import React from 'react';
import { motion } from 'framer-motion';

const navItems = [
  { name: 'about', label: 'About', position: [0, 0, 0] },
  { name: 'projects', label: 'Projects', position: [6, 2, -4] },
  { name: 'blog', label: 'Blog', position: [-5, 1, 2] },
  { name: 'hobbies', label: 'Stats', position: [4, -3, 3] },
  { name: 'music', label: 'Music', position: [-6, -2, -3] },
  { name: 'skills', label: 'Skills', position: [2, -15, 1] },
];

export function ConstellationNav({ activeObject, setActiveObject, isDark }) {
  return (
    <div 
      className="absolute right-8 top-1/2 z-40 pointer-events-auto"
      style={{ transform: 'translateY(-50%)' }}
    >
      <div className="flex flex-col items-center gap-1">
        {navItems.map((item, i) => (
          <React.Fragment key={item.name}>
            <motion.button
              whileHover={{ scale: 1.8 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveObject({ name: item.name, position: item.position })}
              style={{
                width: activeObject?.name === item.name ? 10 : 6,
                height: activeObject?.name === item.name ? 10 : 6,
                borderRadius: '50%',
                background: activeObject?.name === item.name
                  ? 'var(--accent-cyan)'
                  : isDark ? 'rgba(110,231,255,0.3)' : 'rgba(139,92,246,0.3)',
                border: 'none',
                cursor: 'pointer',
                boxShadow: activeObject?.name === item.name
                  ? '0 0 12px var(--accent-cyan)'
                  : 'none',
                transition: 'all 0.4s ease',
                padding: 0,
              }}
              title={item.label}
            />
            {i < navItems.length - 1 && (
              <div 
                style={{
                  width: 1,
                  height: 20,
                  background: `linear-gradient(180deg, transparent, ${isDark ? 'rgba(110,231,255,0.15)' : 'rgba(139,92,246,0.15)'}, transparent)`,
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
