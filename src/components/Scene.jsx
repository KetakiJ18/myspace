import React, { useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import { MainPlanet } from './MainPlanet';
import { TechPlanet } from './TechPlanet';
import { CoffeeMug } from './CoffeeMug';
import { CricketBall } from './CricketBall';
import { Guitar } from './Guitar';
import { Headphones } from './Headphones';

export function Scene({ activeObject, setActiveObject }) {
  const { camera } = useThree();
  const [hoveredObject, setHoveredObject] = useState(null);
  const scrollData = useScroll();

  // Scroll logic: move group based on scroll position
  useFrame(() => {
    if (!activeObject && scrollData) {
      // scrollData.offset goes from 0 to 1
      const yPos = scrollData.offset * 15; // move up to 15 units down
      camera.position.y = -yPos;
    }
  });

  const handlePointerOver = (e, name) => {
    e.stopPropagation();
    document.body.style.cursor = 'pointer';
    setHoveredObject(name);
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();
    document.body.style.cursor = 'auto';
    setHoveredObject(null);
  };

  const handleClick = (e, name, position) => {
    e.stopPropagation();
    setActiveObject({ name, position });
  };

  return (
    <group>
      <MainPlanet 
        position={[0, 0, 0]} 
        onClick={(e) => handleClick(e, 'about', [0, 0, 0])}
        isHovered={hoveredObject === 'about'}
        onPointerOver={(e) => handlePointerOver(e, 'about')}
        onPointerOut={handlePointerOut}
      />
      
      <TechPlanet 
        position={[6, 2, -4]} 
        onClick={(e) => handleClick(e, 'projects', [6, 2, -4])}
        isHovered={hoveredObject === 'projects'}
        onPointerOver={(e) => handlePointerOver(e, 'projects')}
        onPointerOut={handlePointerOut}
      />
      
      <CoffeeMug 
        position={[-5, 1, 2]} 
        onClick={(e) => handleClick(e, 'blog', [-5, 1, 2])}
        isHovered={hoveredObject === 'blog'}
        onPointerOver={(e) => handlePointerOver(e, 'blog')}
        onPointerOut={handlePointerOut}
      />
      
      <CricketBall 
        position={[4, -3, 3]} 
        onClick={(e) => handleClick(e, 'hobbies', [4, -3, 3])}
        isHovered={hoveredObject === 'hobbies'}
        onPointerOver={(e) => handlePointerOver(e, 'hobbies')}
        onPointerOut={handlePointerOut}
      />
      
      <Guitar 
        position={[-6, -2, -3]} 
        onClick={(e) => handleClick(e, 'music', [-6, -2, -3])}
        isHovered={hoveredObject === 'music'}
        onPointerOver={(e) => handlePointerOver(e, 'music')}
        onPointerOut={handlePointerOut}
      />
      
      <Headphones 
        position={[2, -5, -2]} 
        onClick={(e) => handleClick(e, 'skills', [2, -15, 1])}
        isHovered={hoveredObject === 'skills'}
        onPointerOver={(e) => handlePointerOver(e, 'skills')}
        onPointerOut={handlePointerOut}
      />
    </group>
  );
}
