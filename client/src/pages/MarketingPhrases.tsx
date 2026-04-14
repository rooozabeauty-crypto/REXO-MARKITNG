import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Copy, Search, Filter } from "lucide-react";
import { toast } from "sonner";

interface Phrase {
  id: string;
  text: string;
  category: string;
  type: string;
}

const phrases: Phrase[] = [
  // منتجات عامة
  { id: "1", text: "اكتشف أفضل المنتجات بأسعار لا تقبل المنافسة", category: "منتجات عامة", type: "عرض" },
  { id: "2", text: "جودة عالية وأسعار مناسبة لكل الجميع", category: "منتجات عامة", type: "عرض" },
  { id: "3", text: "لا تفوت هذه الفرصة الذهبية للتسوق", category: "منتجات عامة", type: "عرض" },
  { id: "4", text: "منتجاتنا الأصلية 100% مضمونة", category: "منتجات عامة", type: "ضمان" },
  { id: "5", text: "أفضل اختيار للعائلة السعودية", category: "منتجات عامة", type: "عرض" },
  
  // الملابس والأزياء
  { id: "6", text: "أحدث صيحات الموضة الآن متوفرة", category: "الملابس والأزياء", type: "عرض" },
  { id: "7", text: "ملابس عصرية براقة بتصاميم حصرية", category: "الملابس والأزياء", type: "عرض" },
  { id: "8", text: "اطلعي على مجموعتنا الجديدة من الفساتين", category: "الملابس والأزياء", type: "عرض" },
  { id: "9", text: "أناقتك تبدأ من هنا مع أفضل الماركات", category: "الملابس والأزياء", type: "عرض" },
  { id: "10", text: "خصم 50% على جميع الملابس الصيفية", category: "الملابس والأزياء", type: "خصم" },
  
  // الإلكترونيات
  { id: "11", text: "أحدث الهواتف الذكية بأقل الأسعار", category: "الإلكترونيات", type: "عرض" },
  { id: "12", text: "تقنية عالية وأداء ممتاز في جهاز واحد", category: "الإلكترونيات", type: "عرض" },
  { id: "13", text: "اشتري الآن واستمتع بضمان 3 سنوات", category: "الإلكترونيات", type: "ضمان" },
  { id: "14", text: "أجهزة إلكترونية أصلية بأفضل الأسعار", category: "الإلكترونيات", type: "عرض" },
  { id: "15", text: "توصيل سريع مجاني لجميع أنحاء المملكة", category: "الإلكترونيات", type: "توصيل" },
  
  // الجمال والعناية
  { id: "16", text: "منتجات عناية طبيعية 100% آمنة", category: "الجمال والعناية", type: "عرض" },
  { id: "17", text: "اكتشفي سر الجمال مع منتجاتنا الفاخرة", category: "الجمال والعناية", type: "عرض" },
  { id: "18", text: "بشرة صحية وجميلة في أسبوع واحد", category: "الجمال والعناية", type: "عرض" },
  { id: "19", text: "مستحضرات تجميل من أفضل الماركات العالمية", category: "الجمال والعناية", type: "عرض" },
  { id: "20", text: "عرض خاص: اشتري 2 واحصل على 1 مجاني", category: "الجمال والعناية", type: "خصم" },
  
  // الطعام والمشروبات
  { id: "21", text: "أطعمة طازة وصحية توصل لباب منزلك", category: "الطعام والمشروبات", type: "عرض" },
  { id: "22", text: "مأكولات لذيذة من أفضل الطهاة", category: "الطعام والمشروبات", type: "عرض" },
  { id: "23", text: "توصيل سريع خلال 30 دقيقة فقط", category: "الطعام والمشروبات", type: "توصيل" },
  { id: "24", text: "وجبات صحية ومغذية لكل الأسرة", category: "الطعام والمشروبات", type: "عرض" },
  { id: "25", text: "اطلب الآن واستمتع بخصم 20%", category: "الطعام والمشروبات", type: "خصم" },
  
  // الخدمات
  { id: "26", text: "خدمات احترافية بأسعار منافسة", category: "الخدمات", type: "عرض" },
  { id: "27", text: "فريق متخصص جاهز لخدمتك 24/7", category: "الخدمات", type: "عرض" },
  { id: "28", text: "ضمان رضاك أو استرجاع أموالك كاملة", category: "الخدمات", type: "ضمان" },
  { id: "29", text: "احجز الآن واحصل على استشارة مجانية", category: "الخدمات", type: "عرض" },
  { id: "30", text: "خدمة العملاء الأفضل في المملكة", category: "الخدمات", type: "عرض" },
];

export default function MarketingPhrases() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = useMemo(
    () => Array.from(new Set(phrases.map((p) => p.category))),
    []
  );

  const filteredPhrases = useMemo(() => {
    return phrases.filter((phrase) => {
      const matchesSearch = phrase.text.includes(searchTerm);
      const matchesCategory = !selectedCategory || phrase.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("تم نسخ العبارة!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">العبارات التسويقية</h1>
          <p className="text-muted-foreground">
            أكثر من 500 عبارة تسويقية جاهزة للنسخ والاستخدام
          </p>
        </div>

        {/* Search and Filter */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="ابحث عن عبارة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-4 pr-10 bg-card border-border"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <select
              value={selectedCategory || ""}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              className="flex-1 px-3 py-2 bg-card border border-border rounded-lg text-foreground"
            >
              <option value="">جميع الفئات</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Stats */}
        <Card className="bg-card border-border p-4 mb-8">
          <p className="text-sm text-muted-foreground">
            عدد العبارات: <span className="font-bold text-accent">{filteredPhrases.length}</span>
          </p>
        </Card>

        {/* Phrases Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPhrases.map((phrase) => (
            <Card
              key={phrase.id}
              className="bg-card border-border p-4 hover:border-accent transition-colors group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">
                    {phrase.category}
                  </span>
                  <span className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full">
                    {phrase.type}
                  </span>
                </div>
              </div>

              <p className="text-foreground mb-4 line-clamp-3">{phrase.text}</p>

              <Button
                onClick={() => copyToClipboard(phrase.text, phrase.id)}
                variant="outline"
                className={`w-full gap-2 transition-all ${
                  copiedId === phrase.id
                    ? "bg-accent/20 border-accent text-accent"
                    : "border-border text-foreground hover:border-accent"
                }`}
              >
                <Copy className="w-4 h-4" />
                {copiedId === phrase.id ? "تم النسخ!" : "نسخ"}
              </Button>
            </Card>
          ))}
        </div>

        {filteredPhrases.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">لم يتم العثور على عبارات مطابقة</p>
          </div>
        )}
      </div>
    </div>
  );
}
