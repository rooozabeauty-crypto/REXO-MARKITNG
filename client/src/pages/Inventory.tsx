import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Edit, Trash2, Search, Package, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  price: number;
  status: "in-stock" | "low-stock" | "out-of-stock";
}

const initialProducts: Product[] = [
  {
    id: "1",
    name: "قالب تصميم احترافي",
    sku: "TMPL-001",
    category: "تصاميم",
    quantity: 150,
    price: 299,
    status: "in-stock",
  },
  {
    id: "2",
    name: "حزمة العبارات التسويقية",
    sku: "PKG-001",
    category: "محتوى",
    quantity: 45,
    price: 499,
    status: "low-stock",
  },
  {
    id: "3",
    name: "خدمة التصميم الجرافيكي",
    sku: "SRV-001",
    category: "خدمات",
    quantity: 0,
    price: 1500,
    status: "out-of-stock",
  },
  {
    id: "4",
    name: "دورة التسويق الرقمي",
    sku: "CRS-001",
    category: "دورات",
    quantity: 200,
    price: 799,
    status: "in-stock",
  },
];

export default function Inventory() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    sku: "",
    category: "",
    quantity: "",
    price: "",
  });

  const filteredProducts = products.filter(
    (p) =>
      p.name.includes(searchTerm) ||
      p.sku.includes(searchTerm) ||
      p.category.includes(searchTerm)
  );

  const handleAddProduct = () => {
    if (
      !newProduct.name ||
      !newProduct.sku ||
      !newProduct.category ||
      !newProduct.quantity ||
      !newProduct.price
    ) {
      toast.error("يرجى ملء جميع الحقول");
      return;
    }

    const product: Product = {
      id: Date.now().toString(),
      name: newProduct.name,
      sku: newProduct.sku,
      category: newProduct.category,
      quantity: parseInt(newProduct.quantity),
      price: parseFloat(newProduct.price),
      status:
        parseInt(newProduct.quantity) === 0
          ? "out-of-stock"
          : parseInt(newProduct.quantity) < 50
            ? "low-stock"
            : "in-stock",
    };

    setProducts([...products, product]);
    setNewProduct({ name: "", sku: "", category: "", quantity: "", price: "" });
    setShowForm(false);
    toast.success("تم إضافة المنتج بنجاح!");
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
    toast.success("تم حذف المنتج");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-stock":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "low-stock":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "out-of-stock":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "in-stock":
        return "متوفر";
      case "low-stock":
        return "كمية منخفضة";
      case "out-of-stock":
        return "غير متوفر";
      default:
        return status;
    }
  };

  const stats = {
    totalProducts: products.length,
    totalValue: products.reduce((sum, p) => sum + p.quantity * p.price, 0),
    lowStock: products.filter((p) => p.status === "low-stock").length,
    outOfStock: products.filter((p) => p.status === "out-of-stock").length,
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">إدارة المخزون</h1>
            <p className="text-muted-foreground">تتبع المنتجات والمخزون</p>
          </div>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2"
          >
            <Plus className="w-4 h-4" />
            منتج جديد
          </Button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "إجمالي المنتجات",
              value: stats.totalProducts,
              icon: Package,
              color: "from-blue-500",
            },
            {
              label: "القيمة الإجمالية",
              value: `${(stats.totalValue / 1000).toFixed(1)}ك`,
              icon: Package,
              color: "from-green-500",
            },
            {
              label: "كمية منخفضة",
              value: stats.lowStock,
              icon: AlertCircle,
              color: "from-yellow-500",
            },
            {
              label: "غير متوفر",
              value: stats.outOfStock,
              icon: AlertCircle,
              color: "from-red-500",
            },
          ].map((stat, idx) => (
            <Card key={idx} className="bg-card border-border p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className="w-8 h-8 text-accent opacity-50" />
              </div>
            </Card>
          ))}
        </div>

        {/* Add Product Form */}
        {showForm && (
          <Card className="bg-card border-border p-6 mb-8">
            <h3 className="font-bold mb-4">إضافة منتج جديد</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">اسم المنتج</label>
                <Input
                  placeholder="مثال: قالب تصميم"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="bg-background border-border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">رمز المنتج (SKU)</label>
                <Input
                  placeholder="مثال: TMPL-001"
                  value={newProduct.sku}
                  onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                  className="bg-background border-border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">الفئة</label>
                <Input
                  placeholder="مثال: تصاميم"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="bg-background border-border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">الكمية</label>
                <Input
                  type="number"
                  placeholder="100"
                  value={newProduct.quantity}
                  onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                  className="bg-background border-border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">السعر (ريال)</label>
                <Input
                  type="number"
                  placeholder="299"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  className="bg-background border-border"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleAddProduct}
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                إضافة المنتج
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

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute right-3 top-3 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="ابحث عن منتج أو SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-card border-border pl-10 pr-4"
            />
          </div>
        </div>

        {/* Products Table */}
        <Card className="bg-card border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-background/50">
                  <th className="px-6 py-3 text-right text-sm font-medium">المنتج</th>
                  <th className="px-6 py-3 text-right text-sm font-medium">SKU</th>
                  <th className="px-6 py-3 text-right text-sm font-medium">الفئة</th>
                  <th className="px-6 py-3 text-right text-sm font-medium">الكمية</th>
                  <th className="px-6 py-3 text-right text-sm font-medium">السعر</th>
                  <th className="px-6 py-3 text-right text-sm font-medium">الحالة</th>
                  <th className="px-6 py-3 text-right text-sm font-medium">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-border hover:bg-background/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium">{product.name}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{product.sku}</td>
                    <td className="px-6 py-4 text-sm">{product.category}</td>
                    <td className="px-6 py-4 text-sm font-bold">{product.quantity}</td>
                    <td className="px-6 py-4 text-sm font-bold text-accent">
                      {product.price.toLocaleString()} ر.س
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(product.status)}`}
                      >
                        {getStatusLabel(product.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          className="border-border gap-1"
                          size="sm"
                        >
                          <Edit className="w-3 h-3" />
                          تعديل
                        </Button>
                        <Button
                          onClick={() => deleteProduct(product.id)}
                          variant="outline"
                          className="border-red-500/50 text-red-500 hover:bg-red-500/10 gap-1"
                          size="sm"
                        >
                          <Trash2 className="w-3 h-3" />
                          حذف
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">لا توجد منتجات</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
