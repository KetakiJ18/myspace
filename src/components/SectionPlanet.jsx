import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

export function SectionPlanet({ 
  position, label, brief, color, emissiveColor, size = 1, ringColor, 
  hasRing, isHovered, onClick, onPointerOver, onPointerOut 
}) {
  const meshRef = useRef();
  const glowRef = useRef();
  const ringRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15;
      // Gentle float
      meshRef.current.position.y = position[1] + Math.sin(t * 0.4 + position[0]) * 0.2;

      // Smooth scale on hover
      const target = isHovered ? 1.15 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(target, target, target), 0.06);
    }

    if (glowRef.current) {
      glowRef.current.position.y = position[1] + Math.sin(t * 0.4 + position[0]) * 0.2;
      glowRef.current.material.opacity = THREE.MathUtils.lerp(
        glowRef.current.material.opacity,
        isHovered ? 0.22 : 0.06,
        0.05
      );
      const pulse = Math.sin(t * 2 + position[0]) * 0.02;
      glowRef.current.scale.setScalar(1 + pulse);
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.12;
      ringRef.current.position.y = position[1] + Math.sin(t * 0.4 + position[0]) * 0.2;
    }
  });

  return (
    <group position={position} onClick={onClick} onPointerOver={onPointerOver} onPointerOut={onPointerOut}>
      {/* Planet core */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 64, 64]} />
        <meshStandardMaterial
          color={color}
          roughness={0.25}
          metalness={0.6}
          emissive={emissiveColor || color}
          emissiveIntensity={isHovered ? 0.5 : 0.08}
        />
      </mesh>

      {/* Glow halo */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[size * 1.35, 32, 32]} />
        <meshBasicMaterial
          color={emissiveColor || color}
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Optional ring */}
      {hasRing && (
        <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[size * 1.6, 0.03, 16, 128]} />
          <meshStandardMaterial
            color={ringColor || color}
            emissive={ringColor || color}
            emissiveIntensity={isHovered ? 1.2 : 0.3}
            transparent
            opacity={0.7}
          />
        </mesh>
      )}

      {/* Hover tooltip */}
      {isHovered && (
        <Html
          position={[0, size + 0.8, 0]}
          center
          style={{ pointerEvents: 'none' }}
        >
          <div style={{
            background: 'rgba(5, 7, 10, 0.85)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(110, 231, 255, 0.1)',
            borderRadius: 12,
            padding: '10px 16px',
            minWidth: 160,
            maxWidth: 220,
            textAlign: 'center',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            animation: 'fadeInUp 0.3s ease',
          }}>
            <p style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.8rem',
              fontWeight: 600,
              color: emissiveColor || color,
              margin: 0,
              marginBottom: 4,
              letterSpacing: '0.03em',
            }}>
              {label}
            </p>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.65rem',
              color: '#94A3B8',
              margin: 0,
              lineHeight: 1.5,
              fontWeight: 300,
            }}>
              {brief}
            </p>
          </div>
        </Html>
      )}
    </group>
  );
}
