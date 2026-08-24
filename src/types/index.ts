export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  popular?: boolean;
  spicy?: boolean;
  vegetarian?: boolean;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
  customizations?: string[];
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: number;
  avatar: string;
}

export interface Promo {
  id: string;
  title: string;
  description: string;
  code: string;
  image: string;
}

export interface CustomBurger {
  patty: string;
  cheese: string;
  toppings: string[];
  sauce: string;
  bun: string;
}

export type Page = "home" | "menu" | "customizer" | "deals" | "about" | "contact" | "cart" | "checkout";