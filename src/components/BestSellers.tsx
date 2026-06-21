import { featuredProducts, newArrivals, bestSellers } from "../data/products";
import ProductCard from "./ui/ProductCard";
import SectionHeader from "./ui/SectionHeader";
import { useState, useEffect } from "react";

export default function AllProducts() {
  const [activeCategory, setActiveCategory] = useState("All");
  
  // Combine all and remove duplicates based on product name
  const allProducts = [...featuredProducts, ...newArrivals, ...bestSellers];
  const uniqueProducts = Array.from(new Map(allProducts.map((p) => [p.name, p])).values());

  const categories = ["All", "Running", "Basketball", "Lifestyle", "Training"];

  // Handle hash changes from navbar
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      const matchedCategory = categories.find(c => c.toLowerCase() === hash);
      if (matchedCategory) {
        setActiveCategory(matchedCategory);
        // Ensure we scroll to the products section
        const element = document.getElementById("products");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    // Check initial hash
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const filteredProducts = activeCategory === "All" 
    ? uniqueProducts 
    : uniqueProducts.filter(p => p.category === activeCategory);

  return (
    <section id="products" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeader
            align="left"
            eyebrow="Our Collection"
            title="All"
            highlight="Products"
            subtitle="Explore our complete range of premium performance and lifestyle sneakers."
          />
        </div>

        {/* Category Filter */}
        <div className="mt-8 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeCategory === cat 
                  ? "bg-crimson text-white shadow-lg shadow-crimson/30" 
                  : "glass text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          {filteredProducts.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="mt-12 text-center text-white/50 py-12 glass rounded-2xl">
            No products found for this category.
          </div>
        )}
      </div>
    </section>
  );
}
