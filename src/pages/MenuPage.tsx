import { useState } from "react";
import { Search, SlidersHorizontal, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { menuItems, categories } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import type { Page } from "@/types";

interface MenuPageProps {
  onNavigate: (page: Page) => void;
}

export function MenuPage({ onNavigate }: MenuPageProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"popular" | "price-low" | "price-high">("popular");
  const { addToCart } = useCart();

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || item.category === category;
    return matchesSearch && matchesCategory;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
  });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black mb-2">Our Menu</h1>
          <p className="text-red-100">Fresh, delicious, and made to order</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <Input
              placeholder="Search burgers, sides, drinks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  category === cat
                    ? "bg-red-600 text-white"
                    : "bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-zinc-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Menu Grid */}
        {sortedItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedItems.map((item) => (
              <Card key={item.id} className="group overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {item.popular && (
                    <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" /> Popular
                    </span>
                  )}
                  {item.spicy && (
                    <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      🌶️ Spicy
                    </span>
                  )}
                </div>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <span className="text-lg font-black text-red-600 dark:text-red-400">
                      KES {item.price.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                    {item.description}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, image: item.image })}
                      className="flex-1 bg-red-600 hover:bg-red-700"
                    >
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => onNavigate("customizer")}
                      className="flex-1"
                    >
                      Customize
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-2xl font-bold mb-2">No items found</p>
            <p className="text-zinc-500 dark:text-zinc-400 mb-6">
              Try adjusting your search or filters
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}