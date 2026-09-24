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
import FluidCursor from './components/FluidCursor';

function App() {
  const [theme, setTheme] = useState('light');
  const isDark = theme === 'dark';

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

return (
  <div className="app" data-theme={theme}>

    <FluidCursor />

    <div className="page-content">
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
    </div>

    {/* theme button */}

  </div>
);
}

export default App;