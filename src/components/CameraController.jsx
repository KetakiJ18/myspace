import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';

export function CameraController({ activeObject }) {
  const { camera, scene } = useThree();

  useEffect(() => {
    if (activeObject) {
      // Zoom in to object
      const { position } = activeObject;
      
      // Calculate a target position for the camera, slightly offset from the object
      const targetPos = {
        x: position[0],
        y: position[1],
        z: position[2] + 4 
      };

      gsap.to(camera.position, {
        x: targetPos.x,
        y: targetPos.y,
        z: targetPos.z,
        duration: 1.5,
        ease: 'power3.inOut'
      });
      
      // We also need to rotate the camera to look at the object (if needed, but here simple pan is fine)
    } else {
      // Reset camera
      gsap.to(camera.position, {
        x: 0,
        y: 0,
        z: 15,
        duration: 1.5,
        ease: 'power3.inOut'
      });
    }
  }, [activeObject, camera]);

  return null;
}
