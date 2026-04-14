import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Copy, Eye, Zap } from "lucide-react";
import { toast } from "sonner";

interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  preview: string;
  color: string;
  uses: number;
}

const templates: Template[] = [
  {
    id: "1",
    name: "عرض منتج فاخر",
    category: "منتجات",
    description: "قالب احترافي لعرض المنتجات الفاخرة",
    preview: "🎁",
    color: "from-purple-500 to-pink-500",
    uses: 1250,
  },
  {
    id: "2",
    name: "عرض الخصم",
    category: "عروض",
    description: "قالب ديناميكي لعروض الخصم والتخفيضات",
    preview: "💰",
    color: "from-red-500 to-orange-500",
    uses: 2100,
  },
  {
    id: "3",
    name: "منتج جديد",
    category: "منتجات",
    description: "قالب لإطلاق منتجات جديدة",
    preview: "✨",
    color: "from-blue-500 to-cyan-500",
    uses: 890,
  },
  {
    id: "4",
    name: "عرض محدود",
    category: "عروض",
    description: "قالب للعروض المحدودة الوقت",
    preview: "⏰",
    color: "from-yellow-500 to-orange-500",
    uses: 1560,
  },
  {
    id: "5",
    name: "مجموعة منتجات",
    category: "منتجات",
    description: "قالب لعرض مجموعات المنتجات",
    preview: "📦",
    color: "from-green-500 to-emerald-500",
    uses: 1340,
  },
  {
    id: "6",
    name: "شهادات العملاء",
    category: "تقييمات",
    description: "قالب لعرض تقييمات وشهادات العملاء",
    preview: "⭐",
    color: "from-indigo-500 to-purple-500",
    uses: 980,
  },
  {
    id: "7",
    name: "منتج بأسعار متعددة",
    category: "منتجات",
    description: "قالب لعرض المنتج بخيارات أسعار",
    preview: "💳",
    color: "from-pink-500 to-rose-500",
    uses: 1120,
  },
  {
    id: "8",
    name: "عرض موسمي",
    category: "عروض",
    description: "قالب للعروض الموسمية والمناسبات",
    preview: "🎉",
    color: "from-violet-500 to-purple-500",
    uses: 750,
  },
  {
    id: "9",
    name: "منتج حصري",
    category: "منتجات",
    description: "قالب لعرض المنتجات الحصرية",
    preview: "👑",
    color: "from-amber-500 to-yellow-500",
    uses: 650,
  },
  {
    id: "10",
    name: "عرض مجموعة",
    category: "عروض",
    description: "قالب لعرض مجموعات العروض",
    preview: "🛍️",
    color: "from-teal-500 to-cyan-500",
    uses: 1430,
  },
  {
    id: "11",
    name: "منتج بفيديو",
    category: "منتجات",
    description: "قالب لعرض منتج مع فيديو توضيحي",
    preview: "🎬",
    color: "from-red-500 to-pink-500",
    uses: 890,
  },
  {
    id: "12",
    name: "عرض فلاش",
    category: "عروض",
    description: "قالب لعروض فلاش سريعة",
    preview: "⚡",
    color: "from-orange-500 to-red-500",
    uses: 1680,
  },
];

export default function Templates() {
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const categories = ["الكل", ...Array.from(new Set(templates.map((t) => t.category)))];
  const filteredTemplates =
    selectedCategory === "الكل"
      ? templates
      : templates.filter((t) => t.category === selectedCategory);

  const handleUseTemplate = (template: Template) => {
    setSelectedTemplate(template);
    toast.success(`تم اختيار القالب: ${template.name}`);
  };

  const handleCopyTemplate = (template: Template) => {
    navigator.clipboard.writeText(
      `القالب: ${template.name}\nالوصف: ${template.description}`
    );
    toast.success("تم نسخ بيانات القالب!");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">قوالب التصميم الحقيقية</h1>
          <p className="text-muted-foreground">
            اختر من {templates.length} قالب احترافي جاهز للاستخدام الفوري
          </p>
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
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredTemplates.map((template) => (
            <Card
              key={template.id}
              className="bg-card border-border overflow-hidden hover:border-accent transition-all cursor-pointer group"
              onClick={() => handleUseTemplate(template)}
            >
              {/* Preview */}
              <div
                className={`bg-gradient-to-br ${template.color} p-12 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform`}
              >
                {template.preview}
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{template.name}</h3>
                <p className="text-muted-foreground text-sm mb-3">
                  {template.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between mb-4 py-2 border-t border-border pt-3">
                  <span className="text-xs text-muted-foreground">
                    {template.uses.toLocaleString()} استخدام
                  </span>
                  <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">
                    {template.category}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUseTemplate(template);
                    }}
                    className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2"
                    size="sm"
                  >
                    <Zap className="w-4 h-4" />
                    استخدم
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyTemplate(template);
                    }}
                    variant="outline"
                    className="border-border gap-2"
                    size="sm"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Selected Template Preview */}
        {selectedTemplate && (
          <Card className="bg-card border-border p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">{selectedTemplate.name}</h2>
                <p className="text-muted-foreground">{selectedTemplate.description}</p>
              </div>
              <Button
                variant="outline"
                className="border-border"
                onClick={() => setSelectedTemplate(null)}
              >
                إغلاق
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Preview */}
              <div
                className={`bg-gradient-to-br ${selectedTemplate.color} rounded-lg p-12 flex items-center justify-center text-8xl`}
              >
                {selectedTemplate.preview}
              </div>

              {/* Details */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold mb-2">معلومات القالب</h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="text-muted-foreground">الفئة:</span>{" "}
                      <span className="font-medium">{selectedTemplate.category}</span>
                    </p>
                    <p>
                      <span className="text-muted-foreground">عدد الاستخدامات:</span>{" "}
                      <span className="font-medium">
                        {selectedTemplate.uses.toLocaleString()}
                      </span>
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold mb-2">الإجراءات</h3>
                  <div className="flex gap-2">
                    <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2 flex-1">
                      <Eye className="w-4 h-4" />
                      معاينة كاملة
                    </Button>
                    <Button
                      variant="outline"
                      className="border-border gap-2 flex-1"
                      onClick={() => handleCopyTemplate(selectedTemplate)}
                    >
                      <Copy className="w-4 h-4" />
                      نسخ
                    </Button>
                    <Button
                      variant="outline"
                      className="border-border gap-2"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="bg-background rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-2">
                    هذا القالب يمكن تخصيصه بالكامل مع الألوان والنصوص والصور
                  </p>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
