import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { ArrowRight, Sparkles, Zap, TrendingUp, Users, BarChart3, Palette } from "lucide-react";
import { useLocation } from "wouter";

export default function Landing() {
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  if (isAuthenticated) {
    navigate("/dashboard");
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-accent to-secondary rounded-lg flex items-center justify-center">
              <span className="text-foreground font-bold text-lg">R</span>
            </div>
            <span className="font-bold text-xl">REXO</span>
          </div>
          <a href={getLoginUrl()}>
            <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              دخول
            </Button>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative">
        <div className="container max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm text-accent font-medium">منصة تسويق ذكية مدعومة بالذكاء الاصطناعي</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-secondary via-accent to-secondary bg-clip-text text-transparent">
            منصة تسويقك المتكاملة
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            REXO تجمع كل أدوات التسويق الرقمي التي تحتاجها في منصة واحدة فخمة وسهلة الاستخدام، مدعومة بقوة الذكاء الاصطناعي
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a href={getLoginUrl()}>
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2">
                ابدأ الآن مجاناً
                <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
            <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent/10">
              اعرف المزيد
            </Button>
          </div>

          {/* Hero Image Placeholder */}
          <div className="relative h-96 bg-gradient-to-b from-card to-background rounded-2xl border border-border overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-accent to-secondary rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <Palette className="w-10 h-10 text-foreground" />
                </div>
                <p className="text-muted-foreground">واجهة المنصة الفخمة</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">الخدمات الرئيسية</h2>
            <p className="text-muted-foreground text-lg">كل ما تحتاجه لإدارة حملاتك التسويقية بكفاءة</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: TrendingUp,
                title: "تحسين محرك البحث",
                description: "SEO متقدم لزيادة ظهورك في محركات البحث"
              },
              {
                icon: BarChart3,
                title: "تحليل الأداء",
                description: "تتبع شامل لأداء حملاتك مع Google Analytics"
              },
              {
                icon: Zap,
                title: "أدوات التصميم",
                description: "Poster Maker واستوديو التصميم الجرافيكي"
              },
              {
                icon: Users,
                title: "إدارة المتابعين",
                description: "ربط وسائل التواصل ونشر المحتوى تلقائياً"
              }
            ].map((feature, idx) => (
              <Card key={idx} className="bg-background border-border hover:border-accent transition-colors p-6">
                <feature.icon className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">خطط الاشتراك</h2>
            <p className="text-muted-foreground text-lg">اختر الخطة المناسبة لاحتياجاتك</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "البداية",
                price: "299",
                features: ["أول 5 ميزات", "دعم أساسي", "14 يوم مجاني"],
                highlighted: false
              },
              {
                name: "الاحترافية",
                price: "599",
                features: ["جميع الخدمات", "دعم أولوية", "14 يوم مجاني"],
                highlighted: true
              },
              {
                name: "السنوية",
                price: "9700",
                features: ["جميع الخدمات", "شهرين مجانا", "خدمات إضافية"],
                highlighted: false
              }
            ].map((plan, idx) => (
              <Card
                key={idx}
                className={`p-8 relative ${
                  plan.highlighted
                    ? "bg-gradient-to-b from-accent/10 to-secondary/10 border-accent"
                    : "bg-background border-border"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-accent text-foreground px-4 py-1 rounded-full text-sm font-bold">
                      الأشهر
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-accent">{plan.price}</span>
                  <span className="text-muted-foreground"> ريال/شهر</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-accent rounded-full" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${
                    plan.highlighted
                      ? "bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                      : "bg-accent hover:bg-accent/90 text-accent-foreground"
                  }`}
                >
                  اختر الخطة
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-secondary/10 via-accent/10 to-secondary/10">
        <div className="container max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">هل أنت مستعد للبدء؟</h2>
          <p className="text-muted-foreground text-lg mb-8">
            جرب REXO مجاناً لمدة 14 يوم، بدون الحاجة لبطاقة ائتمان
          </p>
          <a href={getLoginUrl()}>
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2">
              ابدأ الآن
              <ArrowRight className="w-4 h-4" />
            </Button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-accent to-secondary rounded-lg flex items-center justify-center">
                <span className="text-foreground font-bold">R</span>
              </div>
              <span className="font-bold">REXO MARKETING</span>
            </div>
            <p className="text-muted-foreground text-sm">© 2026 REXO. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
