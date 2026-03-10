import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function MainPlanet({ position, onClick, isHovered, onPointerOver, onPointerOut }) {
  const meshRef = useRef();
  const glowRef = useRef();
  const outerGlowRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.4) * 0.25;
    }
    if (glowRef.current) {
      glowRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.4) * 0.25;
      glowRef.current.material.opacity = THREE.MathUtils.lerp(
        glowRef.current.material.opacity,
        isHovered ? 0.25 : 0.08,
        0.05
      );
    }
    if (outerGlowRef.current) {
      outerGlowRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.4) * 0.25;
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.03;
      outerGlowRef.current.scale.setScalar(1 + pulse);
      outerGlowRef.current.material.opacity = isHovered ? 0.12 : 0.04;
    }
  });

  return (
    <group position={position} onClick={onClick} onPointerOver={onPointerOver} onPointerOut={onPointerOut}>
      {/* Core planet */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 128, 128]} />
        <meshStandardMaterial 
          color="#1e3a5f"
          roughness={0.25} 
          metalness={0.6}
          emissive="#6EE7FF"
          emissiveIntensity={isHovered ? 0.4 : 0.08}
        />
      </mesh>
      
      {/* Inner atmosphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[2.15, 64, 64]} />
        <meshBasicMaterial 
          color="#6EE7FF" 
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer glow halo */}
      <mesh ref={outerGlowRef}>
        <sphereGeometry args={[2.6, 32, 32]} />
        <meshBasicMaterial 
          color="#6EE7FF" 
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}
