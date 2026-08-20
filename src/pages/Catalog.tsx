import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Star,
  Download,
  ChevronRight,
  Filter,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router";

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
    description:
      "A collection of animated neon widgets for your desktop. Includes clock, weather, and system monitor with customizable glow effects.",
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
    description:
      "Adorable pixel-art pets that roam your desktop. They react to your activity and can be fully customized with different colors and accessories.",
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
    description:
      "A sleek, minimal clock overlay that blends into any desktop setup. Fully customizable fonts, colors, and positioning.",
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
    description:
      "20 high-quality anime wallpapers optimized for ChibiDesk's parallax depth effect. Each wallpaper comes with multiple depth layers.",
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
    description:
      "Real-time CPU, RAM, GPU, and network monitoring with beautiful animated graphs. Choose from multiple visual themes.",
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
    description:
      "A gentle animated forest spirit that guards your desktop. Changes appearance based on time of day — cherry blossoms by day, fireflies by night.",
    tags: ["nature", "spirit", "day-night"],
    featured: false,
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
      "Synthwave-inspired wallpapers with animated grid lines and neon color shifts. Perfect for late-night coding sessions.",
    tags: ["retro", "synthwave", "neon"],
    featured: false,
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
      "A playful cat that naps, stretches, and pounces around your desktop. Reacts to window focus and mouse movement.",
    tags: ["cat", "companion", "interactive"],
    featured: true,
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
      "Real-time weather with animated icons — rain drops, snowflakes, sun rays. Automatically updates based on your location.",
    tags: ["weather", "animated", "live"],
    featured: false,
  },
];

const CATEGORIES = ["All", "Widgets", "Characters", "Wallpapers"];

export default function Catalog() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"popular" | "rating" | "newest">("popular");

  const filtered = useMemo(() => {
    let items = CATALOG.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;
      const matchesSearch =
        search === "" ||
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.tags.some((t) => t.includes(search.toLowerCase()));
      return matchesCategory && matchesSearch;
    });

    if (sortBy === "popular") {
      items.sort((a, b) => b.downloads - a.downloads);
    } else if (sortBy === "rating") {
      items.sort((a, b) => b.rating - a.rating);
    }

    return items;
  }, [search, activeCategory, sortBy]);

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
            to="/"
            className="text-xs font-medium text-white/40 hover:text-white/60 transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="h-3 w-3" />
            Back to home
          </Link>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <p className="font-[JetBrains_Mono] text-[11px] font-medium text-[#FF6B00]/80 tracking-widest uppercase mb-3">
            Marketplace
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Browse the catalog
          </h1>
          <p className="mt-3 text-sm text-white/35 max-w-md leading-relaxed">
            Widgets, characters, and wallpapers created by the ChibiDesk community. Download free packs or purchase premium content.
          </p>
        </div>

        {/* Search + filters */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
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
          <div className="flex items-center gap-1.5 ml-auto">
            <Filter className="h-3 w-3 text-white/25" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="bg-transparent text-xs text-white/40 focus:outline-none cursor-pointer"
            >
              <option value="popular">Most popular</option>
              <option value="rating">Highest rated</option>
            </select>
          </div>
        </div>

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
                transition={{ duration: 0.3, delay: i * 0.04 }}
              >
                <Link
                  to={`/item/${item.id}`}
                  className="group block rounded-xl border border-[#2A2A2A]/80 bg-[#141414]/60 overflow-hidden hover:border-[#FF6B00]/20 hover:bg-[#1A1A1A]/60 transition-all duration-300"
                >
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

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-sm text-white/30">
              No items found. Try adjusting your search or filters.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
