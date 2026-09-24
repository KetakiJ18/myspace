import React, { useState, useCallback } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroSection } from './components/Herosection';
import { AboutSection } from './components/Aboutsection';
import { ExperienceSection } from './components/Experiencesection';
import { ProjectsSection } from './components/Projectsection';
import { SkillsSection } from './components/Skillsection';
import { ResumeSection } from './components/Resumesection';
import { ContactSection } from './components/Contactsection';

function App() {
  const [theme, setTheme] = useState('light');
  const isDark = theme === 'dark';

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return (
    <div data-theme={theme} style={{ minHeight: '100vh' }}>
      <Navbar isDark={isDark} />

      <main>
        <HeroSection isDark={isDark} />
        <AboutSection isDark={isDark} />
        <ExperienceSection isDark={isDark} />
        <ProjectsSection isDark={isDark} />
        <SkillsSection isDark={isDark} />
        <ResumeSection isDark={isDark} />
        <ContactSection isDark={isDark} />
      </main>

      <Footer />

      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 50,
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--line)',
          color: 'var(--accent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </div>
  );
}

export default App;