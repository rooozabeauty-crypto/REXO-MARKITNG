import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import {
  BarChart3,
  TrendingUp,
  Users,
  Palette,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
  Search,
  PieChart,
  Zap,
  DollarSign,
  Package,
  Share2,
  Star,
  Mail,
  CreditCard,
  HelpCircle
} from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
  const { user, logout, loading } = useAuth();
  const [, navigate] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    navigate("/");
    return null;
  }

  const services = [
    { icon: Search, label: "تحسين محرك البحث", path: "/marketing-phrases", color: "from-blue-500" },
    { icon: BarChart3, label: "تحليل الأداء", path: "/analytics", color: "from-green-500" },
    { icon: Settings, label: "الإعدادات", path: "/settings", color: "from-slate-500" },
    { icon: Palette, label: "Poster Maker", path: "/poster-maker", color: "from-pink-500" },
    { icon: MessageSquare, label: "المساعد الذكي لورا", path: "/lora", color: "from-yellow-500" },
    { icon: DollarSign, label: "المحاسب المالي", path: "/accounting", color: "from-emerald-500" },
    { icon: Package, label: "مخزون المتجر", path: "/inventory", color: "from-cyan-500" },
    { icon: Share2, label: "وسائل التواصل", path: "/social-media", color: "from-red-500" },
    { icon: Zap, label: "الحملات الإعلانية", path: "/campaigns", color: "from-orange-500" },
    { icon: Star, label: "التقييمات والتعليقات", path: "/reviews", color: "from-indigo-500" },
    { icon: Mail, label: "الطلبات والمبيعات", path: "/orders", color: "from-rose-500" },
    { icon: CreditCard, label: "الاشتراكات", path: "/subscriptions", color: "from-violet-500" },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-accent to-secondary rounded-lg flex items-center justify-center">
                <span className="text-sidebar-foreground font-bold">R</span>
              </div>
              <div>
                <h1 className="font-bold text-sidebar-foreground">REXO</h1>
                <p className="text-xs text-sidebar-accent">منصة تسويق ذكية</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-sidebar-accent text-sidebar-accent-foreground font-medium transition-colors">
              <Home className="w-5 h-5" />
              <span>الرئيسية</span>
            </button>

            <div className="pt-4">
              <p className="px-4 text-xs font-semibold text-sidebar-accent uppercase tracking-wider mb-3">
                الخدمات
              </p>
              <div className="space-y-1">
                {services.slice(0, 6).map((service, idx) => (
                  <button
                    key={idx}
                    onClick={() => navigate(service.path)}
                    className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/20 transition-colors text-sm"
                  >
                    <service.icon className="w-4 h-4" />
                    <span>{service.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <p className="px-4 text-xs font-semibold text-sidebar-accent uppercase tracking-wider mb-3">
                المزيد
              </p>
              <div className="space-y-1">
                {services.slice(6).map((service, idx) => (
                  <button
                    key={idx}
                    onClick={() => navigate(service.path)}
                    className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/20 transition-colors text-sm"
                  >
                    <service.icon className="w-4 h-4" />
                    <span>{service.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* User Profile & Logout */}
          <div className="p-4 border-t border-sidebar-border space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/20 transition-colors">
              <Settings className="w-4 h-4" />
              <span className="text-sm">الإعدادات</span>
            </button>
            <button
              onClick={() => navigate("/support")}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/20 transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
              <span className="text-sm">الدعم والتواصل</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">تسجيل الخروج</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-accent/10 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <h2 className="text-2xl font-bold">مرحباً، {user.name}</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-accent to-secondary rounded-full" />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Welcome Card */}
          <Card className="bg-gradient-to-r from-secondary/10 via-accent/10 to-secondary/10 border-accent/20 p-8 mb-8">
            <h3 className="text-2xl font-bold mb-2">مرحباً بك في REXO</h3>
            <p className="text-muted-foreground mb-4">
              منصتك المتكاملة لإدارة جميع جوانب التسويق الرقمي. اختر من الخدمات أدناه للبدء.
            </p>
            <div className="flex gap-4">
              <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                اعرف المزيد
              </Button>
              <Button variant="outline" className="border-accent text-accent hover:bg-accent/10">
                دليل البدء
              </Button>
            </div>
          </Card>

          {/* Services Grid */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-6">الخدمات الرئيسية</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, idx) => (
                <Card
                  key={idx}
                  onClick={() => navigate(service.path)}
                  className="bg-card border-border hover:border-accent hover:shadow-lg transition-all cursor-pointer p-6 group"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${service.color} to-accent rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold mb-2">{service.label}</h4>
                  <p className="text-sm text-muted-foreground">
                    اضغط للدخول إلى هذه الخدمة
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { label: "الحملات النشطة", value: "0", icon: Zap },
              { label: "المتابعون", value: "0", icon: Users },
              { label: "الإيرادات الشهرية", value: "0 ر.س", icon: DollarSign },
              { label: "معدل التحويل", value: "0%", icon: TrendingUp },
            ].map((stat, idx) => (
              <Card key={idx} className="bg-card border-border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">{stat.label}</p>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <stat.icon className="w-8 h-8 text-accent opacity-50" />
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
