import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="home" ref={ref} className="relative min-h-screen overflow-hidden bg-ink">
      {/* Background layers */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_40%,rgba(239,43,43,0.25),transparent_70%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink" />
      <motion.div
        className="absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-crimson/20 blur-[120px]"
        animate={{ x: [0, 60, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-crimson-deep/30 blur-[120px]"
        animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-8 px-5 pb-16 pt-10 sm:px-8 lg:grid-cols-2 lg:pt-0">
        {/* Text column */}
        <motion.div style={{ y: yText, opacity }} className="relative z-20 order-2 lg:order-1">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium text-white/80"
          >
            <Sparkles size={14} className="text-crimson" />
            New Drop · Fall/Winter Collection 2025
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 text-5xl font-extrabold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            Step Into <br />
            <span className="text-gradient-red">The Future</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-md text-base leading-relaxed text-white/60 sm:text-lg"
          >
            Engineered with air cushion technology and aerospace-grade materials. VELOX sneakers
            redefine performance, comfort, and style for the next generation of athletes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#collection"
              className="group flex items-center gap-2 rounded-full bg-crimson px-7 py-3.5 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-crimson-deep hover:shadow-xl hover:shadow-crimson/40"
            >
              Shop Now
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#new-arrivals"
              className="rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-all hover:scale-105 hover:border-white/40 hover:bg-white/5"
            >
              Explore Collection
            </a>
          </motion.div>

          {/* Mini stats */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-12 flex items-center gap-8"
          >
            {[
              { n: "500+", l: "Models" },
              { n: "10M+", l: "Customers" },
              { n: "100+", l: "Countries" },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-2xl font-bold text-white">{s.n}</div>
                <div className="text-xs uppercase tracking-wider text-white/40">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Image column */}
        <motion.div
          style={{ y: yImg }}
          className="relative order-1 flex items-center justify-center lg:order-2"
        >
          <div className="absolute h-[420px] w-[420px] animate-spin-slow rounded-full border border-crimson/20 sm:h-[520px] sm:w-[520px]" />
          <div className="absolute h-[300px] w-[300px] animate-pulse-glow rounded-full bg-crimson/30 blur-[80px] sm:h-[380px] sm:w-[380px]" />
          <motion.img
            src="/images/hero-sneaker-3d.png"
            alt="VELOX futuristic sneaker"
            initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="animate-float relative z-10 w-[78%] max-w-md drop-shadow-[0_25px_60px_rgba(239,43,43,0.35)] sm:w-[70%]"
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 flex-col items-center gap-2 text-white/40 hidden sm:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <ChevronDown size={18} className="animate-bounce" />
      </motion.div>
    </section>
  );
}
