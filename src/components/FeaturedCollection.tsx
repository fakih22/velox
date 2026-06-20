import { featuredProducts } from "../data/products";
import ProductCard from "./ui/ProductCard";
import SectionHeader from "./ui/SectionHeader";
import { ArrowRight } from "lucide-react";

export default function FeaturedCollection() {
  return (
    <section id="collection" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeader
            align="left"
            eyebrow="Featured Collection"
            title="Curated for the"
            highlight="Bold"
            subtitle="Hand-picked premium sneakers that blend cutting-edge tech with iconic design."
          />
          <a
            href="#best-sellers"
            className="group hidden items-center gap-2 text-sm font-semibold text-white/70 transition-colors hover:text-white sm:flex"
          >
            View All
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
