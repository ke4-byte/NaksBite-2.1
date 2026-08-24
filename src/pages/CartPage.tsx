import { useState } from "react";
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCart } from "@/lib/cart-context";
import { toast } from "sonner";
import type { Page } from "@/types";

interface CartPageProps {
  onNavigate: (page: Page) => void;
}

const validPromos: Record<string, { type: "percent" | "flat"; value: number }> = {
  MONDAYFREE: { type: "flat", value: 0 },
  FAMILY: { type: "flat", value: 500 },
  STUDENT15: { type: "percent", value: 0.15 },
};

export function CartPage({ onNavigate }: CartPageProps) {
  const { items, removeFromCart, updateQuantity, subtotal, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  const deliveryFee = subtotal > 1500 || subtotal === 0 ? 0 : 150;
  const discount = appliedPromo
    ? validPromos[appliedPromo].type === "percent"
      ? subtotal * validPromos[appliedPromo].value
      : validPromos[appliedPromo].value
    : 0;
  const total = subtotal - discount + deliveryFee;

  const applyPromo = () => {
    const code = promoCode.toUpperCase();
    if (validPromos[code]) {
      setAppliedPromo(code);
      toast.success("Promo code applied!");
    } else {
      toast.error("Invalid promo code");
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-zinc-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mb-6">
            Looks like you haven't added anything yet
          </p>
          <Button onClick={() => onNavigate("menu")} className="bg-red-600 hover:bg-red-700">
            Browse Menu <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black mb-2">Your Cart</h1>
          <p className="text-red-100">{items.length} item{items.length !== 1 ? "s" : ""} in your cart</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded-xl object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-bold">{item.name}</h3>
                      {item.customizations && (
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                          {item.customizations.join(" • ")}
                        </p>
                      )}
                      <p className="text-sm text-zinc-500 mt-1">
                        KES {item.price.toLocaleString()} each
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center font-bold">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">
                        KES {(item.price * item.quantity).toLocaleString()}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button
              variant="ghost"
              onClick={clearCart}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Cart
            </Button>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Subtotal</span>
                    <span className="font-semibold">KES {subtotal.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({appliedPromo})</span>
                      <span>-KES {discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Delivery Fee</span>
                    <span className="font-semibold">
                      {deliveryFee === 0 ? "FREE" : `KES ${deliveryFee}`}
                    </span>
                  </div>
                  <div className="border-t border-zinc-200 dark:border-zinc-700 pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-red-600">KES {total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="uppercase"
                    />
                    <Button variant="outline" onClick={applyPromo}>
                      Apply
                    </Button>
                  </div>
                  {appliedPromo && (
                    <p className="text-sm text-green-600 mt-2">
                      ✓ Promo code {appliedPromo} applied!
                    </p>
                  )}
                </div>

                <Button
                  onClick={() => onNavigate("checkout")}
                  className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white"
                  size="lg"
                >
                  Proceed to Checkout <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}