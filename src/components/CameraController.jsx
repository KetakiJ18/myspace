import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';

export function CameraController({ activeObject }) {
  const { camera } = useThree();

  useEffect(() => {
    if (activeObject) {
      const { position } = activeObject;
      gsap.to(camera.position, {
        x: position[0],
        y: position[1],
        z: position[2] + 5,
        duration: 1.8,
        ease: 'power3.inOut',
      });
    }
  }, [activeObject, camera]);

  return null;
}
