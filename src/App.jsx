import React, { Suspense, useState, useCallback, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars, Sparkles } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { Scene } from './components/Scene';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { HobbiesSection } from './components/sections/HobbiesSection';
import { BlogSection } from './components/sections/BlogSection';
import { ContactSection } from './components/sections/ContactSection';
import { Navbar } from './components/Navbar';
import { Moon, Sun } from 'lucide-react';

function App() {
  const [theme, setTheme] = useState('dark');
  const [scrollY, setScrollY] = useState(0);
  const scrollRef = useRef(null);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  const isDark = theme === 'dark';

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const handleScroll = () => {
      setScrollY(container.scrollTop / (container.scrollHeight - container.clientHeight));
    };
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="w-full h-screen relative overflow-hidden"
      data-theme={theme}
      style={{
        background: isDark
          ? 'radial-gradient(ellipse at 50% 0%, #0B0F1A 0%, #05070A 70%)'
          : 'linear-gradient(180deg, #E9F1FF 0%, #F5EFFF 100%)',
        fontFamily: "'Inter', sans-serif",
        transition: 'background 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >

      {/* ═══ 3D Canvas — Fixed Background ═══ */}
      <div className="fixed inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 15], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <color attach="background" args={[isDark ? '#05070A' : '#E9F1FF']} />

          <ambientLight intensity={isDark ? 0.15 : 0.5} />
          <directionalLight position={[10, 10, 5]} intensity={isDark ? 0.8 : 1.5} color={isDark ? '#6EE7FF' : '#fef08a'} />
          <pointLight position={[-10, 5, -10]} intensity={0.3} color="#8B5CF6" />
          <pointLight position={[5, -10, 10]} intensity={0.2} color="#F472B6" />
          <spotLight position={[0, 20, 0]} angle={0.5} penumbra={1} intensity={isDark ? 0.4 : 0.2} color={isDark ? '#6EE7FF' : '#a78bfa'} />

          <Suspense fallback={null}>
            {isDark && (
              <>
                <Stars radius={200} depth={80} count={6000} factor={3} saturation={0.1} fade speed={0.5} />
                <Stars radius={50} depth={20} count={800} factor={6} saturation={0} fade speed={0.3} />
              </>
            )}
            <Sparkles count={200} scale={30} size={isDark ? 1.5 : 1} speed={0.2} opacity={isDark ? 0.12 : 0.25} color={isDark ? '#6EE7FF' : '#8B5CF6'} />
            <Sparkles count={80} scale={15} size={3} speed={0.1} opacity={0.04} color="#F472B6" />

            <Scene theme={theme} scrollProgress={scrollY} />
          </Suspense>

          <EffectComposer>
            <Bloom luminanceThreshold={0.6} luminanceSmoothing={0.9} intensity={isDark ? 0.7 : 0.25} radius={0.8} />
            <Vignette eskil={false} offset={0.1} darkness={isDark ? 0.7 : 0.25} />
          </EffectComposer>
        </Canvas>
      </div>

      {/* ═══ Scrollable DOM Content ═══ */}
      <div
        ref={scrollRef}
        id="scroll-container"
        className="relative z-10 h-screen overflow-y-auto"
        style={{ scrollBehavior: 'smooth' }}
      >
        <HeroSection isDark={isDark} />
        <AboutSection isDark={isDark} />
        <ProjectsSection isDark={isDark} />
        <SkillsSection isDark={isDark} />
        <HobbiesSection isDark={isDark} />
        <BlogSection isDark={isDark} />
        <ContactSection isDark={isDark} />
      </div>

      {/* ═══ Fixed UI ═══ */}
      <Navbar isDark={isDark} scrollRef={scrollRef} />

      {/* Theme Toggle */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={toggleTheme}
          className="btn-cosmic"
          style={{
            width: 48, height: 48, borderRadius: '50%',
            backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
            background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.7)',
            border: `1px solid ${isDark ? 'rgba(110,231,255,0.12)' : 'rgba(139,92,246,0.15)'}`,
            color: isDark ? '#6EE7FF' : '#7C3AED',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            boxShadow: isDark ? '0 0 20px rgba(110,231,255,0.08)' : '0 0 20px rgba(139,92,246,0.08)',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </div>
  );
}

export default App;
