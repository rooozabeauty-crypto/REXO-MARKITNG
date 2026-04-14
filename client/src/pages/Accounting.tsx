import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Download, TrendingUp, DollarSign, PieChart as PieChartIcon } from "lucide-react";
import { toast } from "sonner";

const monthlyData = [
  { month: "يناير", revenue: 45000, expenses: 32000, profit: 13000 },
  { month: "فبراير", revenue: 52000, expenses: 35000, profit: 17000 },
  { month: "مارس", revenue: 48000, expenses: 33000, profit: 15000 },
  { month: "أبريل", revenue: 61000, expenses: 38000, profit: 23000 },
  { month: "مايو", revenue: 55000, expenses: 36000, profit: 19000 },
  { month: "يونيو", revenue: 67000, expenses: 40000, profit: 27000 },
];

const expenseData = [
  { name: "الرواتب", value: 120000, color: "#3b82f6" },
  { name: "التسويق", value: 45000, color: "#8b5cf6" },
  { name: "الخوادم", value: 25000, color: "#ec4899" },
  { name: "أخرى", value: 30000, color: "#f59e0b" },
];

export default function Accounting() {
  const [period, setPeriod] = useState<"monthly" | "quarterly" | "yearly">("monthly");

  const totalRevenue = monthlyData.reduce((sum, m) => sum + m.revenue, 0);
  const totalExpenses = monthlyData.reduce((sum, m) => sum + m.expenses, 0);
  const totalProfit = monthlyData.reduce((sum, m) => sum + m.profit, 0);
  const profitMargin = ((totalProfit / totalRevenue) * 100).toFixed(1);

  const handleExport = () => {
    toast.success("تم تحميل التقرير بنجاح!");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">المحاسب المالي الذكي</h1>
            <p className="text-muted-foreground">تحليل شامل للأرباح والمصروفات</p>
          </div>
          <Button
            onClick={handleExport}
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2"
          >
            <Download className="w-4 h-4" />
            تحميل التقرير
          </Button>
        </div>

        {/* Period Selector */}
        <div className="flex gap-2 mb-8">
          {(["monthly", "quarterly", "yearly"] as const).map((p) => (
            <Button
              key={p}
              onClick={() => setPeriod(p)}
              variant={period === p ? "default" : "outline"}
              className={period === p ? "bg-secondary text-secondary-foreground" : "border-border"}
            >
              {p === "monthly" ? "شهري" : p === "quarterly" ? "ربع سنوي" : "سنوي"}
            </Button>
          ))}
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "إجمالي الإيرادات",
              value: `${(totalRevenue / 1000).toFixed(1)}ك ر.س`,
              icon: DollarSign,
              color: "from-green-500",
            },
            {
              label: "إجمالي المصروفات",
              value: `${(totalExpenses / 1000).toFixed(1)}ك ر.س`,
              icon: TrendingUp,
              color: "from-red-500",
            },
            {
              label: "إجمالي الأرباح",
              value: `${(totalProfit / 1000).toFixed(1)}ك ر.س`,
              icon: DollarSign,
              color: "from-blue-500",
            },
            {
              label: "هامش الربح",
              value: `${profitMargin}%`,
              icon: PieChartIcon,
              color: "from-purple-500",
            },
          ].map((metric, idx) => (
            <Card key={idx} className="bg-card border-border p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">{metric.label}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                </div>
                <metric.icon className="w-8 h-8 text-accent opacity-50" />
              </div>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Revenue vs Expenses */}
          <Card className="bg-card border-border p-6">
            <h2 className="text-xl font-bold mb-4">الإيرادات مقابل المصروفات</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151" }}
                  labelStyle={{ color: "#f3f4f6" }}
                />
                <Legend />
                <Bar dataKey="revenue" fill="#10b981" name="الإيرادات" />
                <Bar dataKey="expenses" fill="#ef4444" name="المصروفات" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Profit Trend */}
          <Card className="bg-card border-border p-6">
            <h2 className="text-xl font-bold mb-4">اتجاه الأرباح</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151" }}
                  labelStyle={{ color: "#f3f4f6" }}
                />
                <Legend />
                <Line type="monotone" dataKey="profit" stroke="#3b82f6" strokeWidth={2} name="الأرباح" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Expense Breakdown */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-card border-border p-6">
            <h2 className="text-xl font-bold mb-4">توزيع المصروفات</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${(value / 1000).toFixed(0)}ك`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151" }}
                  labelStyle={{ color: "#f3f4f6" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* Expense Details */}
          <Card className="bg-card border-border p-6">
            <h2 className="text-xl font-bold mb-4">تفاصيل المصروفات</h2>
            <div className="space-y-4">
              {expenseData.map((expense, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-background rounded-lg">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: expense.color }}
                    />
                    <span className="font-medium">{expense.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{(expense.value / 1000).toFixed(1)}ك ر.س</p>
                    <p className="text-xs text-muted-foreground">
                      {((expense.value / totalExpenses) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Financial Summary */}
        <Card className="bg-card border-border p-6">
          <h2 className="text-xl font-bold mb-4">ملخص مالي</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                label: "متوسط الإيرادات الشهرية",
                value: `${(totalRevenue / monthlyData.length / 1000).toFixed(1)}ك ر.س`,
              },
              {
                label: "متوسط المصروفات الشهرية",
                value: `${(totalExpenses / monthlyData.length / 1000).toFixed(1)}ك ر.س`,
              },
              {
                label: "متوسط الأرباح الشهرية",
                value: `${(totalProfit / monthlyData.length / 1000).toFixed(1)}ك ر.س`,
              },
            ].map((item, idx) => (
              <div key={idx} className="p-4 bg-background rounded-lg">
                <p className="text-muted-foreground text-sm mb-1">{item.label}</p>
                <p className="text-2xl font-bold text-accent">{item.value}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
