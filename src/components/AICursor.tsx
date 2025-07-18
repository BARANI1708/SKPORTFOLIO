import React, { useEffect, useRef, useState } from 'react';

const TRAIL_LENGTH = 12;
const CURSOR_SIZE = 28;
const TRAIL_COLOR = 'rgba(180, 100, 255, 0.25)';
const ORB_COLOR = 'rgba(180, 100, 255, 0.85)';
const SPARKLE_COLOR = 'rgba(200, 120, 255, 0.7)';

const BUTTERFLY_COUNT = 8;
const BUTTERFLY_COLORS = [
  'rgba(180, 100, 255, 0.85)',
  'rgba(255, 200, 100, 0.85)',
  'rgba(120, 200, 255, 0.85)',
  'rgba(255, 120, 200, 0.85)',
  'rgba(200, 255, 120, 0.85)',
  'rgba(255, 255, 120, 0.85)',
  'rgba(120, 255, 255, 0.85)',
  'rgba(255, 120, 120, 0.85)'
];

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

const Butterfly: React.FC<{ color: string; delay: number }>
  = ({ color, delay }) => {
  const [pos, setPos] = useState({
    x: randomBetween(0, window.innerWidth),
    y: randomBetween(0, window.innerHeight * 0.7)
  });
  const [angle, setAngle] = useState(randomBetween(0, 2 * Math.PI));
  const [speed] = useState(randomBetween(0.3, 1.2));
  const [size] = useState(randomBetween(32, 56));
  const [wing, setWing] = useState(0);
  useEffect(() => {
    let frame = 0;
    let raf: number;
    function animate() {
      frame++;
      setWing(Math.sin((frame + delay * 60) / 8));
      setPos(prev => {
        let nx = prev.x + Math.cos(angle) * speed;
        let ny = prev.y + Math.sin(angle) * speed * 0.7 + Math.sin(frame / 30) * 0.7;
        // Bounce off edges
        if (nx < 0 || nx > window.innerWidth - size) setAngle(a => Math.PI - a);
        if (ny < 0 || ny > window.innerHeight * 0.7 - size) setAngle(a => -a);
        return {
          x: Math.max(0, Math.min(window.innerWidth - size, nx)),
          y: Math.max(0, Math.min(window.innerHeight * 0.7 - size, ny))
        };
      });
      raf = requestAnimationFrame(animate);
    }
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [angle, speed, size, delay]);
  return (
    <svg
      style={{
        position: 'fixed',
        left: pos.x,
        top: pos.y,
        zIndex: 9999,
        pointerEvents: 'none',
        filter: 'drop-shadow(0 0 16px ' + color + ') drop-shadow(0 0 32px ' + color + ')',
        opacity: 0.85
      }}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
    >
      {/* Lightning glow */}
      <ellipse cx="32" cy="32" rx="28" ry="18" fill={color} opacity="0.12" />
      {/* Butterfly body */}
      <rect x="28" y="24" width="8" height="24" rx="4" fill="#222" />
      {/* Wings */}
      <path
        d={`M32 36 Q${16 - wing * 10} 8, 8 32 Q16 56, 32 44`}
        fill={color}
        opacity="0.7"
      />
      <path
        d={`M32 36 Q${48 + wing * 10} 8, 56 32 Q48 56, 32 44`}
        fill={color}
        opacity="0.7"
      />
      {/* Lightning effect */}
      <polyline
        points="32,24 34,18 30,14 36,10"
        stroke="#fff"
        strokeWidth="2"
        opacity="0.7"
        filter="url(#glow)"
      />
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
};

export const ButterflyOverlay: React.FC = () => (
  <>
    {Array.from({ length: BUTTERFLY_COUNT }).map((_, i) => (
      <Butterfly key={i} color={BUTTERFLY_COLORS[i % BUTTERFLY_COLORS.length]} delay={i * 2} />
    ))}
  </>
);

const isInteractive = (el: HTMLElement | null) => {
  if (!el) return false;
  return (
    el.tagName === 'BUTTON' ||
    el.tagName === 'A' ||
    el.getAttribute('role') === 'button' ||
    el.classList.contains('cursor-pointer')
  );
};

const AICursor: React.FC = () => {
  const [pos, setPos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [isActive, setIsActive] = useState(false);
  const [sparkle, setSparkle] = useState<{ x: number; y: number; t: number } | null>(null);
  const trail = useRef<{ x: number; y: number }[]>([]);
  const raf = useRef<number>();

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      // Check if hovering interactive
      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;
      setIsActive(isInteractive(el));
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  // Trail effect
  useEffect(() => {
    function animate() {
      trail.current.push({ x: pos.x, y: pos.y });
      if (trail.current.length > TRAIL_LENGTH) trail.current.shift();
      raf.current = requestAnimationFrame(animate);
    }
    raf.current = requestAnimationFrame(animate);
    return () => raf.current && cancelAnimationFrame(raf.current);
  }, [pos]);

  // Sparkle effect on hover
  useEffect(() => {
    if (isActive) {
      setSparkle({ x: pos.x, y: pos.y, t: Date.now() });
      const timeout = setTimeout(() => setSparkle(null), 400);
      return () => clearTimeout(timeout);
    }
  }, [isActive, pos.x, pos.y]);

  // Hide default cursor
  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = '';
    };
  }, []);

  return (
    <>
      {/* Cursor orb */}
      <div
        style={{
          position: 'fixed',
          left: pos.x - CURSOR_SIZE / 2,
          top: pos.y - CURSOR_SIZE / 2,
          width: CURSOR_SIZE,
          height: CURSOR_SIZE,
          borderRadius: '50%',
          background: ORB_COLOR,
          boxShadow: '0 0 32px 8px rgba(180,100,255,0.45), 0 0 0 2px rgba(180,100,255,0.15)',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'background 0.2s',
          mixBlendMode: 'screen',
        }}
      />
      {/* Trail */}
      {isActive &&
        trail.current.map((t, i) => (
          <div
            key={i}
            style={{
              position: 'fixed',
              left: t.x - CURSOR_SIZE / 2,
              top: t.y - CURSOR_SIZE / 2,
              width: CURSOR_SIZE,
              height: CURSOR_SIZE,
              borderRadius: '50%',
              background: TRAIL_COLOR,
              filter: 'blur(6px)',
              pointerEvents: 'none',
              zIndex: 9998,
              opacity: (i + 1) / TRAIL_LENGTH / 2,
              mixBlendMode: 'screen',
            }}
          />
        ))}
      {/* Sparkle */}
      {sparkle && (
        <div
          style={{
            position: 'fixed',
            left: sparkle.x - 10,
            top: sparkle.y - 10,
            width: 20,
            height: 20,
            borderRadius: '50%',
            background: SPARKLE_COLOR,
            filter: 'blur(8px)',
            pointerEvents: 'none',
            zIndex: 10000,
            animation: 'ai-cursor-sparkle 0.4s linear',
            mixBlendMode: 'screen',
          }}
        />
      )}
      <style>{`
        @keyframes ai-cursor-sparkle {
          0% { opacity: 1; transform: scale(1); }
          80% { opacity: 0.7; transform: scale(1.5); }
          100% { opacity: 0; transform: scale(2); }
        }
      `}</style>
    </>
  );
};

export default AICursor; 