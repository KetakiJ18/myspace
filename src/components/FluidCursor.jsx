import { useEffect, useRef } from 'react';
import fluidCursor from '../hooks/useFluidCursor';

const FluidCursor = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const cleanup = fluidCursor(canvasRef.current);

    return () => {
      if (typeof cleanup === 'function') {
        cleanup();
      }
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 0,
      }}
    >
      <canvas
        ref={canvasRef}
        id="fluid"
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
    </div>
  );
};

export default FluidCursor;