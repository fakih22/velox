import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";

const links = ["Home", "Collection", "New Arrivals", "Men", "Women", "Sale", "About", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top announcement bar */}
      <div className="relative z-50 overflow-hidden bg-crimson text-center text-[11px] font-semibold uppercase tracking-wider text-white">
        <div className="flex animate-marquee whitespace-nowrap py-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="mx-8">
              Free express shipping on orders over $150 · Members get early access to drops · Step Into The Future
            </span>
          ))}
        </div>
      </div>

      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-strong shadow-lg shadow-black/40" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:h-[72px]">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2">
            <span className="text-2xl font-extrabold tracking-tighter text-white">
              VEL<span className="text-gradient-red">OX</span>
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-7 lg:flex">
            {links.map((l) => (
              <li key={l}>
                <a
                  href={`#${l.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`group relative text-sm font-medium transition-colors ${
                    l === "Sale" ? "text-crimson" : "text-white/70 hover:text-white"
                  }`}
                >
                  {l}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-crimson transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          {/* Icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button className="flex h-10 w-10 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white">
              <Search size={19} />
            </button>
            <button className="hidden h-10 w-10 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:flex">
              <User size={19} />
            </button>
            <button className="relative flex h-10 w-10 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white">
              <ShoppingBag size={19} />
              <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-crimson text-[9px] font-bold text-white">3</span>
            </button>
            <button
              onClick={() => setOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/10 lg:hidden"
            >
              <Menu size={20} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 flex h-full w-[78%] max-w-sm flex-col glass-strong p-6"
            >
              <div className="flex items-center justify-between">
                <span className="text-xl font-extrabold tracking-tighter text-white">
                  VEL<span className="text-gradient-red">OX</span>
                </span>
                <button onClick={() => setOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/10">
                  <X size={20} />
                </button>
              </div>
              <ul className="mt-8 flex flex-col gap-1">
                {links.map((l, i) => (
                  <motion.li
                    key={l}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <a
                      href={`#${l.toLowerCase().replace(/\s+/g, "-")}`}
                      onClick={() => setOpen(false)}
                      className={`block rounded-xl px-4 py-3 text-lg font-medium transition-colors hover:bg-white/5 ${
                        l === "Sale" ? "text-crimson" : "text-white/80"
                      }`}
                    >
                      {l}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto flex items-center gap-3 border-t border-white/10 pt-6 text-white/60">
                <User size={18} /> <span className="text-sm">My Account</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
