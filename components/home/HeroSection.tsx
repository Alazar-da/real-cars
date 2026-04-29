// components/home/HeroSection.tsx
"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaArrowRight, FaPhone, FaPlay, FaPause, FaExpand } from "react-icons/fa";
import { ThreeScene } from "@/components/3d/ThreeScene";
import { AnimatedText } from "@/components/ui/AnimatedText";

export function HeroSection() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  
  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };
  
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  const handleFullscreen = () => {
    if (videoRef.current) {
      videoRef.current.requestFullscreen();
    }
  };
  
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
  };
  
  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ThreeScene />
      
      <div 
        className="absolute inset-0 z-0"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/car-360-rotation.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: showControls ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20"
        >
          <button onClick={toggleVideo} className="p-3 rounded-full glass-card hover:scale-110 transition">
            {isVideoPlaying ? <FaPause className="w-4 h-4" /> : <FaPlay className="w-4 h-4" />}
          </button>
          <button onClick={toggleMute} className="p-3 rounded-full glass-card hover:scale-110 transition">
            {isMuted ? "🔇" : "🔊"}
          </button>
          <button onClick={handleFullscreen} className="p-3 rounded-full glass-card hover:scale-110 transition">
            <FaExpand className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
      
      <motion.div 
        className="relative z-10 container mx-auto px-6 text-center"
        style={{ opacity: heroOpacity, scale: contentScale }}
      >
        <motion.div animate={floatingAnimation} className="inline-block mb-6">
          <div className="px-4 py-2 rounded-full glass-card inline-flex items-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-2 h-2 bg-amber-500 rounded-full"
            />
            <span className="text-sm font-medium">360° Virtual Showroom</span>
          </div>
        </motion.div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
          Experience{" "}
          <span className="text-gradient">360° View</span>
        </h1>
        
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          Rotate and explore every angle of our luxury vehicles. Experience the thrill of a real showroom from anywhere in the world.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/cars"
            className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold rounded-full hover:from-amber-600 hover:to-orange-600 transition-all inline-flex items-center gap-2 shadow-lg"
          >
            Browse Cars <FaArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="#contact"
            className="px-8 py-3 glass-card text-white font-semibold rounded-full hover:bg-white/10 transition-all inline-flex items-center gap-2"
          >
            <FaPhone className="w-4 h-4" /> Contact Dealer
          </Link>
        </div>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        onClick={() => document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" })}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div 
            className="w-1 h-2 bg-amber-500 rounded-full mt-2"
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}