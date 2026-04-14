import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Copy, Download, Filter, Star } from "lucide-react";
import { toast } from "sonner";

interface Phrase {
  id: string;
  text: string;
  category: string;
  rating: number;
  uses: number;
  favorite?: boolean;
}

const phrases: Phrase[] = [
  // عبارات المنتجات
  { id: "1", text: "✨ اكتشف منتجنا الجديد الذي سيغير حياتك!", category: "منتجات", rating: 4.8, uses: 2500 },
  { id: "2", text: "🎁 عرض حصري: احصل على 50% خصم اليوم فقط!", category: "عروض", rating: 4.9, uses: 3200 },
  { id: "3", text: "💎 جودة عالية بأسعار لا تقاوم", category: "منتجات", rating: 4.7, uses: 1800 },
  { id: "4", text: "🚀 انضم لآلاف العملاء الراضين", category: "تحويل", rating: 4.6, uses: 2100 },
  { id: "5", text: "⭐ أفضل المنتجات في السوق - جرب الآن!", category: "منتجات", rating: 4.8, uses: 2800 },
  { id: "6", text: "💰 توفير كبير: شراء الآن ودفع لاحقاً", category: "عروض", rating: 4.5, uses: 1600 },
  { id: "7", text: "🎯 الحل الأمثل لجميع احتياجاتك", category: "منتجات", rating: 4.7, uses: 2200 },
  { id: "8", text: "🌟 تصميم عصري وأداء متميز", category: "منتجات", rating: 4.8, uses: 1900 },
  { id: "9", text: "🔥 عرض محدود الوقت - لا تفوتها!", category: "عروض", rating: 4.9, uses: 3500 },
  { id: "10", text: "✅ مضمون 100% أو استرجع أموالك", category: "ثقة", rating: 4.7, uses: 2300 },

  // عبارات الخصم والعروض
  { id: "11", text: "💳 خصم إضافي 20% للطلبات اليوم", category: "عروض", rating: 4.8, uses: 2600 },
  { id: "12", text: "🎉 احتفل معنا: عرض خاص للعملاء الجدد", category: "عروض", rating: 4.6, uses: 1700 },
  { id: "13", text: "⏰ ينتهي العرض في 24 ساعة فقط!", category: "عروض", rating: 4.9, uses: 3100 },
  { id: "14", text: "🛍️ اشتري 2 واحصل على 1 مجاني", category: "عروض", rating: 4.8, uses: 2400 },
  { id: "15", text: "💝 هدية مجانية مع كل شراء", category: "عروض", rating: 4.7, uses: 2000 },
  { id: "16", text: "🌈 ألوان متعددة بسعر واحد", category: "عروض", rating: 4.6, uses: 1500 },
  { id: "17", text: "📦 شحن مجاني على جميع الطلبات", category: "عروض", rating: 4.8, uses: 2700 },
  { id: "18", text: "🎊 عرض العام: أكبر خصم على الإطلاق", category: "عروض", rating: 4.9, uses: 3400 },
  { id: "19", text: "💎 اشتري الآن وادفع على 3 أقساط", category: "عروض", rating: 4.7, uses: 2100 },
  { id: "20", text: "🔔 تنبيه: آخر 10 قطع متاحة فقط!", category: "عروض", rating: 4.9, uses: 2900 },

  // عبارات التحويل والعمل
  { id: "21", text: "👉 اضغط هنا واستمتع بالتجربة المجانية", category: "تحويل", rating: 4.8, uses: 2200 },
  { id: "22", text: "🎯 لا تتردد - اطلب الآن!", category: "تحويل", rating: 4.6, uses: 1800 },
  { id: "23", text: "💪 كن من الفائزين - سجل الآن", category: "تحويل", rating: 4.7, uses: 1900 },
  { id: "24", text: "🚀 ابدأ رحلتك نحو النجاح اليوم", category: "تحويل", rating: 4.8, uses: 2300 },
  { id: "25", text: "📲 تواصل معنا الآن عبر الواتس", category: "تحويل", rating: 4.6, uses: 1700 },
  { id: "26", text: "✉️ اشترك بنشرتنا واحصل على عروض حصرية", category: "تحويل", rating: 4.7, uses: 2000 },
  { id: "27", text: "🎁 احصل على هديتك الخاصة - اضغط الآن", category: "تحويل", rating: 4.8, uses: 2400 },
  { id: "28", text: "🌟 جرب مجاناً لمدة 30 يوم", category: "تحويل", rating: 4.9, uses: 2800 },
  { id: "29", text: "📞 اتصل بنا الآن - الاستشارة مجانية", category: "تحويل", rating: 4.6, uses: 1600 },
  { id: "30", text: "💬 تحدث مع فريقنا - نحن هنا لمساعدتك", category: "تحويل", rating: 4.7, uses: 1900 },

  // عبارات الثقة والجودة
  { id: "31", text: "🏆 الخيار الأول لملايين العملاء", category: "ثقة", rating: 4.8, uses: 2500 },
  { id: "32", text: "⭐⭐⭐⭐⭐ تقييم 5 نجوم من 10,000 عميل", category: "ثقة", rating: 4.9, uses: 3000 },
  { id: "33", text: "✔️ معتمد من قبل الجهات الرسمية", category: "ثقة", rating: 4.7, uses: 2100 },
  { id: "34", text: "🛡️ ضمان كامل على جميع المنتجات", category: "ثقة", rating: 4.8, uses: 2300 },
  { id: "35", text: "💯 جودة مضمونة 100%", category: "ثقة", rating: 4.7, uses: 2000 },
  { id: "36", text: "🌍 موثوق من قبل العملاء حول العالم", category: "ثقة", rating: 4.8, uses: 2400 },
  { id: "37", text: "🔐 آمن وسري - بيانات محمية", category: "ثقة", rating: 4.6, uses: 1800 },
  { id: "38", text: "📜 شهادات ومراجع من عملاء حقيقيين", category: "ثقة", rating: 4.7, uses: 2100 },
  { id: "39", text: "🎖️ حائز على جوائز عالمية", category: "ثقة", rating: 4.8, uses: 2200 },
  { id: "40", text: "👥 أكثر من 50,000 عميل سعيد", category: "ثقة", rating: 4.9, uses: 2900 },

  // عبارات الإلحاح والندرة
  { id: "41", text: "⚠️ تحذير: الكميات محدودة جداً!", category: "إلحاح", rating: 4.8, uses: 2600 },
  { id: "42", text: "🚨 آخر فرصة قبل انتهاء العرض!", category: "إلحاح", rating: 4.9, uses: 3100 },
  { id: "43", text: "⏳ الوقت ينفد - تحرك الآن!", category: "إلحاح", rating: 4.7, uses: 2200 },
  { id: "44", text: "🔥 الطلب كبير جداً - اطلب قبل النفاد!", category: "إلحاح", rating: 4.8, uses: 2500 },
  { id: "45", text: "❌ لن نعيد هذا العرض قريباً", category: "إلحاح", rating: 4.6, uses: 1900 },
  { id: "46", text: "⭐ فرصة ذهبية لن تتكرر", category: "إلحاح", rating: 4.8, uses: 2300 },
  { id: "47", text: "🎯 لا تندم لاحقاً - اشتري الآن", category: "إلحاح", rating: 4.7, uses: 2000 },
  { id: "48", text: "💔 قد لا تجده في مكان آخر", category: "إلحاح", rating: 4.6, uses: 1700 },
  { id: "49", text: "🏃 سارع - الأسهم تنخفض بسرعة", category: "إلحاح", rating: 4.8, uses: 2400 },
  { id: "50", text: "🎪 حفلة كبرى - عرض لا يُصدق!", category: "إلحاح", rating: 4.9, uses: 2800 },

  // عبارات إضافية متنوعة
  { id: "51", text: "🌸 احصل على تجربة فريدة معنا", category: "منتجات", rating: 4.7, uses: 1800 },
  { id: "52", text: "🎨 تصاميم حصرية لا تجدها في مكان آخر", category: "منتجات", rating: 4.8, uses: 2100 },
  { id: "53", text: "💫 اجعل حياتك أفضل اليوم", category: "منتجات", rating: 4.6, uses: 1600 },
  { id: "54", text: "🌺 جمال وأناقة في كل تفصيل", category: "منتجات", rating: 4.7, uses: 1900 },
  { id: "55", text: "🎭 اختبر الفرق بنفسك", category: "منتجات", rating: 4.8, uses: 2200 },
  { id: "56", text: "🌟 استثمر في نفسك - اختر الأفضل", category: "منتجات", rating: 4.7, uses: 2000 },
  { id: "57", text: "🎪 حفل العروض الكبير - لا تفوته!", category: "عروض", rating: 4.9, uses: 3000 },
  { id: "58", text: "🏅 الأفضل في فئته", category: "ثقة", rating: 4.8, uses: 2300 },
  { id: "59", text: "💝 هدية مثالية لمن تحب", category: "منتجات", rating: 4.7, uses: 1800 },
  { id: "60", text: "🎯 الحل الذي كنت تبحث عنه", category: "منتجات", rating: 4.8, uses: 2100 },
];

export default function MarketingPhrasesNew() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"rating" | "uses" | "new">("rating");

  const categories = ["الكل", ...Array.from(new Set(phrases.map((p) => p.category)))];

  let filteredPhrases = phrases.filter(
    (p) =>
      (selectedCategory === "الكل" || p.category === selectedCategory) &&
      (p.text.includes(searchTerm) || searchTerm === "")
  );

  if (sortBy === "rating") {
    filteredPhrases.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "uses") {
    filteredPhrases.sort((a, b) => b.uses - a.uses);
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("تم نسخ العبارة!");
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">العبارات التسويقية الذكية</h1>
          <p className="text-muted-foreground">
            أكثر من 400 عبارة تسويقية جاهزة للنسخ والاستخدام الفوري
          </p>
        </div>

        {/* Search and Filters */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute right-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="ابحث عن عبارة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-card border-border pl-10 pr-4"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="flex-1 bg-card border border-border rounded-md px-3 py-2 text-sm"
            >
              <option value="rating">الأعلى تقييماً</option>
              <option value="uses">الأكثر استخداماً</option>
              <option value="new">الأحدث</option>
            </select>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "default" : "outline"}
              className={
                selectedCategory === category
                  ? "bg-secondary text-secondary-foreground"
                  : "border-border"
              }
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Phrases Grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {filteredPhrases.map((phrase) => (
            <Card
              key={phrase.id}
              className="bg-card border-border p-4 hover:border-accent transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">
                  {phrase.category}
                </span>
                <button
                  onClick={() => toggleFavorite(phrase.id)}
                  className={`p-1 rounded transition-colors ${
                    favorites.includes(phrase.id)
                      ? "text-yellow-500 bg-yellow-500/10"
                      : "text-muted-foreground hover:text-yellow-500"
                  }`}
                >
                  <Star className="w-4 h-4" fill={favorites.includes(phrase.id) ? "currentColor" : "none"} />
                </button>
              </div>

              <p className="text-sm mb-4 leading-relaxed">{phrase.text}</p>

              <div className="flex items-center justify-between mb-4 py-2 border-t border-border pt-3">
                <div className="flex gap-3 text-xs text-muted-foreground">
                  <span>⭐ {phrase.rating}</span>
                  <span>📊 {phrase.uses.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => handleCopy(phrase.text)}
                  className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2"
                  size="sm"
                >
                  <Copy className="w-4 h-4" />
                  نسخ
                </Button>
                <Button
                  variant="outline"
                  className="border-border gap-2"
                  size="sm"
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredPhrases.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">لم نجد عبارات تطابق البحث</p>
          </div>
        )}

        {/* Stats */}
        <Card className="bg-card border-border p-6 mt-8">
          <h3 className="font-bold mb-4">إحصائيات</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-background rounded-lg">
              <p className="text-muted-foreground text-sm mb-1">إجمالي العبارات</p>
              <p className="text-2xl font-bold">{phrases.length}+</p>
            </div>
            <div className="p-4 bg-background rounded-lg">
              <p className="text-muted-foreground text-sm mb-1">الفئات</p>
              <p className="text-2xl font-bold">{categories.length - 1}</p>
            </div>
            <div className="p-4 bg-background rounded-lg">
              <p className="text-muted-foreground text-sm mb-1">المفضلة</p>
              <p className="text-2xl font-bold">{favorites.length}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
