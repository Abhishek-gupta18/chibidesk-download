import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  brightness: number;
  speed: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  active: boolean;
  born: number;
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

    // ── Shooting stars ──
    const SHOOTING_STAR_COUNT = 5;
    const shootingStars: ShootingStar[] = [];
    const SHOOT_INTERVAL = 3500; // ms between each shooting star launch

    function resetShootingStar(ss: ShootingStar, time: number) {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ss.x = Math.random() * w * 0.7 + w * 0.15;
      ss.y = Math.random() * h * 0.35;
      ss.length = Math.random() * 80 + 40;
      ss.speed = Math.random() * 4 + 3;
      ss.angle = (Math.PI / 6) + Math.random() * (Math.PI / 8); // ~30-52° downward-right
      ss.alpha = 1;
      ss.active = true;
      ss.born = time;
    }

    // Pre-seed with staggered birth times so they don't all fire at once
    for (let i = 0; i < SHOOTING_STAR_COUNT; i++) {
      shootingStars.push({
        x: 0,
        y: 0,
        length: 60,
        speed: 4,
        angle: Math.PI / 5,
        alpha: 0,
        active: false,
        born: i * SHOOT_INTERVAL + 500,
      });
    }

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
      nebulaGrad.addColorStop(0, "rgba(88, 101, 242, 0.03)");
      nebulaGrad.addColorStop(0.4, "rgba(88, 101, 242, 0.01)");
      nebulaGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = nebulaGrad;
      ctx.fillRect(0, 0, w, h);

      // Secondary cool glow
      const coolGrad = ctx.createRadialGradient(w * 0.7, h * 0.6, 0, w * 0.7, h * 0.6, w * 0.35);
      coolGrad.addColorStop(0, "rgba(100, 140, 255, 0.02)");
      coolGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = coolGrad;
      ctx.fillRect(0, 0, w, h);

      // Draw static stars
      const t = time * 0.001;
      for (const star of stars) {
        const twinkle = Math.sin(t * star.speed * 2 + star.x * 0.01) * 0.3 + 0.7;
        const alpha = star.brightness * twinkle;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();

        if (star.brightness > 0.6) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.08})`;
          ctx.fill();
        }
      }

      // ── Shooting stars ──
      for (const ss of shootingStars) {
        // Launch if enough time has passed since last cycle
        if (!ss.active && time - ss.born >= SHOOT_INTERVAL * SHOOTING_STAR_COUNT) {
          resetShootingStar(ss, time);
        }

        if (!ss.active) continue;

        // Move
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;

        // Fade out over ~600ms
        const age = time - ss.born;
        const fadeDuration = 600;
        if (age > fadeDuration) {
          ss.active = false;
          ss.born = time;
          continue;
        }
        ss.alpha = 1 - age / fadeDuration;

        // Draw trail
        const tailX = ss.x - Math.cos(ss.angle) * ss.length;
        const tailY = ss.y - Math.sin(ss.angle) * ss.length;

        const gradient = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
        gradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
        gradient.addColorStop(0.7, `rgba(200, 210, 255, ${ss.alpha * 0.3})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, ${ss.alpha * 0.9})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(ss.x, ss.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.lineCap = "round";
        ctx.stroke();

        // Head glow
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${ss.alpha})`;
        ctx.fill();

        // Outer glow
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 200, 255, ${ss.alpha * 0.15})`;
        ctx.fill();
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
