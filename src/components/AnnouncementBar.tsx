export default function AnnouncementBar() {
  return (
    <div className="relative z-50 overflow-hidden bg-crimson text-center text-sm sm:text-base font-semibold uppercase tracking-wider text-white">
      <div className="flex animate-marquee whitespace-nowrap py-3 sm:py-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <span key={i} className="mx-8">
            Free express shipping on orders over $150 · Members get early access to drops · Step Into The Future
          </span>
        ))}
      </div>
    </div>
  );
}
