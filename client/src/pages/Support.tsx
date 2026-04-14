import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Mail, MessageCircle, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Support() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("تم إرسال رسالتك بنجاح! سنرد عليك قريباً.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">الدعم والتواصل</h1>
          <p className="text-muted-foreground text-lg">
            نحن هنا لمساعدتك. اختر طريقة التواصل المناسبة
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: Mail,
              title: "البريد الإلكتروني",
              description: "نرد على رسائلك خلال 24 ساعة",
              contact: "zoooz2426@gmail.com",
              action: "أرسل بريد",
              link: "mailto:zoooz2426@gmail.com",
            },
            {
              icon: MessageCircle,
              title: "واتس أب",
              description: "دعم فوري عبر واتس أب",
              contact: "0508047159",
              action: "فتح الدردشة",
              link: "https://wa.me/966508047159",
            },
            {
              icon: Phone,
              title: "الهاتف",
              description: "تحدث مع فريقنا مباشرة",
              contact: "0508047159",
              action: "اتصل الآن",
              link: "tel:0508047159",
            },
          ].map((method, idx) => (
            <Card
              key={idx}
              className="bg-card border-border p-6 hover:border-accent transition-colors text-center"
            >
              <method.icon className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">{method.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{method.description}</p>
              <p className="font-mono text-accent mb-4">{method.contact}</p>
              <a href={method.link} target="_blank" rel="noopener noreferrer">
                <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                  {method.action}
                </Button>
              </a>
            </Card>
          ))}
        </div>

        {/* Contact Form */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-6">أرسل لنا رسالة</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">الاسم</label>
                <Input
                  type="text"
                  placeholder="اسمك الكامل"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="bg-card border-border"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  البريد الإلكتروني
                </label>
                <Input
                  type="email"
                  placeholder="بريدك الإلكتروني"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="bg-card border-border"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">الموضوع</label>
                <Input
                  type="text"
                  placeholder="موضوع الرسالة"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  required
                  className="bg-card border-border"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">الرسالة</label>
                <textarea
                  placeholder="اكتب رسالتك هنا..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  rows={5}
                  className="w-full px-3 py-2 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2"
              >
                <Send className="w-4 h-4" />
                إرسال الرسالة
              </Button>
            </form>
          </div>

          {/* Info Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">معلومات الاتصال</h2>

            <Card className="bg-card border-border p-6 mb-6">
              <div className="flex items-start gap-4 mb-6">
                <MapPin className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">المملكة العربية السعودية</h3>
                  <p className="text-muted-foreground text-sm">
                    نعمل في جميع أنحاء المملكة
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 mb-6">
                <Mail className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">البريد الإلكتروني</h3>
                  <p className="text-muted-foreground text-sm">zoooz2426@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MessageCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">واتس أب</h3>
                  <p className="text-muted-foreground text-sm">0508047159</p>
                </div>
              </div>
            </Card>

            {/* Hours */}
            <Card className="bg-gradient-to-br from-accent/10 to-secondary/10 border-accent/20 p-6">
              <h3 className="font-bold mb-4">ساعات العمل</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">السبت - الخميس</span>
                  <span className="font-medium">9:00 ص - 6:00 م</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">الجمعة</span>
                  <span className="font-medium">2:00 م - 6:00 م</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">الدعم الفوري</span>
                  <span className="font-medium text-accent">24/7</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-3xl font-bold mb-8 text-center">الأسئلة الشائعة</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                q: "كم الوقت اللازم للرد على استفساراتي؟",
                a: "نرد على جميع الاستفسارات خلال 24 ساعة كحد أقصى.",
              },
              {
                q: "هل تقدمون دعم فني مجاني؟",
                a: "نعم، جميع المشتركين يحصلون على دعم فني مجاني.",
              },
              {
                q: "هل يمكنني الحصول على استشارة مجانية؟",
                a: "نعم، نقدم استشارة مجانية لجميع العملاء الجدد.",
              },
              {
                q: "ما هي طرق الدفع المتاحة؟",
                a: "نقبل التحويل البنكي وبطاقات الائتمان والمحافظ الرقمية.",
              },
            ].map((faq, idx) => (
              <Card key={idx} className="bg-card border-border p-6">
                <h4 className="font-bold mb-2 text-accent">{faq.q}</h4>
                <p className="text-muted-foreground text-sm">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
