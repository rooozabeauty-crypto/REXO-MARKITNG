import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Download,
  Share2,
  RotateCcw,
  Type,
  Palette,
  Image as ImageIcon,
  Plus,
  Trash2,
} from "lucide-react";

interface TextElement {
  id: string;
  text: string;
  size: number;
  color: string;
  x: number;
  y: number;
}

export default function PosterMaker() {
  const [posterBg, setPosterBg] = useState("#1a1a2e");
  const [textElements, setTextElements] = useState<TextElement[]>([
    {
      id: "1",
      text: "عنوان الملصق",
      size: 48,
      color: "#d4af37",
      x: 50,
      y: 50,
    },
  ]);
  const [selectedElement, setSelectedElement] = useState<string | null>("1");

  const addTextElement = () => {
    const newElement: TextElement = {
      id: Date.now().toString(),
      text: "نص جديد",
      size: 24,
      color: "#ffffff",
      x: 50,
      y: 150 + textElements.length * 50,
    };
    setTextElements([...textElements, newElement]);
    setSelectedElement(newElement.id);
  };

  const updateElement = (id: string, updates: Partial<TextElement>) => {
    setTextElements(
      textElements.map((el) => (el.id === id ? { ...el, ...updates } : el))
    );
  };

  const deleteElement = (id: string) => {
    setTextElements(textElements.filter((el) => el.id !== id));
    if (selectedElement === id) {
      setSelectedElement(textElements.length > 1 ? textElements[0].id : null);
    }
  };

  const currentElement = textElements.find((el) => el.id === selectedElement);

  return (
    <div className="flex h-screen bg-background">
      {/* Canvas Area */}
      <div className="flex-1 flex flex-col p-6">
        <h1 className="text-3xl font-bold mb-6">Poster Maker</h1>

        <div className="flex-1 flex items-center justify-center bg-card border border-border rounded-lg overflow-hidden">
          <div
            style={{
              width: "600px",
              height: "800px",
              backgroundColor: posterBg,
              position: "relative",
            }}
            className="relative shadow-2xl"
          >
            {textElements.map((element) => (
              <div
                key={element.id}
                onClick={() => setSelectedElement(element.id)}
                style={{
                  position: "absolute",
                  left: `${element.x}px`,
                  top: `${element.y}px`,
                  fontSize: `${element.size}px`,
                  color: element.color,
                  cursor: "move",
                  border:
                    selectedElement === element.id
                      ? "2px solid #d4af37"
                      : "2px solid transparent",
                  padding: "8px",
                  borderRadius: "4px",
                  userSelect: "none",
                }}
                className="transition-all"
              >
                {element.text}
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2">
            <Download className="w-4 h-4" />
            تحميل
          </Button>
          <Button variant="outline" className="border-accent text-accent gap-2">
            <Share2 className="w-4 h-4" />
            مشاركة
          </Button>
          <Button
            variant="outline"
            className="border-accent text-accent gap-2"
            onClick={() => {
              setPosterBg("#1a1a2e");
              setTextElements([
                {
                  id: "1",
                  text: "عنوان الملصق",
                  size: 48,
                  color: "#d4af37",
                  x: 50,
                  y: 50,
                },
              ]);
            }}
          >
            <RotateCcw className="w-4 h-4" />
            إعادة تعيين
          </Button>
        </div>
      </div>

      {/* Control Panel */}
      <div className="w-80 bg-card border-l border-border p-6 overflow-y-auto">
        <h2 className="text-xl font-bold mb-6">أدوات التحرير</h2>

        {/* Background Color */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">لون الخلفية</label>
          <div className="flex gap-2">
            <input
              type="color"
              value={posterBg}
              onChange={(e) => setPosterBg(e.target.value)}
              className="w-12 h-10 rounded border border-border cursor-pointer"
            />
            <Input
              value={posterBg}
              onChange={(e) => setPosterBg(e.target.value)}
              className="flex-1 bg-background border-border"
            />
          </div>
        </div>

        {/* Add Text Button */}
        <Button
          onClick={addTextElement}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground gap-2 mb-6"
        >
          <Plus className="w-4 h-4" />
          إضافة نص
        </Button>

        {/* Text Elements List */}
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-3">العناصر النصية</h3>
          <div className="space-y-2">
            {textElements.map((element) => (
              <div
                key={element.id}
                onClick={() => setSelectedElement(element.id)}
                className={`p-3 rounded-lg cursor-pointer transition-all ${
                  selectedElement === element.id
                    ? "bg-accent/20 border border-accent"
                    : "bg-background border border-border hover:border-accent/50"
                }`}
              >
                <p className="text-sm truncate">{element.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Element Properties */}
        {currentElement && (
          <Card className="bg-background border-border p-4">
            <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
              <Type className="w-4 h-4" />
              خصائص النص
            </h3>

            <div className="space-y-4">
              {/* Text Content */}
              <div>
                <label className="block text-xs font-medium mb-1">النص</label>
                <Input
                  value={currentElement.text}
                  onChange={(e) =>
                    updateElement(currentElement.id, { text: e.target.value })
                  }
                  className="bg-background border-border text-sm"
                />
              </div>

              {/* Font Size */}
              <div>
                <label className="block text-xs font-medium mb-1">
                  حجم الخط: {currentElement.size}px
                </label>
                <input
                  type="range"
                  min="12"
                  max="72"
                  value={currentElement.size}
                  onChange={(e) =>
                    updateElement(currentElement.id, {
                      size: parseInt(e.target.value),
                    })
                  }
                  className="w-full"
                />
              </div>

              {/* Color */}
              <div>
                <label className="block text-xs font-medium mb-1">اللون</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={currentElement.color}
                    onChange={(e) =>
                      updateElement(currentElement.id, { color: e.target.value })
                    }
                    className="w-12 h-10 rounded border border-border cursor-pointer"
                  />
                  <Input
                    value={currentElement.color}
                    onChange={(e) =>
                      updateElement(currentElement.id, { color: e.target.value })
                    }
                    className="flex-1 bg-background border-border text-sm"
                  />
                </div>
              </div>

              {/* Position */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium mb-1">X</label>
                  <Input
                    type="number"
                    value={currentElement.x}
                    onChange={(e) =>
                      updateElement(currentElement.id, {
                        x: parseInt(e.target.value),
                      })
                    }
                    className="bg-background border-border text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Y</label>
                  <Input
                    type="number"
                    value={currentElement.y}
                    onChange={(e) =>
                      updateElement(currentElement.id, {
                        y: parseInt(e.target.value),
                      })
                    }
                    className="bg-background border-border text-sm"
                  />
                </div>
              </div>

              {/* Delete Button */}
              <Button
                onClick={() => deleteElement(currentElement.id)}
                variant="outline"
                className="w-full border-red-500/50 text-red-500 hover:bg-red-500/10 gap-2"
              >
                <Trash2 className="w-4 h-4" />
                حذف
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
