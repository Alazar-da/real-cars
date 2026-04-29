// components/home/WhyChooseUs.tsx
"use client";

import { FaShieldAlt, FaClock, FaAward, FaStar } from "react-icons/fa";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const features = [
  { icon: FaShieldAlt, title: "Certified Vehicles", desc: "Every car undergoes rigorous inspection" },
  { icon: FaClock, title: "24/7 Support", desc: "Round-the-clock customer assistance" },
  { icon: FaAward, title: "Best Price Guarantee", desc: "Competitive pricing on all models" },
  { icon: FaStar, title: "5-Star Service", desc: "Exceptional customer experience" },
];

export function WhyChooseUs() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Why Choose <span className="text-gradient">REALCARS</span>
          </h2>
          <p className="text-muted-foreground">Experience the difference of premium service</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <ScrollReveal key={index} direction="up" delay={index * 0.1}>
              <div className="glass-card p-6 text-center group hover:scale-105 transition-all">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition">
                  <feature.icon className="w-8 h-8 text-amber-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}