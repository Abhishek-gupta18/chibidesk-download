import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import {
  LayoutDashboard,
  LogOut,
  Upload,
  MessageCircle,
  BarChart3,
  Package,
  Download,
  TrendingUp,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router";

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const stats = [
    { icon: Package, label: "My uploads", value: "3", color: "#5865F2" },
    { icon: Download, label: "Total downloads", value: "1,247", color: "#00D4AA" },
    { icon: MessageCircle, label: "Comments", value: "18", color: "#7C5CFC" },
    { icon: TrendingUp, label: "Revenue", value: "$42.50", color: "#00B4D8" },
  ];

  return (
    <main className="min-h-screen bg-[#0A0A0A] px-6 py-10 text-white">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-[JetBrains_Mono] text-white/30 tracking-wide uppercase">
              Dashboard
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-white">
              Welcome{user?.name ? `, ${user.name}` : ""}
            </h1>
          </div>
          <Button
            type="button"
            variant="outline"
            className="cursor-pointer gap-2 self-start border-[#2A2A2A] text-white/50 hover:text-white/70 hover:border-[#3A3A3A] bg-transparent"
            onClick={handleSignOut}
          >
            <LogOut className="size-4" />
            Sign out
          </Button>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((s) => (
            <Card
              key={s.label}
              className="border-[#2A2A2A]/60 bg-[#141414]/60 shadow-none"
            >
              <CardContent className="p-4">
                <div
                  className="mb-3 flex size-8 items-center justify-center rounded-lg border"
                  style={{
                    backgroundColor: `${s.color}08`,
                    borderColor: `${s.color}15`,
                  }}
                >
                  <s.icon
                    className="size-4"
                    style={{ color: `${s.color}90` }}
                  />
                </div>
                <p className="text-xl font-bold text-white/90">{s.value}</p>
                <p className="text-[11px] text-white/30 mt-0.5">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick actions */}
        <Card className="border-[#2A2A2A]/60 bg-[#141414]/40 shadow-none">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-white/70">
              Quick actions
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button className="flex items-center gap-3 rounded-xl border border-[#2A2A2A]/60 bg-[#1A1A1A]/40 p-4 text-left hover:border-[#5865F2]/20 hover:bg-[#1A1A1A]/60 transition-all">
              <Upload className="h-4 w-4 text-[#5865F2]/60" />
              <div>
                <p className="text-xs font-semibold text-white/70">
                  Upload theme
                </p>
                <p className="text-[10px] text-white/25 mt-0.5">
                  Publish to the marketplace
                </p>
              </div>
            </button>
            <button className="flex items-center gap-3 rounded-xl border border-[#2A2A2A]/60 bg-[#1A1A1A]/40 p-4 text-left hover:border-[#00D4AA]/20 hover:bg-[#1A1A1A]/60 transition-all">
              <MessageCircle className="h-4 w-4 text-[#00D4AA]/60" />
              <div>
                <p className="text-xs font-semibold text-white/70">
                  View comments
                </p>
                <p className="text-[10px] text-white/25 mt-0.5">
                  5 new since last visit
                </p>
              </div>
            </button>
            <button className="flex items-center gap-3 rounded-xl border border-[#2A2A2A]/60 bg-[#1A1A1A]/40 p-4 text-left hover:border-[#7C5CFC]/20 hover:bg-[#1A1A1A]/60 transition-all">
              <BarChart3 className="h-4 w-4 text-[#7C5CFC]/60" />
              <div>
                <p className="text-xs font-semibold text-white/70">
                  Analytics
                </p>
                <p className="text-[10px] text-white/25 mt-0.5">
                  View download trends
                </p>
              </div>
            </button>
          </CardContent>
        </Card>

        {/* Recent activity */}
        <Card className="border-[#2A2A2A]/60 bg-[#141414]/40 shadow-none">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-white/70">
              Recent activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              {
                icon: Upload,
                text: "You uploaded Neon Glow Widget Pack v1.2",
                time: "2 days ago",
              },
              {
                icon: MessageCircle,
                text: "DeskMaster commented on your Neon Glow pack",
                time: "3 days ago",
              },
              {
                icon: TrendingUp,
                text: "Your Cat Companion hit 11,000 downloads",
                time: "1 week ago",
              },
            ].map((a, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-lg border border-[#2A2A2A]/30 bg-[#141414]/30 p-3"
              >
                <a.icon className="h-3.5 w-3.5 text-white/20 shrink-0" />
                <p className="text-xs text-white/40 flex-1">{a.text}</p>
                <span className="text-[10px] font-[JetBrains_Mono] text-white/20 shrink-0">
                  {a.time}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
