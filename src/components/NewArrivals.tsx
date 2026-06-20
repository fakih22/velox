import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { newArrivals } from "../data/products";
import StarRating from "./ui/StarRating";
import SectionHeader from "./ui/SectionHeader";

export default function NewArrivals() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <section id="new-arrivals" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex items-end justify-between">
          <SectionHeader
            align="left"
            eyebrow="New Arrivals"
            title="Fresh Off the"
            highlight="Line"
          />
          <div className="hidden gap-2 sm:flex">
            <button
              onClick={() => scroll(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full glass text-white transition-all hover:scale-110 hover:bg-crimson"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={() => scroll(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full glass text-white transition-all hover:scale-110 hover:bg-crimson"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4"
        >
          {newArrivals.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08 }}
              className="group relative w-[300px] flex-none snap-start overflow-hidden rounded-3xl glass sm:w-[360px]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-white/[0.06] to-transparent">
                {p.badge && (
                  <span className="absolute left-4 top-4 z-20 flex items-center gap-1 rounded-full bg-crimson px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg shadow-crimson/30">
                    <Star size={11} className="fill-white" /> {p.badge}
                  </span>
                )}
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium uppercase tracking-wider text-crimson">
                    {p.category}
                  </span>
                  <StarRating rating={p.rating} />
                </div>
                <h3 className="mt-2 text-xl font-semibold text-white">{p.name}</h3>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-bold text-white">${p.price}</span>
                  <button className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white transition-all hover:scale-105 hover:bg-crimson">
                    Shop Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
