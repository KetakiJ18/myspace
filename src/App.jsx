import React, { Suspense, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars, Sparkles, OrbitControls, ScrollControls, Float, Environment } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { Scene } from './components/Scene';
import { CameraController } from './components/CameraController';
import { OverlayContainer } from './components/OverlayContainer';
import { ConstellationNav } from './components/ConstellationNav';
import { Moon, Sun, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [activeObject, setActiveObject] = useState(null);
  const [theme, setTheme] = useState('dark');

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  const isDark = theme === 'dark';

  return (
    <div 
      className="w-full h-screen relative overflow-hidden"
      data-theme={theme}
      style={{ 
        background: isDark 
          ? 'radial-gradient(ellipse at 50% 0%, #0B0F1A 0%, #05070A 70%)' 
          : 'linear-gradient(180deg, #E9F1FF 0%, #F5EFFF 100%)',
        fontFamily: "'Inter', sans-serif",
        transition: 'background 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      
      {/* ═══ 3D Canvas Layer ═══ */}
      <Canvas 
        camera={{ position: [0, 0, 15], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={[isDark ? '#05070A' : '#E9F1FF']} />
        
        {/* Cinematic Lighting Rig */}
        <ambientLight intensity={isDark ? 0.15 : 0.5} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={isDark ? 0.8 : 1.5} 
          color={isDark ? '#6EE7FF' : '#fef08a'} 
        />
        <pointLight position={[-10, 5, -10]} intensity={0.3} color="#8B5CF6" />
        <pointLight position={[5, -10, 10]} intensity={0.2} color="#F472B6" />
        
        {/* Subtle rim light for depth */}
        <spotLight
          position={[0, 20, 0]}
          angle={0.5}
          penumbra={1}
          intensity={isDark ? 0.4 : 0.2}
          color={isDark ? '#6EE7FF' : '#a78bfa'}
        />
        
        <CameraController activeObject={activeObject} />
        
        <Suspense fallback={null}>
          {/* Starfield */}
          {isDark && (
            <>
              <Stars radius={200} depth={80} count={8000} factor={3} saturation={0.1} fade speed={0.5} />
              <Stars radius={50} depth={20} count={1000} factor={6} saturation={0} fade speed={0.3} />
            </>
          )}
          
          {/* Ambient Sparkles */}
          <Sparkles 
            count={300} 
            scale={30} 
            size={isDark ? 1.5 : 1} 
            speed={0.2} 
            opacity={isDark ? 0.15 : 0.3} 
            color={isDark ? '#6EE7FF' : '#8B5CF6'} 
          />
          <Sparkles 
            count={100} 
            scale={15} 
            size={3} 
            speed={0.1} 
            opacity={0.05} 
            color="#F472B6" 
          />
          
          {/* Scene with Scroll */}
          <ScrollControls pages={3} damping={0.25}>
            <Scene activeObject={activeObject} setActiveObject={setActiveObject} theme={theme} />
          </ScrollControls>
        </Suspense>
        
        {/* Post-processing */}
        <EffectComposer>
          <Bloom 
            luminanceThreshold={0.6} 
            luminanceSmoothing={0.9} 
            intensity={isDark ? 0.8 : 0.3} 
            radius={0.8}
          />
          <Vignette eskil={false} offset={0.1} darkness={isDark ? 0.8 : 0.3} />
        </EffectComposer>
        
        {/* Orbit Controls */}
        {!activeObject && (
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate 
            autoRotateSpeed={0.3}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
          />
        )}
      </Canvas>

      {/* ═══ 2D UI Overlay Layer ═══ */}
      <div className="absolute inset-0 pointer-events-none">
        
        {/* ── Landing Title ── */}
        <AnimatePresence>
          {!activeObject && (
            <motion.div 
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              className="absolute top-12 left-1/2 text-center z-10"
              style={{ transform: 'translateX(-50%)' }}
            >
              <h1 
                className="text-gradient-cyan animate-pulse-glow"
                style={{ 
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 'clamp(1.5rem, 4vw, 3rem)',
                  fontWeight: 300,
                  letterSpacing: '0.3em',
                  lineHeight: 1.2,
                  marginBottom: '0.75rem'
                }}
              >
                EXPLORE THE UNIVERSE
              </h1>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.75rem',
                letterSpacing: '0.4em',
                color: isDark ? '#94A3B8' : '#64748B',
                fontWeight: 300,
              }}>
                CLICK ON AN OBJECT TO NAVIGATE
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Scroll Indicator ── */}
        <AnimatePresence>
          {!activeObject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 2, duration: 1 }}
              className="absolute bottom-16 left-1/2 scroll-indicator z-10"
              style={{ transform: 'translateX(-50%)' }}
            >
              <div className="flex flex-col items-center gap-2">
                <span style={{ 
                  fontSize: '0.6rem', 
                  letterSpacing: '0.3em', 
                  color: isDark ? '#475569' : '#94A3B8',
                  fontFamily: "'Inter', sans-serif",
                }}>
                  SCROLL TO EXPLORE
                </span>
                <ChevronDown size={16} style={{ color: isDark ? '#6EE7FF' : '#8B5CF6', opacity: 0.5 }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Constellation Navigation ── */}
        <ConstellationNav activeObject={activeObject} setActiveObject={setActiveObject} isDark={isDark} />

        {/* ── Theme Toggle ── */}
        <div className="absolute bottom-8 right-8 z-50 pointer-events-auto">
          <button 
            onClick={toggleTheme}
            className="btn-cosmic"
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.7)',
              border: `1px solid ${isDark ? 'rgba(110,231,255,0.15)' : 'rgba(139,92,246,0.2)'}`,
              color: isDark ? '#6EE7FF' : '#7C3AED',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: isDark 
                ? '0 0 20px rgba(110,231,255,0.1)' 
                : '0 0 20px rgba(139,92,246,0.1)',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* ── Content Overlay ── */}
        <div className={`flex items-center justify-center w-full h-full ${activeObject ? 'pointer-events-auto' : 'pointer-events-none'}`}>
          <OverlayContainer activeObject={activeObject} setActiveObject={setActiveObject} theme={theme} />
        </div>
      </div>

    </div>
  );
}

export default App;
