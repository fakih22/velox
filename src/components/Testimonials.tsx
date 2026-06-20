import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { testimonials } from "../data/products";
import StarRating from "./ui/StarRating";
import SectionHeader from "./ui/SectionHeader";

export default function Testimonials() {
  return (
    <section id="contact" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Testimonials"
          title="Loved by"
          highlight="Athletes Worldwide"
          subtitle="Real stories from real customers who stepped into the future with VELOX."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1 }}
              className="relative overflow-hidden rounded-3xl glass p-7"
            >
              <Quote className="absolute right-5 top-5 text-crimson/20" size={48} />
              <StarRating rating={t.rating} size={16} />
              <p className="mt-5 text-base leading-relaxed text-white/75">{t.text}</p>
              <div className="mt-7 flex items-center gap-4 border-t border-white/10 pt-5">
                <img
                  src={t.avatar}
                  alt={t.name}
                  loading="lazy"
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-crimson/40"
                />
                <div>
                  <div className="font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-white/50">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
