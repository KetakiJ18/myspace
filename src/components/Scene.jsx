import React, { useState, useCallback } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { SectionPlanet } from './SectionPlanet';

const planets = [
  {
    id: 'about',
    label: 'About Me',
    brief: 'Who I am, what drives me, and my journey so far.',
    position: [0, 0, 0],
    color: '#1e3a5f',
    emissiveColor: '#6EE7FF',
    size: 2,
    hasRing: false,
  },
  {
    id: 'projects',
    label: 'Projects',
    brief: 'AI platforms, web apps, and creative experiments.',
    position: [5.5, -3.5, -3],
    color: '#064e3b',
    emissiveColor: '#10B981',
    size: 1.5,
    hasRing: true,
    ringColor: '#34d399',
  },
  {
    id: 'skills',
    label: 'Skills',
    brief: 'My technical toolkit — languages, frameworks, and tools.',
    position: [-5, -6, -1],
    color: '#3b1f6e',
    emissiveColor: '#8B5CF6',
    size: 1.2,
    hasRing: true,
    ringColor: '#a78bfa',
  },
  {
    id: 'hobbies',
    label: 'Hobbies & Stats',
    brief: 'Cricket scoreboard and things I love outside code.',
    position: [4.5, -9, 2],
    color: '#7f1d1d',
    emissiveColor: '#EF4444',
    size: 0.9,
    hasRing: false,
  },
  {
    id: 'blog',
    label: 'Coffee Break',
    brief: 'Thoughts, stories, and notes from the universe.',
    position: [-4.5, -11.5, 1],
    color: '#701a3e',
    emissiveColor: '#F472B6',
    size: 1.1,
    hasRing: false,
  },
  {
    id: 'contact',
    label: 'Contact',
    brief: 'Send a signal through the cosmos — let\'s connect.',
    position: [3, -14, -2],
    color: '#1e3a5f',
    emissiveColor: '#F59E0B',
    size: 0.8,
    hasRing: true,
    ringColor: '#FBBF24',
  },
];

export function Scene({ activeObject, setActiveObject, theme, scrollProgress = 0 }) {
  const { camera } = useThree();
  const [hoveredPlanet, setHoveredPlanet] = useState(null);

  // Smooth scroll-linked camera
  useFrame(() => {
    const targetY = -scrollProgress * 16;
    const targetX = Math.sin(scrollProgress * Math.PI) * 1.5;
    const targetZ = 15 - scrollProgress * 2;

    camera.position.x += (targetX - camera.position.x) * 0.04;
    camera.position.y += (targetY - camera.position.y) * 0.04;
    camera.position.z += (targetZ - camera.position.z) * 0.04;
  });

  const handlePointerOver = useCallback((e, id) => {
    e.stopPropagation();
    document.body.style.cursor = 'pointer';
    setHoveredPlanet(id);
  }, []);

  const handlePointerOut = useCallback((e) => {
    e.stopPropagation();
    document.body.style.cursor = 'auto';
    setHoveredPlanet(null);
  }, []);

  const handleClick = useCallback((e, id) => {
    e.stopPropagation();
    // Scroll the DOM to the section
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <group>
      {planets.map(planet => (
        <SectionPlanet
          key={planet.id}
          position={planet.position}
          label={planet.label}
          brief={planet.brief}
          color={planet.color}
          emissiveColor={planet.emissiveColor}
          size={planet.size}
          hasRing={planet.hasRing}
          ringColor={planet.ringColor}
          isHovered={hoveredPlanet === planet.id}
          onClick={(e) => handleClick(e, planet.id)}
          onPointerOver={(e) => handlePointerOver(e, planet.id)}
          onPointerOut={handlePointerOut}
        />
      ))}
    </group>
  );
}
