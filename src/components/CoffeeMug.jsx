import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function CoffeeMug({ position, onClick, isHovered, onPointerOver, onPointerOut }) {
  const groupRef = useRef();
  const steamParticles = useRef([]);
  const glowRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    
    if (groupRef.current) {
      groupRef.current.rotation.y -= delta * 0.08;
      groupRef.current.rotation.z = Math.sin(t * 0.3) * 0.03;
      groupRef.current.position.y = position[1] + Math.sin(t * 0.5 + 1) * 0.2;
      
      // Smooth scale
      const targetScale = isHovered ? 1.1 : 1;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);
    }
    
    // Animate steam particles individually
    steamParticles.current.forEach((ref, i) => {
      if (ref) {
        if (isHovered) {
          ref.position.y += delta * (0.8 + i * 0.3);
          ref.material.opacity = Math.max(0, 0.5 - ref.position.y * 0.15);
          ref.position.x = Math.sin(t * 2 + i * 2) * 0.15;
          
          if (ref.position.y > 3) {
            ref.position.y = 1;
            ref.material.opacity = 0.5;
          }
        } else {
          ref.position.y = 1 + i * 0.3;
          ref.material.opacity *= 0.95;
        }
      }
    });

    if (glowRef.current) {
      glowRef.current.material.opacity = THREE.MathUtils.lerp(
        glowRef.current.material.opacity,
        isHovered ? 0.12 : 0,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef} position={position} onClick={onClick} onPointerOver={onPointerOver} onPointerOut={onPointerOut}>
      {/* Mug Body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.7, 0.75, 1.8, 48]} />
        <meshStandardMaterial 
          color={isHovered ? '#fafafa' : '#e2e8f0'}
          roughness={0.08}
          metalness={0.15}
          emissive="#F472B6"
          emissiveIntensity={isHovered ? 0.15 : 0}
        />
      </mesh>
      
      {/* Inner rim */}
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 0.03, 48]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.1} metalness={0.3} />
      </mesh>

      {/* Coffee surface */}
      <mesh position={[0, 0.85, 0]}>
        <cylinderGeometry args={[0.63, 0.63, 0.04, 48]} />
        <meshStandardMaterial 
          color="#3C1810"
          roughness={0.4}
          metalness={0.1}
          emissive="#78350f"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Handle */}
      <mesh position={[0.78, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <torusGeometry args={[0.42, 0.1, 16, 32, Math.PI]} />
        <meshStandardMaterial 
          color={isHovered ? '#fafafa' : '#e2e8f0'}
          roughness={0.08}
          metalness={0.15}
        />
      </mesh>
      
      {/* Steam particles */}
      {[0, 1, 2, 3, 4].map(i => (
        <mesh
          key={i}
          ref={el => steamParticles.current[i] = el}
          position={[Math.sin(i * 1.2) * 0.15, 1 + i * 0.3, Math.cos(i * 1.2) * 0.1]}
        >
          <sphereGeometry args={[0.06 + i * 0.015, 8, 8]} />
          <meshBasicMaterial color="#F472B6" transparent opacity={0} />
        </mesh>
      ))}

      {/* Glow aura */}
      <mesh ref={glowRef} position={[0, 0.5, 0]}>
        <sphereGeometry args={[1.8, 16, 16]} />
        <meshBasicMaterial color="#F472B6" transparent opacity={0} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}
