import { MapPin, Phone, Mail, Share2 } from "lucide-react";
import type { Page } from "@/types";

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-zinc-950 text-zinc-300 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-red-500">
                Naks<span className="text-white">Bite</span>
              </span>
            </div>
            <p className="text-sm text-zinc-400">
              Premium burgers crafted with passion in Nairobi. Fresh ingredients, bold flavors, delivered fast.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-zinc-800 rounded-lg hover:bg-red-600 transition-colors">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-zinc-800 rounded-lg hover:bg-red-600 transition-colors">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-zinc-800 rounded-lg hover:bg-red-600 transition-colors">
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Menu", page: "menu" as Page },
                { label: "Customize Burger", page: "customizer" as Page },
                { label: "Deals & Promos", page: "deals" as Page },
                { label: "About Us", page: "about" as Page },
                { label: "Contact", page: "contact" as Page },
              ].map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => onNavigate(link.page)}
                    className="hover:text-red-400 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-500" />
                <span>Westlands, Nairobi, Kenya</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-500" />
                <span>+254 712 345 678</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-500" />
                <span>hello@naksbite.co.ke</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Opening Hours</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span>Mon - Fri</span>
                <span className="text-zinc-400">10:00 - 22:00</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span className="text-zinc-400">10:00 - 23:00</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span className="text-zinc-400">12:00 - 21:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-zinc-800 text-center text-sm text-zinc-500">
          <p>© 2024 NaksBite. All rights reserved. Made with ❤️ in Nairobi, Kenya</p>
        </div>
      </div>
    </footer>
  );
}