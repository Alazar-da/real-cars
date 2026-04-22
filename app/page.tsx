// app/page.tsx (updated sections with theme awareness)
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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
  FaLinkedin
} from "react-icons/fa";
import Image from "next/image";
import { MdEmail, MdLocationOn } from "react-icons/md";

export default function HomePage() {
  const [featuredCars, setFeaturedCars] = useState(cars.filter(c => c.featured).slice(0, 3));
  const [latestCars, setLatestCars] = useState([...cars].reverse().slice(0, 6));

  // Add these state variables at the top of your HomePage component
const [formData, setFormData] = useState({
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
});
const [isSubmitting, setIsSubmitting] = useState(false);

// Add the submit handler
const handleContactSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  // Simulate API call - Replace with your actual endpoint
  setTimeout(() => {
    /* toast.success(`Thank you ${formData.name}! We'll contact you shortly.`); */
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
    setIsSubmitting(false);
  }, 1500);
  
  // TODO: Replace with actual API call
  // const response = await fetch('/api/contact', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(formData),
  // });
};

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/cover.jpg" alt="Luxury Car Background" fill className="w-full h-full object-cover" />
          {/* <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1920&auto=format"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-driving-a-luxury-car-on-a-curve-32851-large.mp4" type="video/mp4" />
          </video> */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 dark:from-black/80 dark:via-black/60 dark:to-black/90" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-100 dark:text-white mb-6">
              Find Your <span className="text-gradient">Dream Car</span> Today
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Experience luxury, performance, and innovation with our curated collection of premium vehicles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/cars"
                className="px-8 py-3 bg-amber-500 text-black font-semibold rounded-full hover:bg-amber-400 transition-all hover:scale-105 inline-flex items-center gap-2"
              >
                Browse Cars <FaArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#contact"
                className="px-8 py-3 glass-card text-foreground font-semibold rounded-full hover:bg-white/10 transition-all inline-flex items-center gap-2"
              >
                <FaPhone className="w-4 h-4" /> Contact Dealer
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Featured <span className="text-gradient">Vehicles</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our hand-picked selection of the finest luxury cars available now.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCars.map((car) => (
              <CarCard key={car.id} car={car} featured />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Why Choose <span className="text-gradient">REALCARS</span></h2>
            <p className="text-muted-foreground">Experience the difference of premium service</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: FaShieldAlt, title: "Certified Vehicles", desc: "Every car undergoes rigorous inspection" },
              { icon: FaClock, title: "24/7 Support", desc: "Round-the-clock customer assistance" },
              { icon: FaAward, title: "Best Price Guarantee", desc: "Competitive pricing on all models" },
              { icon: FaStar, title: "5-Star Service", desc: "Exceptional customer experience" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 text-center hover:scale-105 transition-all"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <item.icon className="w-8 h-8 text-amber-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Inventory Preview */}
      <section className="py-20 bg-background/30">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold">Latest <span className="text-gradient">Inventory</span></h2>
              <p className="text-muted-foreground mt-2">Recently added vehicles</p>
            </div>
            <Link href="/cars" className="text-amber-500 hover:underline flex items-center gap-1">
              View all <FaArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">What Our <span className="text-gradient">Clients Say</span></h2>
            <p className="text-muted-foreground">Trusted by luxury car enthusiasts worldwide</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={`w-4 h-4 ${i < testimonial.rating ? "text-amber-500" : "text-gray-600"}`} />
                  ))}
                </div>
                <p className="text-foreground/80 mb-4">{testimonial.content}</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    // Contact Section Component (Replace the CTA Banner section)
<section className="py-20 relative overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 via-black/20 to-black/60" />
  <div className="relative container mx-auto px-6">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-12"
    >
      <h2 className="text-4xl font-bold mb-4">Get In <span className="text-gradient">Touch</span></h2>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        Have questions? Our team is ready to assist you with any inquiries about our luxury vehicles.
      </p>
    </motion.div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {/* Owner Information Card */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="glass-card p-6 md:p-8"
      >
        <div className="text-center mb-6">
          <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-amber-500/30">
            <Image
              src="/hero.jpg"
              alt="Owner - Michael Anderson"
              fill
              className="object-cover"
            />
          </div>
          <h3 className="text-2xl font-bold">yoseph Mulugeta</h3>
          <p className="text-amber-500 text-sm mb-2">Founder & CEO</p>
          <p className="text-muted-foreground text-sm">15+ years in luxury automotive industry</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 text-muted-foreground">
            <FaPhone className="w-5 h-5 text-amber-500" />
            <span>+251 911 123 456</span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <MdEmail className="w-5 h-5 text-amber-500" />
            <span>yoseph@realcars.com</span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <MdLocationOn className="w-5 h-5 text-amber-500" />
            <span>Addis Ababa, Ethiopia</span>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground italic">
            "My passion is connecting people with their dream cars. Every vehicle in our collection is personally inspected to ensure the highest quality."
          </p>
          <div className="flex gap-3 mt-4 justify-center">
            <a href="#" className="p-2 rounded-full bg-secondary hover:bg-amber-500/20 transition">
              <FaFacebook className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-full bg-secondary hover:bg-amber-500/20 transition">
              <FaTwitter className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-full bg-secondary hover:bg-amber-500/20 transition">
              <FaInstagram className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-full bg-secondary hover:bg-amber-500/20 transition">
              <FaLinkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="glass-card p-6 md:p-8"
      >
        <h3 className="text-xl font-bold mb-4">Send us a Message</h3>
        <form onSubmit={handleContactSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-muted-foreground">Full Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-muted-foreground">Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-3 py-2 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-muted-foreground">Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full px-3 py-2 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-muted-foreground">Subject *</label>
            <input
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
              className="w-full px-3 py-2 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
             
           
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-muted-foreground">Message *</label>
            <textarea
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              placeholder="Tell us about your interest or ask any questions..."
              className="w-full px-3 py-2 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-amber-500 text-black font-semibold rounded-lg hover:bg-amber-400 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="w-4 h-4 animate-spin" /> Sending...
              </>
            ) : (
              <>
                Send Message <FaArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
        
        <div className="mt-4 pt-4 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            We'll get back to you within 24 hours. Your privacy is important to us.
          </p>
        </div>
      </motion.div>
    </div>
  </div>
</section>
    </>
  );
}