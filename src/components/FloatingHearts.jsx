import { useEffect, useRef } from 'react';

/* ── FloatingHearts ──────────────────────────────────────────────
   Renders randomly-placed hearts that float upward across the page.
   All hearts are injected into a fixed overlay, z-index 0.
───────────────────────────────────────────────────────────────── */

const HEART_COLORS = [
  '#ff6b9d', '#ff4f81', '#ff8fab', '#e91e8c',
  '#ffb3c6', '#ffd1dc', '#ff7eb3', '#fc5c7d',
];

const createHeart = (container) => {
  const heart = document.createElement('div');
  const size = Math.random() * 30 + 14; // 14–44px
  const left = Math.random() * 100; // 0–100vw
  const delay = Math.random() * 6;   // stagger
  const duration = Math.random() * 8 + 8; // 8–16s
  const color = HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)];
  const opacity = Math.random() * 0.5 + 0.25; // 0.25–0.75
  const rotate = (Math.random() - 0.5) * 30;

  heart.innerHTML = '♥';
  heart.style.cssText = `
    position: absolute;
    left: ${left}%;
    bottom: -60px;
    font-size: ${size}px;
    color: ${color};
    opacity: ${opacity};
    pointer-events: none;
    user-select: none;
    animation: floatHeart ${duration}s ease-in ${delay}s infinite;
    transform: rotate(${rotate}deg);
    filter: drop-shadow(0 0 6px ${color}66);
  `;
  container.appendChild(heart);
  return heart;
};

const FloatingHearts = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Seed with 18 hearts spread over time
    const hearts = Array.from({ length: 18 }, () => createHeart(container));

    // Occasionally spawn extra bursts
    const spawnInterval = setInterval(() => {
      const h = createHeart(container);
      setTimeout(() => {
        if (container.contains(h)) container.removeChild(h);
      }, 18000);
    }, 1800);

    return () => {
      clearInterval(spawnInterval);
      hearts.forEach(h => { if (container.contains(h)) container.removeChild(h); });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};

export default FloatingHearts;
