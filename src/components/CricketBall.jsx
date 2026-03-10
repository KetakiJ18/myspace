import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function CricketBall({ position, onClick, isHovered, onPointerOver, onPointerOut }) {
  const meshRef = useRef();
  const glowRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    
    if (meshRef.current) {
      // Spin with acceleration on hover
      const spinTarget = isHovered ? 6 : 0.4;
      const currentSpin = meshRef.current.userData.spin || 0.4;
      const newSpin = THREE.MathUtils.lerp(currentSpin, spinTarget, 0.03);
      meshRef.current.userData.spin = newSpin;
      
      meshRef.current.rotation.x += delta * newSpin;
      meshRef.current.rotation.z += delta * newSpin * 0.7;
      
      meshRef.current.position.y = position[1] + Math.sin(t * 1.2) * 0.18;
      
      // Smooth scale
      const targetScale = isHovered ? 1.15 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);
    }

    if (glowRef.current) {
      glowRef.current.position.y = position[1] + Math.sin(t * 1.2) * 0.18;
      glowRef.current.material.opacity = THREE.MathUtils.lerp(
        glowRef.current.material.opacity,
        isHovered ? 0.2 : 0.03,
        0.05
      );
    }
  });

  return (
    <group position={position} onClick={onClick} onPointerOver={onPointerOver} onPointerOut={onPointerOut}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.8, 64, 64]} />
        <meshStandardMaterial 
          color="#991b1b"
          roughness={0.45}
          metalness={0.15}
          emissive="#EF4444"
          emissiveIntensity={isHovered ? 0.4 : 0.05}
        />
        
        {/* Primary seam */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.82, 0.025, 16, 128]} />
          <meshStandardMaterial 
            color="#FCA5A5" 
            emissive="#EF4444" 
            emissiveIntensity={isHovered ? 1.2 : 0.1}
          />
        </mesh>
        
        {/* Stitch lines */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.04, 0]}>
          <torusGeometry args={[0.815, 0.008, 8, 128]} />
          <meshBasicMaterial color="#FECACA" transparent opacity={0.6} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.04, 0]}>
          <torusGeometry args={[0.815, 0.008, 8, 128]} />
          <meshBasicMaterial color="#FECACA" transparent opacity={0.6} />
        </mesh>
      </mesh>

      {/* Glow halo */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial color="#EF4444" transparent opacity={0.03} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}
