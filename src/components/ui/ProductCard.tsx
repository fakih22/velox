import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, ShoppingCart, Eye } from "lucide-react";
import { type Product, formatPrice } from "../../data/products";
import StarRating from "./StarRating";
import { useShop } from "../../context/ShopContext";
import QuickViewModal from "./QuickViewModal";

interface ProductCardProps {
  product: Product;
  index?: number;
  isFavoritePage?: boolean;
}

export default function ProductCard({ product, index = 0, isFavoritePage = false }: ProductCardProps) {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const { addToCart, toggleFavorite, favorites } = useShop();
  const isFavorite = favorites.includes(product.id);
  
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl glass"
    >
      {/* Image area */}
      <div className="relative aspect-square overflow-hidden bg-white/[0.03]">
        {/* Badge */}
        {product.badge && (
          <span className="absolute left-4 top-4 z-20 rounded-full bg-crimson px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
            {product.badge}
          </span>
        )}
        {discount > 0 && !product.badge?.includes("-") && (
          <span className="absolute left-2 top-10 sm:left-4 sm:top-12 z-20 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur">
            -{discount}%
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(product.id);
          }}
          className={`absolute top-2 right-2 sm:top-auto sm:bottom-4 sm:right-4 z-20 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full glass-strong transition-all hover:scale-110 ${
            isFavorite ? "text-crimson" : "text-white/70 hover:text-crimson"
          }`}
        >
          <Heart size={16} className={`sm:w-[17px] sm:h-[17px] ${isFavorite ? "fill-crimson" : ""}`} />
        </button>

        {/* Quick view overlay */}
        <div 
          onClick={(e) => {
            e.preventDefault();
            setIsQuickViewOpen(true);
          }}
          className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 cursor-pointer"
        >
          <div className="flex items-center gap-1 sm:gap-2 rounded-full bg-white px-3 sm:px-5 py-1.5 sm:py-2.5 text-xs sm:text-sm font-semibold text-black transition-transform group-hover:scale-105">
            <Eye size={16} /> Detail
          </div>
        </div>

        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0">
          <span className="text-[9px] sm:text-[11px] font-medium uppercase tracking-wider text-crimson line-clamp-1">
            {product.category}
          </span>
          <div className="flex items-center gap-1 sm:gap-1.5">
            <StarRating rating={product.rating} />
            <span className="text-[10px] sm:text-xs text-white/40">({product.reviews})</span>
          </div>
        </div>

        <h3 className="mt-1.5 sm:mt-2 text-sm sm:text-lg font-semibold text-white line-clamp-1">{product.name}</h3>

        {/* Colors */}
        <div className="mt-3 flex items-center gap-1.5">
          {product.colors.map((c) => (
            <span
              key={c}
              className="h-4 w-4 rounded-full border border-white/20"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <div className="mt-auto pt-3 sm:pt-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div className="flex flex-col justify-end gap-0.5 min-h-[32px] sm:min-h-[40px]">
            <span className="text-sm sm:text-lg font-bold text-white leading-none">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="text-[9px] sm:text-xs text-white/40 line-through leading-none">{formatPrice(product.oldPrice)}</span>
            )}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product.id);
              if (isFavoritePage) {
                toggleFavorite(product.id);
              }
            }}
            className={`flex-shrink-0 flex items-center justify-center gap-1 sm:gap-1.5 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-semibold text-white transition-all hover:scale-105 shadow-md w-full sm:w-auto ${
              isFavoritePage ? "bg-white/10 hover:bg-crimson border border-white/20" : "bg-crimson hover:bg-crimson-deep"
            }`}
          >
            <ShoppingCart size={12} className="sm:w-[14px] sm:h-[14px]" /> 
            <span className="sm:inline">{isFavoritePage ? "Move to Cart" : "Add"}</span>
          </button>
        </div>
      </div>

      <QuickViewModal 
        product={product} 
        isOpen={isQuickViewOpen} 
        onClose={() => setIsQuickViewOpen(false)} 
      />
    </motion.article>
  );
}
