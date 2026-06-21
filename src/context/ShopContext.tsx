"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { Product } from "../data/products";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Heart, ShoppingCart } from "lucide-react";

export interface CartItem {
  productId: number;
  quantity: number;
}

interface ShopContextType {
  cart: CartItem[];
  favorites: number[];
  addToCart: (productId: number, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateCartQuantity: (productId: number, quantity: number) => void;
  toggleFavorite: (productId: number) => void;
  cartCount: number;
  favoritesCount: number;
  showToast: (message: string, type: "cart" | "favorite") => void;
}

export interface ToastMessage {
  id: number;
  message: string;
  type: "cart" | "favorite";
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((message: string, type: "cart" | "favorite") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("velox_cart");
      const storedFavorites = localStorage.getItem("velox_favorites");
      
      if (storedCart) setCart(JSON.parse(storedCart));
      if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
    } catch (e) {
      console.error("Failed to parse local storage data", e);
    }
    setIsInitialized(true);
  }, []);

  // Save to local storage when state changes
  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem("velox_cart", JSON.stringify(cart));
  }, [cart, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem("velox_favorites", JSON.stringify(favorites));
  }, [favorites, isInitialized]);

  const addToCart = (productId: number, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { productId, quantity }];
    });
    showToast("Added to Cart", "cart");
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  };

  const updateCartQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const toggleFavorite = (productId: number) => {
    const isFav = favorites.includes(productId);
    if (isFav) {
      showToast("Removed from Favorites", "favorite");
      setFavorites((prev) => prev.filter((id) => id !== productId));
    } else {
      showToast("Added to Favorites", "favorite");
      setFavorites((prev) => [...prev, productId]);
    }
  };

  // Derived state
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const favoritesCount = favorites.length;

  return (
    <ShopContext.Provider
      value={{
        cart,
        favorites,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        toggleFavorite,
        cartCount,
        favoritesCount,
        showToast,
      }}
    >
      {children}

      {/* Global Toast Container */}
      <div className="fixed top-6 left-1/2 z-[100] flex w-max max-w-[90vw] -translate-x-1/2 flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className="flex items-center gap-3 rounded-full bg-white px-5 py-3.5 text-sm font-bold text-black shadow-2xl pointer-events-auto border border-black/5"
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  toast.type === "cart" ? "bg-green-100 text-green-600" : "bg-crimson/10 text-crimson"
                }`}
              >
                {toast.type === "cart" ? <ShoppingCart size={16} /> : <Heart size={16} className={toast.message.includes("Added") ? "fill-crimson" : ""} />}
              </div>
              {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
}
