import React, { useRef, useEffect } from "react";

const TRAIL_LENGTH = 18;
const TRAIL_FADE = 0.08;

export const NeonCursorTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trail = useRef<{ x: number; y: number }[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    function addPoint(x: number, y: number) {
      trail.current.push({ x, y });
      if (trail.current.length > TRAIL_LENGTH) trail.current.shift();
    }

    function drawTrail() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < trail.current.length - 1; i++) {
        const p1 = trail.current[i];
        const p2 = trail.current[i + 1];
        ctx.save();
        const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
        grad.addColorStop(0, "#a259ff");
        grad.addColorStop(1, "#00f0ff");
        ctx.strokeStyle = grad;
        ctx.shadowColor = "#00f0ff";
        ctx.shadowBlur = 16;
        ctx.lineWidth = 8 - (i * 6) / TRAIL_LENGTH;
        ctx.globalAlpha = 1 - (i * TRAIL_FADE);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
        ctx.restore();
      }
    }

    function animate() {
      drawTrail();
      animationRef.current = requestAnimationFrame(animate);
    }
    animate();

    function handleMove(e: MouseEvent | TouchEvent) {
      let x, y;
      if (e instanceof MouseEvent) {
        x = e.clientX;
        y = e.clientY;
      } else {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
      }
      addPoint(x, y);
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

    return () => {
      cancelAnimationFrame(animationRef.current!);
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
        zIndex: 100,
        pointerEvents: "none",
      }}
    />
  );
}; 