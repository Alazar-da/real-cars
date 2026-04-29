// components/home/LatestInventory.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CarCard } from "@/components/car-card";
import { cars } from "@/lib/mockData";
import { FaArrowRight } from "react-icons/fa";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function LatestInventory() {
  const latestCars = [...cars].reverse().slice(0, 6);
  
  return (
    <section className="py-20 bg-background/30">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <ScrollReveal>
            <h2 className="text-4xl font-bold">
              Latest <span className="text-gradient">Inventory</span>
            </h2>
            <p className="text-muted-foreground mt-2">Recently added vehicles</p>
          </ScrollReveal>
          <motion.div whileHover={{ x: 5 }}>
            <Link href="/cars" className="text-amber-500 hover:underline flex items-center gap-1">
              View all <FaArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestCars.map((car, index) => (
            <ScrollReveal key={car.id} direction="up" delay={index * 0.1}>
              <CarCard car={car} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}