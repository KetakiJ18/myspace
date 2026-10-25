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
    title: 'Aether',
    description:
      'An AI-based multi-sensor satellite imaging pipeline for enhancing low-resolution thermal imagery using high-resolution optical data. The system combines dual-stream processing, cross-modal attention, physics-guided constraints, automatic geo-alignment, and land-cover integration to produce higher-resolution thermal maps while preserving temperature fidelity. Includes thermal anomaly detection and analytics for urban heat mapping, wildfire monitoring, and agricultural applications.',
    tags: ['Python', 'ResNet', 'CNN', 'Leaflet', 'Typescript', 'Streamlit'],

    // GitHub
    href: 'https://github.com/KetakiJ18/thermal_imagery_ps2',
    githubLabel: 'GitHub',

    // Project image
    image: '/images/aether.png',

    // Live model
    liveHref: 'https://aether-ps2-feature1.streamlit.app/',
    liveLabel: 'Live Model',

    // Optional frontend
    frontendHref: 'https://aether-blond.vercel.app/',
    frontendLabel: 'Frontend',
  },

  {
    title: 'MediGuardAI',
    description:
      'MediGuard leverages agentic AI to process patient data, validate and scale clinical features, predict health risks with CatBoost, generate health scores, and securely log analyses on a blockchain for traceability.',
    tags: ['Python', 'TypeScript', 'CatBoost'],
    href: 'https://github.com/KetakiJ18/MediGuard',
    githubLabel: 'GitHub',

    // Optional:
    image: 'images/mediguard.png',
    liveHref: 'https://reimagined-goggles-1.onrender.com/',
    // liveLabel: 'Live Demo',
  },

  {
    title: 'Maven Market Analytics Dashboard',
    description:
      'A comprehensive, end-to-end business intelligence solution built in Power BI Desktop for Maven Market, a multi-national retail corporation. This dashboard transforms raw data across transactions, returns, stores, customers, and products into actionable insights regarding store performance, product profitability, and regional growth.',
    tags: ['Power BI'],
    href: 'https://github.com/KetakiJ18/maven_market',
    githubLabel: 'GitHub',

    // Optional:
    image: 'images/maven.png',
    // liveHref: '...',
    // liveLabel: 'Live Demo',
  },

  {
    title: 'VARSA',
    description:
      'An offline assistant for file search and routine task automation on a local machine, no cloud round-trip required.',
    tags: ['Python', 'NLP'],
    href: 'https://github.com/KetakiJ18/VARSA',
    githubLabel: 'GitHub',

    // Optional:
    image: 'images/VARSA_Logo.ico',
    // liveHref: '...',
    // liveLabel: 'Live Demo',
  },

  {
    title: 'FinSight',
    description:
      'An AI Financial Analyst Assistant that processes financial CSVs (P&L, Balance Sheets, Cash Flow), calculates key financial metrics, and generates natural-language insights via an Agentic AI pipeline.',
    tags: ['Python', 'LLM agents', 'JS'],
    href: 'https://github.com/KetakiJ18/FinSight',
    githubLabel: 'GitHub',

    // Add these later if relevant:
    // image: '/images/finsight.png',
    // liveHref: '...',
    // liveLabel: 'Live Demo',
    // frontendHref: '...',
    // frontendLabel: 'Frontend',
  },

  {
    title: 'Dexora',
    description:
      'An interactive, gesture-based system, that turns your webcam into an interactive ASL learning buddy using OpenCV + MediaPipe + Machine Learning.',
    tags: ['Python', 'OpenCV', 'MediaPipe'],
    href: 'https://github.com/KetakiJ18/dexora',
    githubLabel: 'GitHub',

    // Optional:
    // image: '/images/dexora.png',
    // liveHref: '...',
    // liveLabel: 'Live Demo',
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

        <div>
          {projects.map((proj, i) => (
            <motion.div
              key={proj.title}
              {...fade}
              transition={{
                ...fade.transition,
                delay: 0.1 + i * 0.06,
              }}
              className="row-divider"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 32,
                padding: '1.75rem 0',
              }}
            >

              {/* LEFT — Project information */}
              <div style={{ flex: 1, minWidth: 0 }}>

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

                {/* Tags */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 10,
                    marginBottom: 14,
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

                {/* Links */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 16,
                    alignItems: 'center',
                  }}
                >

                  {/* GitHub */}
                  {proj.href && (
                    <a
                      href={proj.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--ink-muted)',
                        textDecoration: 'none',
                      }}
                    >
                      {proj.githubLabel || 'GitHub'} ↗
                    </a>
                  )}

                  {/* Live Model / Demo */}
                  {proj.liveHref && (
                    <a
                      href={proj.liveHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--ink-muted)',
                        textDecoration: 'none',
                      }}
                    >
                      {proj.liveLabel || 'Live Demo'} ↗
                    </a>
                  )}

                  {/* Frontend */}
                  {proj.frontendHref && (
                    <a
                      href={proj.frontendHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--ink-muted)',
                        textDecoration: 'none',
                      }}
                    >
                      {proj.frontendLabel || 'Frontend'} ↗
                    </a>
                  )}

                </div>
              </div>

              {/* RIGHT — Project image */}
              {proj.image && (
                <a
                  href={proj.liveHref || proj.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    width: 400,
                    flexShrink: 0,
                    overflow: 'hidden',
                    borderRadius: 10,
                    textDecoration: 'none',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.04)';
                    e.currentTarget.style.boxShadow =
                      '0 12px 30px rgba(0, 0, 0, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <img
                    src={proj.image}
                    alt={`${proj.title} preview`}
                    style={{
                      display: 'block',
                      width: '100%',
                      aspectRatio: '16 / 10',
                      objectFit: 'cover',
                    }}
                  />
                </a>
              )}

              {/* Arrow — only when there is no image */}
              {!proj.image && (
                <a
                  href={proj.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexShrink: 0,
                  }}
                >
                  <ArrowUpRight
                    size={18}
                    style={{
                      color: 'var(--ink-muted)',
                    }}
                  />
                </a>
              )}

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}