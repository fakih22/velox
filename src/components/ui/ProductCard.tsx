import { motion } from "framer-motion";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import type { Product } from "../../data/products";
import StarRating from "./StarRating";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
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
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-white/[0.06] to-transparent">
        {/* Badge */}
        {product.badge && (
          <span className="absolute left-4 top-4 z-20 rounded-full bg-crimson px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg shadow-crimson/30">
            {product.badge}
          </span>
        )}
        {discount > 0 && (
          <span className="absolute right-4 top-4 z-20 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur">
            -{discount}%
          </span>
        )}

        {/* Wishlist */}
        <button className="absolute bottom-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full glass-strong text-white/70 transition-all hover:scale-110 hover:text-crimson">
          <Heart size={17} />
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

        <div className="mt-4 flex items-end justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-white">${product.price}</span>
            {product.oldPrice && (
              <span className="text-sm text-white/35 line-through">${product.oldPrice}</span>
            )}
          </div>
          <button className="flex items-center gap-1.5 rounded-full bg-crimson px-4 py-2 text-xs font-semibold text-white transition-all hover:scale-105 hover:bg-crimson-deep hover:shadow-lg hover:shadow-crimson/40">
            <ShoppingBag size={14} /> Add
          </button>
        </div>
      </div>
    </motion.article>
  );
}
