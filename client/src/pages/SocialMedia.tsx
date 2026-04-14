import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Send, Heart, MessageCircle, Share2, Calendar } from "lucide-react";
import { toast } from "sonner";

interface Post {
  id: string;
  platform: "twitter" | "instagram" | "facebook" | "tiktok";
  content: string;
  scheduledTime: string;
  status: "scheduled" | "published" | "failed";
  likes: number;
  comments: number;
  shares: number;
}

const initialPosts: Post[] = [
  {
    id: "1",
    platform: "instagram",
    content: "منصة REXO تساعدك في تنمية عملك التسويقي بذكاء اصطناعي متقدم! 🚀",
    scheduledTime: "2026-04-15 10:00",
    status: "published",
    likes: 245,
    comments: 32,
    shares: 18,
  },
  {
    id: "2",
    platform: "twitter",
    content: "هل تريد زيادة مبيعاتك؟ جرب أدوات REXO الآن 📈 #تسويق_رقمي",
    scheduledTime: "2026-04-14 14:30",
    status: "published",
    likes: 156,
    comments: 24,
    shares: 42,
  },
  {
    id: "3",
    platform: "facebook",
    content: "اكتشف قوة التسويق الذكي مع منصتنا المتكاملة",
    scheduledTime: "2026-04-16 09:00",
    status: "scheduled",
    likes: 0,
    comments: 0,
    shares: 0,
  },
];

export default function SocialMedia() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [showForm, setShowForm] = useState(false);
  const [newPost, setNewPost] = useState({
    platform: "instagram" as "instagram" | "twitter" | "facebook" | "tiktok",
    content: "",
    scheduledTime: "",
  });

  const handleAddPost = () => {
    if (!newPost.content || !newPost.scheduledTime) {
      toast.error("يرجى ملء جميع الحقول");
      return;
    }

    const post: Post = {
      id: Date.now().toString(),
      platform: newPost.platform,
      content: newPost.content,
      scheduledTime: newPost.scheduledTime,
      status: "scheduled",
      likes: 0,
      comments: 0,
      shares: 0,
    };

    setPosts([...posts, post]);
    setNewPost({ platform: "instagram", content: "", scheduledTime: "" });
    setShowForm(false);
    toast.success("تم جدولة المنشور بنجاح!");
  };

  const deletePost = (id: string) => {
    setPosts(posts.filter((p) => p.id !== id));
    toast.success("تم حذف المنشور");
  };

  const publishPost = (id: string) => {
    setPosts(
      posts.map((p) =>
        p.id === id
          ? {
              ...p,
              status: "published",
              likes: Math.floor(Math.random() * 500),
              comments: Math.floor(Math.random() * 100),
              shares: Math.floor(Math.random() * 50),
            }
          : p
      )
    );
    toast.success("تم نشر المنشور!");
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "instagram":
        return "bg-pink-500/10 text-pink-500 border-pink-500/20";
      case "twitter":
        return "bg-blue-400/10 text-blue-400 border-blue-400/20";
      case "facebook":
        return "bg-blue-600/10 text-blue-600 border-blue-600/20";
      case "tiktok":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "scheduled":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "failed":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "published":
        return "منشور";
      case "scheduled":
        return "مجدول";
      case "failed":
        return "فشل";
      default:
        return status;
    }
  };

  const stats = {
    totalPosts: posts.length,
    published: posts.filter((p) => p.status === "published").length,
    scheduled: posts.filter((p) => p.status === "scheduled").length,
    totalEngagement: posts.reduce((sum, p) => sum + p.likes + p.comments + p.shares, 0),
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">وسائل التواصل الاجتماعي</h1>
            <p className="text-muted-foreground">إدارة وجدولة منشوراتك على جميع المنصات</p>
          </div>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2"
          >
            <Plus className="w-4 h-4" />
            منشور جديد
          </Button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "إجمالي المنشورات", value: stats.totalPosts },
            { label: "منشورة", value: stats.published },
            { label: "مجدولة", value: stats.scheduled },
            { label: "التفاعل الكلي", value: stats.totalEngagement },
          ].map((stat, idx) => (
            <Card key={idx} className="bg-card border-border p-4">
              <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </Card>
          ))}
        </div>

        {/* New Post Form */}
        {showForm && (
          <Card className="bg-card border-border p-6 mb-8">
            <h3 className="font-bold mb-4">إنشاء منشور جديد</h3>
            <div className="space-y-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">المنصة</label>
                <select
                  value={newPost.platform}
                  onChange={(e) =>
                    setNewPost({
                      ...newPost,
                      platform: e.target.value as "instagram" | "twitter" | "facebook" | "tiktok",
                    })
                  }
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground"
                >
                  <option value="instagram">Instagram</option>
                  <option value="twitter">Twitter</option>
                  <option value="facebook">Facebook</option>
                  <option value="tiktok">TikTok</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">المحتوى</label>
                <textarea
                  placeholder="اكتب محتوى المنشور..."
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {newPost.content.length} / 280 حرف
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">وقت الجدولة</label>
                <Input
                  type="datetime-local"
                  value={newPost.scheduledTime}
                  onChange={(e) => setNewPost({ ...newPost, scheduledTime: e.target.value })}
                  className="bg-background border-border"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleAddPost}
                className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2"
              >
                <Send className="w-4 h-4" />
                جدول المنشور
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

        {/* Posts List */}
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="bg-card border-border p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getPlatformColor(post.platform)}`}
                  >
                    {post.platform.toUpperCase()}
                  </span>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(post.status)}`}
                  >
                    {getStatusLabel(post.status)}
                  </span>
                </div>
                <Button
                  onClick={() => deletePost(post.id)}
                  variant="outline"
                  className="border-red-500/50 text-red-500 hover:bg-red-500/10 gap-1"
                  size="sm"
                >
                  <Trash2 className="w-4 h-4" />
                  حذف
                </Button>
              </div>

              <p className="mb-4 text-foreground leading-relaxed">{post.content}</p>

              <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>{post.scheduledTime}</span>
                </div>
              </div>

              {post.status === "published" && (
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {[
                    { icon: Heart, label: "إعجابات", value: post.likes },
                    { icon: MessageCircle, label: "تعليقات", value: post.comments },
                    { icon: Share2, label: "مشاركات", value: post.shares },
                  ].map((stat, idx) => (
                    <div key={idx} className="text-center">
                      <stat.icon className="w-5 h-5 text-accent mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="font-bold">{stat.value}</p>
                    </div>
                  ))}
                </div>
              )}

              {post.status === "scheduled" && (
                <Button
                  onClick={() => publishPost(post.id)}
                  className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2"
                >
                  <Send className="w-4 h-4" />
                  نشر الآن
                </Button>
              )}
            </Card>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">لا توجد منشورات</p>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2"
            >
              <Plus className="w-4 h-4" />
              إنشاء منشور جديد
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
