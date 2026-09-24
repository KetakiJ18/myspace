import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function InteractiveKnot({ isDark, setActive, active }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const target = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const { pointer } = state;
    target.current.x = pointer.y * 0.35;
    target.current.y = pointer.x * 0.5;

    if (meshRef.current) {
      meshRef.current.rotation.x += (target.current.x - meshRef.current.rotation.x) * 0.05;
      meshRef.current.rotation.y +=
        delta * (active ? 0.9 : 0.22) + (target.current.y - meshRef.current.rotation.y) * 0.02;

      const targetScale = active ? 1.1 : hovered ? 1.03 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onPointerDown={() => setActive(true)}
      onPointerUp={() => setActive(false)}
    >
      <torusKnotGeometry args={[1, 0.32, 220, 32]} />
      <MeshDistortMaterial
        color={isDark ? '#59B892' : '#2F6F5E'}
        roughness={0.3}
        metalness={0.15}
        distort={active ? 0.5 : 0.16}
        speed={active ? 3 : 1}
      />
    </mesh>
  );
}

export function HeroScene({ isDark }) {
  const [active, setActive] = useState(false);

  return (
    <Canvas
      camera={{ position: [0, 0, 4.2], fov: 42 }}
      dpr={[1, 2]}
      onPointerMissed={() => setActive(false)}
    >
      <ambientLight intensity={isDark ? 0.6 : 1} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} color={isDark ? '#59B892' : '#ffffff'} />
      <pointLight position={[-4, -2, -3]} intensity={0.5} color="#B8793F" />
      <InteractiveKnot isDark={isDark} active={active} setActive={setActive} />
    </Canvas>
  );
}