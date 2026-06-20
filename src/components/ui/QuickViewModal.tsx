import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, ShoppingCart, Heart, Check } from "lucide-react";
import { Product, formatPrice } from "../../data/products";
import StarRating from "./StarRating";
import { useShop } from "../../context/ShopContext";

interface QuickViewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart, toggleFavorite, favorites } = useShop();
  const isFavorite = favorites.includes(product.id);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl glass-strong shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white/70 backdrop-blur transition-all hover:bg-white/10 hover:text-white"
            >
              <X size={20} />
            </button>

            {/* Image Section */}
            <div className="relative w-full md:w-1/2 bg-white/[0.02] aspect-square md:aspect-auto md:min-h-[400px]">
              {product.badge && (
                <span className="absolute left-6 top-6 z-10 rounded-full bg-crimson px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-md">
                  {product.badge}
                </span>
              )}
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Details Section */}
            <div className="flex w-full flex-col p-6 md:w-1/2 md:p-10 overflow-y-auto custom-scrollbar">
              <div className="mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-crimson">
                  {product.category}
                </span>
              </div>
              
              <h2 className="mb-4 text-3xl font-extrabold text-white">{product.name}</h2>
              
              <div className="mb-6 flex items-center gap-2">
                <StarRating rating={product.rating} />
                <span className="text-sm text-white/50">({product.reviews} reviews)</span>
              </div>

              <div className="mb-6 flex items-baseline gap-3">
                <span className="text-3xl font-bold text-white">{formatPrice(product.price)}</span>
                {product.oldPrice && (
                  <span className="text-lg text-white/40 line-through">{formatPrice(product.oldPrice)}</span>
                )}
              </div>

              <div className="mb-8 text-white/70 leading-relaxed">
                <p>
                  Experience the perfect blend of style and performance with the {product.name}. 
                  Designed for the modern athlete and streetwear enthusiast alike, this premium 
                  sneaker features breathable materials, responsive cushioning, and a durable 
                  outsole for all-day comfort. Step up your game and your style.
                </p>
              </div>

              <div className="mb-8">
                <h4 className="mb-3 text-sm font-semibold text-white">Available Colors</h4>
                <div className="flex gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      className="h-8 w-8 rounded-full border-2 border-transparent transition-all hover:scale-110 focus:border-white ring-2 ring-white/10"
                      style={{ backgroundColor: c }}
                      aria-label={`Select color ${c}`}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-auto flex items-center gap-4">
                <button
                  onClick={() => {
                    addToCart(product.id);
                    setIsAdded(true);
                    setTimeout(() => setIsAdded(false), 2000);
                  }}
                  disabled={isAdded}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-full px-8 py-4 font-bold text-white transition-all shadow-lg ${
                    isAdded ? "bg-green-600" : "bg-crimson hover:bg-crimson-deep hover:scale-105"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check size={18} /> Added Successfully
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={18} /> Add to Cart
                    </>
                  )}
                </button>
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className={`flex h-14 w-14 items-center justify-center rounded-full border-2 transition-all hover:scale-105 ${
                    isFavorite 
                      ? "border-crimson text-crimson bg-crimson/10" 
                      : "border-white/10 text-white/70 hover:border-white/30 hover:text-white"
                  }`}
                >
                  <Heart size={24} className={isFavorite ? "fill-crimson" : ""} />
                </button>
              </div>
            </div>

            {/* Toast Notification */}
            <AnimatePresence>
              {isAdded && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-black shadow-2xl z-50"
                >
                  <Check size={16} className="text-green-600" />
                  Successfully added to cart
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
