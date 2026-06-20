import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Check, ArrowRight } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setDone(true);
    setEmail("");
    setTimeout(() => setDone(false), 3000);
  };

  return (
    <section className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-crimson via-crimson-deep to-[#5a0707] p-8 text-center sm:p-14">
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
              <Mail size={26} className="text-white" />
            </div>
            <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
              Join the VELOX Inner Circle
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/80">
              Subscribe for early access to limited drops, exclusive member pricing, and the latest
              from the world of performance footwear.
            </p>

            <form onSubmit={submit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm text-white placeholder-white/60 backdrop-blur focus:border-white/40 focus:outline-none"
              />
              <button
                type="submit"
                className="group flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-crimson transition-transform hover:scale-105"
              >
                {done ? (
                  <><Check size={16} /> Subscribed!</>
                ) : (
                  <>Subscribe <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></>
                )}
              </button>
            </form>
            <p className="mt-4 text-xs text-white/60">
              No spam. Unsubscribe anytime. We respect your privacy.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
