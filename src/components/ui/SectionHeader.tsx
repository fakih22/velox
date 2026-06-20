import { motion } from "framer-motion";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeader({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = "center",
}: SectionHeaderProps) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : "text-left"}`}>
      <motion.span
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-crimson"
      >
        <span className="h-px w-8 bg-crimson" />
        {eyebrow}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ delay: 0.08 }}
        className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl"
      >
        {title} {highlight && <span className="text-gradient-red">{highlight}</span>}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.16 }}
          className="mt-5 text-base leading-relaxed text-white/55"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
