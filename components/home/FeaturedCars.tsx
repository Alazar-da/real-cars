// components/home/FeaturedCars.tsx
"use client";

import { motion } from "framer-motion";
import { CarCard } from "@/components/car-card";
import { cars } from "@/lib/mockData";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function FeaturedCars() {
  const featuredCars = cars.filter(c => c.featured).slice(0, 3);
  
  return (
    <section id="featured" className="py-20">
      <div className="container mx-auto px-6">
        <ScrollReveal className="text-center mb-12">
          <div className="h-1 w-20 bg-amber-500 mx-auto mb-4" />
          <h2 className="text-4xl font-bold mb-4">
            Featured <span className="text-gradient">Vehicles</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our hand-picked selection of the finest luxury cars available now.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCars.map((car, index) => (
            <ScrollReveal key={car.id} direction="up" delay={index * 0.1}>
              <CarCard car={car} featured />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}