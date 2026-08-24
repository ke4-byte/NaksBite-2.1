import { motion } from "framer-motion";
import { ArrowRight, Star, Clock, Truck, Award, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { menuItems, testimonials, promos } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import type { Page } from "@/types";

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { addToCart } = useCart();
  const featured = menuItems.filter((item) => item.popular).slice(0, 4);

  return (
    <div className="bg-zinc-50 dark:bg-zinc-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-red-900 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Flame className="w-4 h-4" />
                <span className="text-sm font-medium">Nairobi's #1 Burger Joint</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
                Bite Into
                <span className="block text-yellow-300">Pure Flavor</span>
              </h1>
              <p className="text-lg text-red-100 mb-8 max-w-lg">
                Handcrafted burgers made with premium Kenyan beef, fresh produce, and secret sauces. 
                Delivered hot to your door in under 30 minutes.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  onClick={() => onNavigate("menu")}
                  className="bg-white text-red-600 hover:bg-yellow-300 hover:text-zinc-900 shadow-xl"
                >
                  Order Now <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => onNavigate("customizer")}
                  className="border-white/50 text-white hover:bg-white/10"
                >
                  Build Your Burger
                </Button>
              </div>
              <div className="flex items-center gap-6 mt-8">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                    ))}
                  </div>
                  <span className="text-sm">4.9/5 from 2,000+ reviews</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop"
                  alt="NaksBite signature burger"
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-2xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-lg">The NaksBite Classic</p>
                      <p className="text-sm text-zinc-300">Our signature double beef burger</p>
                    </div>
                    <span className="text-2xl font-black text-yellow-300">KES 650</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Clock, title: "30 Min Delivery", desc: "Hot and fresh, guaranteed" },
              { icon: Truck, title: "Free Delivery", desc: "On orders over KES 1,500" },
              { icon: Award, title: "Premium Quality", desc: "100% Kenyan beef, daily fresh" },
            ].map((feature) => (
              <div key={feature.title} className="flex items-center gap-4 p-6 bg-zinc-50 dark:bg-zinc-800 rounded-2xl">
                <div className="p-3 bg-red-100 dark:bg-red-950 rounded-xl">
                  <feature.icon className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black">Featured Items</h2>
              <p className="text-zinc-500 dark:text-zinc-400 mt-2">Our most loved picks</p>
            </div>
            <Button variant="ghost" onClick={() => onNavigate("menu")} className="text-red-600">
              View Full Menu <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((item) => (
              <Card key={item.id} className="group overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {item.popular && (
                    <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Popular
                    </span>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 mb-3">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-black text-red-600 dark:text-red-400">
                      KES {item.price.toLocaleString()}
                    </span>
                    <Button
                      size="sm"
                      onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, image: item.image })}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-black mb-4">Monday Madness!</h2>
              <p className="text-lg text-red-100 mb-6">
                Buy any burger and get a free serving of our famous loaded fries. 
                Use code <span className="font-bold bg-white/20 px-3 py-1 rounded-lg">MONDAYFREE</span>
              </p>
              <Button
                size="lg"
                onClick={() => onNavigate("deals")}
                className="bg-white text-red-600 hover:bg-yellow-300"
              >
                See All Deals
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {promos.slice(0, 2).map((promo) => (
                <div key={promo.id} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                  <h3 className="font-bold mb-2">{promo.title}</h3>
                  <p className="text-sm text-red-100 mb-3">{promo.description}</p>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded">{promo.code}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="bg-zinc-50 dark:bg-zinc-800 border-0">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-300 mb-4">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">
            Ready to Build Your <span className="text-red-600">Dream Burger?</span>
          </h2>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 mb-8">
            Choose your patty, cheese, toppings, and sauce. We'll handle the rest.
          </p>
          <Button
            size="lg"
            onClick={() => onNavigate("customizer")}
            className="bg-red-600 hover:bg-red-700 text-white shadow-xl shadow-red-600/30"
          >
            Start Customizing <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}