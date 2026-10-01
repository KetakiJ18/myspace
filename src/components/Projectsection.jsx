import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: {
    duration: 0.6,
    ease: [0.4, 0, 0.2, 1],
  },
};

const projects = [
  {
    title: 'FinSight',
    description:
      'An agentic financial-analytics dashboard that pulls KPIs out of raw statements, flags risk, and drafts the executive summary instead of a human doing it by hand.',
    tags: ['Python', 'LLM agents', 'JS'],
    href: 'https://github.com/KetakiJ18/FinSight',
  },
  {
    title: 'Dexora',
    description:
      'An interactive, gesture-based ASL learning buddy. Sign away.',
    tags: ['Python', 'OpenCV', 'MediaPipe'],
    href: 'https://github.com/KetakiJ18/dexora',
  },
  {
    title: 'VARSA',
    description:
      'An offline assistant for file search and routine task automation on a local machine, no cloud round-trip required.',
    tags: ['Python', 'NLP'],
    href: 'https://github.com/KetakiJ18/VARSA',
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" style={{ padding: '7rem 2rem' }}>
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
          Projects
        </motion.p>

        <motion.h2
          {...fade}
          style={{
            fontSize: 'clamp(1.8rem, 3.4vw, 2.4rem)',
            fontWeight: 500,
            color: 'var(--ink)',
            marginBottom: 48,
          }}
        >
          Things I've built
        </motion.h2>

        {/* Projects */}
        <div>
          {projects.map((proj, i) => (
            <motion.a
              key={proj.title}
              {...fade}
              transition={{
                ...fade.transition,
                delay: 0.1 + i * 0.06,
              }}
              href={proj.href}
              target="_blank"
              rel="noopener noreferrer"
              className="row-divider"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 20,
                padding: '1.75rem 0',
                textDecoration: 'none',
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    fontFamily: "'Inter', sans-serif",
                    color: 'var(--ink)',
                    marginBottom: 8,
                  }}
                >
                  {proj.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.88rem',
                    lineHeight: 1.6,
                    color: 'var(--ink-muted)',
                    fontWeight: 300,
                    maxWidth: '60ch',
                    marginBottom: 10,
                  }}
                >
                  {proj.description}
                </p>

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 10,
                  }}
                >
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      className="mono"
                      style={{
                        fontSize: '0.68rem',
                        color: 'var(--ink-muted)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <ArrowUpRight
                size={18}
                style={{
                  color: 'var(--ink-muted)',
                  flexShrink: 0,
                }}
              />
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}