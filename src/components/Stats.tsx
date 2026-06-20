import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const stats = [
  { target: 10, suffix: "M+", label: "Happy Customers" },
  { target: 500, suffix: "+", label: "Sneaker Models" },
  { target: 100, suffix: "+", label: "Countries" },
  { target: 98, suffix: "%", label: "Satisfaction Rate" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
 let raf = 0;
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] glass-strong px-6 py-12 sm:px-12">
          <div className="relative grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-4xl font-extrabold text-gradient-red sm:text-5xl lg:text-6xl">
                  <Counter target={s.target} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-xs uppercase tracking-wider text-white/50 sm:text-sm">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
