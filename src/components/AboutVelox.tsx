import { motion } from "framer-motion";
import { Syne } from "next/font/google";
import { Zap, Target, Shield } from "lucide-react";

const syne = Syne({ subsets: ["latin"], weight: ["800"] });

export default function AboutVelox() {
  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden bg-ink">
      {/* Dynamic Background */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-crimson/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-crimson animate-pulse" />
            <span className="text-xs font-semibold tracking-widest text-white/70 uppercase">The Brand Story</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-6xl sm:text-7xl md:text-[6rem] font-black tracking-tighter text-white leading-none ${syne.className}`}
          >
            VEL<span className="text-crimson">OX</span>
          </motion.h2>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          
          {/* Main Statement Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 relative p-8 sm:p-10 rounded-[2rem] glass-strong border border-white/5 overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-crimson/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex flex-col justify-between h-full">
              <h3 className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-8 ${syne.className}`}>
                Footwear should be an extension of your <span className="text-crimson">ambition.</span>
              </h3>
              <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-xl">
                We blend cutting-edge aerospace technology with relentless design to create performance sneakers that don't just look futuristic—they feel like the future.
              </p>
            </div>
          </motion.div>

          {/* Icon Box 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="relative p-8 rounded-[2rem] glass border border-white/5 flex flex-col items-start justify-center group hover:bg-white/[0.03] transition-colors"
          >
            <div className="w-14 h-14 rounded-2xl bg-crimson/20 flex items-center justify-center text-crimson mb-6 group-hover:scale-110 transition-transform duration-500">
              <Zap size={28} />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Aerospace Tech</h4>
            <p className="text-sm text-white/50 leading-relaxed">
              Ultra-lightweight materials engineered for maximum velocity and zero fatigue.
            </p>
          </motion.div>

          {/* Icon Box 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="relative p-8 rounded-[2rem] glass border border-white/5 flex flex-col items-start justify-center group hover:bg-white/[0.03] transition-colors"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-500">
              <Target size={28} />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Relentless Design</h4>
            <p className="text-sm text-white/50 leading-relaxed">
              Aesthetics that shatter expectations and redefine modern streetwear.
            </p>
          </motion.div>

          {/* Wide Bottom Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="md:col-span-2 relative p-8 sm:p-10 rounded-[2rem] glass border border-white/5 overflow-hidden flex items-center"
          >
            <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-crimson/5 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4 text-crimson">
                <Shield size={20} />
                <span className="text-sm font-bold tracking-widest uppercase">The Promise</span>
              </div>
              <p className="text-base sm:text-lg text-white/70 leading-relaxed">
                Whether you are dominating the court, conquering the track, or styling the streets, VELOX is meticulously engineered for those who refuse to settle for ordinary. <span className="text-white font-semibold">Elevate every step.</span>
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
