import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Download, Monitor, Zap, Sparkles, Palette, Shield } from "lucide-react";
import SpaceBackground from "@/components/SpaceBackground";

/* ─── Fade-in-on-scroll wrapper ─── */
function FadeIn({
  children,
  className = "",
  delay = 0,
  y = 24,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Features data ─── */
const features = [
  {
    icon: Sparkles,
    title: "Animated Widgets",
    desc: "Bring animated characters and visual elements directly onto your Windows desktop.",
  },
  {
    icon: Zap,
    title: "Lightweight Engine",
    desc: "Minimal resource usage. ChibiDesk runs quietly in the background without slowing your system.",
  },
  {
    icon: Palette,
    title: "Visual Personalization",
    desc: "Customize your desktop with drag-and-drop simplicity. No complex configs required.",
  },
  {
    icon: Shield,
    title: "Clean & Safe",
    desc: "No ads, no bloatware, no system modifications. Just a clean overlay manager.",
  },
  {
    icon: Monitor,
    title: "Desktop Overlay",
    desc: "A dedicated overlay system that sits on your desktop without interfering with your workflow.",
  },
  {
    icon: Download,
    title: "One-Click Install",
    desc: "Download, install, and start customizing. No API keys, no accounts, no friction.",
  },
];

/* ─── Navigation ─── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0F0F0F]/80 backdrop-blur-xl border-b border-[#2A2A2A]/60"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF6B00]/10 border border-[#FF6B00]/20 group-hover:bg-[#FF6B00]/15 transition-colors">
            <span className="font-[JetBrains_Mono] text-sm font-bold text-[#FF6B00]">
              C
            </span>
          </div>
          <span className="text-sm font-semibold tracking-wide text-white/90">
            ChibiDesk
          </span>
        </a>

        <div className="hidden sm:flex items-center gap-8">
          <a
            href="#features"
            className="text-xs font-medium text-white/50 hover:text-white/80 transition-colors tracking-wide uppercase"
          >
            Features
          </a>
          <a
            href="#download"
            className="text-xs font-medium text-white/50 hover:text-white/80 transition-colors tracking-wide uppercase"
          >
            Download
          </a>
          <a
            href="#download"
            className="inline-flex items-center gap-2 rounded-lg bg-[#FF6B00] px-4 py-2 text-xs font-semibold text-black hover:bg-[#FF8533] transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            Get ChibiDesk
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ─── Hero ─── */
function Hero() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);
  const scale = useTransform(scrollY, [0, 600], [1, 0.96]);
  const y = useTransform(scrollY, [0, 600], [0, 60]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Space background fades out on scroll */}
      <motion.div className="absolute inset-0 z-0" style={{ opacity }}>
        <SpaceBackground />
      </motion.div>

      {/* Gradient fade to black at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-[#0A0A0A] z-10" />

      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-20 mx-auto max-w-4xl px-6 text-center"
      >
        {/* Version badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#2A2A2A] bg-[#181818]/80 px-4 py-1.5 backdrop-blur-sm"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF6B00] opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#FF6B00]" />
          </span>
          <span className="font-[JetBrains_Mono] text-[11px] font-medium text-white/60 tracking-wide">
            v1.0 &middot; Windows 10/11
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] text-white"
        >
          Bring your desktop
          <br />
          <span className="text-[#FF6B00]">to life.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-6 sm:mt-8 text-base sm:text-lg text-white/40 max-w-xl mx-auto leading-relaxed"
        >
          ChibiDesk is a dedicated Windows desktop customization app.
          <br className="hidden sm:block" />
          Animated widgets, visual overlays, zero complexity.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#download"
            className="group inline-flex items-center gap-2.5 rounded-xl bg-[#FF6B00] px-7 py-3.5 text-sm font-semibold text-black hover:bg-[#FF8533] transition-all duration-200 hover:shadow-[0_0_32px_rgba(255,107,0,0.25)]"
          >
            <Download className="h-4 w-4" />
            Download for Windows
          </a>
          <a
            href="#features"
            className="inline-flex items-center gap-2 rounded-xl border border-[#2A2A2A] bg-[#181818]/60 px-7 py-3.5 text-sm font-medium text-white/60 hover:text-white/80 hover:border-[#3A3A3A] transition-all duration-200 backdrop-blur-sm"
          >
            Learn more
          </a>
        </motion.div>

        {/* System info */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-6 font-[JetBrains_Mono] text-[11px] text-white/25 tracking-wide"
        >
          No API key &middot; No credit card &middot; Free forever
        </motion.p>
      </motion.div>
    </section>
  );
}

/* ─── Features ─── */
function Features() {
  return (
    <section
      id="features"
      className="relative z-20 bg-[#0A0A0A] py-28 sm:py-36"
    >
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn className="text-center mb-20">
          <p className="font-[JetBrains_Mono] text-[11px] font-medium text-[#FF6B00]/80 tracking-widest uppercase mb-4">
            What it does
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Desktop personalization,
            <br />
            <span className="text-white/40">simplified.</span>
          </h2>
          <p className="mt-5 text-sm sm:text-base text-white/35 max-w-lg mx-auto leading-relaxed">
            ChibiDesk strips away the complexity of desktop customization. No fragmented tools, no heavy configs — just visual elements on your desktop.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.08}>
              <div className="group rounded-xl border border-[#2A2A2A]/80 bg-[#141414]/60 p-6 sm:p-7 hover:border-[#FF6B00]/20 hover:bg-[#1A1A1A]/60 transition-all duration-300">
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-[#FF6B00]/8 border border-[#FF6B00]/10 group-hover:bg-[#FF6B00]/12 transition-colors">
                  <f.icon className="h-4 w-4 text-[#FF6B00]/70" />
                </div>
                <h3 className="text-sm font-semibold text-white/90 mb-2">
                  {f.title}
                </h3>
                <p className="text-xs leading-relaxed text-white/35">
                  {f.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Download / CTA Section ─── */
function DownloadSection() {
  return (
    <section
      id="download"
      className="relative z-20 bg-[#0A0A0A] py-28 sm:py-36"
    >
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn>
          <div className="relative overflow-hidden rounded-2xl border border-[#2A2A2A]/80 bg-[#111111]/80">
            {/* Subtle top accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF6B00]/30 to-transparent" />

            <div className="px-8 sm:px-14 py-14 sm:py-20 flex flex-col items-center text-center">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF6B00]/8 border border-[#FF6B00]/15">
                <Download className="h-6 w-6 text-[#FF6B00]" />
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Download ChibiDesk
              </h2>
              <p className="mt-4 text-sm text-white/40 max-w-md leading-relaxed">
                Free for personal use. No account required. Just download, install, and start customizing your Windows desktop.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href="#"
                  className="inline-flex items-center gap-2.5 rounded-xl bg-[#FF6B00] px-8 py-3.5 text-sm font-semibold text-black hover:bg-[#FF8533] transition-all duration-200 hover:shadow-[0_0_32px_rgba(255,107,0,0.25)]"
                >
                  <Download className="h-4 w-4" />
                  Download v1.0
                </a>
              </div>

              <div className="mt-8 flex items-center gap-6 text-[11px] font-[JetBrains_Mono] text-white/25 tracking-wide">
                <span>Windows 10/11</span>
                <span className="h-3 w-px bg-white/10" />
                <span>~15 MB</span>
                <span className="h-3 w-px bg-white/10" />
                <span>No installers</span>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="relative z-20 bg-[#0A0A0A] border-t border-[#2A2A2A]/50">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-[JetBrains_Mono] text-xs font-semibold text-[#FF6B00]/70">
            C
          </span>
          <span className="text-xs text-white/30">
            ChibiDesk &copy; {new Date().getFullYear()}
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="#"
            className="text-[11px] text-white/25 hover:text-white/50 transition-colors"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-[11px] text-white/25 hover:text-white/50 transition-colors"
          >
            Terms
          </a>
          <a
            href="#"
            className="text-[11px] text-white/25 hover:text-white/50 transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ─── */
export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Nav />
      <main>
        <Hero />
        <Features />
        <DownloadSection />
      </main>
      <Footer />
    </div>
  );
}
