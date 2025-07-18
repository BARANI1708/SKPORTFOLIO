import React, { useRef, useEffect } from "react";

const PARTICLE_COUNT = 24;
const SPARKLE_COUNT = 12;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

export const FuturisticBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const trail = useRef<{ x: number; y: number }[]>([]);
  const sparkles = useRef(
    Array.from({ length: SPARKLE_COUNT }, () => ({
      x: randomBetween(0, window.innerWidth),
      y: randomBetween(0, window.innerHeight),
      tx: randomBetween(0, window.innerWidth),
      ty: randomBetween(0, window.innerHeight),
      r: randomBetween(2, 4),
      glow: randomBetween(16, 32),
      t: Math.random(),
    }))
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    function handleMove(e: MouseEvent | TouchEvent) {
      let x, y;
      if (e instanceof MouseEvent) {
        x = e.clientX;
        y = e.clientY;
      } else {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
      }
      mouse.current.x = x;
      mouse.current.y = y;
    }
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove);

    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }
    window.addEventListener("resize", handleResize);

    function animate() {
      // Dynamic gradient background
      const grad = ctx.createLinearGradient(
        lerp(width * 0.2, width * 0.8, mouse.current.x / width),
        lerp(height * 0.2, height * 0.8, mouse.current.y / height),
        lerp(width * 0.8, width * 0.2, mouse.current.x / width),
        lerp(height * 0.8, height * 0.2, mouse.current.y / height)
      );
      grad.addColorStop(0, "#a855f7");
      grad.addColorStop(0.25, "#7c3aed");
      grad.addColorStop(0.5, "#6d28d9");
      grad.addColorStop(0.75, "#5b21b6");
      grad.addColorStop(1, "#4c1d95");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Glowing trail
      trail.current.push({ x: mouse.current.x, y: mouse.current.y });
      if (trail.current.length > 24) trail.current.shift();
      for (let i = 0; i < trail.current.length - 1; i++) {
        const p1 = trail.current[i];
        const p2 = trail.current[i + 1];
        ctx.save();
        const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
        grad.addColorStop(0, "#a855f7");
        grad.addColorStop(1, "#c084fc");
        ctx.strokeStyle = grad;
        ctx.shadowColor = "#a855f7";
        ctx.shadowBlur = 24;
        ctx.lineWidth = 16 - (i * 12) / 24;
        ctx.globalAlpha = 0.18 + 0.12 * (1 - i / 24);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
        ctx.restore();
      }

      // Sparkles gently follow the cursor
      for (let s of sparkles.current) {
        s.tx = lerp(s.tx, mouse.current.x + randomBetween(-80, 80), 0.02);
        s.ty = lerp(s.ty, mouse.current.y + randomBetween(-80, 80), 0.02);
        s.x = lerp(s.x, s.tx, 0.08);
        s.y = lerp(s.y, s.ty, 0.08);
        ctx.save();
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
        ctx.shadowColor = "#c084fc";
        ctx.shadowBlur = s.glow;
        ctx.fillStyle = `rgba(168,85,247,${0.7 + 0.3 * Math.sin(Date.now() / 400 + s.t * 10)})`;
        ctx.fill();
        ctx.restore();
      }

      requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        transition: "background 0.5s",
      }}
    />
  );
}; 