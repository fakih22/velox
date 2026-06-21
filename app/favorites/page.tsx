"use client";

import { useShop } from "@/src/context/ShopContext";
import { featuredProducts, newArrivals, bestSellers, Product } from "@/src/data/products";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import ProductCard from "@/src/components/ui/ProductCard";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

// Combine all products to look up details
const allProducts = [...featuredProducts, ...newArrivals, ...bestSellers];
const productsMap = new Map<number, Product>();
allProducts.forEach(p => productsMap.set(p.id, p));

export default function FavoritesPage() {
  const { favorites } = useShop();

  // Remove duplicates from the array (in case multiple same-id products exist in the data arrays)
  const favoriteProducts = Array.from(new Set(favorites))
    .map(id => productsMap.get(id))
    .filter((p): p is Product => p !== undefined);

  return (
    <div className="bg-ink min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12 px-5 sm:px-8 max-w-7xl mx-auto w-full">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex h-10 w-10 items-center justify-center rounded-full glass hover:bg-white/10 text-white transition-colors">
              <ArrowLeft size={18} />
            </Link>
            <div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">Your Favorites</h1>
              <p className="text-white/50 text-sm mt-1">{favoriteProducts.length} items saved</p>
            </div>
          </div>
        </div>

        {favoriteProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center glass-strong rounded-[2.5rem] py-32 text-center">
            <div className="h-20 w-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
              <span className="text-4xl text-white opacity-40">❤️</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">No favorites yet</h2>
            <p className="text-white/50 max-w-md mx-auto mb-8">
              Keep track of your favorite sneakers by tapping the heart icon on any product.
            </p>
            <Link href="/#collection" className="bg-white hover:bg-white/90 text-black px-8 py-3.5 rounded-full font-semibold transition-all hover:scale-105 shadow-md">
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
            {favoriteProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} isFavoritePage />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
