// app/page.tsx - Clean and simple
"use client";

import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedCars } from "@/components/home/FeaturedCars";
import { StatsSection } from "@/components/home/StatsSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { LatestInventory } from "@/components/home/LatestInventory";
import { Testimonials } from "@/components/home/Testimonials";
import { ContactSection } from "@/components/home/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedCars />
      <StatsSection />
      <WhyChooseUs />
      <LatestInventory />
      <Testimonials />
      <ContactSection />
    </>
  );
}