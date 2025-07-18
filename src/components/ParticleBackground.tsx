import React, { useEffect, useRef } from 'react';

const PARTICLE_COUNT = 48;
const PARTICLE_COLORS = [
  'rgba(180, 100, 255, 0.7)', // neon purple
  'rgba(140, 80, 255, 0.5)',
  'rgba(200, 120, 255, 0.6)'
];

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<any[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Generate particles
    particles.current = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: randomBetween(0, width),
      y: randomBetween(0, height),
      r: randomBetween(2, 6),
      dx: randomBetween(-0.15, 0.15),
      dy: randomBetween(-0.1, 0.1),
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      glow: randomBetween(12, 32)
    }));

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      for (const p of particles.current) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.glow;
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.restore();
      }
    }

    function animate() {
      for (const p of particles.current) {
        p.x += p.dx;
        p.y += p.dy;
        // Wrap around
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
      }
      draw();
      requestAnimationFrame(animate);
    }

    animate();

    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }
    window.addEventListener('resize', handleResize);

    // Parallax effect
    function handleScroll() {
      const scrollY = window.scrollY;
      canvas.style.transform = `translateY(${scrollY * 0.08}px)`;
    }
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.7,
        background: 'transparent',
        transition: 'opacity 0.5s',
      }}
      aria-hidden="true"
    />
  );
};

export default ParticleBackground; 