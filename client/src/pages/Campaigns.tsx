import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Edit, Trash2, Play, Pause, Eye, MousePointer } from "lucide-react";
import { toast } from "sonner";

interface Campaign {
  id: string;
  name: string;
  status: "active" | "paused" | "completed";
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  startDate: string;
  endDate: string;
}

const initialCampaigns: Campaign[] = [
  {
    id: "1",
    name: "حملة الصيف 2026",
    status: "active",
    budget: 5000,
    spent: 3200,
    impressions: 45000,
    clicks: 2340,
    conversions: 234,
    startDate: "2026-04-01",
    endDate: "2026-06-30",
  },
  {
    id: "2",
    name: "عرض العيد الخاص",
    status: "completed",
    budget: 3000,
    spent: 3000,
    impressions: 32000,
    clicks: 1560,
    conversions: 156,
    startDate: "2026-03-01",
    endDate: "2026-03-31",
  },
  {
    id: "3",
    name: "حملة المتابعين الجدد",
    status: "paused",
    budget: 2000,
    spent: 800,
    impressions: 15000,
    clicks: 450,
    conversions: 45,
    startDate: "2026-04-10",
    endDate: "2026-05-10",
  },
];

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [showForm, setShowForm] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    budget: "",
    duration: "",
  });

  const handleAddCampaign = () => {
    if (!newCampaign.name || !newCampaign.budget || !newCampaign.duration) {
      toast.error("يرجى ملء جميع الحقول");
      return;
    }

    const campaign: Campaign = {
      id: Date.now().toString(),
      name: newCampaign.name,
      status: "active",
      budget: parseInt(newCampaign.budget),
      spent: 0,
      impressions: 0,
      clicks: 0,
      conversions: 0,
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date(Date.now() + parseInt(newCampaign.duration) * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
    };

    setCampaigns([...campaigns, campaign]);
    setNewCampaign({ name: "", budget: "", duration: "" });
    setShowForm(false);
    toast.success("تم إنشاء الحملة بنجاح!");
  };

  const toggleCampaignStatus = (id: string) => {
    setCampaigns(
      campaigns.map((c) =>
        c.id === id
          ? {
              ...c,
              status: c.status === "active" ? "paused" : "active",
            }
          : c
      )
    );
  };

  const deleteCampaign = (id: string) => {
    setCampaigns(campaigns.filter((c) => c.id !== id));
    toast.success("تم حذف الحملة");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "paused":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "completed":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "نشطة";
      case "paused":
        return "موقوفة";
      case "completed":
        return "مكتملة";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">الحملات الإعلانية</h1>
            <p className="text-muted-foreground">إدارة وتتبع جميع حملاتك التسويقية</p>
          </div>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2"
          >
            <Plus className="w-4 h-4" />
            حملة جديدة
          </Button>
        </div>

        {/* New Campaign Form */}
        {showForm && (
          <Card className="bg-card border-border p-6 mb-8">
            <h3 className="font-bold mb-4">إنشاء حملة جديدة</h3>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">اسم الحملة</label>
                <Input
                  placeholder="مثال: حملة الصيف"
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                  className="bg-background border-border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">الميزانية (ريال)</label>
                <Input
                  type="number"
                  placeholder="5000"
                  value={newCampaign.budget}
                  onChange={(e) => setNewCampaign({ ...newCampaign, budget: e.target.value })}
                  className="bg-background border-border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">المدة (أيام)</label>
                <Input
                  type="number"
                  placeholder="30"
                  value={newCampaign.duration}
                  onChange={(e) => setNewCampaign({ ...newCampaign, duration: e.target.value })}
                  className="bg-background border-border"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleAddCampaign}
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                إنشاء الحملة
              </Button>
              <Button
                onClick={() => setShowForm(false)}
                variant="outline"
                className="border-border"
              >
                إلغاء
              </Button>
            </div>
          </Card>
        )}

        {/* Campaigns List */}
        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <Card key={campaign.id} className="bg-card border-border p-6 hover:border-accent transition-colors">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Campaign Info */}
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{campaign.name}</h3>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(campaign.status)}`}>
                        {getStatusLabel(campaign.status)}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">الفترة:</span>
                      <span>{campaign.startDate} إلى {campaign.endDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">الميزانية:</span>
                      <span className="font-bold">{campaign.budget.toLocaleString()} ر.س</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">المصروف:</span>
                      <span className="font-bold text-accent">{campaign.spent.toLocaleString()} ر.س</span>
                    </div>
                  </div>
                </div>

                {/* Campaign Stats */}
                <div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {[
                      { icon: Eye, label: "الانطباعات", value: campaign.impressions.toLocaleString() },
                      { icon: MousePointer, label: "النقرات", value: campaign.clicks.toLocaleString() },
                    ].map((stat, idx) => (
                      <div key={idx} className="bg-background rounded-lg p-3 text-center">
                        <stat.icon className="w-5 h-5 text-accent mx-auto mb-2" />
                        <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                        <p className="font-bold">{stat.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span>استهلاك الميزانية</span>
                      <span>{Math.round((campaign.spent / campaign.budget) * 100)}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-accent to-secondary h-2 rounded-full"
                        style={{ width: `${Math.min((campaign.spent / campaign.budget) * 100, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => toggleCampaignStatus(campaign.id)}
                      variant="outline"
                      className="flex-1 border-border gap-2"
                      size="sm"
                    >
                      {campaign.status === "active" ? (
                        <>
                          <Pause className="w-4 h-4" />
                          إيقاف
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4" />
                          تشغيل
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-border gap-2"
                      size="sm"
                    >
                      <Edit className="w-4 h-4" />
                      تعديل
                    </Button>
                    <Button
                      onClick={() => deleteCampaign(campaign.id)}
                      variant="outline"
                      className="flex-1 border-red-500/50 text-red-500 hover:bg-red-500/10 gap-2"
                      size="sm"
                    >
                      <Trash2 className="w-4 h-4" />
                      حذف
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {campaigns.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">لا توجد حملات حالياً</p>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2"
            >
              <Plus className="w-4 h-4" />
              إنشاء حملة جديدة
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
