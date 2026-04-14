import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send, MessageCircle, Loader2, Sparkles, Users, TrendingUp, Zap } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  text: string;
  sender: "user" | "lora";
  timestamp: Date;
  suggestions?: string[];
  type?: "text" | "solutions" | "info";
}

interface Solution {
  title: string;
  description: string;
  icon: string;
  benefits: string[];
}

const platformFeatures = {
  title: "مميزات منصة REXO",
  description: "منصة تسويق ذكية متكاملة مدعومة بالذكاء الاصطناعي",
  features: [
    {
      title: "المساعد الذكي لورا 🤖",
      description: "مساعدك الخليجية الذكية متاحة 24/7 لتقديم استشارات تسويقية شخصية",
      benefits: ["استشارات فورية", "حلول مخصصة", "دعم 24/7"],
    },
    {
      title: "Poster Maker 🎨",
      description: "أداة تصميم قوية لإنشاء محتوى بصري احترافي",
      benefits: ["قوالب جاهزة", "تعديل سهل", "تصاميم احترافية"],
    },
    {
      title: "تحليل الأداء 📊",
      description: "تحليل شامل لأداء حملاتك التسويقية مع رسوم بيانية مفصلة",
      benefits: ["إحصائيات دقيقة", "تقارير شاملة", "insights قيمة"],
    },
    {
      title: "إدارة الحملات 🚀",
      description: "إدارة كاملة لحملاتك الإعلانية عبر منصات متعددة",
      benefits: ["تخطيط فعال", "تنفيذ احترافي", "تتبع مستمر"],
    },
    {
      title: "العبارات التسويقية 💬",
      description: "أكثر من 400 عبارة تسويقية جاهزة للنسخ والاستخدام الفوري",
      benefits: ["محتوى جاهز", "نسخ سهل", "عبارات مؤثرة"],
    },
    {
      title: "قوالب التصميم 🎭",
      description: "12 قالب احترافي لعرض منتجاتك بأفضل صورة",
      benefits: ["قوالب متنوعة", "معاينة حية", "تخصيص كامل"],
    },
    {
      title: "محرر المنتجات 📦",
      description: "تعديل وتخصيص منتجاتك بسهولة للتسويق الجرافيكي",
      benefits: ["تعديل سهل", "معاينة فورية", "تصدير بسيط"],
    },
    {
      title: "إدارة المخزون 📈",
      description: "تتبع شامل لمخزونك ومبيعاتك",
      benefits: ["تتبع دقيق", "تنبيهات ذكية", "إدارة فعالة"],
    },
  ],
};

const solutionsByCategory = {
  "زيادة المبيعات": [
    {
      title: "استراتيجية تسويق شاملة",
      description: "خطة تسويقية متكاملة لزيادة مبيعاتك",
      icon: "📈",
      benefits: ["تحديد الجمهور المستهدف", "إنشاء محتوى جذاب", "قياس النتائج"],
    },
    {
      title: "حملات إعلانية ذكية",
      description: "حملات موجهة بدقة لعملائك المحتملين",
      icon: "🎯",
      benefits: ["استهداف دقيق", "ROI عالي", "تحسين مستمر"],
    },
    {
      title: "تحسين تجربة العميل",
      description: "تحسين رحلة العميل من الاكتشاف للشراء",
      icon: "😊",
      benefits: ["تقليل الفقدان", "زيادة الولاء", "تحسين التقييمات"],
    },
  ],
  "تحسين البحث": [
    {
      title: "تحسين SEO",
      description: "تحسين ظهورك في نتائج البحث",
      icon: "🔍",
      benefits: ["ترافيك عضوي", "ظهور أفضل", "تصنيف أعلى"],
    },
    {
      title: "كلمات مفتاحية استراتيجية",
      description: "اختيار الكلمات المفتاحية الأكثر فعالية",
      icon: "🏷️",
      benefits: ["كلمات عالية القيمة", "منافسة أقل", "تحويل أفضل"],
    },
    {
      title: "محتوى محسّن للبحث",
      description: "إنشاء محتوى يحب محركات البحث",
      icon: "📝",
      benefits: ["محتوى جودة عالية", "ترتيب أفضل", "مشاركات أكثر"],
    },
  ],
  "خطة تسويقية": [
    {
      title: "تحليل السوق",
      description: "فهم عميق لسوقك والمنافسين",
      icon: "🔬",
      benefits: ["فهم الفرص", "تحديد التهديدات", "ميزة تنافسية"],
    },
    {
      title: "استراتيجية المحتوى",
      description: "خطة محتوى متكاملة لجذب عملائك",
      icon: "📚",
      benefits: ["محتوى منظم", "جمهور متفاعل", "نمو مستمر"],
    },
    {
      title: "خطة وسائل التواصل",
      description: "استراتيجية شاملة لوسائل التواصل الاجتماعي",
      icon: "📱",
      benefits: ["حضور قوي", "تفاعل عالي", "متابعون مخلصون"],
    },
  ],
  "تحليل المنافسين": [
    {
      title: "دراسة المنافسين",
      description: "تحليل شامل لاستراتيجيات منافسيك",
      icon: "🕵️",
      benefits: ["فهم الفجوات", "تحديد الفرص", "تطوير ميزتك"],
    },
    {
      title: "مقارنة الأداء",
      description: "قياس أدائك مقابل المنافسين",
      icon: "⚖️",
      benefits: ["معرفة موقعك", "تحديد نقاط الضعف", "خطط التحسين"],
    },
    {
      title: "استراتيجية التمايز",
      description: "طرق لتميز نفسك عن المنافسين",
      icon: "⭐",
      benefits: ["هوية فريدة", "قيمة مضافة", "عملاء مخلصون"],
    },
  ],
};

export default function LoraAdvanced() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "السلام عليكم ورحمة الله وبركاته! 👋 أنا لورا، مساعدتك الخليجية الذكية من REXO. أنا هنا أساعدك تحقق أحلامك التسويقية بحلول ذكية وفعالة. شنو اللي أقدر أساعدك فيه اليوم؟",
      sender: "lora",
      timestamp: new Date(),
      type: "text",
      suggestions: ["زيادة المبيعات", "تحسين البحث", "خطة تسويقية", "تحليل المنافسين"],
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate Lora response with solutions
    setTimeout(() => {
      const category = Object.keys(solutionsByCategory).find((key) =>
        input.includes(key) || input.includes(key.split(" ")[0])
      );

      let responseMessage: Message;

      if (category && solutionsByCategory[category as keyof typeof solutionsByCategory]) {
        const solutions = solutionsByCategory[category as keyof typeof solutionsByCategory];
        responseMessage = {
          id: (Date.now() + 1).toString(),
          text: `حاضر! اخترت لك ${solutions.length} حلول فعالة لـ "${category}". كل حل فيه فوائد عملية تساعدك توصل لهدفك:`,
          sender: "lora",
          timestamp: new Date(),
          type: "solutions",
          suggestions: solutions.map((s) => s.title),
        };
      } else {
        const generalResponses = [
          "تمام التمام! أنا أقدر أساعدك بعدة طرق. اختر من الخيارات اللي بتشوفها أو قول لي بالتفصيل شنو احتياجك.",
          "يالله! عندي حلول كثيرة لمساعدتك. اختر من الخيارات المقترحة أو قول لي أكثر عن مشروعك.",
          "ممتاز جداً! أنا هنا أساعدك بأفضل الحلول. اختر من الخيارات أو قول لي شنو بالتحديد تحتاج.",
          "حاضر! عندي حلول ذكية لك. اختر من الخيارات أو اسأل عن أي شي متعلق بالتسويق.",
        ];

        responseMessage = {
          id: (Date.now() + 1).toString(),
          text: generalResponses[Math.floor(Math.random() * generalResponses.length)],
          sender: "lora",
          timestamp: new Date(),
          type: "text",
          suggestions: ["زيادة المبيعات", "تحسين البحث", "خطة تسويقية", "تحليل المنافسين"],
        };
      }

      setMessages((prev) => [...prev, responseMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleSelectSolution = (solution: string) => {
    setInput(solution);
    handleSendMessage({ preventDefault: () => {} } as React.FormEvent);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">لورا - مساعدتك الخليجية الذكية 🇸🇦</h1>
              <p className="text-sm text-muted-foreground">حلول ذكية واستشارات شخصية 24/7</p>
            </div>
          </div>
          <Button
            onClick={() => setShowFeatures(!showFeatures)}
            variant="outline"
            className="border-border gap-2"
          >
            <Sparkles className="w-4 h-4" />
            مميزات المنصة
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex gap-4 p-4">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map((message) => (
              <div key={message.id}>
                <div
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-md lg:max-w-lg px-4 py-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-secondary text-secondary-foreground rounded-br-none"
                        : "bg-card border border-border text-foreground rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString("ar-SA", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>

                {/* Solutions Grid */}
                {message.type === "solutions" && message.suggestions && (
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                    {message.suggestions.map((suggestion, idx) => {
                      const category = Object.keys(solutionsByCategory).find((key) =>
                        messages.find((m) => m.text.includes(key))?.text.includes(key)
                      );
                      const solutions = category
                        ? solutionsByCategory[category as keyof typeof solutionsByCategory]
                        : [];
                      const solution = solutions.find((s) => s.title === suggestion);

                      return solution ? (
                        <Card
                          key={idx}
                          className="bg-card border-border p-3 cursor-pointer hover:border-accent transition-all"
                          onClick={() => {
                            toast.success(`تم اختيار: ${solution.title}`);
                          }}
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">{solution.icon}</span>
                            <div className="flex-1">
                              <h3 className="font-bold text-sm">{solution.title}</h3>
                              <p className="text-xs text-muted-foreground mb-2">
                                {solution.description}
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {solution.benefits.map((benefit, i) => (
                                  <span
                                    key={i}
                                    className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded"
                                  >
                                    {benefit}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </Card>
                      ) : null;
                    })}
                  </div>
                )}

                {/* Suggestions */}
                {message.suggestions && message.type !== "solutions" && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {message.suggestions.map((suggestion, idx) => (
                      <Button
                        key={idx}
                        onClick={() => handleSelectSolution(suggestion)}
                        size="sm"
                        variant="outline"
                        className="border-accent/30 text-accent hover:bg-accent/10 gap-1"
                      >
                        <TrendingUp className="w-3 h-3" />
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-card border border-border px-4 py-3 rounded-lg rounded-bl-none">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-accent rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-accent rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="bg-card border-t border-border p-4">
            <form onSubmit={handleSendMessage} className="flex gap-3">
              <Input
                type="text"
                placeholder="اكتب لي شنو بتحتاج..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className="flex-1 bg-background border-border"
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Features Sidebar */}
        {showFeatures && (
          <div className="w-96 border-l border-border overflow-y-auto">
            <div className="p-4 space-y-4">
              <div>
                <h2 className="text-xl font-bold mb-2">{platformFeatures.title}</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  {platformFeatures.description}
                </p>
              </div>

              <div className="space-y-3">
                {platformFeatures.features.map((feature, idx) => (
                  <Card key={idx} className="bg-card border-border p-3">
                    <h3 className="font-bold text-sm mb-1">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground mb-2">{feature.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {feature.benefits.map((benefit, i) => (
                        <span
                          key={i}
                          className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>

              <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-bold text-accent mb-1">نصيحة ذهبية</p>
                    <p className="text-muted-foreground">
                      استخدم جميع الأدوات معاً لتحقيق أفضل النتائج. لورا هنا تساعدك توصل لأهدافك!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
