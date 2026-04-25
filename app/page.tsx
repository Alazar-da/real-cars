// app/page.tsx - Complete with stunning animations
"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { CarCard } from "@/components/car-card";
import { cars, testimonials } from "@/lib/mockData";
import { 
  FaCar, 
  FaStar, 
  FaShieldAlt, 
  FaClock, 
  FaAward, 
  FaArrowRight, 
  FaPhone, 
  FaSpinner,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaChevronDown,
  FaPlay,
  FaPause
} from "react-icons/fa";
import Image from "next/image";
import { MdEmail, MdLocationOn } from "react-icons/md";

export default function HomePage() {
  const [featuredCars, setFeaturedCars] = useState(cars.filter(c => c.featured).slice(0, 3));
  const [latestCars, setLatestCars] = useState([...cars].reverse().slice(0, 6));
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  // Parallax scroll animations
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1500);
  };

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

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, type: "spring", stiffness: 100 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const pulseGlow = {
    scale: [1, 1.05, 1],
    boxShadow: [
      "0 0 0 0 rgba(245, 158, 11, 0)",
      "0 0 0 20px rgba(245, 158, 11, 0.3)",
      "0 0 0 0 rgba(245, 158, 11, 0)"
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <>
      {/* Hero Section with Video Background */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Video Background */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: heroY }}
        >
          <Image src={'/cover.jpg'} alt="Hero Background" layout="fill" objectFit="cover" className="w-full h-full object-contain" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
          
          {/* Video control button */}
          <button
            onClick={toggleVideo}
            className="absolute bottom-8 left-8 z-20 p-3 rounded-full glass-card hover:scale-110 transition-all duration-300"
          >
            {isVideoPlaying ? <FaPause className="w-4 h-4" /> : <FaPlay className="w-4 h-4" />}
          </button>
        </motion.div>

        {/* Animated particles effect */}
        <div className="absolute inset-0 z-5 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-amber-500/30 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                y: [null, -100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        <motion.div 
          className="relative z-10 container mx-auto px-6 text-center"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={staggerItem}>
              <motion.div
                animate={floatingAnimation}
                className="inline-block mb-6"
              >
                <div className="px-4 py-2 rounded-full glass-card inline-flex items-center gap-2">
                  <motion.div
                    animate={pulseGlow}
                    className="w-2 h-2 bg-amber-500 rounded-full"
                  />
                  <span className="text-sm font-medium">Luxury Collection 2024</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.h1 
              variants={staggerItem}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
            >
              Find Your{" "}
              <motion.span 
                className="text-gradient inline-block"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ backgroundSize: "200% auto" }}
              >
                Dream Car
              </motion.span>{" "}
              Today
            </motion.h1>
            
            <motion.p 
              variants={staggerItem}
              className="text-xl text-gray-300 max-w-2xl mx-auto mb-8"
            >
              Experience luxury, performance, and innovation with our curated collection of premium vehicles.
            </motion.p>
            
            <motion.div 
              variants={staggerItem}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/cars"
                  className="px-8 py-3 bg-amber-500 text-black font-semibold rounded-full hover:bg-amber-400 transition-all inline-flex items-center gap-2 shadow-lg hover:shadow-amber-500/25"
                >
                  Browse Cars <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="#contact"
                  className="px-8 py-3 glass-card text-white font-semibold rounded-full hover:bg-white/10 transition-all inline-flex items-center gap-2"
                >
                  <FaPhone className="w-4 h-4" /> Contact Dealer
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Animated scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
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

      {/* Featured Cars */}
      <section id="featured" className="py-20 bg-background/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              transition={{ duration: 0.8 }}
              className="h-1 bg-amber-500 mx-auto mb-4"
            />
            <h2 className="text-4xl font-bold mb-4">Featured <span className="text-gradient">Vehicles</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our hand-picked selection of the finest luxury cars available now.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {featuredCars.map((car, index) => (
              <motion.div key={car.id} variants={staggerItem}>
                <CarCard car={car} featured />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us with 3D flip cards */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Why Choose <span className="text-gradient">REALCARS</span></h2>
            <p className="text-muted-foreground">Experience the difference of premium service</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: FaShieldAlt, title: "Certified Vehicles", desc: "Every car undergoes rigorous inspection", color: "from-blue-500 to-cyan-500" },
              { icon: FaClock, title: "24/7 Support", desc: "Round-the-clock customer assistance", color: "from-green-500 to-emerald-500" },
              { icon: FaAward, title: "Best Price Guarantee", desc: "Competitive pricing on all models", color: "from-purple-500 to-pink-500" },
              { icon: FaStar, title: "5-Star Service", desc: "Exceptional customer experience", color: "from-orange-500 to-red-500" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, rotateY: 90 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5, type: "spring" }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass-card p-6 text-center group cursor-pointer"
              >
                <motion.div 
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <item.icon className="w-8 h-8 text-amber-500" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Inventory with horizontal scroll animation */}
      <section className="py-20 bg-background/30 overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex justify-between items-center mb-12"
          >
            <div>
              <h2 className="text-4xl font-bold">Latest <span className="text-gradient">Inventory</span></h2>
              <p className="text-muted-foreground mt-2">Recently added vehicles</p>
            </div>
            <motion.div whileHover={{ x: 5 }}>
              <Link href="/cars" className="text-amber-500 hover:underline flex items-center gap-1">
                View all <FaArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {latestCars.map((car, index) => (
              <motion.div 
                key={car.id} 
                variants={staggerItem}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <CarCard car={car} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials with auto-scroll */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">What Our <span className="text-gradient">Clients Say</span></h2>
            <p className="text-muted-foreground">Trusted by luxury car enthusiasts worldwide</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6, type: "spring" }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass-card p-6 relative overflow-hidden"
              >
                <motion.div 
                  className="absolute top-0 right-0 w-20 h-20 bg-amber-500/10 rounded-full -mr-10 -mt-10"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.2 + i * 0.1 }}
                    >
                      <FaStar className={`w-4 h-4 ${i < testimonial.rating ? "text-amber-500" : "text-gray-600"}`} />
                    </motion.div>
                  ))}
                </div>
                <p className="text-foreground/80 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section with Animated Form */}
      <section className="py-20 relative overflow-hidden">
        {/* Animated background shapes */}
        <motion.div 
          className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ x: [0, -100, 0], y: [0, 50, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        
        <div className="relative container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-block"
            >
              <div className="px-4 py-2 rounded-full glass-card inline-flex items-center gap-2 mb-4">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-2 h-2 bg-green-500 rounded-full"
                />
                <span className="text-sm font-medium">We're here to help</span>
              </div>
            </motion.div>
            <h2 className="text-4xl font-bold mb-4">Get In <span className="text-gradient">Touch</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have questions? Our team is ready to assist you with any inquiries about our luxury vehicles.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Owner Information Card */}
            <motion.div
              initial={{ opacity: 0, x: -50, rotateY: -15 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring" }}
              whileHover={{ y: -5 }}
              className="glass-card p-6 md:p-8"
            >
              <motion.div 
                className="text-center mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-amber-500/30"
                  animate={{ boxShadow: ["0 0 0 0 rgba(245, 158, 11, 0.4)", "0 0 0 20px rgba(245, 158, 11, 0)", "0 0 0 0 rgba(245, 158, 11, 0)"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Image
                    src="/hero.jpg"
                    alt="Owner - Yoseph Mulugeta"
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <h3 className="text-2xl font-bold">Yoseph Mulugeta</h3>
                <p className="text-amber-500 text-sm mb-2">Founder & CEO</p>
                <p className="text-muted-foreground text-sm">15+ years in luxury automotive industry</p>
              </motion.div>

              <motion.div 
                className="space-y-4"
                initial="hidden"
                whileInView="visible"
                variants={staggerContainer}
              >
                {[
                  { icon: FaPhone, text: "+251 911 123 456", href: "tel:+251911123456" },
                  { icon: MdEmail, text: "yoseph@realcars.com", href: "mailto:yoseph@realcars.com" },
                  { icon: MdLocationOn, text: "Addis Ababa, Ethiopia", href: "#" }
                ].map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    variants={staggerItem}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 text-muted-foreground hover:text-amber-500 transition group cursor-pointer"
                  >
                    <item.icon className="w-5 h-5 text-amber-500 group-hover:scale-110 transition" />
                    <span>{item.text}</span>
                  </motion.a>
                ))}
              </motion.div>

              <div className="mt-6 pt-6 border-t border-border">
                <motion.p 
                  className="text-sm text-muted-foreground italic"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  "My passion is connecting people with their dream cars. Every vehicle in our collection is personally inspected to ensure the highest quality."
                </motion.p>
                <motion.div 
                  className="flex gap-3 mt-4 justify-center"
                  initial="hidden"
                  whileInView="visible"
                  variants={staggerContainer}
                >
                  {[
                    { icon: FaFacebook, color: "hover:bg-blue-500/20" },
                    { icon: FaTwitter, color: "hover:bg-sky-500/20" },
                    { icon: FaInstagram, color: "hover:bg-pink-500/20" },
                    { icon: FaLinkedin, color: "hover:bg-blue-600/20" }
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      variants={staggerItem}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className={`p-2 rounded-full bg-secondary ${social.color} transition`}
                    >
                      <social.icon className="w-4 h-4" />
                    </motion.a>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50, rotateY: 15 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring" }}
              className="glass-card p-6 md:p-8"
            >
              <h3 className="text-xl font-bold mb-4">Send us a Message</h3>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.div whileHover={{ x: 3 }} className="space-y-1">
                    <label className="block text-sm font-medium text-muted-foreground">Full Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 py-2 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                      required
                    />
                  </motion.div>
                  <motion.div whileHover={{ x: 3 }} className="space-y-1">
                    <label className="block text-sm font-medium text-muted-foreground">Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-3 py-2 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                      required
                    />
                  </motion.div>
                </div>
                
                <motion.div whileHover={{ x: 3 }} className="space-y-1">
                  <label className="block text-sm font-medium text-muted-foreground">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-3 py-2 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                  />
                </motion.div>
                
                <motion.div whileHover={{ x: 3 }} className="space-y-1">
                  <label className="block text-sm font-medium text-muted-foreground">Subject *</label>
                  <input
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full px-3 py-2 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                    required
                  />
                </motion.div>
                
                <motion.div whileHover={{ x: 3 }} className="space-y-1">
                  <label className="block text-sm font-medium text-muted-foreground">Message *</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Tell us about your interest or ask any questions..."
                    className="w-full px-3 py-2 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none transition-all"
                    required
                  />
                </motion.div>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-amber-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="w-4 h-4 animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      Send Message <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1, repeat: Infinity }}><FaArrowRight className="w-4 h-4" /></motion.div>
                    </>
                  )}
                </motion.button>
              </form>
              
              <motion.div 
                className="mt-4 pt-4 border-t border-border text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-xs text-muted-foreground">
                  We'll get back to you within 24 hours. Your privacy is important to us.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}