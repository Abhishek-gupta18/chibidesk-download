import { useState, useEffect, useRef, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  Download,
  Monitor,
  Zap,
  Sparkles,
  Palette,
  Shield,
  Search,
  MessageCircle,
  Upload,
  Star,
  ArrowRight,
  ChevronRight,
  TrendingUp,
  Users,
  Clock,
  Heart,
  Package,
  ExternalLink,
  BarChart3,
  ShoppingCart,
} from "lucide-react";
import { Link } from "react-router";
import SpaceBackground from "@/components/SpaceBackground";

/* ────────────────────────────────────────────
   Helpers
   ──────────────────────────────────────────── */

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

/* ────────────────────────────────────────────
   Mock catalog data
   ──────────────────────────────────────────── */

interface CatalogItem {
  id: string;
  title: string;
  author: string;
  category: string;
  price: number;
  rating: number;
  downloads: number;
  description: string;
  tags: string[];
  featured: boolean;
}

const CATALOG: CatalogItem[] = [
  {
    id: "neon-glow-pack",
    title: "Neon Glow Widget Pack",
    author: "ChibiStudio",
    category: "Widgets",
    price: 0,
    rating: 4.9,
    downloads: 12400,
    description: "A collection of animated neon widgets for your desktop. Includes clock, weather, and system monitor.",
    tags: ["animated", "neon", "widgets"],
    featured: true,
  },
  {
    id: "pixel-pets",
    title: "Pixel Pets",
    author: "RetroDesk",
    category: "Characters",
    price: 2.99,
    rating: 4.8,
    downloads: 8700,
    description: "Adorable pixel-art pets that roam your desktop. They react to your activity and can be customized.",
    tags: ["pixel", "pets", "interactive"],
    featured: true,
  },
  {
    id: "minimal-clock",
    title: "Minimal Clock Overlay",
    author: "CleanUI",
    category: "Widgets",
    price: 0,
    rating: 4.7,
    downloads: 15200,
    description: "A sleek, minimal clock overlay that blends into any desktop setup. Fully customizable fonts and colors.",
    tags: ["clock", "minimal", "overlay"],
    featured: false,
  },
  {
    id: "anime-wallpaper-set",
    title: "Anime Wallpaper Collection",
    author: "OtakuDesk",
    category: "Wallpapers",
    price: 4.99,
    rating: 4.6,
    downloads: 6300,
    description: "20 high-quality anime wallpapers optimized for ChibiDesk's parallax depth effect.",
    tags: ["anime", "wallpaper", "parallax"],
    featured: false,
  },
  {
    id: "system-monitor-pro",
    title: "System Monitor Pro",
    author: "TechWidgets",
    category: "Widgets",
    price: 1.99,
    rating: 4.8,
    downloads: 9800,
    description: "Real-time CPU, RAM, GPU, and network monitoring with beautiful animated graphs.",
    tags: ["system", "monitor", "graphs"],
    featured: true,
  },
  {
    id: "forest-spirit",
    title: "Forest Spirit",
    author: "NatureDesk",
    category: "Characters",
    price: 0,
    rating: 4.5,
    downloads: 4200,
    description: "A gentle animated forest spirit that guards your desktop. Changes appearance based on time of day.",
    tags: ["nature", "spirit", "day-night"],
    featured: false,
  },
];

const CATEGORIES = ["All", "Widgets", "Characters", "Wallpapers"];

/* ────────────────────────────────────────────
   Navigation
   ──────────────────────────────────────────── */

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
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF6B00]/10 border border-[#FF6B00]/20 group-hover:bg-[#FF6B00]/15 transition-colors">
            <span className="font-[JetBrains_Mono] text-sm font-bold text-[#FF6B00]">
              C
            </span>
          </div>
          <span className="text-sm font-semibold tracking-wide text-white/90">
            ChibiDesk
          </span>
        </Link>

        <div className="hidden sm:flex items-center gap-8">
          <a
            href="#features"
            className="text-xs font-medium text-white/50 hover:text-white/80 transition-colors tracking-wide uppercase"
          >
            Features
          </a>
          <Link
            to="/catalog"
            className="text-xs font-medium text-white/50 hover:text-white/80 transition-colors tracking-wide uppercase"
          >
            Catalog
          </Link>
          <a
            href="#community"
            className="text-xs font-medium text-white/50 hover:text-white/80 transition-colors tracking-wide uppercase"
          >
            Community
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

/* ────────────────────────────────────────────
   Hero — cinematic space with bold headline
   ──────────────────────────────────────────── */

function Hero() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);
  const scale = useTransform(scrollY, [0, 600], [1, 0.96]);
  const y = useTransform(scrollY, [0, 600], [0, 60]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div className="absolute inset-0 z-0" style={{ opacity }}>
        <SpaceBackground />
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-[#0A0A0A] z-10" />

      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-20 mx-auto max-w-4xl px-6 text-center"
      >
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
            v1.0 &middot; Windows 10/11 &middot; Free
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] text-white"
        >
          Your desktop,
          <br />
          <span className="relative">
            <span className="text-[#FF6B00]">your rules.</span>
            <motion.span
              className="absolute -bottom-2 left-0 right-0 h-1 bg-[#FF6B00]/30 rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              style={{ transformOrigin: "left" }}
            />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-6 sm:mt-8 text-base sm:text-lg text-white/40 max-w-xl mx-auto leading-relaxed"
        >
          ChibiDesk is a dedicated Windows desktop customization app.
          Animated widgets, visual overlays, and a growing community marketplace — zero complexity.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#download"
            className="group inline-flex items-center gap-2.5 rounded-xl bg-[#FF6B00] px-7 py-3.5 text-sm font-semibold text-black hover:bg-[#FF8533] transition-all duration-200 hover:shadow-[0_0_40px_rgba(255,107,0,0.3)]"
          >
            <Download className="h-4 w-4" />
            Download for Windows
          </a>
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 rounded-xl border border-[#2A2A2A] bg-[#181818]/60 px-7 py-3.5 text-sm font-medium text-white/60 hover:text-white/80 hover:border-[#3A3A3A] transition-all duration-200 backdrop-blur-sm"
          >
            Browse Catalog
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-6 font-[JetBrains_Mono] text-[11px] text-white/25 tracking-wide"
        >
          No account required &middot; Free forever &middot; Open marketplace
        </motion.p>
      </motion.div>
    </section>
  );
}

/* ────────────────────────────────────────────
   Stats ribbon — social proof
   ──────────────────────────────────────────── */

function StatsRibbon() {
  const stats = [
    { icon: Users, value: "12K+", label: "Active users" },
    { icon: Package, value: "200+", label: "Themes & widgets" },
    { icon: Download, value: "85K+", label: "Downloads" },
    { icon: Star, value: "4.8", label: "Average rating" },
  ];

  return (
    <section className="relative z-20 bg-[#0A0A0A] py-12 border-b border-[#2A2A2A]/40">
      <div className="mx-auto max-w-6xl px-6 grid grid-cols-2 sm:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <FadeIn key={s.label} delay={i * 0.1} className="text-center">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF6B00]/8 border border-[#FF6B00]/10 mb-3">
              <s.icon className="h-4 w-4 text-[#FF6B00]/60" />
            </div>
            <p className="text-2xl font-bold text-white/90 tracking-tight">
              {s.value}
            </p>
            <p className="text-[11px] font-[JetBrains_Mono] text-white/30 mt-1 tracking-wide">
              {s.label}
            </p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────
   Features
   ──────────────────────────────────────────── */

const features = [
  {
    icon: Sparkles,
    title: "Animated Widgets",
    desc: "Bring animated characters and visual elements directly onto your Windows desktop. Widgets react to your activity and time of day.",
    color: "#FF6B00",
  },
  {
    icon: Zap,
    title: "Lightweight Engine",
    desc: "Minimal resource usage. ChibiDesk runs quietly in the background without slowing your system down.",
    color: "#00D4AA",
  },
  {
    icon: Palette,
    title: "Visual Personalization",
    desc: "Customize your desktop with drag-and-drop simplicity. Mix and match themes, widgets, and wallpapers.",
    color: "#7C5CFC",
  },
  {
    icon: Shield,
    title: "Clean & Safe",
    desc: "No ads, no bloatware, no system modifications. Just a clean overlay manager that respects your PC.",
    color: "#00B4D8",
  },
  {
    icon: ShoppingCart,
    title: "Community Marketplace",
    desc: "Browse, buy, and share themes created by the community. Upload your own creations and earn.",
    color: "#FF6B00",
  },
  {
    icon: MessageCircle,
    title: "Social Features",
    desc: "Comment on themes, follow creators, and share your desktop setup with the community.",
    color: "#00D4AA",
  },
];

function Features() {
  return (
    <section id="features" className="relative z-20 bg-[#0A0A0A] py-28 sm:py-36">
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
            ChibiDesk strips away the complexity. No fragmented tools, no heavy configs — just visual elements on your desktop and a marketplace to discover more.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.08}>
              <div
                className="group relative rounded-xl border border-[#2A2A2A]/80 bg-[#141414]/60 p-6 sm:p-7 hover:border-[#FF6B00]/20 hover:bg-[#1A1A1A]/60 transition-all duration-300"
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "800px",
                }}
              >
                <div
                  className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg border transition-colors"
                  style={{
                    backgroundColor: `${f.color}08`,
                    borderColor: `${f.color}15`,
                  }}
                >
                  <f.icon
                    className="h-4 w-4"
                    style={{ color: `${f.color}B0` }}
                  />
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

/* ────────────────────────────────────────────
   Catalog preview — browse, search
   ──────────────────────────────────────────── */

function CatalogPreview() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    return CATALOG.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;
      const matchesSearch =
        search === "" ||
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.tags.some((t) => t.includes(search.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  return (
    <section
      id="catalog"
      className="relative z-20 bg-[#080808] py-28 sm:py-36"
    >
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn className="text-center mb-12">
          <p className="font-[JetBrains_Mono] text-[11px] font-medium text-[#00D4AA]/80 tracking-widest uppercase mb-4">
            Marketplace
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Discover themes
            <br />
            <span className="text-white/40">built by the community.</span>
          </h2>
          <p className="mt-5 text-sm sm:text-base text-white/35 max-w-lg mx-auto leading-relaxed">
            Browse hundreds of widgets, characters, and wallpapers created by ChibiDesk users. Download free packs or purchase premium content.
          </p>
        </FadeIn>

        {/* Search + filters */}
        <FadeIn delay={0.1} className="mb-10">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
              <input
                type="text"
                placeholder="Search themes, widgets, wallpapers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-[#2A2A2A] bg-[#141414]/80 pl-10 pr-4 py-3 text-sm text-white/80 placeholder:text-white/25 focus:outline-none focus:border-[#FF6B00]/30 transition-colors"
              />
            </div>
            <div className="flex items-center gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                    activeCategory === cat
                      ? "bg-[#FF6B00]/15 text-[#FF6B00] border border-[#FF6B00]/20"
                      : "text-white/40 hover:text-white/60 border border-transparent"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <Link
                  to={`/item/${item.id}`}
                  className="group block rounded-xl border border-[#2A2A2A]/80 bg-[#141414]/60 overflow-hidden hover:border-[#FF6B00]/20 hover:bg-[#1A1A1A]/60 transition-all duration-300"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Color accent bar */}
                  <div
                    className="h-1 w-full"
                    style={{
                      background: `linear-gradient(90deg, ${item.featured ? "#FF6B00" : "#333"}, transparent)`,
                    }}
                  />
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-[11px] text-white/30 mt-0.5">
                          by {item.author}
                        </p>
                      </div>
                      {item.price === 0 ? (
                        <span className="rounded-md bg-[#00D4AA]/10 border border-[#00D4AA]/20 px-2 py-0.5 text-[10px] font-[JetBrains_Mono] font-medium text-[#00D4AA]">
                          Free
                        </span>
                      ) : (
                        <span className="rounded-md bg-[#FF6B00]/10 border border-[#FF6B00]/20 px-2 py-0.5 text-[10px] font-[JetBrains_Mono] font-medium text-[#FF6B00]">
                          ${item.price}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-white/30 leading-relaxed mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-[10px] text-white/25 font-[JetBrains_Mono]">
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-[#FF6B00]/50" />
                          {item.rating}
                        </span>
                        <span className="flex items-center gap-1">
                          <Download className="h-3 w-3" />
                          {item.downloads.toLocaleString()}
                        </span>
                      </div>
                      <ChevronRight className="h-3.5 w-3.5 text-white/15 group-hover:text-[#FF6B00]/40 transition-colors" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <FadeIn delay={0.2} className="mt-10 text-center">
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 rounded-xl border border-[#2A2A2A] bg-[#141414]/60 px-6 py-3 text-sm font-medium text-white/50 hover:text-white/70 hover:border-[#3A3A3A] transition-all"
          >
            View all items
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────
   Community
   ──────────────────────────────────────────── */

function Community() {
  const comments = [
    {
      user: "PixelFan42",
      text: "The Neon Glow pack is amazing — my desktop looks incredible now!",
      time: "2 hours ago",
      likes: 24,
    },
    {
      user: "DeskCustomizer",
      text: "Just uploaded my first theme. The upload process was so smooth.",
      time: "5 hours ago",
      likes: 18,
    },
    {
      user: "ChibiLover",
      text: "Finally a desktop app that doesn't eat my RAM. Love it.",
      time: "1 day ago",
      likes: 41,
    },
  ];

  return (
    <section
      id="community"
      className="relative z-20 bg-[#0A0A0A] py-28 sm:py-36"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — copy */}
          <FadeIn>
            <p className="font-[JetBrains_Mono] text-[11px] font-medium text-[#7C5CFC]/80 tracking-widest uppercase mb-4">
              Community
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              Share, comment,
              <br />
              <span className="text-white/40">and create together.</span>
            </h2>
            <p className="mt-5 text-sm text-white/35 leading-relaxed max-w-md">
              ChibiDesk is more than a tool — it is a growing community of desktop enthusiasts. Upload your themes, leave feedback, and connect with creators.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <Link
                to="/auth"
                className="inline-flex items-center gap-2 rounded-xl bg-[#FF6B00] px-5 py-2.5 text-xs font-semibold text-black hover:bg-[#FF8533] transition-colors"
              >
                <Upload className="h-3.5 w-3.5" />
                Upload a theme
              </Link>
              <a
                href="#catalog"
                className="inline-flex items-center gap-2 rounded-xl border border-[#2A2A2A] px-5 py-2.5 text-xs font-medium text-white/50 hover:text-white/70 transition-colors"
              >
                Join the community
              </a>
            </div>
          </FadeIn>

          {/* Right — comments */}
          <FadeIn delay={0.15}>
            <div className="space-y-3">
              {comments.map((c, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-[#2A2A2A]/60 bg-[#141414]/50 p-4 hover:border-[#2A2A2A] transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-white/70">
                      {c.user}
                    </span>
                    <span className="text-[10px] font-[JetBrains_Mono] text-white/20">
                      {c.time}
                    </span>
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed">
                    {c.text}
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-[10px] text-white/20">
                    <Heart className="h-3 w-3" />
                    {c.likes}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────
   Upload / Creator CTA
   ──────────────────────────────────────────── */

function CreatorCTA() {
  return (
    <section className="relative z-20 bg-[#080808] py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn>
          <div className="relative overflow-hidden rounded-2xl border border-[#2A2A2A]/80 bg-[#111111]/80">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7C5CFC]/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B00]/5 via-transparent to-[#7C5CFC]/5" />

            <div className="relative px-8 sm:px-14 py-14 sm:py-20 flex flex-col sm:flex-row items-center gap-10">
              <div className="flex-1">
                <p className="font-[JetBrains_Mono] text-[11px] font-medium text-[#7C5CFC]/80 tracking-widest uppercase mb-4">
                  For creators
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Build themes. Share them.
                  <br />
                  <span className="text-white/40">Grow your audience.</span>
                </h2>
                <p className="mt-4 text-sm text-white/35 leading-relaxed max-w-md">
                  ChibiDesk gives creators a marketplace to publish widgets, characters, and wallpapers. Set your own price, track downloads, and manage everything from a single dashboard.
                </p>
                <div className="mt-6 flex items-center gap-6 text-[11px] font-[JetBrains_Mono] text-white/25">
                  <span className="flex items-center gap-1.5">
                    <BarChart3 className="h-3 w-3 text-[#FF6B00]/50" />
                    Analytics dashboard
                  </span>
                  <span className="flex items-center gap-1.5">
                    <TrendingUp className="h-3 w-3 text-[#00D4AA]/50" />
                    Revenue tracking
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="h-3 w-3 text-[#7C5CFC]/50" />
                    Audience insights
                  </span>
                </div>
              </div>
              <div className="shrink-0">
                <Link
                  to="/auth"
                  className="inline-flex items-center gap-2.5 rounded-xl bg-[#FF6B00] px-7 py-3.5 text-sm font-semibold text-black hover:bg-[#FF8533] transition-all hover:shadow-[0_0_40px_rgba(255,107,0,0.25)]"
                >
                  Start creating
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────
   Download section
   ──────────────────────────────────────────── */

function DownloadSection() {
  return (
    <section
      id="download"
      className="relative z-20 bg-[#0A0A0A] py-28 sm:py-36"
    >
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn>
          <div className="relative overflow-hidden rounded-2xl border border-[#2A2A2A]/80 bg-[#111111]/80">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF6B00]/30 to-transparent" />

            <div className="px-8 sm:px-14 py-14 sm:py-20 flex flex-col items-center text-center">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF6B00]/8 border border-[#FF6B00]/15">
                <Download className="h-6 w-6 text-[#FF6B00]" />
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Download ChibiDesk
              </h2>
              <p className="mt-4 text-sm text-white/40 max-w-md leading-relaxed">
                Free for personal use. No account required. Download, install, and start customizing your Windows desktop in under a minute.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href="#"
                  className="inline-flex items-center gap-2.5 rounded-xl bg-[#FF6B00] px-8 py-3.5 text-sm font-semibold text-black hover:bg-[#FF8533] transition-all duration-200 hover:shadow-[0_0_40px_rgba(255,107,0,0.3)]"
                >
                  <Download className="h-4 w-4" />
                  Download v1.0
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-xl border border-[#2A2A2A] bg-[#181818]/60 px-6 py-3.5 text-xs font-medium text-white/50 hover:text-white/70 hover:border-[#3A3A3A] transition-all"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  View changelog
                </a>
              </div>

              <div className="mt-8 flex items-center gap-6 text-[11px] font-[JetBrains_Mono] text-white/25 tracking-wide">
                <span>Windows 10/11</span>
                <span className="h-3 w-px bg-white/10" />
                <span>~15 MB</span>
                <span className="h-3 w-px bg-white/10" />
                <span>No account needed</span>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────
   Footer
   ──────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="relative z-20 bg-[#0A0A0A] border-t border-[#2A2A2A]/50">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#FF6B00]/10 border border-[#FF6B00]/20">
                <span className="font-[JetBrains_Mono] text-xs font-bold text-[#FF6B00]">
                  C
                </span>
              </div>
              <span className="text-xs font-semibold text-white/70">
                ChibiDesk
              </span>
            </div>
            <p className="text-[11px] text-white/25 leading-relaxed max-w-xs">
              A dedicated Windows desktop customization app. Animated widgets, visual overlays, and a community marketplace.
            </p>
          </div>
          <div>
            <p className="text-[10px] font-[JetBrains_Mono] text-white/30 tracking-widest uppercase mb-3">
              Product
            </p>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-xs text-white/25 hover:text-white/50 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <Link to="/catalog" className="text-xs text-white/25 hover:text-white/50 transition-colors">
                  Marketplace
                </Link>
              </li>
              <li>
                <a href="#download" className="text-xs text-white/25 hover:text-white/50 transition-colors">
                  Download
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-[JetBrains_Mono] text-white/30 tracking-widest uppercase mb-3">
              Company
            </p>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-xs text-white/25 hover:text-white/50 transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-xs text-white/25 hover:text-white/50 transition-colors">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="text-xs text-white/25 hover:text-white/50 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#2A2A2A]/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[11px] text-white/20">
            &copy; {new Date().getFullYear()} ChibiDesk. All rights reserved.
          </span>
          <span className="font-[JetBrains_Mono] text-[10px] text-white/15">
            v1.0.0
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ────────────────────────────────────────────
   Page
   ──────────────────────────────────────────── */

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Nav />
      <main>
        <Hero />
        <StatsRibbon />
        <Features />
        <CatalogPreview />
        <Community />
        <CreatorCTA />
        <DownloadSection />
      </main>
      <Footer />
    </div>
  );
}
