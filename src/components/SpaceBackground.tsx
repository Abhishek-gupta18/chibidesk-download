import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  brightness: number;
  speed: number;
  twinkleOffset: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  active: boolean;
  nextLaunchTime: number;
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
    const shootingStars: ShootingStar[] = [];
    const SHOOT_COUNT = 5;

    // Stagger initial launch times across the first ~12 seconds
    for (let i = 0; i < SHOOT_COUNT; i++) {
      shootingStars.push({
        x: 0,
        y: 0,
        length: 0,
        speed: 0,
        angle: 0,
        alpha: 0,
        active: false,
        nextLaunchTime: 800 + i * 2200, // 0.8s, 3s, 5.2s, 7.4s, 9.6s
      });
    }

    const launchShootingStar = (ss: ShootingStar, time: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ss.x = Math.random() * w * 0.6 + w * 0.1;
      ss.y = Math.random() * h * 0.3 + 20;
      ss.length = Math.random() * 100 + 60;
      ss.speed = Math.random() * 6 + 5;
      ss.angle = (Math.PI / 5) + Math.random() * (Math.PI / 7); // ~36-60°
      ss.alpha = 1;
      ss.active = true;
      ss.nextLaunchTime = time + 4000 + Math.random() * 6000; // 4-10s gap between shots
    };

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
          size: Math.random() * 1.8 + 0.4,
          brightness: Math.random() * 0.6 + 0.4,
          speed: Math.random() * 2 + 0.5,
          twinkleOffset: Math.random() * Math.PI * 2,
        });
      }
    };

    const draw = (time: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      // Subtle nebula glow
      const nebulaGrad = ctx.createRadialGradient(
        w * 0.5, h * 0.4, 0,
        w * 0.5, h * 0.4, w * 0.5,
      );
      nebulaGrad.addColorStop(0, "rgba(88, 101, 242, 0.04)");
      nebulaGrad.addColorStop(0.4, "rgba(88, 101, 242, 0.015)");
      nebulaGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = nebulaGrad;
      ctx.fillRect(0, 0, w, h);

      // Secondary glow
      const coolGrad = ctx.createRadialGradient(
        w * 0.7, h * 0.6, 0,
        w * 0.7, h * 0.6, w * 0.35,
      );
      coolGrad.addColorStop(0, "rgba(100, 140, 255, 0.025)");
      coolGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = coolGrad;
      ctx.fillRect(0, 0, w, h);

      // ── Stars with visible twinkling ──
      const t = time * 0.001;
      for (const star of stars) {
        // Two sine waves at different speeds for organic feel
        const wave1 = Math.sin(t * star.speed + star.twinkleOffset);
        const wave2 = Math.sin(t * star.speed * 1.7 + star.twinkleOffset * 2.3);
        const twinkle = (wave1 * 0.5 + wave2 * 0.3) * 0.5 + 0.5; // range ~0.1 to ~0.9
        const alpha = star.brightness * twinkle;

        // Core dot
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();

        // Glow halo on brighter / twinkling-high moments
        if (alpha > 0.45) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200, 210, 255, ${(alpha - 0.45) * 0.12})`;
          ctx.fill();
        }
      }

      // ── Shooting stars ──
      for (const ss of shootingStars) {
        // Time to launch?
        if (!ss.active && time >= ss.nextLaunchTime) {
          launchShootingStar(ss, time);
        }

        if (!ss.active) continue;

        // Move
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;

        // Fade: bright for first 200ms, then fade over next 400ms
        const age = time - (ss.nextLaunchTime - 4000); // approximate birth
        const fadeStart = 200;
        const fadeDuration = 500;
        if (age < fadeStart) {
          ss.alpha = 1;
        } else if (age < fadeStart + fadeDuration) {
          ss.alpha = 1 - (age - fadeStart) / fadeDuration;
        } else {
          ss.active = false;
          continue;
        }

        // Off-screen check
        if (ss.x > w + 50 || ss.y > h + 50) {
          ss.active = false;
          continue;
        }

        // Trail
        const tailX = ss.x - Math.cos(ss.angle) * ss.length;
        const tailY = ss.y - Math.sin(ss.angle) * ss.length;

        const gradient = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
        gradient.addColorStop(0, "rgba(255, 255, 255, 0)");
        gradient.addColorStop(0.6, `rgba(180, 195, 255, ${ss.alpha * 0.25})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, ${ss.alpha * 0.95})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(ss.x, ss.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.stroke();

        // Head dot
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${ss.alpha})`;
        ctx.fill();

        // Outer head glow
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, 7, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 200, 255, ${ss.alpha * 0.12})`;
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
