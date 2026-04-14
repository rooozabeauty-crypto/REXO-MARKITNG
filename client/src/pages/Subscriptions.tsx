import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, X } from "lucide-react";

interface Plan {
  name: string;
  price: number;
  period: string;
  description: string;
  features: { name: string; included: boolean }[];
  highlighted: boolean;
  cta: string;
  trial: string;
}

const plans: Plan[] = [
  {
    name: "البداية",
    price: 299,
    period: "شهري",
    description: "مناسب للمشاريع الصغيرة والناشئة",
    trial: "14 يوم مجاني",
    cta: "ابدأ الآن",
    highlighted: false,
    features: [
      { name: "أول 5 ميزات أساسية", included: true },
      { name: "دعم عبر البريد الإلكتروني", included: true },
      { name: "تقارير أساسية", included: true },
      { name: "فريق دعم مخصص", included: false },
      { name: "تكامل API متقدم", included: false },
      { name: "استشارات شخصية", included: false },
    ],
  },
  {
    name: "الاحترافية",
    price: 599,
    period: "شهري",
    description: "الخطة الموصى بها للشركات المتوسطة",
    trial: "14 يوم مجاني",
    cta: "اختر الخطة",
    highlighted: true,
    features: [
      { name: "جميع الخدمات والميزات", included: true },
      { name: "دعم أولوية 24/7", included: true },
      { name: "تقارير متقدمة وتحليلات", included: true },
      { name: "فريق دعم مخصص", included: true },
      { name: "تكامل API كامل", included: true },
      { name: "استشارات شهرية", included: false },
    ],
  },
  {
    name: "السنوية",
    price: 9700,
    period: "سنوي",
    description: "أفضل قيمة مع مزايا إضافية",
    trial: "14 يوم مجاني",
    cta: "اشترك الآن",
    highlighted: false,
    features: [
      { name: "جميع الخدمات والميزات", included: true },
      { name: "شهرين إضافيين مجاناً", included: true },
      { name: "خدمات إضافية حصرية", included: true },
      { name: "فريق دعم مخصص VIP", included: true },
      { name: "تكامل API كامل", included: true },
      { name: "استشارات شهرية مجانية", included: true },
    ],
  },
];

export default function Subscriptions() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">خطط الاشتراك</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            اختر الخطة المناسبة لاحتياجاتك. جميع الخطط تشمل فترة تجريبية مجانية لمدة 14 يوم
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, idx) => (
            <div key={idx} className="relative">
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-gradient-to-r from-accent to-secondary text-foreground px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    الأشهر الأفضل
                  </span>
                </div>
              )}

              <Card
                className={`relative h-full flex flex-col transition-all ${
                  plan.highlighted
                    ? "bg-gradient-to-b from-secondary/10 to-accent/10 border-accent shadow-2xl scale-105"
                    : "bg-card border-border hover:border-accent"
                }`}
              >
                <div className="p-8 flex-1 flex flex-col">
                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold text-accent">{plan.price}</span>
                      <span className="text-muted-foreground">ريال</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">/{plan.period}</p>
                    <p className="text-xs text-accent mt-2">{plan.trial}</p>
                  </div>

                  {/* CTA Button */}
                  <Button
                    className={`w-full mb-8 ${
                      plan.highlighted
                        ? "bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                        : "bg-accent hover:bg-accent/90 text-accent-foreground"
                    }`}
                  >
                    {plan.cta}
                  </Button>

                  {/* Features */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold">المميزات المتضمنة:</h4>
                    <ul className="space-y-3">
                      {plan.features.map((feature, fidx) => (
                        <li key={fidx} className="flex items-start gap-3">
                          {feature.included ? (
                            <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                          ) : (
                            <X className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                          )}
                          <span
                            className={`text-sm ${
                              feature.included
                                ? "text-foreground"
                                : "text-muted-foreground line-through"
                            }`}
                          >
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">الأسئلة الشائعة</h2>

          <div className="space-y-4">
            {[
              {
                q: "هل يمكنني الترقية أو التخفيف من الخطة في أي وقت؟",
                a: "نعم، يمكنك تغيير خطتك في أي وقت. التغييرات تسري من الشهر التالي.",
              },
              {
                q: "هل هناك عقد طويل الأجل؟",
                a: "لا، جميع الخطط بدون التزام طويل الأجل. يمكنك الإلغاء في أي وقت.",
              },
              {
                q: "هل تقدمون استرجاع الأموال؟",
                a: "نعم، نقدم ضمان استرجاع الأموال لمدة 30 يوم إذا لم تكن راضياً.",
              },
              {
                q: "ماذا يحدث بعد انتهاء الفترة التجريبية؟",
                a: "ستحتاج إلى اختيار خطة دفع. لن يتم خصم أي رسوم بدون موافقتك.",
              },
            ].map((faq, idx) => (
              <Card key={idx} className="bg-card border-border p-6">
                <h4 className="font-bold mb-2 text-accent">{faq.q}</h4>
                <p className="text-muted-foreground text-sm">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-gradient-to-r from-secondary/10 via-accent/10 to-secondary/10 rounded-lg p-8 text-center border border-accent/20">
          <h3 className="text-2xl font-bold mb-2">هل تحتاج مساعدة؟</h3>
          <p className="text-muted-foreground mb-4">
            فريقنا جاهز للإجابة على جميع أسئلتك
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              تواصل معنا
            </Button>
            <Button variant="outline" className="border-accent text-accent hover:bg-accent/10">
              اطلب عرض توضيحي
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
