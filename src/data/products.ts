export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  colors: string[];
}

export const featuredProducts: Product[] = [
  {
    id: 1,
    name: "Aero Pulse Pro",
    category: "Running",
    price: 189,
    oldPrice: 240,
    rating: 4.9,
    reviews: 1284,
    image: "/images/sneaker-1.jpg",
    badge: "Best Seller",
    colors: ["#ef2b2b", "#ffffff", "#1a1a1a"],
  },
  {
    id: 2,
    name: "Velocity X1",
    category: "Lifestyle",
    price: 165,
    rating: 4.8,
    reviews: 932,
    image: "/images/sneaker-2.jpg",
    badge: "New",
    colors: ["#3b82f6", "#f97316", "#ffffff"],
  },
  {
    id: 3,
    name: "Court Dominator",
    category: "Basketball",
    price: 220,
    oldPrice: 260,
    rating: 4.9,
    reviews: 745,
    image: "/images/sneaker-3.jpg",
    badge: "Premium",
    colors: ["#ef2b2b", "#1a1a1a"],
  },
  {
    id: 4,
    name: "Cloud Stride",
    category: "Lifestyle",
    price: 145,
    rating: 4.7,
    reviews: 1518,
    image: "/images/sneaker-4.jpg",
    colors: ["#ffffff", "#9ca3af", "#ef2b2b"],
  },
];

export const newArrivals: Product[] = [
  {
    id: 5,
    name: "Hyper Rush GT",
    category: "Running",
    price: 210,
    rating: 5.0,
    reviews: 312,
    image: "/images/sneaker-5.jpg",
    badge: "Limited Edition",
    colors: ["#3b82f6", "#f97316"],
  },
  {
    id: 6,
    name: "Phantom Black",
    category: "Lifestyle",
    price: 195,
    rating: 4.9,
    reviews: 428,
    image: "/images/sneaker-6.jpg",
    badge: "Limited Edition",
    colors: ["#1a1a1a", "#ef2b2b"],
  },
  {
    id: 7,
    name: "Aero Pulse Pro",
    category: "Running",
    price: 189,
    rating: 4.9,
    reviews: 1284,
    image: "/images/sneaker-1.jpg",
    badge: "Limited Edition",
    colors: ["#ef2b2b", "#ffffff"],
  },
  {
    id: 8,
    name: "Velocity X1",
    category: "Lifestyle",
    price: 165,
    rating: 4.8,
    reviews: 932,
    image: "/images/sneaker-2.jpg",
    badge: "Limited Edition",
    colors: ["#3b82f6", "#f97316"],
  },
];

export const bestSellers: Product[] = [
  {
    id: 9,
    name: "Court Dominator",
    category: "Basketball",
    price: 220,
    oldPrice: 260,
    rating: 4.9,
    reviews: 745,
    image: "/images/sneaker-3.jpg",
    badge: "-15%",
    colors: ["#ef2b2b", "#1a1a1a"],
  },
  {
    id: 10,
    name: "Cloud Stride",
    category: "Lifestyle",
    price: 145,
    oldPrice: 180,
    rating: 4.7,
    reviews: 1518,
    image: "/images/sneaker-4.jpg",
    badge: "-19%",
    colors: ["#ffffff", "#9ca3af"],
  },
  {
    id: 11,
    name: "Hyper Rush GT",
    category: "Running",
    price: 210,
    oldPrice: 250,
    rating: 5.0,
    reviews: 312,
    image: "/images/sneaker-5.jpg",
    badge: "-16%",
    colors: ["#3b82f6", "#f97316"],
  },
  {
    id: 12,
    name: "Phantom Black",
    category: "Lifestyle",
    price: 195,
    oldPrice: 230,
    rating: 4.9,
    reviews: 428,
    image: "/images/sneaker-6.jpg",
    badge: "-15%",
    colors: ["#1a1a1a", "#ef2b2b"],
  },
  {
    id: 13,
    name: "Aero Pulse Pro",
    category: "Running",
    price: 189,
    oldPrice: 240,
    rating: 4.9,
    reviews: 1284,
    image: "/images/sneaker-1.jpg",
    badge: "-21%",
    colors: ["#ef2b2b", "#ffffff"],
  },
  {
    id: 14,
    name: "Velocity X1",
    category: "Lifestyle",
    price: 165,
    oldPrice: 200,
    rating: 4.8,
    reviews: 932,
    image: "/images/sneaker-2.jpg",
    badge: "-18%",
    colors: ["#3b82f6", "#f97316"],
  },
  {
    id: 15,
    name: "Court Dominator",
    category: "Basketball",
    price: 220,
    oldPrice: 260,
    rating: 4.9,
    reviews: 745,
    image: "/images/sneaker-3.jpg",
    badge: "-15%",
    colors: ["#ef2b2b", "#1a1a1a"],
  },
  {
    id: 16,
    name: "Cloud Stride",
    category: "Lifestyle",
    price: 145,
    oldPrice: 180,
    rating: 4.7,
    reviews: 1518,
    image: "/images/sneaker-4.jpg",
    badge: "-19%",
    colors: ["#ffffff", "#9ca3af"],
  },
];

export interface Category {
  name: string;
  image: string;
  count: string;
}

export const categories: Category[] = [
  { name: "Running Shoes", image: "/images/cat-running.jpg", count: "124 Models" },
  { name: "Basketball Shoes", image: "/images/cat-basketball.jpg", count: "86 Models" },
  { name: "Lifestyle Shoes", image: "/images/cat-lifestyle.jpg", count: "210 Models" },
  { name: "Training Shoes", image: "/images/cat-training.jpg", count: "95 Models" },
  { name: "Football Shoes", image: "/images/cat-football.jpg", count: "72 Models" },
  { name: "Casual Sneakers", image: "/images/cat-casual.jpg", count: "168 Models" },
];

export interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Marcus Chen",
    role: "Marathon Runner",
    avatar: "/images/avatar-1.jpg",
    rating: 5,
    text: "The Aero Pulse Pro completely transformed my training. The air cushion technology feels like running on clouds. Best investment I've made for my performance.",
  },
  {
    name: "Sofia Almeida",
    role: "Fashion Stylist",
    avatar: "/images/avatar-2.jpg",
    rating: 5,
    text: "VELOX nailed the balance between performance and style. The Cloud Stride pairs with everything in my wardrobe. Quality is genuinely luxury tier.",
  },
  {
    name: "Derek Osei",
    role: "Pro Basketball Player",
    avatar: "/images/avatar-3.jpg",
    rating: 5,
    text: "Court Dominator gives me the grip and support I need on the court. Lightweight but rock solid. These are now my go-to game shoes.",
  },
];
