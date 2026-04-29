// components/home/ContactSection.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaPhone, FaArrowRight, FaSpinner, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const staggerItem = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-20 relative overflow-hidden" id="contact">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 via-black/20 to-black/60" />
      
      <div className="relative container mx-auto px-6">
        <ScrollReveal className="text-center mb-12">
          <div className="px-4 py-2 rounded-full glass-card inline-flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium">We're here to help</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">Get In <span className="text-gradient">Touch</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions? Our team is ready to assist you with any inquiries about our luxury vehicles.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Owner Card */}
          <ScrollReveal direction="left">
            <div className="glass-card p-6 md:p-8">
              <div className="text-center mb-6">
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-amber-500/30">
                  <Image src="/hero.jpg" alt="Owner" fill className="object-cover" />
                </div>
                <h3 className="text-2xl font-bold">Yoseph Mulugeta</h3>
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
                  "My passion is connecting people with their dream cars. Every vehicle in our collection is personally inspected."
                </p>
                <div className="flex gap-3 mt-4 justify-center">
                  {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, i) => (
                    <a key={i} href="#" className="p-2 rounded-full bg-secondary hover:bg-amber-500/20 transition">
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal direction="right">
            <div className="glass-card p-6 md:p-8">
              <h3 className="text-xl font-bold mb-4">Send us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name *"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="px-3 py-2 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email *"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="px-3 py-2 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>
                
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-3 py-2 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                
                <input
                  type="text"
                  placeholder="Subject *"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full px-3 py-2 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
                
                <textarea
                  rows={4}
                  placeholder="Message *"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-3 py-2 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                  required
                />
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <><FaSpinner className="w-4 h-4 animate-spin" /> Sending...</>
                  ) : (
                    <>Send Message <FaArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </form>
              
              <p className="text-xs text-muted-foreground text-center mt-4 pt-4 border-t border-border">
                We'll get back to you within 24 hours. Your privacy is important to us.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}