import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Guitar({ position, onClick, isHovered, onPointerOver, onPointerOut }) {
  const groupRef = useRef();
  const stringsRef = useRef([]);
  const glowRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
      groupRef.current.position.y = position[1] + Math.sin(t * 0.5 + 3) * 0.25;
      
      // Smooth tilt
      const targetZ = isHovered ? 0.4 : 0.15;
      groupRef.current.rotation.z += (targetZ - groupRef.current.rotation.z) * 0.08;
      
      // Smooth scale
      const targetScale = isHovered ? 1.1 : 1;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);
    }

    // String vibration with wave propagation
    stringsRef.current.forEach((ref, i) => {
      if (ref && isHovered) {
        const freq = 15 + i * 5;
        const amp = 0.04 - i * 0.008;
        ref.position.x = Math.sin(t * freq + i * 0.5) * amp;
      } else if (ref) {
        ref.position.x *= 0.9; // decay
      }
    });

    if (glowRef.current) {
      glowRef.current.material.opacity = THREE.MathUtils.lerp(
        glowRef.current.material.opacity,
        isHovered ? 0.15 : 0,
        0.05
      );
    }
  });

  const stringPositions = [-0.1, -0.05, 0, 0.05, 0.1];

  return (
    <group ref={groupRef} position={position} onClick={onClick} onPointerOver={onPointerOver} onPointerOut={onPointerOut}>
      {/* Guitar Body - rounded shape */}
      <mesh position={[0, -0.8, 0]}>
        <capsuleGeometry args={[0.7, 0.8, 16, 32]} />
        <meshStandardMaterial 
          color="#7c2d12"
          roughness={0.25}
          metalness={0.4}
          emissive="#F59E0B"
          emissiveIntensity={isHovered ? 0.3 : 0.05}
        />
      </mesh>
      
      {/* Sound Hole */}
      <mesh position={[0, -0.5, 0.38]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.12, 0.28, 32]} />
        <meshBasicMaterial color="#1a0a00" side={THREE.DoubleSide} />
      </mesh>

      {/* Rosette */}
      <mesh position={[0, -0.5, 0.39]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.28, 0.32, 32]} />
        <meshStandardMaterial 
          color="#F59E0B" 
          emissive="#F59E0B" 
          emissiveIntensity={isHovered ? 0.8 : 0.1}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[0.24, 2.2, 0.12]} />
        <meshStandardMaterial color="#451a03" roughness={0.3} metalness={0.3} />
      </mesh>
      
      {/* Headstock */}
      <mesh position={[0, 2.5, 0]}>
        <boxGeometry args={[0.32, 0.5, 0.12]} />
        <meshStandardMaterial color="#7c2d12" roughness={0.3} metalness={0.3} />
      </mesh>

      {/* Strings with individual vibration */}
      {stringPositions.map((xPos, i) => (
        <mesh 
          key={i}
          ref={el => stringsRef.current[i] = el}
          position={[xPos, 0.8, 0.08]}
        >
          <boxGeometry args={[0.005, 3.2, 0.005]} />
          <meshBasicMaterial 
            color={isHovered ? '#FCD34D' : '#A3A3A3'}
            transparent
            opacity={isHovered ? 1 : 0.5}
          />
        </mesh>
      ))}

      {/* Glow aura */}
      <mesh ref={glowRef} position={[0, 0.5, 0]}>
        <sphereGeometry args={[2.5, 16, 16]} />
        <meshBasicMaterial color="#F59E0B" transparent opacity={0} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}
