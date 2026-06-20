import { motion } from "framer-motion";
import { Heart, ShoppingBag, ShoppingCart, Eye } from "lucide-react";
import { type Product, formatPrice } from "../../data/products";
import StarRating from "./StarRating";
import { useShop } from "../../context/ShopContext";

interface ProductCardProps {
  product: Product;
  index?: number;
  isFavoritePage?: boolean;
}

export default function ProductCard({ product, index = 0, isFavoritePage = false }: ProductCardProps) {
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
        {discount > 0 && (
          <span className="absolute right-4 top-4 z-20 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur">
            -{discount}%
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(product.id);
          }}
          className={`absolute bottom-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full glass-strong transition-all hover:scale-110 ${
            isFavorite ? "text-crimson" : "text-white/70 hover:text-crimson"
          }`}
        >
          <Heart size={17} className={isFavorite ? "fill-crimson" : ""} />
        </button>

        {/* Quick view overlay */}
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <button className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition-transform hover:scale-105">
            <Eye size={16} /> Quick View
          </button>
        </div>

        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium uppercase tracking-wider text-crimson">
            {product.category}
          </span>
          <div className="flex items-center gap-1.5">
            <StarRating rating={product.rating} />
            <span className="text-xs text-white/40">({product.reviews})</span>
          </div>
        </div>

        <h3 className="mt-2 text-lg font-semibold text-white">{product.name}</h3>

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

        <div className="mt-4 flex flex-wrap items-center justify-between gap-y-3 gap-x-2">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="text-lg font-bold text-white">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="text-xs text-white/35 line-through">{formatPrice(product.oldPrice)}</span>
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
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-white transition-all hover:scale-105 shadow-md ${
              isFavoritePage ? "bg-white/10 hover:bg-crimson border border-white/20" : "bg-crimson hover:bg-crimson-deep"
            }`}
          >
            {isFavoritePage ? <ShoppingCart size={14} /> : <ShoppingBag size={14} />} 
            {isFavoritePage ? "Move to Cart" : "Add"}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
