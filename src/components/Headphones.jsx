import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Headphones({ position, onClick, isHovered, onPointerOver, onPointerOut }) {
  const groupRef = useRef();
  const earcupRef1 = useRef();
  const earcupRef2 = useRef();
  const eqBars = useRef([]);
  const glowRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    
    if (groupRef.current) {
      groupRef.current.rotation.y -= delta * 0.15;
      groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.08;
      groupRef.current.position.y = position[1] + Math.sin(t * 0.5 + 4) * 0.2;
      
      // Smooth scale
      const targetScale = isHovered ? 1.12 : 1;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);
    }
    
    // Earcup pulse
    if (isHovered && earcupRef1.current && earcupRef2.current) {
      const beat = Math.sin(t * 8) * 0.06;
      earcupRef1.current.scale.set(1 + beat, 1, 1 + beat);
      earcupRef2.current.scale.set(1 + beat, 1, 1 + beat);
    } else if (earcupRef1.current && earcupRef2.current) {
      earcupRef1.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      earcupRef2.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
    }

    // Equalizer bars
    eqBars.current.forEach((ref, i) => {
      if (ref && isHovered) {
        const height = 0.1 + Math.abs(Math.sin(t * (6 + i * 2) + i)) * 0.35;
        ref.scale.y = height;
        ref.material.opacity = 0.8;
      } else if (ref) {
        ref.scale.y *= 0.9;
        ref.material.opacity *= 0.95;
      }
    });

    if (glowRef.current) {
      glowRef.current.material.opacity = THREE.MathUtils.lerp(
        glowRef.current.material.opacity,
        isHovered ? 0.12 : 0.02,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef} position={position} onClick={onClick} onPointerOver={onPointerOver} onPointerOut={onPointerOut}>
      {/* Headband */}
      <mesh position={[0, 0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.8, 0.1, 16, 64, Math.PI]} />
        <meshStandardMaterial 
          color="#1e1e2e"
          roughness={0.6}
          metalness={0.5}
        />
      </mesh>
      
      {/* Earcup Left */}
      <mesh ref={earcupRef1} position={[-0.85, 0.15, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.4, 0.4, 0.25, 48]} />
        <meshStandardMaterial 
          color="#1e1e2e"
          roughness={0.4}
          metalness={0.6}
          emissive="#8B5CF6" 
          emissiveIntensity={isHovered ? 1 : 0} 
        />
      </mesh>

      {/* Earcup Right */}
      <mesh ref={earcupRef2} position={[0.85, 0.15, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.4, 0.4, 0.25, 48]} />
        <meshStandardMaterial 
          color="#1e1e2e"
          roughness={0.4}
          metalness={0.6}
          emissive="#F472B6" 
          emissiveIntensity={isHovered ? 1 : 0}
        />
      </mesh>
      
      {/* Cushion rings */}
      <mesh position={[-0.73, 0.15, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.3, 0.06, 16, 32]} />
        <meshStandardMaterial color="#0f0f1a" roughness={0.9} />
      </mesh>
      <mesh position={[0.73, 0.15, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.3, 0.06, 16, 32]} />
        <meshStandardMaterial color="#0f0f1a" roughness={0.9} />
      </mesh>

      {/* Equalizer bars (centered below) */}
      {[-0.2, -0.1, 0, 0.1, 0.2].map((xOff, i) => (
        <mesh
          key={i}
          ref={el => eqBars.current[i] = el}
          position={[xOff, -0.6, 0.3]}
        >
          <boxGeometry args={[0.04, 1, 0.04]} />
          <meshBasicMaterial 
            color={i % 2 === 0 ? '#8B5CF6' : '#F472B6'} 
            transparent 
            opacity={0}
          />
        </mesh>
      ))}

      {/* Glow halo */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.5, 16, 16]} />
        <meshBasicMaterial color="#8B5CF6" transparent opacity={0.02} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}
