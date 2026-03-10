import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function TechPlanet({ position, onClick, isHovered, onPointerOver, onPointerOut }) {
  const planetRef = useRef();
  const ringRef = useRef();
  const ring2Ref = useRef();
  const glowRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.25;
      const floatY = position[1] + Math.sin(t * 0.6 + 2) * 0.3;
      planetRef.current.position.y = floatY;
      
      // Smooth scale on hover
      const targetScale = isHovered ? 1.08 : 1;
      planetRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);
    }
    
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.15;
      ringRef.current.rotation.x = Math.PI / 3 + Math.sin(t * 0.3) * 0.05;
      ringRef.current.position.y = position[1] + Math.sin(t * 0.6 + 2) * 0.3;
    }
    
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.08;
      ring2Ref.current.position.y = position[1] + Math.sin(t * 0.6 + 2) * 0.3;
    }

    if (glowRef.current) {
      glowRef.current.position.y = position[1] + Math.sin(t * 0.6 + 2) * 0.3;
      glowRef.current.material.opacity = THREE.MathUtils.lerp(
        glowRef.current.material.opacity,
        isHovered ? 0.15 : 0.04,
        0.05
      );
    }
  });

  return (
    <group onClick={onClick} onPointerOver={onPointerOver} onPointerOut={onPointerOut}>
      {/* Planet core */}
      <mesh ref={planetRef} position={position}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial 
          color="#064e3b"
          wireframe={isHovered}
          roughness={0.15}
          metalness={0.9}
          emissive="#10B981"
          emissiveIntensity={isHovered ? 0.6 : 0.1}
        />
      </mesh>

      {/* Primary ring */}
      <mesh ref={ringRef} position={position} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.4, 0.04, 16, 128]} />
        <meshStandardMaterial 
          color="#34d399" 
          emissive="#10B981"
          emissiveIntensity={isHovered ? 1.5 : 0.3}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Secondary ring */}
      <mesh ref={ring2Ref} position={position} rotation={[Math.PI / 2.5, Math.PI / 6, 0]}>
        <torusGeometry args={[2.1, 0.015, 8, 128]} />
        <meshBasicMaterial color="#6EE7B7" transparent opacity={isHovered ? 0.6 : 0.2} />
      </mesh>

      {/* Glow halo */}
      <mesh ref={glowRef} position={position}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color="#10B981" transparent opacity={0.04} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}
