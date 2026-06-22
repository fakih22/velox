import { Send, Globe, MessageCircle, Mail } from "lucide-react";

const columns = [
  {
    title: "Shop",
    links: ["New Arrivals", "Men", "Women", "Sale", "Gift Cards", "Collections"],
  },
  {
    title: "Support",
    links: ["Help Center", "Order Tracking", "Shipping Info", "Returns & Exchanges", "Size Guide", "Contact Us"],
  },
  {
    title: "Company",
    links: ["About VELOX", "Careers", "Sustainability", "Press", "Affiliates", "Store Locator"],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-ink-soft pt-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-2 gap-10 pb-14 sm:grid-cols-3 lg:grid-cols-6">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-3">
            <a href="#home" className="text-3xl font-extrabold tracking-tighter text-white">
              VEL<span className="text-gradient-red">OX</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
              Step into the future. VELOX engineers premium performance sneakers for athletes and
              visionaries who refuse to settle for ordinary.
            </p>
            <div className="mt-6 flex gap-3">
              {[Globe, MessageCircle, Mail, Send].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full glass text-white/70 transition-all hover:scale-110 hover:bg-crimson hover:text-white"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-white/50 transition-colors hover:text-crimson">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-7 sm:flex-row">
          <p className="text-xs text-white/40">
            © 2025 VELOX Athletics. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/40">
            <a href="#" className="transition-colors hover:text-white">Privacy Policy.</a>
            <a href="#" className="transition-colors hover:text-white">Terms & Conditions</a>
            <a href="#" className="transition-colors hover:text-white">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
