import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Share2, Eye, Trash2, Plus, Edit2 } from "lucide-react";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  category: string;
  color: string;
}

const dummyProducts: Product[] = [
  {
    id: "1",
    name: "حقيبة يد فاخرة",
    price: 299,
    originalPrice: 499,
    description: "حقيبة يد جلدية فاخرة بتصميم عصري",
    image: "👜",
    category: "أكسسوارات",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "2",
    name: "ساعة ذكية",
    price: 599,
    originalPrice: 899,
    description: "ساعة ذكية بتقنية حديثة وبطارية طويلة",
    image: "⌚",
    category: "إلكترونيات",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "3",
    name: "عطر فاخر",
    price: 199,
    description: "عطر فاخر برائحة عطرية فريدة",
    image: "💐",
    category: "عطور",
    color: "from-pink-500 to-rose-500",
  },
  {
    id: "4",
    name: "نظارة شمسية",
    price: 149,
    originalPrice: 249,
    description: "نظارة شمسية بتصميم عصري وحماية UV",
    image: "😎",
    category: "أكسسوارات",
    color: "from-yellow-500 to-orange-500",
  },
];

export default function ProductEditor() {
  const [products, setProducts] = useState<Product[]>(dummyProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<Partial<Product>>({});

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setFormData(product);
    setEditMode(false);
  };

  const handleEditProduct = () => {
    setEditMode(true);
  };

  const handleSaveProduct = () => {
    if (selectedProduct && formData) {
      setProducts(
        products.map((p) =>
          p.id === selectedProduct.id ? { ...selectedProduct, ...formData } : p
        )
      );
      setSelectedProduct({ ...selectedProduct, ...formData });
      setEditMode(false);
      toast.success("تم حفظ التغييرات!");
    }
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
    setSelectedProduct(null);
    toast.success("تم حذف المنتج!");
  };

  const handleAddProduct = () => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: "منتج جديد",
      price: 0,
      description: "وصف المنتج",
      image: "📦",
      category: "جديد",
      color: "from-gray-500 to-slate-500",
    };
    setProducts([...products, newProduct]);
    handleSelectProduct(newProduct);
    setEditMode(true);
    toast.success("تم إضافة منتج جديد!");
  };

  const handleExportProduct = () => {
    if (selectedProduct) {
      const data = JSON.stringify(selectedProduct, null, 2);
      const element = document.createElement("a");
      element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(data));
      element.setAttribute("download", `${selectedProduct.name}.json`);
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      toast.success("تم تحميل بيانات المنتج!");
    }
  };

  const handleShareProduct = () => {
    if (selectedProduct) {
      const shareText = `🎁 ${selectedProduct.name}\n💰 السعر: ${selectedProduct.price} ر.س\n📝 ${selectedProduct.description}`;
      navigator.clipboard.writeText(shareText);
      toast.success("تم نسخ بيانات المنتج للمشاركة!");
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">محرر المنتجات</h1>
            <p className="text-muted-foreground">عدّل وخصص منتجاتك للتسويق</p>
          </div>
          <Button
            onClick={handleAddProduct}
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2"
          >
            <Plus className="w-4 h-4" />
            منتج جديد
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Products List */}
          <div className="md:col-span-1">
            <Card className="bg-card border-border p-4">
              <h2 className="font-bold mb-4">المنتجات ({products.length})</h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {products.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product)}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      selectedProduct?.id === product.id
                        ? "bg-secondary text-secondary-foreground border border-secondary"
                        : "bg-background hover:bg-background/80 border border-border"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{product.image}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{product.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {product.price} ر.س
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Product Editor */}
          <div className="md:col-span-2">
            {selectedProduct ? (
              <div className="space-y-4">
                {/* Preview */}
                <Card className="bg-card border-border p-6">
                  <div className={`bg-gradient-to-br ${selectedProduct.color} rounded-lg p-12 flex items-center justify-center text-8xl mb-4`}>
                    {selectedProduct.image}
                  </div>

                  {/* Product Info */}
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold text-accent">
                        {selectedProduct.price} ر.س
                      </span>
                      {selectedProduct.originalPrice && (
                        <span className="text-lg text-muted-foreground line-through">
                          {selectedProduct.originalPrice} ر.س
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground">{selectedProduct.description}</p>
                    <span className="inline-block text-xs bg-accent/20 text-accent px-3 py-1 rounded-full mt-2">
                      {selectedProduct.category}
                    </span>
                  </div>
                </Card>

                {/* Edit Form */}
                {editMode ? (
                  <Card className="bg-card border-border p-6">
                    <h3 className="font-bold mb-4">تعديل المنتج</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">اسم المنتج</label>
                        <Input
                          value={formData.name || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="bg-background border-border"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">السعر</label>
                          <Input
                            type="number"
                            value={formData.price || 0}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                price: parseFloat(e.target.value),
                              })
                            }
                            className="bg-background border-border"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">السعر الأصلي</label>
                          <Input
                            type="number"
                            value={formData.originalPrice || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                originalPrice: parseFloat(e.target.value) || undefined,
                              })
                            }
                            className="bg-background border-border"
                            placeholder="اختياري"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">الوصف</label>
                        <textarea
                          value={formData.description || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, description: e.target.value })
                          }
                          className="w-full bg-background border border-border rounded-md p-2 text-sm"
                          rows={3}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">الفئة</label>
                          <Input
                            value={formData.category || ""}
                            onChange={(e) =>
                              setFormData({ ...formData, category: e.target.value })
                            }
                            className="bg-background border-border"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">الأيقونة/الصورة</label>
                          <Input
                            value={formData.image || ""}
                            onChange={(e) =>
                              setFormData({ ...formData, image: e.target.value })
                            }
                            className="bg-background border-border"
                            placeholder="😊"
                          />
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={handleSaveProduct}
                          className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                        >
                          حفظ التغييرات
                        </Button>
                        <Button
                          onClick={() => setEditMode(false)}
                          variant="outline"
                          className="flex-1 border-border"
                        >
                          إلغاء
                        </Button>
                      </div>
                    </div>
                  </Card>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      onClick={handleEditProduct}
                      className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2"
                    >
                      <Edit2 className="w-4 h-4" />
                      تعديل
                    </Button>
                    <Button
                      onClick={handleShareProduct}
                      variant="outline"
                      className="flex-1 border-border gap-2"
                    >
                      <Share2 className="w-4 h-4" />
                      مشاركة
                    </Button>
                    <Button
                      onClick={handleExportProduct}
                      variant="outline"
                      className="flex-1 border-border gap-2"
                    >
                      <Download className="w-4 h-4" />
                      تحميل
                    </Button>
                    <Button
                      onClick={() => handleDeleteProduct(selectedProduct.id)}
                      variant="outline"
                      className="border-red-500/30 text-red-500 hover:bg-red-500/10 gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <Card className="bg-card border-border p-12 text-center">
                <Eye className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">اختر منتجاً لتعديله</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
