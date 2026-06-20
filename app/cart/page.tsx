"use client";

import { useShop } from "@/src/context/ShopContext";
import { featuredProducts, newArrivals, bestSellers, Product, formatPrice } from "@/src/data/products";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import { Minus, Plus, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

// Combine all products to look up details
const allProducts = [...featuredProducts, ...newArrivals, ...bestSellers];
const productsMap = new Map<number, Product>();
allProducts.forEach(p => productsMap.set(p.id, p));

export default function CartPage() {
  const { cart, removeFromCart, updateCartQuantity } = useShop();

  const cartItems = cart.map(item => ({
    ...item,
    product: productsMap.get(item.productId),
  })).filter(item => item.product);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.product?.price || 0) * item.quantity, 0);
  // Optional: Update shipping from $15 to maybe Rp 50.000 (which is 15 * 15000 / 4.5, but let's just make it equivalent of $3, so 45000, wait let's just do 50000 or don't format it as price but formatPrice(15) is 225.000 which is very expensive for shipping. Let's just make shipping flat 50000)
  // Actually, since formatPrice multiplies by 15000, formatPrice(15) is 225,000. Let's make shipping 5 to be 75,000. Or let's make shipping cost 0 for now.
  const shipping = subtotal > 0 ? 3 : 0; // 3 * 15000 = 45000
  const total = subtotal + shipping;

  return (
    <div className="bg-ink min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12 px-5 sm:px-8 max-w-7xl mx-auto w-full">
        <div className="mb-8 flex items-center gap-4">
          <Link href="/" className="flex h-10 w-10 items-center justify-center rounded-full glass hover:bg-white/10 text-white transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Your Cart</h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center glass-strong rounded-[2.5rem] py-32 text-center">
            <div className="h-20 w-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
              <span className="text-4xl">🛒</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
            <p className="text-white/50 max-w-md mx-auto mb-8">
              Looks like you haven't added any premium sneakers to your cart yet.
            </p>
            <Link href="/#collection" className="bg-crimson hover:bg-crimson-deep text-white px-8 py-3.5 rounded-full font-semibold transition-all hover:scale-105 shadow-md">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, i) => {
                const p = item.product!;
                return (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex flex-col sm:flex-row gap-5 p-5 glass rounded-2xl items-start sm:items-center relative"
                  >
                    <div className="h-24 w-24 rounded-xl bg-white/[0.03] overflow-hidden flex-none shrink-0">
                      <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between h-full min-w-0">
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-crimson font-semibold mb-1">{p.category}</div>
                        <h3 className="text-lg font-bold text-white truncate">{p.name}</h3>
                      </div>
                      
                      <div className="mt-4 flex items-center justify-between">
                        <div className="text-xl font-bold text-white">{formatPrice(p.price)}</div>
                        
                        <div className="flex items-center gap-3 bg-white/5 rounded-full px-1 py-1 border border-white/10">
                          <button 
                            onClick={() => updateCartQuantity(p.id, item.quantity - 1)}
                            className="h-7 w-7 rounded-full flex items-center justify-center hover:bg-white/10 text-white transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-semibold text-white w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateCartQuantity(p.id, item.quantity + 1)}
                            className="h-7 w-7 rounded-full flex items-center justify-center hover:bg-white/10 text-white transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => removeFromCart(p.id)}
                      className="absolute top-5 right-5 h-8 w-8 rounded-full flex items-center justify-center text-white/40 hover:text-crimson hover:bg-crimson/10 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </motion.div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="glass-strong rounded-[2rem] p-8 sticky top-32">
                <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6 text-sm text-white/70">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-white font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Shipping</span>
                    <span className="text-white font-medium">{shipping > 0 ? formatPrice(shipping) : "Free"}</span>
                  </div>
                </div>
                
                <div className="border-t border-white/10 pt-4 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold">Total</span>
                    <span className="text-2xl font-bold text-white">{formatPrice(total)}</span>
                  </div>
                </div>

                <button className="w-full py-4 rounded-full bg-crimson hover:bg-crimson-deep text-white font-semibold transition-all hover:scale-[1.02] shadow-md flex items-center justify-center gap-2">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
