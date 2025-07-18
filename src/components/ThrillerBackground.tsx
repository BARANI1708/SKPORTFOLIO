import React, { useRef, useEffect } from 'react';

// Helper: random between min and max
function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

// Lightning bolt generator
function drawLightning(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const startX = rand(width * 0.2, width * 0.8);
  let x = startX;
  let y = 0;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x, y);
  let segments = rand(10, 20);
  for (let i = 0; i < segments; i++) {
    x += rand(-20, 20);
    y += height / segments;
    ctx.lineTo(x, y);
  }
  ctx.shadowColor = 'rgba(180,180,255,0.8)';
  ctx.shadowBlur = 24;
  ctx.strokeStyle = 'rgba(180,180,255,0.9)';
  ctx.lineWidth = 2.5;
  ctx.stroke();
  ctx.restore();
}

// Particle class
class Particle {
  x: number; y: number; r: number; dx: number; dy: number; color: string;
  constructor(width: number, height: number) {
    this.x = rand(0, width);
    this.y = rand(0, height);
    this.r = rand(0.5, 2.5);
    this.dx = rand(-0.2, 0.2);
    this.dy = rand(-0.1, 0.1);
    const colors = [
      'rgba(255,0,120,0.5)',
      'rgba(0,200,255,0.5)',
      'rgba(180,0,255,0.5)',
      'rgba(255,255,255,0.3)'
    ];
    this.color = colors[Math.floor(rand(0, colors.length))];
  }
  update(width: number, height: number) {
    this.x += this.dx;
    this.y += this.dy;
    if (this.x < 0 || this.x > width) this.dx *= -1;
    if (this.y < 0 || this.y > height) this.dy *= -1;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.restore();
  }
}

const ThrillerBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const lightningTimer = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Particle setup
    const particleCount = width < 600 ? 30 : 60;
    particles.current = Array.from({ length: particleCount }, () => new Particle(width, height));

    let lastLightning = 0;
    let lightningActive = false;
    let lightningAlpha = 0;

    function animate(ts: number) {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = window.devicePixelRatio || 1;
      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      // Background gradient
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, '#0a0020');
      grad.addColorStop(0.5, '#1a0030');
      grad.addColorStop(1, '#18003a');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
      // Neon radial overlays
      const neon = ctx.createRadialGradient(width*0.7, height*0.3, 80, width*0.7, height*0.3, width*0.7);
      neon.addColorStop(0, 'rgba(0,200,255,0.25)');
      neon.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.globalAlpha = 1;
      ctx.fillStyle = neon;
      ctx.fillRect(0, 0, width, height);
      const neon2 = ctx.createRadialGradient(width*0.3, height*0.7, 60, width*0.3, height*0.7, width*0.6);
      neon2.addColorStop(0, 'rgba(255,0,120,0.18)');
      neon2.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = neon2;
      ctx.fillRect(0, 0, width, height);
      // Animate particles
      for (const p of particles.current) {
        p.update(width, height);
        p.draw(ctx);
      }
      // Animate lightning
      if (ts - lastLightning > rand(1200, 3000)) {
        lightningActive = true;
        lightningAlpha = 1;
        lastLightning = ts;
      }
      if (lightningActive) {
        ctx.save();
        ctx.globalAlpha = lightningAlpha;
        drawLightning(ctx, width, height);
        ctx.restore();
        lightningAlpha -= 0.08;
        if (lightningAlpha <= 0) {
          lightningActive = false;
        }
      }
      // Overlay for readability
      ctx.save();
      ctx.globalAlpha = 0.45;
      ctx.fillStyle = '#0a0020';
      ctx.fillRect(0, 0, width, height);
      ctx.restore();
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
    return () => { /* cleanup not needed for animationFrame */ };
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
      }}
      aria-hidden="true"
    />
  );
};

export default ThrillerBackground; 