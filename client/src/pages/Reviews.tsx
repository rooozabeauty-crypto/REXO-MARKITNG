import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ThumbsUp, ThumbsDown, Trash2, MessageCircle } from "lucide-react";
import { toast } from "sonner";

interface Review {
  id: string;
  author: string;
  rating: number;
  content: string;
  date: string;
  helpful: number;
  unhelpful: number;
  status: "approved" | "pending" | "rejected";
}

const initialReviews: Review[] = [
  {
    id: "1",
    author: "محمد أحمد",
    rating: 5,
    content: "منصة REXO رائعة جداً! ساعدتني في زيادة مبيعاتي بنسبة 150% خلال 3 أشهر فقط.",
    date: "2026-04-10",
    helpful: 245,
    unhelpful: 12,
    status: "approved",
  },
  {
    id: "2",
    author: "فاطمة محمود",
    rating: 4,
    content: "الخدمة ممتازة والدعم سريع جداً. فقط أتمنى إضافة المزيد من القوالب.",
    date: "2026-04-08",
    helpful: 156,
    unhelpful: 8,
    status: "approved",
  },
  {
    id: "3",
    author: "علي الشمري",
    rating: 5,
    content: "أفضل منصة تسويق استخدمتها! الأدوات سهلة الاستخدام والنتائج مذهلة.",
    date: "2026-04-05",
    helpful: 312,
    unhelpful: 5,
    status: "approved",
  },
  {
    id: "4",
    author: "سارة خالد",
    rating: 3,
    content: "جيدة لكن تحتاج تحسينات في الواجهة. الأسعار مرتفعة قليلاً.",
    date: "2026-04-03",
    helpful: 89,
    unhelpful: 34,
    status: "pending",
  },
  {
    id: "5",
    author: "خالد عبدالله",
    rating: 2,
    content: "المنصة بطيئة أحياناً والدعم لم يرد على استفساري.",
    date: "2026-04-01",
    helpful: 45,
    unhelpful: 120,
    status: "pending",
  },
];

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [filterStatus, setFilterStatus] = useState<"all" | "approved" | "pending" | "rejected">("all");

  const filteredReviews = reviews.filter((r) => filterStatus === "all" || r.status === filterStatus);

  const approveReview = (id: string) => {
    setReviews(reviews.map((r) => (r.id === id ? { ...r, status: "approved" } : r)));
    toast.success("تم الموافقة على التقييم");
  };

  const rejectReview = (id: string) => {
    setReviews(reviews.map((r) => (r.id === id ? { ...r, status: "rejected" } : r)));
    toast.success("تم رفض التقييم");
  };

  const deleteReview = (id: string) => {
    setReviews(reviews.filter((r) => r.id !== id));
    toast.success("تم حذف التقييم");
  };

  const stats = {
    total: reviews.length,
    approved: reviews.filter((r) => r.status === "approved").length,
    pending: reviews.filter((r) => r.status === "pending").length,
    avgRating: (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1),
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">التقييمات والتعليقات</h1>
          <p className="text-muted-foreground">إدارة تقييمات العملاء والتعليقات</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "إجمالي التقييمات", value: stats.total },
            { label: "الموافق عليها", value: stats.approved },
            { label: "قيد الانتظار", value: stats.pending },
            { label: "متوسط التقييم", value: `${stats.avgRating}/5` },
          ].map((stat, idx) => (
            <Card key={idx} className="bg-card border-border p-4">
              <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </Card>
          ))}
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-8">
          {(["all", "approved", "pending", "rejected"] as const).map((status) => (
            <Button
              key={status}
              onClick={() => setFilterStatus(status)}
              variant={filterStatus === status ? "default" : "outline"}
              className={filterStatus === status ? "bg-secondary text-secondary-foreground" : "border-border"}
            >
              {status === "all"
                ? "الكل"
                : status === "approved"
                  ? "موافق عليها"
                  : status === "pending"
                    ? "قيد الانتظار"
                    : "مرفوضة"}
            </Button>
          ))}
        </div>

        {/* Reviews */}
        <div className="space-y-4">
          {filteredReviews.map((review) => (
            <Card key={review.id} className="bg-card border-border p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg mb-1">{review.author}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? "fill-accent text-accent" : "text-muted-foreground"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                  </div>
                </div>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${
                    review.status === "approved"
                      ? "bg-green-500/10 text-green-500 border-green-500/20"
                      : review.status === "pending"
                        ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                        : "bg-red-500/10 text-red-500 border-red-500/20"
                  }`}
                >
                  {review.status === "approved" ? "موافق عليه" : review.status === "pending" ? "قيد الانتظار" : "مرفوض"}
                </span>
              </div>

              <p className="text-foreground mb-4 leading-relaxed">{review.content}</p>

              <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm">{review.helpful} مفيد</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ThumbsDown className="w-4 h-4 text-red-500" />
                    <span className="text-sm">{review.unhelpful} غير مفيد</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                {review.status === "pending" && (
                  <>
                    <Button
                      onClick={() => approveReview(review.id)}
                      className="flex-1 bg-green-500/10 text-green-500 hover:bg-green-500/20 border border-green-500/20"
                      variant="outline"
                    >
                      الموافقة
                    </Button>
                    <Button
                      onClick={() => rejectReview(review.id)}
                      className="flex-1 bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20"
                      variant="outline"
                    >
                      الرفض
                    </Button>
                  </>
                )}
                <Button
                  onClick={() => deleteReview(review.id)}
                  className="flex-1 border-red-500/50 text-red-500 hover:bg-red-500/10 gap-2"
                  variant="outline"
                >
                  <Trash2 className="w-4 h-4" />
                  حذف
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <div className="text-center py-12">
            <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">لا توجد تقييمات</p>
          </div>
        )}
      </div>
    </div>
  );
}
