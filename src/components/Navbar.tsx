import { useState } from "react";
import { useTheme } from "next-themes";
import { Menu, X, ShoppingCart, Moon, Sun, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import type { Page } from "@/types";

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onCartClick: () => void;
}

const navItems: { label: string; page: Page }[] = [
  { label: "Home", page: "home" },
  { label: "Menu", page: "menu" },
  { label: "Customize", page: "customizer" },
  { label: "Deals", page: "deals" },
  { label: "About", page: "about" },
  { label: "Contact", page: "contact" },
];

export function Navbar({ currentPage, onNavigate, onCartClick }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-red-100 dark:border-zinc-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/30 group-hover:scale-105 transition-transform">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <span className="text-xl font-black tracking-tight text-red-600 dark:text-red-500">
                Naks<span className="text-zinc-900 dark:text-white">Bite</span>
              </span>
              <span className="block text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                Nairobi's Best
              </span>
            </div>
          </button>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentPage === item.page
                    ? "bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400"
                    : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-zinc-600 dark:text-zinc-300"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <Button
              onClick={onCartClick}
              className="relative bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/30"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              <span className="hidden sm:inline">Cart</span>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full text-xs flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden py-4 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => {
                    onNavigate(item.page);
                    setMobileOpen(false);
                  }}
                  className={`px-4 py-3 rounded-lg text-sm font-medium text-left transition-colors ${
                    currentPage === item.page
                      ? "bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400"
                      : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}