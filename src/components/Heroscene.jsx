import React, { useEffect, useRef } from 'react';

export function HeroScene({ isDark }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let width = 0;
    let height = 0;
    let animationFrame;

    const mouse = {
      x: 0,
      y: 0,

      // Raw cursor position
      targetX: 0,
      targetY: 0,

      active: false,
    };

    const particles = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      const dpr = Math.min(
        window.devicePixelRatio || 1,
        2
      );

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      createParticles();
    };

    const createParticles = () => {
      particles.length = 0;

      const count = Math.min(
        850,
        Math.max(
          450,
          Math.floor((width * height) / 2200)
        )
      );

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,

          // Almost static background
          vx: (Math.random() - 0.5) * 0.02,
          vy: (Math.random() - 0.5) * 0.02,

          size: Math.random() * 1.2 + 0.4,

          baseOpacity:
            Math.random() * 0.08 + 0.02,

          // CURRENT rendered brightness
          opacity: 0,
        });
      }
    };

    const handleMouseMove = (event) => {
      mouse.targetX = event.clientX;
      mouse.targetY = event.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      /*
       * ----------------------------------------
       * CURSOR MOVEMENT
       * ----------------------------------------
       *
       * The cursor does NOT instantly move.
       * It physically catches up to the real cursor.
       *
       * This creates the dragging/ripple feeling.
       */

      if (mouse.active) {
        mouse.x +=
          (mouse.targetX - mouse.x) * 0.055;

        mouse.y +=
          (mouse.targetY - mouse.y) * 0.055;
      }

      const dotColor = isDark
        ? '105, 215, 165'
        : '35, 105, 120';

      /*
       * Larger influence area.
       *
       * The outer area is extremely soft,
       * so there is no visible "on/off" boundary.
       */
      const radius = 360;

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;

        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;

        /*
         * ----------------------------------------
         * TARGET OPACITY
         * ----------------------------------------
         */

        let targetOpacity =
          particle.baseOpacity * 0.35;

        if (mouse.active) {
          const dx =
            particle.x - mouse.x;

          const dy =
            particle.y - mouse.y;

          const distance = Math.sqrt(
            dx * dx + dy * dy
          );

          /*
           * Gaussian falloff.
           *
           * Unlike a hard radius, this has
           * no sudden cutoff.
           */
          const influence = Math.exp(
            -(distance * distance) /
              (2 * radius * radius)
          );

          targetOpacity +=
            influence * 0.8;
        }

        /*
         * ----------------------------------------
         * TEMPORAL SMOOTHING
         * ----------------------------------------
         *
         * THIS is the important part.
         *
         * Instead of:
         *
         * opacity = targetOpacity
         *
         * we gradually approach it.
         *
         * So particles don't suddenly turn on/off.
         */
        particle.opacity +=
          (targetOpacity - particle.opacity) *
          0.05;

        /*
         * Don't render essentially invisible dots.
         */
        if (particle.opacity < 0.008) return;

        ctx.beginPath();

        ctx.arc(
          particle.x,
          particle.y,
          particle.size,
          0,
          Math.PI * 2
        );

        ctx.fillStyle = `rgba(
          ${dotColor},
          ${Math.min(particle.opacity, 0.9)}
        )`;

        ctx.fill();
      });

      animationFrame =
        requestAnimationFrame(animate);
    };

    resize();

    window.addEventListener(
      'resize',
      resize
    );

    window.addEventListener(
      'mousemove',
      handleMouseMove
    );

    window.addEventListener(
      'mouseleave',
      handleMouseLeave
    );

    mouse.x = width / 2;
    mouse.y = height / 2;

    mouse.targetX = mouse.x;
    mouse.targetY = mouse.y;

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);

      window.removeEventListener(
        'resize',
        resize
      );

      window.removeEventListener(
        'mousemove',
        handleMouseMove
      );

      window.removeEventListener(
        'mouseleave',
        handleMouseLeave
      );
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
      }}
    />
  );
}