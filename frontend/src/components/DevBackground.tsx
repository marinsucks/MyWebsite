import React, { useEffect, useRef } from 'react';

import { useDarkModeContext } from '@contexts/DarkModeContext';

const CHARACTERS = ' .:-=+*#%@';
const FRAME_DURATION = 1000 / 24;

const DevBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { darkMode } = useDarkModeContext();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationFrame = 0;
    let startFrame = 0;
    let lastFrame = -FRAME_DURATION;
    let width = 0;
    let height = 0;
    let columns = 0;
    let rows = 0;
    let cellWidth = 0;
    let cellHeight = 0;
    let foreground = '';

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.ceil(width * dpr);
      canvas.height = Math.ceil(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const fontSize = width < 640 ? 11 : 13;
      context.font = `${fontSize}px "JetBrains Mono", monospace`;
      context.textBaseline = 'top';
      cellWidth = context.measureText('M').width;
      cellHeight = fontSize * 1.15;
      columns = Math.ceil(width / cellWidth) + 1;
      rows = Math.ceil(height / cellHeight) + 1;
    };

    const draw = (timestamp: number) => {
      if (timestamp - lastFrame < FRAME_DURATION) {
        if (!reducedMotion) {
          animationFrame = window.requestAnimationFrame(draw);
        }
        return;
      }

      lastFrame = timestamp;
      const time = timestamp * 0.001;
      const centerX = columns * 0.5;
      const centerY = rows * 0.5;

      context.clearRect(0, 0, width, height);
      context.fillStyle = foreground;
      context.globalAlpha = darkMode ? 0.9 : 0.75;

      for (let row = 0; row < rows; row++) {
        let line = '';

        for (let column = 0; column < columns; column++) {
          const x = column * 0.12;
          const y = row * 0.18;
          const centerDistance = Math.hypot(column - centerX, row - centerY);
          const movingDistance = Math.hypot(
            column - centerX - Math.sin(time * 0.35) * columns * 0.22,
            row - centerY - Math.cos(time * 0.28) * rows * 0.22,
          );

          const plasma =
            Math.sin(x + time * 0.75) +
            Math.sin(y - time * 0.55) +
            Math.sin((x + y) * 0.65 + time * 0.4) +
            Math.sin(centerDistance * 0.16 - time * 1.1) +
            Math.sin(movingDistance * 0.11 + time * 0.7);

          const normalized = Math.max(0, Math.min(1, (plasma + 5) / 10));
          const characterIndex = Math.round(normalized * (CHARACTERS.length - 1));
          line += CHARACTERS[characterIndex];
        }

        context.fillText(line, 0, row * cellHeight);
      }

      if (!reducedMotion) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    };

    const handleResize = () => {
      resize();
      if (reducedMotion) {
        draw(lastFrame + FRAME_DURATION);
      }
    };

    startFrame = window.requestAnimationFrame(() => {
      foreground = getComputedStyle(document.documentElement)
        .getPropertyValue('--background-dark')
        .trim();
      resize();
      draw(0);
    });

    window.addEventListener('resize', handleResize);

    return () => {
      window.cancelAnimationFrame(startFrame);
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', handleResize);
    };
  }, [darkMode]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 h-screen w-screen pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default DevBackground;
