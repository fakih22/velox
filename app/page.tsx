"use client";

import Navbar from "../src/components/Navbar";
import Hero from "../src/components/Hero";
import AnnouncementBar from "../src/components/AnnouncementBar";
import FeaturedCollection from "../src/components/FeaturedCollection";
import ShopByCategory from "../src/components/ShopByCategory";
import WhyChooseUs from "../src/components/WhyChooseUs";
import AllProducts from "../src/components/BestSellers";
import Testimonials from "../src/components/Testimonials";
import Stats from "../src/components/Stats";
import MobileApp from "../src/components/MobileApp";
import Newsletter from "../src/components/Newsletter";
import Footer from "../src/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-ink text-white">
      <Navbar />
      <main>
        <Hero />
        <AnnouncementBar />
        <FeaturedCollection />
        <AllProducts />
        <ShopByCategory />
        <WhyChooseUs />
        <Stats />
        <Testimonials />
        <MobileApp />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
