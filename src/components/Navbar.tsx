"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, User, Menu, X, ChevronDown, Heart } from "lucide-react";
import Link from "next/link";
import { useShop } from "../context/ShopContext";

const links = ["Home", "Collection", "New Arrivals", "Sale", "About", "Contact"];

const dropdownMenus: Record<string, string[]> = {
  Collection: ["Running", "Basketball", "Lifestyle", "Training"],
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { cartCount, favoritesCount } = useShop();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      
      // Track active section
      const sectionIds = links.map(l => l.toLowerCase().replace(/\s+/g, "-"));
      // Check if we are at the top of the page
      if (window.scrollY < 100) {
        setActiveSection("home");
        return;
      }
      
      let current = activeSection;
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the element is within the top half of the screen
          if (rect.top <= 300 && rect.bottom >= 300) {
            current = id;
          }
        }
      }
      if (current !== activeSection) {
        setActiveSection(current);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [activeSection]);

  return (
    <>
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
            {links.map((l) => {
              const hasDropdown = dropdownMenus[l];
              return (
                <li key={l} className={hasDropdown ? "group relative py-4" : "py-4"}>
                  {hasDropdown ? (
                    <>
                      <button className="group/btn relative flex items-center gap-1 text-sm font-medium text-white/70 transition-colors hover:text-white">
                        {l}
                        <ChevronDown size={14} className="transition-transform duration-300 group-hover:-rotate-180" />
                        <span className="absolute -bottom-1 left-0 h-px w-0 bg-crimson transition-all duration-300 group-hover/btn:w-full" />
                      </button>
                      {/* Dropdown Menu */}
                      <div className="absolute left-0 top-full mt-0 w-48 rounded-xl glass-strong p-2 opacity-0 invisible transition-all duration-300 group-hover:visible group-hover:opacity-100 group-hover:translate-y-1">
                        {hasDropdown.map((cat) => (
                          <a
                            key={cat}
                            href={`#${cat.toLowerCase().replace(/\s+/g, "-")}`}
                            className="block rounded-lg px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                          >
                            {cat}
                          </a>
                        ))}
                      </div>
                    </>
                  ) : (
                    <a
                      href={`#${l.toLowerCase().replace(/\s+/g, "-")}`}
                      className={`group/link relative text-sm font-medium transition-colors ${
                        activeSection === l.toLowerCase().replace(/\s+/g, "-") ? "text-crimson" : "text-white/70 hover:text-white"
                      }`}
                    >
                      {l}
                      <span className="absolute -bottom-1 left-0 h-px w-0 bg-crimson transition-all duration-300 group-hover/link:w-full" />
                    </a>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button className="flex h-10 w-10 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white">
              <Search size={19} />
            </button>
            <Link href="/favorites" className="relative flex h-10 w-10 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white">
              <Heart size={19} />
              {favoritesCount > 0 && (
                <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-crimson text-[9px] font-bold text-white">
                  {favoritesCount}
                </span>
              )}
            </Link>
            <Link href="/cart" className="relative flex h-10 w-10 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white">
              <ShoppingCart size={19} />
              {cartCount > 0 && (
                <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-crimson text-[9px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
            
            <a 
              href="#products" 
              className="hidden sm:flex ml-2 items-center justify-center rounded-full bg-crimson px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-crimson-deep hover:scale-105 shadow-[0_0_15px_rgba(220,38,38,0.3)]"
            >
              Shop Now
            </a>

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
                        activeSection === l.toLowerCase().replace(/\s+/g, "-") ? "text-crimson" : "text-white/80"
                      }`}
                    >
                      {l}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto flex items-center justify-center border-t border-white/10 pt-6">
                <a 
                  href="#products" 
                  onClick={() => setOpen(false)}
                  className="w-full text-center rounded-full bg-crimson px-5 py-3.5 text-sm font-semibold text-white transition-all hover:bg-crimson-deep shadow-[0_0_15px_rgba(220,38,38,0.3)]"
                >
                  Shop Now
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
