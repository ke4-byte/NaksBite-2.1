import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { promos } from "@/lib/data";
import { toast } from "sonner";
import type { Page } from "@/types";

interface DealsPageProps {
  onNavigate: (page: Page) => void;
}

export function DealsPage({ onNavigate }: DealsPageProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    toast.success("Promo code copied!");
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black mb-2">Deals & Promos</h1>
          <p className="text-red-100">Save big on your favorite NaksBite meals</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promos.map((promo) => (
            <Card key={promo.id} className="overflow-hidden group">
              <div className="relative overflow-hidden">
                <img
                  src={promo.image}
                  alt={promo.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-xl">{promo.title}</h3>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-zinc-600 dark:text-zinc-300 mb-4">{promo.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 font-mono font-bold px-3 py-1 rounded-lg">
                      {promo.code}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyCode(promo.code)}
                      className="text-zinc-500"
                    >
                      {copied === promo.code ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  <Button
                    onClick={() => onNavigate("menu")}
                    className="bg-red-600 hover:bg-red-700 text-white"
                    size="sm"
                  >
                    Order Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8 bg-gradient-to-r from-red-600 to-red-800 border-0">
          <CardContent className="p-8 text-center text-white">
            <h2 className="text-2xl font-black mb-2">Hungry for More?</h2>
            <p className="text-red-100 mb-4">
              Sign up for our newsletter to get exclusive deals and early access to new menu items!
            </p>
            <Button
              onClick={() => onNavigate("contact")}
              className="bg-white text-red-600 hover:bg-yellow-300"
            >
              Subscribe Now
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}