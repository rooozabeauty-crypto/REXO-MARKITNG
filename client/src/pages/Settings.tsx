import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Save, Bell, Lock, User, Palette, Database } from "lucide-react";
import { toast } from "sonner";

export default function Settings() {
  const [settings, setSettings] = useState({
    companyName: "REXO MARKETING",
    email: "zoooz2426@gmail.com",
    phone: "0508047159",
    website: "https://rexo.marketing",
    notifications: true,
    emailNotifications: true,
    darkMode: true,
    language: "ar",
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("تم حفظ الإعدادات بنجاح!");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">الإعدادات</h1>
          <p className="text-muted-foreground">إدارة إعدادات حسابك والمنصة</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-border">
          {[
            { id: "account", label: "الحساب", icon: User },
            { id: "notifications", label: "الإشعارات", icon: Bell },
            { id: "appearance", label: "المظهر", icon: Palette },
            { id: "security", label: "الأمان", icon: Lock },
          ].map((tab) => (
            <button
              key={tab.id}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 border-transparent hover:border-accent transition-colors"
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Account Settings */}
        <Card className="bg-card border-border p-6 mb-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <User className="w-6 h-6 text-accent" />
            معلومات الحساب
          </h2>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">اسم الشركة</label>
              <Input
                value={settings.companyName}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                className="bg-background border-border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">البريد الإلكتروني</label>
              <Input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="bg-background border-border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">رقم الهاتف</label>
              <Input
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="bg-background border-border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">الموقع الإلكتروني</label>
              <Input
                value={settings.website}
                onChange={(e) => setSettings({ ...settings, website: e.target.value })}
                className="bg-background border-border"
              />
            </div>
          </div>
        </Card>

        {/* Notification Settings */}
        <Card className="bg-card border-border p-6 mb-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Bell className="w-6 h-6 text-accent" />
            الإشعارات
          </h2>

          <div className="space-y-4 mb-6">
            {[
              {
                id: "notifications",
                label: "الإشعارات في المنصة",
                description: "تلقي إشعارات حول أنشطتك",
              },
              {
                id: "emailNotifications",
                label: "إشعارات البريد الإلكتروني",
                description: "تلقي تحديثات عبر البريد الإلكتروني",
              },
            ].map((notif) => (
              <div key={notif.id} className="flex items-center justify-between p-4 bg-background rounded-lg">
                <div>
                  <p className="font-medium">{notif.label}</p>
                  <p className="text-sm text-muted-foreground">{notif.description}</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings[notif.id as keyof typeof settings] as boolean}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      [notif.id]: e.target.checked,
                    })
                  }
                  className="w-5 h-5 rounded border-border"
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Appearance Settings */}
        <Card className="bg-card border-border p-6 mb-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Palette className="w-6 h-6 text-accent" />
            المظهر
          </h2>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">اللغة</label>
              <select
                value={settings.language}
                onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground"
              >
                <option value="ar">العربية</option>
                <option value="en">English</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-4 bg-background rounded-lg">
              <div>
                <p className="font-medium">الوضع الليلي</p>
                <p className="text-sm text-muted-foreground">تفعيل الوضع الليلي للواجهة</p>
              </div>
              <input
                type="checkbox"
                checked={settings.darkMode}
                onChange={(e) => setSettings({ ...settings, darkMode: e.target.checked })}
                className="w-5 h-5 rounded border-border"
              />
            </div>
          </div>
        </Card>

        {/* Security Settings */}
        <Card className="bg-card border-border p-6 mb-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Lock className="w-6 h-6 text-accent" />
            الأمان
          </h2>

          <div className="space-y-4 mb-6">
            <Button className="w-full border-border" variant="outline">
              تغيير كلمة المرور
            </Button>
            <Button className="w-full border-border" variant="outline">
              تفعيل المصادقة الثنائية
            </Button>
            <Button className="w-full border-red-500/50 text-red-500 hover:bg-red-500/10" variant="outline">
              تسجيل الخروج من جميع الأجهزة
            </Button>
          </div>
        </Card>

        {/* Database & Backup */}
        <Card className="bg-card border-border p-6 mb-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Database className="w-6 h-6 text-accent" />
            النسخ الاحتياطية
          </h2>

          <div className="space-y-4 mb-6">
            <div className="p-4 bg-background rounded-lg">
              <p className="font-medium mb-2">آخر نسخة احتياطية</p>
              <p className="text-sm text-muted-foreground">2026-04-14 12:30 PM</p>
            </div>
            <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              إنشاء نسخة احتياطية الآن
            </Button>
            <Button className="w-full border-border" variant="outline">
              استعادة من نسخة احتياطية
            </Button>
          </div>
        </Card>

        {/* Save Button */}
        <div className="flex gap-2">
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2"
          >
            <Save className="w-4 h-4" />
            {isSaving ? "جاري الحفظ..." : "حفظ الإعدادات"}
          </Button>
          <Button className="flex-1 border-border" variant="outline">
            إلغاء
          </Button>
        </div>
      </div>
    </div>
  );
}
