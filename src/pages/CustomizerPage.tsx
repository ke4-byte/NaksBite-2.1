import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus, ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { customizerOptions } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import { toast } from "sonner";
import type { Page } from "@/types";

interface CustomizerPageProps {
  onNavigate: (page: Page) => void;
}

export function CustomizerPage({ onNavigate }: CustomizerPageProps) {
  const [patty, setPatty] = useState(customizerOptions.patties[0]);
  const [cheese, setCheese] = useState(customizerOptions.cheeses[1]);
  const [toppings, setToppings] = useState<string[]>(["lettuce", "tomato"]);
  const [sauce, setSauce] = useState(customizerOptions.sauces[0]);
  const [bun, setBun] = useState(customizerOptions.buns[0]);
  const { addToCart } = useCart();

  const basePrice = 450;
  const toppingsTotal = toppings.reduce((sum, id) => {
    const topping = customizerOptions.toppings.find((t) => t.id === id);
    return sum + (topping?.price || 0);
  }, 0);
  const totalPrice = basePrice + patty.price + cheese.price + toppingsTotal + sauce.price + bun.price;

  const toggleTopping = (id: string) => {
    setToppings((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleAddToCart = () => {
    const customizations = [
      patty.name,
      cheese.name,
      bun.name,
      sauce.name,
      ...toppings.map((id) => {
        const topping = customizerOptions.toppings.find((t) => t.id === id);
        return topping?.name || "";
      }),
    ].filter(Boolean);

    addToCart({
      id: `custom-${Date.now()}`,
      name: "Custom Burger",
      price: totalPrice,
      customizations,
    });
    toast.success("Custom burger added to cart!");
    onNavigate("cart");
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black mb-2">Build Your Burger</h1>
          <p className="text-red-100">Create your perfect burger, starting at KES 450</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Customizer Options */}
          <div className="space-y-6">
            {/* Patty Selection */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">1. Choose Your Patty</h2>
                <div className="grid grid-cols-2 gap-3">
                  {customizerOptions.patties.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setPatty(option)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        patty.id === option.id
                          ? "border-red-600 bg-red-50 dark:bg-red-950/50"
                          : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold">{option.name}</span>
                        {option.price > 0 && (
                          <span className="text-sm text-red-600">+KES {option.price}</span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">{option.description}</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Cheese Selection */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">2. Pick Your Cheese</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {customizerOptions.cheeses.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setCheese(option)}
                      className={`p-3 rounded-xl border-2 text-center transition-all ${
                        cheese.id === option.id
                          ? "border-red-600 bg-red-50 dark:bg-red-950/50"
                          : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300"
                      }`}
                    >
                      <span className="font-semibold text-sm">{option.name}</span>
                      {option.price > 0 && (
                        <span className="block text-xs text-red-600 mt-1">+KES {option.price}</span>
                      )}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Toppings */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">3. Add Toppings</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {customizerOptions.toppings.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => toggleTopping(option.id)}
                      className={`p-3 rounded-xl border-2 text-center transition-all ${
                        toppings.includes(option.id)
                          ? "border-red-600 bg-red-50 dark:bg-red-950/50"
                          : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300"
                      }`}
                    >
                      <span className="font-semibold text-sm">{option.name}</span>
                      {option.price > 0 && (
                        <span className="block text-xs text-red-600 mt-1">+KES {option.price}</span>
                      )}
                      {toppings.includes(option.id) && (
                        <Check className="w-4 h-4 text-red-600 mx-auto mt-1" />
                      )}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Sauce Selection */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">4. Choose Your Sauce</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {customizerOptions.sauces.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSauce(option)}
                      className={`p-3 rounded-xl border-2 text-center transition-all ${
                        sauce.id === option.id
                          ? "border-red-600 bg-red-50 dark:bg-red-950/50"
                          : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300"
                      }`}
                    >
                      <span className="font-semibold text-sm">{option.name}</span>
                      {option.price > 0 && (
                        <span className="block text-xs text-red-600 mt-1">+KES {option.price}</span>
                      )}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Bun Selection */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">5. Select Your Bun</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {customizerOptions.buns.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setBun(option)}
                      className={`p-3 rounded-xl border-2 text-center transition-all ${
                        bun.id === option.id
                          ? "border-red-600 bg-red-50 dark:bg-red-950/50"
                          : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300"
                      }`}
                    >
                      <span className="font-semibold text-sm">{option.name}</span>
                      {option.price > 0 && (
                        <span className="block text-xs text-red-600 mt-1">+KES {option.price}</span>
                      )}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Live Preview */}
          <div className="lg:sticky lg:top-24 h-fit">
            <Card className="overflow-hidden">
              <div className="relative bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-950 dark:to-orange-950 p-8">
                <motion.div
                  key={patty.id + cheese.id + toppings.length + sauce.id + bun.id}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <div className="w-48 h-48 mx-auto relative">
                    {/* Bun top */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-12 bg-yellow-200 dark:bg-yellow-700 rounded-t-full" />
                    {/* Cheese */}
                    <div className="absolute top-10 left-1/2 -translate-x-1/2 w-36 h-4 bg-yellow-400 rounded" />
                    {/* Patty */}
                    <div className="absolute top-14 left-1/2 -translate-x-1/2 w-44 h-8 bg-amber-800 rounded-full" />
                    {/* Toppings */}
                    {toppings.length > 0 && (
                      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-40 h-6 bg-green-500 rounded" />
                    )}
                    {/* Sauce */}
                    <div className="absolute top-24 left-1/2 -translate-x-1/2 w-36 h-3 bg-red-400 rounded" />
                    {/* Bun bottom */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-8 bg-yellow-200 dark:bg-yellow-700 rounded-b-full" />
                  </div>
                </motion.div>
              </div>
              <CardContent className="p-6">
                <h2 className="text-2xl font-black mb-4">Your Custom Burger</h2>
                <div className="space-y-2 text-sm mb-6">
                  <p><span className="font-semibold">Patty:</span> {patty.name}</p>
                  <p><span className="font-semibold">Cheese:</span> {cheese.name}</p>
                  <p><span className="font-semibold">Toppings:</span> {toppings.map((id) => {
                    const topping = customizerOptions.toppings.find((t) => t.id === id);
                    return topping?.name;
                  }).join(", ")}</p>
                  <p><span className="font-semibold">Sauce:</span> {sauce.name}</p>
                  <p><span className="font-semibold">Bun:</span> {bun.name}</p>
                </div>
                <div className="border-t border-zinc-200 dark:border-zinc-700 pt-4 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total Price</span>
                    <span className="text-3xl font-black text-red-600">KES {totalPrice.toLocaleString()}</span>
                  </div>
                </div>
                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                  size="lg"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}