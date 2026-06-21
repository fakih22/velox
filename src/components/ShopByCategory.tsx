import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { categories } from "../data/products";
import SectionHeader from "./ui/SectionHeader";

export default function ShopByCategory() {
  return (
    <section id="categories" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Shop By Category"
          title="Find Your"
          highlight="Discipline"
          subtitle="From the track to the street, explore sneakers built for every move you make."
        />

        <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <motion.a
              key={cat.name}
              href="#collection"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (i % 3) * 0.08 }}
              className="group relative aspect-[4/5] overflow-hidden rounded-3xl sm:aspect-[5/4]"
            >
              <img
                src={cat.image}
                alt={cat.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white sm:text-xl">{cat.name}</h3>
                    <p className="mt-1 text-xs text-white/50">{cat.count}</p>
                  </div>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full glass text-white transition-all group-hover:scale-110 group-hover:bg-crimson">
                    <ArrowUpRight size={17} />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
