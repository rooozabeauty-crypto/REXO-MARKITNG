import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Search,
  BarChart3,
  Settings,
  Palette,
  MessageSquare,
  DollarSign,
  Package,
  Share2,
  Zap,
  Star,
  Mail,
  CreditCard,
  LogOut,
  Menu,
  X,
  TrendingUp,
  Users,
  ShoppingCart,
  Sparkles,
} from "lucide-react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [, navigate] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: handleLogout,
  });

  if (!user) {
    return null;
  }

  // قائمة الخدمات المنظمة بشكل منطقي
  const serviceCategories = [
    {
      name: "التسويق الرقمي",
      icon: Sparkles,
      color: "from-purple-500 to-pink-500",
      services: [
        { icon: Search, label: "تحسين محرك البحث", path: "/marketing-phrases", color: "from-blue-500" },
        { icon: Zap, label: "الحملات الإعلانية", path: "/campaigns", color: "from-orange-500" },
        { icon: Share2, label: "وسائل التواصل", path: "/social-media", color: "from-red-500" },
        { icon: MessageSquare, label: "المساعد الذكي لورا", path: "/lora-advanced", color: "from-yellow-500" },
      ],
    },
    {
      name: "الإدارة والمبيعات",
      icon: ShoppingCart,
      color: "from-green-500 to-emerald-500",
      services: [
        { icon: Package, label: "مخزون المتجر", path: "/inventory", color: "from-cyan-500" },
        { icon: Mail, label: "الطلبات والمبيعات", path: "/orders", color: "from-rose-500" },
        { icon: DollarSign, label: "المحاسب المالي", path: "/accounting", color: "from-emerald-500" },
        { icon: BarChart3, label: "تحليل الأداء", path: "/analytics", color: "from-green-500" },
      ],
    },
    {
      name: "التصميم والمحتوى",
      icon: Palette,
      color: "from-pink-500 to-rose-500",
      services: [
        { icon: Palette, label: "Poster Maker", path: "/poster-maker", color: "from-pink-500" },
        { icon: MessageSquare, label: "العبارات التسويقية", path: "/marketing-phrases-new", color: "from-indigo-500" },
        { icon: Star, label: "القوالب الجاهزة", path: "/templates", color: "from-yellow-500" },
        { icon: Users, label: "محرر المنتجات", path: "/product-editor", color: "from-blue-500" },
        { icon: Palette, label: "محرر الصور والمنتجات", path: "/image-editor", color: "from-purple-500" },
      ],
    },
    {
      name: "الإدارة والإعدادات",
      icon: Settings,
      color: "from-slate-500 to-gray-500",
      services: [
        { icon: Star, label: "التقييمات والتعليقات", path: "/reviews", color: "from-indigo-500" },
        { icon: CreditCard, label: "الاشتراكات", path: "/subscriptions", color: "from-violet-500" },
        { icon: Settings, label: "الإعدادات", path: "/settings", color: "from-slate-500" },
        { icon: Mail, label: "الدعم والتواصل", path: "/support", color: "from-cyan-500" },
      ],
    },
  ];

  // إحصائيات سريعة
  const stats = [
    { label: "إجمالي المبيعات", value: "45,230 ر.س", icon: TrendingUp, color: "from-green-500" },
    { label: "عدد العملاء", value: "1,234", icon: Users, color: "from-blue-500" },
    { label: "الطلبات المعلقة", value: "23", icon: ShoppingCart, color: "from-orange-500" },
    { label: "معدل التحويل", value: "3.8%", icon: Sparkles, color: "from-purple-500" },
  ];

  const filteredCategories = serviceCategories.map((cat) => ({
    ...cat,
    services: cat.services.filter(
      (s) => s.label.includes(searchTerm) || searchTerm === ""
    ),
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur border-b border-slate-800">
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">REXO</h1>
                <p className="text-xs text-amber-500">منصة تسويق ذكية</p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4 flex-1 mx-8">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute right-3 top-3 w-4 h-4 text-slate-500" />
                <Input
                  placeholder="ابحث عن خدمة..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-slate-800 border-slate-700 pr-10 text-white placeholder:text-slate-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-lg bg-slate-800">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">{user.name?.[0] || "U"}</span>
                </div>
                <div className="text-sm">
                  <p className="text-white font-medium">{user.name || "المستخدم"}</p>
                  <p className="text-xs text-slate-400">{user.email}</p>
                </div>
              </div>

              <Button
                onClick={() => logoutMutation.mutate()}
                variant="outline"
                className="border-slate-700 text-slate-300 hover:bg-slate-800 gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">تسجيل خروج</span>
              </Button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-slate-800 rounded-lg"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-white" />
                ) : (
                  <Menu className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-4">
            <div className="relative">
              <Search className="absolute right-3 top-3 w-4 h-4 text-slate-500" />
              <Input
                placeholder="ابحث عن خدمة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-800 border-slate-700 pr-10 text-white placeholder:text-slate-500"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-2">مرحباً بك، {user.name || "صديقنا"}! 👋</h2>
            <p className="text-slate-300">منصة REXO متكاملة لإدارة جميع جوانب تسويقك الرقمي</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Card key={idx} className="bg-slate-800/50 border-slate-700 p-6 hover:border-amber-500/50 transition-all">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-slate-400 text-sm mb-2">{stat.label}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color} text-white`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Service Categories */}
        {filteredCategories.map((category) => {
          const CategoryIcon = category.icon;
          return (
            <div key={category.name} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${category.color} text-white`}>
                  <CategoryIcon className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-bold text-white">{category.name}</h3>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {category.services.map((service) => {
                  const ServiceIcon = service.icon;
                  return (
                    <Card
                      key={service.path}
                      onClick={() => navigate(service.path)}
                      className="bg-slate-800/50 border-slate-700 p-6 hover:border-amber-500 hover:bg-slate-800 cursor-pointer transition-all group"
                    >
                      <div className="flex flex-col items-center text-center gap-4">
                        <div className={`p-4 rounded-lg bg-gradient-to-br ${service.color} text-white group-hover:scale-110 transition-transform`}>
                          <ServiceIcon className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white group-hover:text-amber-500 transition-colors">{service.label}</h4>
                          <p className="text-xs text-slate-400 mt-1">اضغط للدخول</p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Empty State */}
        {filteredCategories.every((cat) => cat.services.length === 0) && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">لم نجد خدمات تطابق البحث</p>
          </div>
        )}
      </div>
    </div>
  );
}
