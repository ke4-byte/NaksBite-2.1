import { useState } from "react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { CartProvider } from "@/lib/cart-context";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HomePage } from "@/pages/HomePage";
import { MenuPage } from "@/pages/MenuPage";
import { CustomizerPage } from "@/pages/CustomizerPage";
import { CartPage } from "@/pages/CartPage";
import { CheckoutPage } from "@/pages/CheckoutPage";
import { DealsPage } from "@/pages/DealsPage";
import { AboutPage } from "@/pages/AboutPage";
import { ContactPage } from "@/pages/ContactPage";
import type { Page } from "@/types";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={handleNavigate} />;
      case "menu":
        return <MenuPage onNavigate={handleNavigate} />;
      case "customizer":
        return <CustomizerPage onNavigate={handleNavigate} />;
      case "cart":
        return <CartPage onNavigate={handleNavigate} />;
      case "checkout":
        return <CheckoutPage onNavigate={handleNavigate} />;
      case "deals":
        return <DealsPage onNavigate={handleNavigate} />;
      case "about":
        return <AboutPage />;
      case "contact":
        return <ContactPage />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <CartProvider>
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
          <Navbar
            currentPage={currentPage}
            onNavigate={handleNavigate}
            onCartClick={() => handleNavigate("cart")}
          />
          <main>{renderPage()}</main>
          <Footer onNavigate={handleNavigate} />
          <Toaster position="top-right" richColors />
        </div>
      </CartProvider>
    </ThemeProvider>
  );
}