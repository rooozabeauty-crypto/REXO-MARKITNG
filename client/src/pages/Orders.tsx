import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Eye, Printer, Download, TrendingUp } from "lucide-react";
import { toast } from "sonner";

interface Order {
  id: string;
  customer: string;
  email: string;
  amount: number;
  items: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  date: string;
  total: number;
}

const initialOrders: Order[] = [
  {
    id: "ORD-001",
    customer: "محمد أحمد",
    email: "mohammad@example.com",
    amount: 2500,
    items: 3,
    status: "delivered",
    date: "2026-04-10",
    total: 2500,
  },
  {
    id: "ORD-002",
    customer: "فاطمة محمود",
    email: "fatima@example.com",
    amount: 1800,
    items: 2,
    status: "shipped",
    date: "2026-04-12",
    total: 1800,
  },
  {
    id: "ORD-003",
    customer: "علي الشمري",
    email: "ali@example.com",
    amount: 3200,
    items: 5,
    status: "processing",
    date: "2026-04-13",
    total: 3200,
  },
  {
    id: "ORD-004",
    customer: "سارة خالد",
    email: "sarah@example.com",
    amount: 1500,
    items: 2,
    status: "pending",
    date: "2026-04-14",
    total: 1500,
  },
];

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "processing" | "shipped" | "delivered" | "cancelled">("all");

  const filteredOrders = orders.filter(
    (o) =>
      (filterStatus === "all" || o.status === filterStatus) &&
      (o.id.includes(searchTerm) || o.customer.includes(searchTerm) || o.email.includes(searchTerm))
  );

  const updateOrderStatus = (id: string, status: Order["status"]) => {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status } : o)));
    toast.success(`تم تحديث حالة الطلب إلى ${getStatusLabel(status)}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "processing":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "shipped":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "delivered":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "cancelled":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "قيد الانتظار";
      case "processing":
        return "قيد المعالجة";
      case "shipped":
        return "تم الشحن";
      case "delivered":
        return "تم التسليم";
      case "cancelled":
        return "ملغي";
      default:
        return status;
    }
  };

  const stats = {
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, o) => sum + o.total, 0),
    pending: orders.filter((o) => o.status === "pending").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">إدارة الطلبات والمبيعات</h1>
          <p className="text-muted-foreground">تتبع وإدارة جميع الطلبات والمبيعات</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "إجمالي الطلبات", value: stats.totalOrders, icon: "📦" },
            { label: "إجمالي الإيرادات", value: `${(stats.totalRevenue / 1000).toFixed(1)}ك ر.س`, icon: "💰" },
            { label: "قيد الانتظار", value: stats.pending, icon: "⏳" },
            { label: "تم التسليم", value: stats.delivered, icon: "✅" },
          ].map((stat, idx) => (
            <Card key={idx} className="bg-card border-border p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <span className="text-3xl">{stat.icon}</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {(["all", "pending", "processing", "shipped", "delivered", "cancelled"] as const).map((status) => (
            <Button
              key={status}
              onClick={() => setFilterStatus(status)}
              variant={filterStatus === status ? "default" : "outline"}
              className={filterStatus === status ? "bg-secondary text-secondary-foreground" : "border-border"}
              size="sm"
            >
              {status === "all"
                ? "الكل"
                : status === "pending"
                  ? "قيد الانتظار"
                  : status === "processing"
                    ? "قيد المعالجة"
                    : status === "shipped"
                      ? "تم الشحن"
                      : status === "delivered"
                        ? "تم التسليم"
                        : "ملغي"}
            </Button>
          ))}
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute right-3 top-3 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="ابحث عن رقم الطلب أو اسم العميل..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-card border-border pl-10 pr-4"
            />
          </div>
        </div>

        {/* Orders Table */}
        <Card className="bg-card border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-background/50">
                  <th className="px-6 py-3 text-right text-sm font-medium">رقم الطلب</th>
                  <th className="px-6 py-3 text-right text-sm font-medium">العميل</th>
                  <th className="px-6 py-3 text-right text-sm font-medium">البريد الإلكتروني</th>
                  <th className="px-6 py-3 text-right text-sm font-medium">المبلغ</th>
                  <th className="px-6 py-3 text-right text-sm font-medium">العناصر</th>
                  <th className="px-6 py-3 text-right text-sm font-medium">التاريخ</th>
                  <th className="px-6 py-3 text-right text-sm font-medium">الحالة</th>
                  <th className="px-6 py-3 text-right text-sm font-medium">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-border hover:bg-background/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-bold text-accent">{order.id}</td>
                    <td className="px-6 py-4 text-sm font-medium">{order.customer}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{order.email}</td>
                    <td className="px-6 py-4 text-sm font-bold">{order.amount.toLocaleString()} ر.س</td>
                    <td className="px-6 py-4 text-sm">{order.items} عنصر</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{order.date}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          className="border-border gap-1"
                          size="sm"
                        >
                          <Eye className="w-3 h-3" />
                          عرض
                        </Button>
                        <Button
                          variant="outline"
                          className="border-border gap-1"
                          size="sm"
                        >
                          <Printer className="w-3 h-3" />
                          طباعة
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">لا توجد طلبات</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
