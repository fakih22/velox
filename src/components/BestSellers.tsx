import { featuredProducts, newArrivals, bestSellers } from "../data/products";
import ProductCard from "./ui/ProductCard";
import SectionHeader from "./ui/SectionHeader";

export default function AllProducts() {
  // Combine all and remove duplicates based on product name
  const allProducts = [...featuredProducts, ...newArrivals, ...bestSellers];
  const uniqueProducts = Array.from(new Map(allProducts.map((p) => [p.name, p])).values());

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

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {uniqueProducts.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
