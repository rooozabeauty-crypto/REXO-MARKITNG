import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send, MessageCircle, Loader2 } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "lora";
  timestamp: Date;
}

export default function Lora() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "السلام عليكم ورحمة الله وبركاته! 👋 أنا لورا، مساعدتك الذكية من REXO. كيف أستطيع مساعدتك اليوم؟",
      sender: "lora",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate Lora response
    setTimeout(() => {
      const responses = [
        "شكراً على سؤالك! يمكنني مساعدتك في تحسين حملاتك التسويقية. هل تريد معرفة المزيد عن SEO أو تحليل الأداء؟",
        "رائع! أنا هنا لمساعدتك في زيادة مبيعاتك ومتابعيك. ما هو نوع المشروع الذي تعمل عليه؟",
        "أنا متخصصة في التسويق الرقمي والذكاء الاصطناعي. يمكنني تقديم استشارات شخصية لتحسين أدائك.",
        "ممتاز! دعني أساعدك في اختيار الاستراتيجية المناسبة لمشروعك. ما هو هدفك الرئيسي؟",
      ];

      const loraMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: "lora",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, loraMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">لورا - مساعدتك الذكية</h1>
            <p className="text-sm text-muted-foreground">متاحة 24/7 لمساعدتك في تحقيق أهدافك التسويقية</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-md lg:max-w-lg px-4 py-3 rounded-lg ${
                message.sender === "user"
                  ? "bg-secondary text-secondary-foreground rounded-br-none"
                  : "bg-card border border-border text-foreground rounded-bl-none"
              }`}
            >
              <p className="text-sm leading-relaxed">{message.text}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {message.timestamp.toLocaleTimeString("ar-SA", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-card border border-border px-4 py-3 rounded-lg rounded-bl-none">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-accent rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-accent rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-card border-t border-border p-6">
        <form onSubmit={handleSendMessage} className="flex gap-3">
          <Input
            type="text"
            placeholder="اكتب رسالتك هنا..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="flex-1 bg-background border-border"
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </form>

        {/* Quick Actions */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            "زيادة المبيعات",
            "تحسين SEO",
            "استراتيجية تسويقية",
            "تحليل المنافسين",
          ].map((action, idx) => (
            <button
              key={idx}
              onClick={() => setInput(action)}
              className="px-3 py-2 bg-accent/10 border border-accent/20 rounded-lg text-sm hover:bg-accent/20 transition-colors text-foreground"
            >
              {action}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
