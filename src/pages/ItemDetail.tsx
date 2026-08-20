import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Star,
  Download,
  Heart,
  MessageCircle,
  Share2,
  ShoppingCart,
  Clock,
  Tag,
  User,
} from "lucide-react";
import { Link, useParams } from "react-router";

const CATALOG = [
  {
    id: "neon-glow-pack",
    title: "Neon Glow Widget Pack",
    author: "ChibiStudio",
    category: "Widgets",
    price: 0,
    rating: 4.9,
    downloads: 12400,
    description:
      "A collection of animated neon widgets for your desktop. Includes clock, weather, and system monitor with customizable glow effects.",
    longDescription:
      "Transform your desktop with the Neon Glow Widget Pack. This collection includes three beautifully animated widgets — a glowing digital clock, a real-time weather display with particle effects, and a system monitor with pulsing neon graphs. Each widget is fully customizable: adjust colors, glow intensity, animation speed, and positioning. The pack works seamlessly with ChibiDesk's overlay system and uses minimal system resources.",
    tags: ["animated", "neon", "widgets"],
    featured: true,
    version: "1.2.0",
    updated: "Aug 15, 2026",
    size: "2.3 MB",
    comments: [
      {
        user: "DeskMaster",
        text: "The glow effects are gorgeous. Runs smooth on my older laptop too.",
        time: "3 days ago",
        likes: 12,
      },
      {
        user: "NeonLover",
        text: "Best widget pack I have found. The clock is my favorite.",
        time: "1 week ago",
        likes: 8,
      },
    ],
  },
  {
    id: "pixel-pets",
    title: "Pixel Pets",
    author: "RetroDesk",
    category: "Characters",
    price: 2.99,
    rating: 4.8,
    downloads: 8700,
    description:
      "Adorable pixel-art pets that roam your desktop. They react to your activity and can be fully customized.",
    longDescription:
      "Pixel Pets brings a charming companion to your desktop. Choose from over a dozen pixel-art animals — cats, dogs, dragons, and more. Each pet has unique idle animations, reacts to window focus, and follows your mouse cursor. Customize colors, accessories, and behavior patterns. Pets can interact with each other when you have multiple active.",
    tags: ["pixel", "pets", "interactive"],
    featured: true,
    version: "2.0.1",
    updated: "Aug 10, 2026",
    size: "4.1 MB",
    comments: [
      {
        user: "RetroFan",
        text: "My cat and dragon love hanging out together on my desktop!",
        time: "2 days ago",
        likes: 15,
      },
    ],
  },
  {
    id: "minimal-clock",
    title: "Minimal Clock Overlay",
    author: "CleanUI",
    category: "Widgets",
    price: 0,
    rating: 4.7,
    downloads: 15200,
    description:
      "A sleek, minimal clock overlay that blends into any desktop setup.",
    longDescription:
      "The Minimal Clock Overlay does exactly what it says — a beautiful, unobtrusive clock that sits on your desktop. Choose from dozens of fonts, adjust opacity, pick your color, and position it anywhere. Supports 12/24 hour formats and can display date alongside time.",
    tags: ["clock", "minimal", "overlay"],
    featured: false,
    version: "1.5.0",
    updated: "Aug 12, 2026",
    size: "0.8 MB",
    comments: [],
  },
  {
    id: "anime-wallpaper-set",
    title: "Anime Wallpaper Collection",
    author: "OtakuDesk",
    category: "Wallpapers",
    price: 4.99,
    rating: 4.6,
    downloads: 6300,
    description:
      "20 high-quality anime wallpapers optimized for ChibiDesk's parallax depth effect.",
    longDescription:
      "Each of the 20 wallpapers in this collection has been carefully layered to work with ChibiDesk's parallax depth system. Watch your wallpaper shift subtly as you move your mouse, creating a stunning sense of depth. All wallpapers are available in 4K resolution.",
    tags: ["anime", "wallpaper", "parallax"],
    featured: false,
    version: "1.0.0",
    updated: "Aug 1, 2026",
    size: "48 MB",
    comments: [],
  },
  {
    id: "system-monitor-pro",
    title: "System Monitor Pro",
    author: "TechWidgets",
    category: "Widgets",
    price: 1.99,
    rating: 4.8,
    downloads: 9800,
    description:
      "Real-time CPU, RAM, GPU, and network monitoring with beautiful animated graphs.",
    longDescription:
      "System Monitor Pro gives you full visibility into your PC's performance. Track CPU usage, RAM allocation, GPU temperature, and network throughput in real-time. Choose from multiple graph styles — line charts, bar graphs, or circular gauges. Set alerts for when values exceed thresholds.",
    tags: ["system", "monitor", "graphs"],
    featured: true,
    version: "3.1.0",
    updated: "Aug 18, 2026",
    size: "3.7 MB",
    comments: [],
  },
  {
    id: "forest-spirit",
    title: "Forest Spirit",
    author: "NatureDesk",
    category: "Characters",
    price: 0,
    rating: 4.5,
    downloads: 4200,
    description:
      "A gentle animated forest spirit that guards your desktop.",
    longDescription:
      "The Forest Spirit is a beautifully animated character that adds a touch of nature to your desktop. During the day, cherry blossoms float around it. At night, fireflies emerge and the spirit glows softly. It reacts to your activity — sleeping when you are away, perking up when you return.",
    tags: ["nature", "spirit", "day-night"],
    featured: false,
    version: "1.1.0",
    updated: "Aug 5, 2026",
    size: "5.2 MB",
    comments: [],
  },
  {
    id: "retro-wave",
    title: "Retro Wave Pack",
    author: "SynthStudio",
    category: "Wallpapers",
    price: 3.99,
    rating: 4.7,
    downloads: 7100,
    description:
      "Synthwave-inspired wallpapers with animated grid lines and neon color shifts.",
    longDescription:
      "Dive into the retro-future with this synthwave wallpaper pack. Each wallpaper features animated grid lines that pulse to a gentle rhythm, neon sunsets that shift colors slowly, and depth layers that respond to your mouse. Perfect for late-night coding sessions.",
    tags: ["retro", "synthwave", "neon"],
    featured: false,
    version: "1.0.0",
    updated: "Jul 28, 2026",
    size: "32 MB",
    comments: [],
  },
  {
    id: "cat-companion",
    title: "Cat Companion",
    author: "CozyDesk",
    category: "Characters",
    price: 1.49,
    rating: 4.9,
    downloads: 11300,
    description:
      "A playful cat that naps, stretches, and pounces around your desktop.",
    longDescription:
      "Cat Companion is the most popular character on ChibiDesk. Your pixel cat will nap on window edges, chase your cursor, stretch when you switch windows, and purr when you hover over it. Choose from 8 color variants and unlock special accessories as you use it over time.",
    tags: ["cat", "companion", "interactive"],
    featured: true,
    version: "2.3.0",
    updated: "Aug 19, 2026",
    size: "3.1 MB",
    comments: [],
  },
  {
    id: "weather-widget",
    title: "Live Weather Widget",
    author: "ChibiStudio",
    category: "Widgets",
    price: 0,
    rating: 4.6,
    downloads: 9400,
    description:
      "Real-time weather with animated icons — rain drops, snowflakes, sun rays.",
    longDescription:
      "The Live Weather Widget automatically detects your location and displays current conditions with beautiful animations. Watch rain drops fall, snowflakes drift, or sun rays shine — all rendered in real-time on your desktop. Includes a 5-day forecast overlay and severe weather alerts.",
    tags: ["weather", "animated", "live"],
    featured: false,
    version: "1.4.0",
    updated: "Aug 14, 2026",
    size: "1.9 MB",
    comments: [],
  },
];

function getItem(id: string | undefined) {
  return CATALOG.find((item) => item.id === id);
}

export default function ItemDetail() {
  const { id } = useParams();
  const item = getItem(id);
  const [commentText, setCommentText] = useState("");
  const [liked, setLiked] = useState(false);

  if (!item) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-white/40 mb-4">Item not found</p>
          <Link
            to="/catalog"
            className="text-sm text-[#FF6B00] hover:underline"
          >
            Back to catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-[#2A2A2A]/60">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF6B00]/10 border border-[#FF6B00]/20 group-hover:bg-[#FF6B00]/15 transition-colors">
              <span className="font-[JetBrains_Mono] text-sm font-bold text-[#FF6B00]">
                C
              </span>
            </div>
            <span className="text-sm font-semibold tracking-wide text-white/90">
              ChibiDesk
            </span>
          </Link>
          <Link
            to="/catalog"
            className="text-xs font-medium text-white/40 hover:text-white/60 transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="h-3 w-3" />
            Back to catalog
          </Link>
        </div>
      </nav>

      <main className="mx-auto max-w-4xl px-6 py-12">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-[11px] font-[JetBrains_Mono] text-white/25">
          <Link to="/" className="hover:text-white/40 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/catalog" className="hover:text-white/40 transition-colors">
            Catalog
          </Link>
          <span>/</span>
          <span className="text-white/40">{item.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="rounded-md bg-[#FF6B00]/10 border border-[#FF6B00]/15 px-2 py-0.5 text-[10px] font-[JetBrains_Mono] text-[#FF6B00]/70">
                      {item.category}
                    </span>
                    {item.featured && (
                      <span className="rounded-md bg-[#FF6B00]/10 border border-[#FF6B00]/20 px-2 py-0.5 text-[10px] font-[JetBrains_Mono] text-[#FF6B00]">
                        Featured
                      </span>
                    )}
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                    {item.title}
                  </h1>
                  <p className="mt-1 text-sm text-white/30">
                    by {item.author}
                  </p>
                </div>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-4 text-[11px] font-[JetBrains_Mono] text-white/25 mb-6">
                <span className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-[#FF6B00]/50" />
                  {item.rating}
                </span>
                <span className="flex items-center gap-1">
                  <Download className="h-3 w-3" />
                  {item.downloads.toLocaleString()} downloads
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {item.updated}
                </span>
                <span className="flex items-center gap-1">
                  <Tag className="h-3 w-3" />
                  v{item.version}
                </span>
              </div>

              {/* Description */}
              <div className="rounded-xl border border-[#2A2A2A]/60 bg-[#141414]/40 p-6 mb-8">
                <h2 className="text-sm font-semibold text-white/70 mb-3">
                  About this item
                </h2>
                <p className="text-sm text-white/35 leading-relaxed">
                  {item.longDescription}
                </p>
              </div>

              {/* Tags */}
              <div className="flex items-center gap-2 mb-10">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg border border-[#2A2A2A]/60 bg-[#141414]/40 px-2.5 py-1 text-[10px] font-[JetBrains_Mono] text-white/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Comments */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-sm font-semibold text-white/70 mb-4 flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-white/30" />
                Comments ({item.comments.length})
              </h2>

              {/* Comment input */}
              <div className="rounded-xl border border-[#2A2A2A]/60 bg-[#141414]/40 p-4 mb-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2A2A2A] shrink-0">
                    <User className="h-3.5 w-3.5 text-white/30" />
                  </div>
                  <div className="flex-1">
                    <textarea
                      placeholder="Add a comment..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="w-full bg-transparent text-sm text-white/70 placeholder:text-white/20 resize-none focus:outline-none min-h-[60px]"
                    />
                    <div className="flex justify-end mt-2">
                      <button
                        disabled={!commentText.trim()}
                        className="rounded-lg bg-[#FF6B00] px-4 py-1.5 text-xs font-semibold text-black hover:bg-[#FF8533] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Existing comments */}
              {item.comments.length > 0 ? (
                <div className="space-y-3">
                  {item.comments.map((c, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-[#2A2A2A]/40 bg-[#141414]/30 p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-white/60">
                          {c.user}
                        </span>
                        <span className="text-[10px] font-[JetBrains_Mono] text-white/20">
                          {c.time}
                        </span>
                      </div>
                      <p className="text-xs text-white/35 leading-relaxed">
                        {c.text}
                      </p>
                      <div className="mt-3 flex items-center gap-1.5 text-[10px] text-white/20">
                        <Heart className="h-3 w-3" />
                        {c.likes}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-white/20 text-center py-8">
                  No comments yet. Be the first to leave feedback!
                </p>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="sticky top-24"
            >
              <div className="rounded-xl border border-[#2A2A2A]/80 bg-[#141414]/60 p-6">
                {/* Price */}
                <div className="mb-5">
                  {item.price === 0 ? (
                    <span className="text-2xl font-bold text-[#00D4AA]">
                      Free
                    </span>
                  ) : (
                    <span className="text-2xl font-bold text-white/90">
                      ${item.price}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="space-y-2.5 mb-6">
                  <button className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6B00] px-5 py-3 text-sm font-semibold text-black hover:bg-[#FF8533] transition-all hover:shadow-[0_0_32px_rgba(255,107,0,0.25)]">
                    {item.price === 0 ? (
                      <>
                        <Download className="h-4 w-4" />
                        Download
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-4 w-4" />
                        Purchase
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setLiked(!liked)}
                    className={`w-full inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-2.5 text-xs font-medium transition-all ${
                      liked
                        ? "border-[#FF6B00]/30 text-[#FF6B00] bg-[#FF6B00]/5"
                        : "border-[#2A2A2A] text-white/40 hover:text-white/60"
                    }`}
                  >
                    <Heart
                      className={`h-3.5 w-3.5 ${liked ? "fill-[#FF6B00]" : ""}`}
                    />
                    {liked ? "Saved" : "Save"}
                  </button>
                  <button className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-[#2A2A2A] px-5 py-2.5 text-xs font-medium text-white/40 hover:text-white/60 transition-colors">
                    <Share2 className="h-3.5 w-3.5" />
                    Share
                  </button>
                </div>

                {/* Details */}
                <div className="border-t border-[#2A2A2A]/40 pt-4 space-y-3">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-white/25">Version</span>
                    <span className="font-[JetBrains_Mono] text-white/40">
                      v{item.version}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-white/25">Size</span>
                    <span className="font-[JetBrains_Mono] text-white/40">
                      {item.size}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-white/25">Updated</span>
                    <span className="font-[JetBrains_Mono] text-white/40">
                      {item.updated}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-white/25">Category</span>
                    <span className="font-[JetBrains_Mono] text-white/40">
                      {item.category}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
