import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  brightness: number;
  speed: number;
}

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let stars: Star[] = [];
    const STAR_COUNT = 200;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    const createStars = () => {
      stars = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          z: Math.random() * 1000,
          size: Math.random() * 1.5 + 0.3,
          brightness: Math.random() * 0.7 + 0.3,
          speed: Math.random() * 0.3 + 0.05,
        });
      }
    };

    const draw = (time: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      // Subtle nebula glow
      const nebulaGrad = ctx.createRadialGradient(w * 0.5, h * 0.4, 0, w * 0.5, h * 0.4, w * 0.5);
      nebulaGrad.addColorStop(0, "rgba(255, 107, 0, 0.03)");
      nebulaGrad.addColorStop(0.4, "rgba(255, 107, 0, 0.01)");
      nebulaGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = nebulaGrad;
      ctx.fillRect(0, 0, w, h);

      // Secondary cool glow
      const coolGrad = ctx.createRadialGradient(w * 0.7, h * 0.6, 0, w * 0.7, h * 0.6, w * 0.35);
      coolGrad.addColorStop(0, "rgba(100, 140, 255, 0.02)");
      coolGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = coolGrad;
      ctx.fillRect(0, 0, w, h);

      // Draw stars
      const t = time * 0.001;
      for (const star of stars) {
        const twinkle = Math.sin(t * star.speed * 2 + star.x * 0.01) * 0.3 + 0.7;
        const alpha = star.brightness * twinkle;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();

        // Subtle glow around brighter stars
        if (star.brightness > 0.6) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.08})`;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      resize();
      createStars();
    };

    resize();
    createStars();
    animId = requestAnimationFrame(draw);

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
