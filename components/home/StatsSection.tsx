// components/home/StatsSection.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { useInView, motion } from "framer-motion";
import { FaCar, FaStar, FaClock, FaAward, FaUsers, FaGlobe, FaShieldAlt, FaHeadset } from "react-icons/fa";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

// Animated Counter Component
function AnimatedCounter({ target, suffix = "", prefix = "", duration = 2000 }: { 
  target: number; 
  suffix?: string; 
  prefix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, target, duration]);
  
  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, type: "spring" }}
      className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent"
    >
      {prefix}{count.toLocaleString()}{suffix}
    </motion.span>
  );
}

// Individual Stat Card Component
function StatCard({ 
  icon: Icon, 
  target, 
  label, 
  suffix = "", 
  prefix = "",
  delay = 0,
  description = ""
}: { 
  icon: any; 
  target: number; 
  label: string; 
  suffix?: string; 
  prefix?: string;
  delay?: number;
  description?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // 3D tilt effect on hover
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    };
    
    const handleMouseLeave = () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    };
    
    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="glass-card p-6 text-center group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Animated Icon Container */}
      <motion.div 
        className="relative w-20 h-20 mx-auto mb-4"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all" />
        <div className="relative w-full h-full rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 flex items-center justify-center border border-amber-500/30 group-hover:border-amber-500/50 transition-all">
          <Icon className="w-8 h-8 text-amber-500 group-hover:scale-110 transition-transform" />
        </div>
      </motion.div>
      
      {/* Animated Counter */}
      <AnimatedCounter target={target} suffix={suffix} prefix={prefix} />
      
      {/* Label */}
      <h3 className="text-lg font-semibold mt-3 mb-1">{label}</h3>
      
      {/* Description */}
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
      
      {/* Decorative line that animates on hover */}
      <motion.div 
        className="h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mt-4 mx-auto w-0 group-hover:w-full transition-all duration-300"
        style={{ maxWidth: "60%" }}
      />
    </motion.div>
  );
}

// Main StatsSection Component
export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Stats data - easily customizable
  const stats = [
    {
      icon: FaCar,
      target: 500,
      suffix: "+",
      label: "Luxury Cars Sold",
      description: "Premium vehicles delivered",
      delay: 0
    },
    {
      icon: FaUsers,
      target: 1000,
      suffix: "+",
      label: "Happy Customers",
      description: "Satisfied car owners",
      delay: 0.1
    },
    {
      icon: FaClock,
      target: 24,
      suffix: "/7",
      label: "Customer Support",
      description: "Round-the-clock assistance",
      delay: 0.2
    },
    {
      icon: FaAward,
      target: 100,
      suffix: "%",
      label: "Satisfaction Rate",
      description: "Service excellence",
      delay: 0.3
    }
  ];
  
  // Alternative stats for different business focus
  const alternativeStats = [
    {
      icon: FaCar,
      target: 1200,
      suffix: "+",
      label: "Vehicles Available",
      description: "Wide selection",
      delay: 0
    },
    {
      icon: FaGlobe,
      target: 15,
      suffix: "+",
      label: "Locations",
      description: "Nationwide service",
      delay: 0.1
    },
    {
      icon: FaShieldAlt,
      target: 100,
      suffix: "%",
      label: "Certified",
      description: "All cars inspected",
      delay: 0.2
    },
    {
      icon: FaHeadset,
      target: 50,
      suffix: "+",
      label: "Support Staff",
      description: "Expert team",
      delay: 0.3
    }
  ];
  
  // Use this to switch between stat sets
  const useAlternativeStats = false; // Change to true for alternative stats
  const displayStats = useAlternativeStats ? alternativeStats : stats;
  
  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-40 -right-40 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, -50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-12">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "60px" }}
            transition={{ duration: 0.6 }}
            className="h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mb-4"
          />
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-gradient">Achievements</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Numbers that speak for themselves - trust, quality, and excellence in every statistic
          </p>
        </ScrollReveal>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayStats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              target={stat.target}
              suffix={stat.suffix}
              label={stat.label}
              description={stat.description}
              delay={stat.delay}
            />
          ))}
        </div>
        
        {/* Optional: Progress Bar or Additional Info */}
        <ScrollReveal direction="up" delay={0.4}>
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              🏆 Recognized as "Best Luxury Car Dealer 2024" - Ethiopian Automotive Excellence Awards
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}