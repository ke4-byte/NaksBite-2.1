import { useState } from "react";
import { CreditCard, User, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/lib/cart-context";
import { toast } from "sonner";
import type { Page } from "@/types";

interface CheckoutPageProps {
  onNavigate: (page: Page) => void;
}

export function CheckoutPage({ onNavigate }: CheckoutPageProps) {
  const { items, subtotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "Nairobi",
    notes: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<"mpesa" | "card" | "cash">("mpesa");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const deliveryFee = subtotal > 1500 ? 0 : 150;
  const total = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      toast.error("Please fill in all required fields");
      return;
    }
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-black mb-4">Order Confirmed!</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mb-8">
            Thank you for ordering with NaksBite! Your food is being prepared and will be delivered within 30 minutes.
          </p>
          <Button
            onClick={() => onNavigate("home")}
            className="bg-red-600 hover:bg-red-700 text-white"
            size="lg"
          >
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black mb-2">Checkout</h1>
          <p className="text-red-100">Complete your order</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Delivery Details */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-red-600" />
                    Delivery Details
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        placeholder="+254 7XX XXX XXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="address">Delivery Address *</Label>
                      <Textarea
                        id="address"
                        placeholder="House number, street, estate"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="notes">Delivery Notes</Label>
                      <Input
                        id="notes"
                        placeholder="e.g., Call when at the gate"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-red-600" />
                    Payment Method
                  </h2>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {[
                      { id: "mpesa" as const, label: "M-Pesa", icon: "📱" },
                      { id: "card" as const, label: "Card", icon: "💳" },
                      { id: "cash" as const, label: "Cash on Delivery", icon: "💵" },
                    ].map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id)}
                        className={`p-4 rounded-xl border-2 text-center transition-all ${
                          paymentMethod === method.id
                            ? "border-red-600 bg-red-50 dark:bg-red-950/50"
                            : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300"
                        }`}
                      >
                        <span className="text-2xl block mb-2">{method.icon}</span>
                        <span className="font-semibold text-sm">{method.label}</span>
                      </button>
                    ))}
                  </div>
                  {paymentMethod === "mpesa" && (
                    <p className="text-sm text-zinc-500 mt-4">
                      You'll receive an M-Pesa prompt on your phone to complete payment.
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:sticky lg:top-24 h-fit">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                  <div className="space-y-3 mb-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-zinc-500">
                          {item.name} × {item.quantity}
                        </span>
                        <span className="font-semibold">
                          KES {(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-zinc-200 dark:border-zinc-700 pt-3 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Subtotal</span>
                      <span>KES {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Delivery</span>
                      <span>{deliveryFee === 0 ? "FREE" : `KES ${deliveryFee}`}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold pt-2">
                      <span>Total</span>
                      <span className="text-red-600">KES {total.toLocaleString()}</span>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white"
                    size="lg"
                  >
                    Place Order
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}