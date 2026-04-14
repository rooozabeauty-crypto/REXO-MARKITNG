import { Card } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, Users, Eye, ShoppingCart, ArrowUp, ArrowDown } from "lucide-react";

const analyticsData = [
  { month: "يناير", visits: 4000, conversions: 2400 },
  { month: "فبراير", visits: 3000, conversions: 1398 },
  { month: "مارس", visits: 2000, conversions: 9800 },
  { month: "أبريل", visits: 2780, conversions: 3908 },
  { month: "مايو", visits: 1890, conversions: 4800 },
  { month: "يونيو", visits: 2390, conversions: 3800 },
];

const sourceData = [
  { name: "البحث العضوي", value: 45, color: "#3b82f6" },
  { name: "وسائل التواصل", value: 30, color: "#d4af37" },
  { name: "الإعلانات المدفوعة", value: 15, color: "#8b5cf6" },
  { name: "مباشر", value: 10, color: "#10b981" },
];

export default function Analytics() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">تحليل الأداء</h1>
          <p className="text-muted-foreground">مراقبة شاملة لأداء حملاتك التسويقية</p>
        </div>

        {/* KPI Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            {
              icon: Eye,
              label: "عدد الزيارات",
              value: "24,580",
              change: "+12.5%",
              positive: true,
            },
            {
              icon: Users,
              label: "عدد المتابعين",
              value: "8,240",
              change: "+8.2%",
              positive: true,
            },
            {
              icon: ShoppingCart,
              label: "التحويلات",
              value: "1,240",
              change: "-2.4%",
              positive: false,
            },
            {
              icon: TrendingUp,
              label: "معدل التحويل",
              value: "5.05%",
              change: "+1.2%",
              positive: true,
            },
          ].map((kpi, idx) => (
            <Card key={idx} className="bg-card border-border p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">{kpi.label}</p>
                  <p className="text-3xl font-bold">{kpi.value}</p>
                </div>
                <kpi.icon className="w-8 h-8 text-accent opacity-50" />
              </div>
              <div className={`mt-3 flex items-center gap-1 text-sm ${kpi.positive ? "text-green-500" : "text-red-500"}`}>
                {kpi.positive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                <span>{kpi.change}</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Line Chart */}
          <Card className="bg-card border-border p-6">
            <h3 className="font-bold mb-4">الزيارات والتحويلات</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip contentStyle={{ backgroundColor: "#1a1a2e", border: "1px solid #d4af37" }} />
                <Legend />
                <Line type="monotone" dataKey="visits" stroke="#3b82f6" strokeWidth={2} name="الزيارات" />
                <Line type="monotone" dataKey="conversions" stroke="#d4af37" strokeWidth={2} name="التحويلات" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Pie Chart */}
          <Card className="bg-card border-border p-6">
            <h3 className="font-bold mb-4">مصادر الزيارات</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={sourceData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Bar Chart */}
        <Card className="bg-card border-border p-6 mb-8">
          <h3 className="font-bold mb-4">الأداء الشهري</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip contentStyle={{ backgroundColor: "#1a1a2e", border: "1px solid #d4af37" }} />
              <Legend />
              <Bar dataKey="visits" fill="#3b82f6" name="الزيارات" />
              <Bar dataKey="conversions" fill="#d4af37" name="التحويلات" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Top Pages */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="bg-card border-border p-6">
            <h3 className="font-bold mb-4">أكثر الصفحات زيارة</h3>
            <div className="space-y-4">
              {[
                { page: "الرئيسية", visits: 12500, percentage: 45 },
                { page: "الخدمات", visits: 8200, percentage: 30 },
                { page: "الأسعار", visits: 4100, percentage: 15 },
                { page: "الاتصال", visits: 2780, percentage: 10 },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">{item.page}</span>
                    <span className="text-sm font-bold">{item.visits.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-accent to-secondary h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-card border-border p-6">
            <h3 className="font-bold mb-4">أجهزة المستخدمين</h3>
            <div className="space-y-4">
              {[
                { device: "الهاتف المحمول", users: 15200, percentage: 55 },
                { device: "سطح المكتب", users: 10100, percentage: 37 },
                { device: "الجهاز اللوحي", users: 2680, percentage: 8 },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">{item.device}</span>
                    <span className="text-sm font-bold">{item.users.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-secondary to-accent h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
