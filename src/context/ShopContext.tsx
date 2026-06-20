"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Product } from "../data/products";

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
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

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
    setFavorites((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      return [...prev, productId];
    });
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
      }}
    >
      {children}
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
