import { motion } from "framer-motion";
import { Apple, Play, Bell, ShieldCheck, Zap } from "lucide-react";

const appFeatures = [
  { icon: Zap, title: "Early Access Drops", desc: "Be first in line for limited releases." },
  { icon: Bell, title: "Live Order Tracking", desc: "Real-time updates from checkout to door." },
  { icon: ShieldCheck, title: "Secure In-App Checkout", desc: "Pay safely with one tap, anytime." },
];

export default function MobileApp() {
  return (
    <section id="about" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] glass-strong p-8 sm:p-12 lg:p-16">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-crimson/20 blur-[100px]" />
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Text */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium text-white/80">
                <Zap size={14} className="text-crimson" /> VELOX Mobile App
              </span>
              <h2 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl">
                The Future, <span className="text-gradient-red">In Your Pocket</span>
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-white/60">
                Shop exclusive drops, track orders in real time, and unlock member-only rewards.
                Download the VELOX app and carry the future of footwear everywhere.
              </p>

              <div className="mt-8 space-y-4">
                {appFeatures.map((f, i) => (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-crimson/15 text-crimson">
                      <f.icon size={20} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{f.title}</div>
                      <div className="text-xs text-white/50">{f.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-9 flex flex-wrap gap-3">
                <button className="flex items-center gap-3 rounded-2xl bg-white px-5 py-3 text-black transition-transform hover:scale-105">
                  <Apple size={22} />
                  <div className="text-left leading-tight">
                    <div className="text-[9px] uppercase">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </button>
                <button className="flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-3 text-white backdrop-blur transition-transform hover:scale-105 hover:bg-white/15">
                  <Play size={20} className="fill-white" />
                  <div className="text-left leading-tight">
                    <div className="text-[9px] uppercase">Get it on</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Mockup */}
            <div className="relative flex items-center justify-center">
              <div className="absolute h-72 w-72 animate-pulse-glow rounded-full bg-crimson/30 blur-[80px]" />
              <motion.img
                src="/images/app-mockup.png"
                alt="VELOX mobile app"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="animate-float relative z-10 w-full max-w-xs drop-shadow-2xl sm:max-w-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
