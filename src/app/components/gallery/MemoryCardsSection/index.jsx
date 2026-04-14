"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Calendar, Star, ArrowRight, Compass, GalleryThumbnails, GalleryHorizontalEndIcon, Heart } from "lucide-react";

export default function MemoryCardsSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const items = [
    {
      title: "City Tours",
      meta: "6 Tours - From ₹500",
      location: "Urban Explorer",
      rating: 4.8,
      img: "/images/gallery/1Jan2025/(1).jpeg",
      icon: "🏙️",
      color: "from-blue-500 to-cyan-400",
    },
    {
      title: "Museum Tours",
      meta: "6 Tours - From ₹450",
      location: "Cultural Heritage",
      rating: 4.9,
      img: "/images/gallery/1Jan2025/(2).jpeg",
      icon: "🏛️",
      color: "from-amber-500 to-orange-400",
    },
    {
      title: "Beaches",
      meta: "10 Tours - From ₹100",
      location: "Coastal Paradise",
      rating: 4.7,
      img: "/images/gallery/1Jan2025/(3).jpeg",
      icon: "🏖️",
      color: "from-teal-500 to-emerald-400",
    },
    {
      title: "Hiking",
      meta: "4 Tours - From ₹250",
      location: "Mountain Trails",
      rating: 4.6,
      img: "/images/gallery/1Jan2025/(4).jpeg",
      icon: "🥾",
      color: "from-green-600 to-lime-500",
    },
    {
      title: "Cruises",
      meta: "8 Tours - From ₹100",
      location: "Ocean Voyages",
      rating: 4.9,
      img: "/images/gallery/1Jan2025/(5).jpeg",
      icon: "🛳️",
      color: "from-indigo-500 to-purple-500",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="relative overflow-hidden py-16 sm:py-0 bg-gradient-to-b from-[var(--surface)] to-[var(--surface-2)]">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-[var(--accent)]/5 to-[var(--primary)]/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-[var(--primary)]/5 to-[var(--accent)]/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }} />
        
        {/* Decorative grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--text) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Decorative elements */}
      <div className="absolute -left-10 top-20 w-32 h-32 opacity-10 rotate-12">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="40" fill="none" stroke="var(--accent)" strokeWidth="2" strokeDasharray="5,5" />
        </svg>
      </div>
      
      <div className="absolute -right-10 bottom-40 w-40 h-40 opacity-10 -rotate-12">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect x="10" y="10" width="80" height="80" fill="none" stroke="var(--primary)" strokeWidth="2" strokeDasharray="6,4" rx="10" />
        </svg>
      </div>

      <div className="container-page max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface-2)] border border-[var(--border)] mb-4">
            <GalleryHorizontalEndIcon className="h-4 w-4 text-[var(--accent)]" />
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
              Our Stories
            </span>
          </div> */}
          
          {/* <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="block" style={{ color: "var(--text)" }}>Let us plan you a</span>
            <span className="block bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] bg-clip-text text-transparent">
              perfect Holiday
            </span>
          </h2>
          
          <p className="mt-4 text-base max-w-2xl mx-auto" style={{ color: "var(--text-muted)" }}>
            Discover handcrafted experiences tailored to your dreams
          </p> */}
        </motion.div>

        {/* Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4"
        >
          {items.map((it, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              onHoverStart={() => setHoveredIndex(idx)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="group relative cursor-pointer"
            >
              <div className="relative flex flex-col items-center">
                {/* Floating badge */}
                {/* <motion.div 
                  className="absolute -top-2 -right-2 z-20"
                  animate={{ scale: hoveredIndex === idx ? 1.1 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] rounded-full blur-md opacity-50" />
                    <div className="relative h-10 w-10 rounded-full bg-white shadow-lg flex items-center justify-center border-2 border-white">
                      <span className="text-lg">{it.icon}</span>
                    </div>
                  </div>
                </motion.div> */}

                {/* Main Image Container */}
                <div className="relative w-full aspect-square mb-3">
                  {/* Glow effect on hover */}
                  <motion.div 
                    className="absolute -inset-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle, var(--${it.color.split('-')[1]}) 0%, transparent 70%)`,
                      filter: 'blur(20px)',
                    }}
                  />
                  
                  {/* Image Circle */}
                  <motion.div
                    className="relative w-full h-full overflow-hidden rounded-full shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    style={{
                      border: "4px solid white",
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    }}
                  >
                    <Image
                      src={it.img}
                      alt={it.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                      priority={idx < 2}
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </motion.div>

                  {/* Rating badge */}
                  {/* <motion.div 
                    className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg flex items-center gap-1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: hoveredIndex === idx ? 1 : 0, y: hoveredIndex === idx ? 0 : 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-bold text-gray-800">{it.rating}</span>
                  </motion.div> */}
                </div>

                {/* Content */}
                <motion.div 
                  className="text-center w-full mt-2"
                  animate={{ y: hoveredIndex === idx ? -5 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-lg font-bold mb-1" style={{ color: "var(--text)" }}>
                    {it.title}
                  </h3>
                  
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <MapPin className="h-3 w-3" style={{ color: "var(--accent)" }} />
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>{it.location}</span>
                  </div>
                  
                  {/* <div className="inline-block px-3 py-1 rounded-full bg-[var(--surface-2)] border border-[var(--border)] mb-2">
                    <span className="text-xs font-semibold" style={{ color: "var(--text)" }}>{it.meta}</span>
                  </div> */}

                  {/* Hover Action */}
                  <motion.div 
                    className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredIndex === idx ? 1 : 0 }}
                  >
                    <span className="text-xs font-medium" style={{ color: "var(--accent)" }}>Explore</span>
                    <ArrowRight className="h-3 w-3" style={{ color: "var(--accent)" }} />
                  </motion.div>
                </motion.div>
              </div>

              {/* Bottom accent line */}
              <motion.div 
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 rounded-full bg-gradient-to-r"
                style={{ 
                  background: `linear-gradient(90deg, ${it.color.split(' ')[0]}, ${it.color.split(' ')[2] || it.color.split(' ')[1]})`,
                  width: hoveredIndex === idx ? '60%' : '0%',
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Browse Categories Button */}
        {/* <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <button
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] text-white font-semibold shadow-xl hover:shadow-2xl transition-all hover:scale-105"
          >
            <span>Browse All Categories</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <p className="mt-4 text-sm" style={{ color: "var(--text-muted)" }}>
            50+ unique experiences waiting for you
          </p>
        </motion.div> */}
      </div>
    </section>
  );
}