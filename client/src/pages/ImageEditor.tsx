import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Upload,
  Download,
  Trash2,
  Plus,
  Edit2,
  Share2,
  Zap,
  Package,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  category: string;
}

interface EditedImage {
  id: string;
  original: string;
  edited: string;
  productName: string;
  timestamp: Date;
}

const dummyProducts = [
  {
    id: "1",
    name: "منتج فخم 1",
    price: "299 ر.س",
    description: "منتج تسويقي احترافي",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    category: "إلكترونيات",
  },
  {
    id: "2",
    name: "منتج فخم 2",
    price: "599 ر.س",
    description: "منتج عالي الجودة",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    category: "أكسسوارات",
  },
  {
    id: "3",
    name: "منتج فخم 3",
    price: "199 ر.س",
    description: "منتج مميز وفريد",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
    category: "موضة",
  },
  {
    id: "4",
    name: "منتج فخم 4",
    price: "899 ر.س",
    description: "منتج فاخر وراقي",
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=400&fit=crop",
    category: "أحذية",
  },
  {
    id: "5",
    name: "منتج فخم 5",
    price: "449 ر.س",
    description: "منتج متميز جداً",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop",
    category: "ساعات",
  },
  {
    id: "6",
    name: "منتج فخم 6",
    price: "749 ر.س",
    description: "منتج احترافي وجميل",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
    category: "حقائب",
  },
];

export default function ImageEditor() {
  const [products, setProducts] = useState<Product[]>(dummyProducts);
  const [editedImages, setEditedImages] = useState<EditedImage[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [blur, setBlur] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        setIsEditing(true);
        toast.success("تم رفع الصورة بنجاح!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProductImageSelect = (product: Product) => {
    setSelectedProduct(product);
    setUploadedImage(product.image);
    setProductName(product.name);
    setProductPrice(product.price);
    setProductDescription(product.description);
    setProductCategory(product.category);
    setIsEditing(true);
    resetFilters();
  };

  const resetFilters = () => {
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
    setBlur(0);
  };

  const applyFilters = () => {
    if (!uploadedImage || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) blur(${blur}px)`;
      ctx.drawImage(img, 0, 0);

      const editedImageUrl = canvas.toDataURL();
      setUploadedImage(editedImageUrl);
    };
    img.src = uploadedImage;
  };

  const saveEditedImage = () => {
    if (!uploadedImage) return;

    const newEditedImage: EditedImage = {
      id: Date.now().toString(),
      original: selectedProduct?.image || uploadedImage,
      edited: uploadedImage,
      productName: productName || "صورة بدون اسم",
      timestamp: new Date(),
    };

    setEditedImages([newEditedImage, ...editedImages]);
    toast.success("تم حفظ الصورة المعدلة!");
    resetForm();
  };

  const downloadImage = (imageUrl: string, name: string) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `${name}-${Date.now()}.png`;
    link.click();
    toast.success("تم تحميل الصورة!");
  };

  const addNewProduct = () => {
    if (!productName || !productPrice) {
      toast.error("يرجى ملء جميع الحقول المطلوبة!");
      return;
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      name: productName,
      price: productPrice,
      description: productDescription,
      image: uploadedImage || dummyProducts[0].image,
      category: productCategory || "عام",
    };

    setProducts([newProduct, ...products]);
    toast.success("تم إضافة المنتج بنجاح!");
    resetForm();
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
    toast.success("تم حذف المنتج!");
  };

  const deleteEditedImage = (id: string) => {
    setEditedImages(editedImages.filter((img) => img.id !== id));
    toast.success("تم حذف الصورة!");
  };

  const resetForm = () => {
    setUploadedImage(null);
    setProductName("");
    setProductPrice("");
    setProductDescription("");
    setProductCategory("");
    setSelectedProduct(null);
    setIsEditing(false);
    resetFilters();
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">محرر الصور والمنتجات 📸</h1>
            <p className="text-muted-foreground">رفع وتعديل الصور وإضافة منتجات جديدة</p>
          </div>
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="bg-secondary hover:bg-secondary/90 gap-2"
          >
            <Upload className="w-4 h-4" />
            رفع صورة
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Editor Panel */}
          <div className="lg:col-span-2 space-y-4">
            {isEditing && uploadedImage ? (
              <Card className="bg-card border-border p-6 space-y-4">
                <h2 className="text-xl font-bold">محرر الصور</h2>

                {/* Image Preview */}
                <div className="bg-background rounded-lg p-4 flex items-center justify-center min-h-96">
                  <img
                    src={uploadedImage}
                    alt="معاينة"
                    style={{
                      filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) blur(${blur}px)`,
                      maxWidth: "100%",
                      maxHeight: "400px",
                    }}
                  />
                </div>

                {/* Canvas for saving edited image */}
                <canvas ref={canvasRef} className="hidden" />

                {/* Filters */}
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium">السطوع: {brightness}%</label>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={brightness}
                      onChange={(e) => setBrightness(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">التباين: {contrast}%</label>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={contrast}
                      onChange={(e) => setContrast(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">التشبع: {saturation}%</label>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={saturation}
                      onChange={(e) => setSaturation(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">التمويه: {blur}px</label>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      value={blur}
                      onChange={(e) => setBlur(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-3 border-t border-border pt-4">
                  <Input
                    placeholder="اسم المنتج"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="bg-background border-border"
                  />
                  <Input
                    placeholder="السعر (مثال: 299 ر.س)"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    className="bg-background border-border"
                  />
                  <Input
                    placeholder="الفئة (مثال: إلكترونيات)"
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                    className="bg-background border-border"
                  />
                  <Input
                    placeholder="الوصف"
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    className="bg-background border-border"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    onClick={saveEditedImage}
                    className="flex-1 bg-secondary hover:bg-secondary/90 gap-2"
                  >
                    <Download className="w-4 h-4" />
                    حفظ الصورة المعدلة
                  </Button>
                  <Button
                    onClick={addNewProduct}
                    className="flex-1 bg-accent hover:bg-accent/90 gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    إضافة منتج
                  </Button>
                  <Button onClick={resetForm} variant="outline" className="border-border">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ) : (
              <Card className="bg-card border-border p-12 text-center">
                <ImageIcon className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">لم يتم اختيار صورة للتعديل</p>
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-secondary hover:bg-secondary/90"
                >
                  رفع صورة الآن
                </Button>
              </Card>
            )}
          </div>

          {/* Products Sidebar */}
          <div className="space-y-4">
            <Card className="bg-card border-border p-4">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Package className="w-4 h-4" />
                المنتجات ({products.length})
              </h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {products.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductImageSelect(product)}
                    className="p-2 bg-background rounded-lg cursor-pointer hover:border-accent border border-border transition-all"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-24 object-cover rounded mb-2"
                    />
                    <p className="text-sm font-medium truncate">{product.name}</p>
                    <p className="text-xs text-accent">{product.price}</p>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteProduct(product.id);
                      }}
                      size="sm"
                      variant="ghost"
                      className="w-full mt-1 text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Edited Images Gallery */}
        {editedImages.length > 0 && (
          <Card className="bg-card border-border p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-accent" />
              الصور المعدلة ({editedImages.length})
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {editedImages.map((img) => (
                <div key={img.id} className="bg-background rounded-lg overflow-hidden">
                  <img src={img.edited} alt={img.productName} className="w-full h-32 object-cover" />
                  <div className="p-2 space-y-2">
                    <p className="text-sm font-medium truncate">{img.productName}</p>
                    <div className="flex gap-1">
                      <Button
                        onClick={() => downloadImage(img.edited, img.productName)}
                        size="sm"
                        variant="outline"
                        className="flex-1 border-border h-8 gap-1"
                      >
                        <Download className="w-3 h-3" />
                        تحميل
                      </Button>
                      <Button
                        onClick={() => deleteEditedImage(img.id)}
                        size="sm"
                        variant="ghost"
                        className="text-destructive hover:bg-destructive/10 h-8"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
