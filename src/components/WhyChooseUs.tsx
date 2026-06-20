import { motion } from "framer-motion";
import { Gem, Wind, Feather, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import SectionHeader from "./ui/SectionHeader";

const features = [
  { icon: Gem, title: "Premium Quality Materials", desc: "Handcrafted with aerospace-grade fabrics and full-grain leather for unmatched durability." },
  { icon: Wind, title: "Air Cushion Technology", desc: "Responsive foam midsoles absorb impact and return energy with every stride you take." },
  { icon: Feather, title: "Lightweight Design", desc: "Engineered to feel weightless, letting you move faster and longer without fatigue." },
  { icon: Truck, title: "Fast Worldwide Shipping", desc: "Express delivery to 100+ countries with real-time tracking on every single order." },
  { icon: ShieldCheck, title: "Secure Payments", desc: "256-bit encryption and multiple gateways keep every transaction fully protected." },
  { icon: RotateCcw, title: "Easy Returns", desc: "Not the right fit? Return within 30 days for a full refund — no questions asked." },
];

export default function WhyChooseUs() {
  return (
    <section id="about" className="relative py-24 sm:py-28">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Why Choose Us"
          title="Built Different,"
          highlight="Built Better"
          subtitle="Every pair of VELOX sneakers is engineered to deliver an experience that goes beyond footwear."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (i % 3) * 0.08 }}
              className="group relative overflow-hidden rounded-3xl glass p-7 transition-all hover:border-white/20 hover:bg-white/[0.02]"
            >
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-crimson text-white">
                  <f.icon size={26} />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
