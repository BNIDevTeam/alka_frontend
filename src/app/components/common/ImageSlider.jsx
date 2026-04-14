"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles, Heart, Eye, Pause, Play } from "lucide-react";

export default function ImageSlider({ images = [], alts = [], tags = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayRef = useRef(null);

  // Ensure we have valid arrays
  const safeImages = Array.isArray(images) ? images : [];
  const safeAlts = Array.isArray(alts) ? alts : [];
  const safeTags = Array.isArray(tags) ? tags : [];

  // If no images, show placeholder
  if (safeImages.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
          <p className="text-gray-500">No images available</p>
        </div>
      </div>
    );
  }

  const slides = safeImages.map((src, idx) => ({
    src,
    alt: safeAlts[idx] || `Image ${idx + 1}`,
    tag: safeTags[idx] || ["Community", "Education", "Awareness", "Kindness"][idx % 4],
  }));

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && !isHovered && slides.length > 1) {
      autoPlayRef.current = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % slides.length);
      }, 4000);
    }
    return () => clearInterval(autoPlayRef.current);
  }, [isAutoPlaying, isHovered, slides.length]);

  const handlePrevious = () => {
    if (slides.length <= 1) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const handleNext = () => {
    if (slides.length <= 1) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5,
      },
    }),
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Main Slider Container */}
      <div
        className="relative rounded-3xl overflow-hidden shadow-2xl group"
        style={{
          boxShadow: "0 30px 60px -15px rgba(var(--accent-rgb), 0.3)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-[var(--surface-2)] to-[var(--surface)]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
            >
              <Image
                src={slides[currentIndex].src}
                alt={slides[currentIndex].alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 600px"
                priority
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[var(--accent)] to-transparent opacity-20 blur-2xl" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[var(--primary)] to-transparent opacity-20 blur-2xl" />
            </motion.div>
          </AnimatePresence>

          {/* Floating Tag */}
          <motion.div
            className="absolute top-6 left-6 z-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-2xl backdrop-blur-md"
              style={{
                background: "rgba(0,0,0,0.3)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="h-2 w-2 rounded-full"
                style={{ background: "var(--accent)" }}
              />
              {slides[currentIndex].tag}
            </div>
          </motion.div>

          {/* Slide Counter */}
          <div className="absolute top-6 right-6 z-10">
            <div
              className="rounded-full px-4 py-2 text-sm font-bold text-white backdrop-blur-md"
              style={{
                background: "rgba(0,0,0,0.3)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <span style={{ color: "var(--accent)" }}>{currentIndex + 1}</span>
              <span className="mx-1 text-white/50">/</span>
              <span className="text-white/80">{slides.length}</span>
            </div>
          </div>

          {/* Image Stats */}
          <motion.div
            className="absolute bottom-6 left-6 right-6 z-10 flex items-center justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Heart className="h-4 w-4 text-white/80" />
                <span className="text-sm font-medium text-white">234</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Eye className="h-4 w-4 text-white/80" />
                <span className="text-sm font-medium text-white">1.2k</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Sparkles className="h-4 w-4 text-[var(--accent)]" />
              <span className="text-sm font-medium text-white">Featured</span>
            </div>
          </motion.div>
        </div>

        {/* Navigation Buttons - Only show if more than 1 slide */}
        {slides.length > 1 && (
          <>
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 z-20">
              <motion.button
                onClick={handlePrevious}
                className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md shadow-xl flex items-center justify-center group/btn"
                style={{
                  border: "1px solid rgba(255,255,255,0.3)",
                  boxShadow: "0 10px 25px -5px rgba(0,0,0,0.3)",
                }}
                whileHover={{
                  scale: 1.1,
                  background: "linear-gradient(135deg, var(--accent), var(--primary))",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <ChevronLeft className="h-6 w-6 text-gray-800 group-hover/btn:text-white transition-colors" />
              </motion.button>

              <motion.button
                onClick={handleNext}
                className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md shadow-xl flex items-center justify-center group/btn"
                style={{
                  border: "1px solid rgba(255,255,255,0.3)",
                  boxShadow: "0 10px 25px -5px rgba(0,0,0,0.3)",
                }}
                whileHover={{
                  scale: 1.1,
                  background: "linear-gradient(135deg, var(--accent), var(--primary))",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <ChevronRight className="h-6 w-6 text-gray-800 group-hover/btn:text-white transition-colors" />
              </motion.button>
            </div>

            {/* Auto-play Control */}
            <motion.button
              onClick={toggleAutoPlay}
              className="absolute bottom-20 right-6 z-20 w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center"
              style={{
                border: "1px solid rgba(255,255,255,0.2)",
              }}
              whileHover={{ scale: 1.1, background: "rgba(0,0,0,0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              {isAutoPlaying ? (
                <Pause className="h-4 w-4 text-white" />
              ) : (
                <Play className="h-4 w-4 text-white" />
              )}
            </motion.button>
          </>
        )}
      </div>

      {/* Thumbnail Navigation - Only show if more than 1 slide */}
      {slides.length > 1 && (
        <div className="mt-6 flex justify-center gap-3">
          {slides.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
                setIsAutoPlaying(false);
                setTimeout(() => setIsAutoPlaying(true), 5000);
              }}
              className="relative rounded-lg overflow-hidden"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className={`w-16 h-16 rounded-lg border-2 transition-all duration-300 ${
                  idx === currentIndex
                    ? "border-[var(--accent)] shadow-xl scale-110"
                    : "border-transparent opacity-50 hover:opacity-80"
                }`}
                style={{
                  boxShadow: idx === currentIndex ? "0 10px 25px -5px var(--accent)" : "none",
                }}
              >
                <Image
                  src={slides[idx].src}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              {idx === currentIndex && (
                <motion.div
                  layoutId="activeDot"
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full"
                  style={{ background: "var(--accent)" }}
                />
              )}
            </motion.button>
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {slides.length > 1 && (
        <div className="mt-6 relative h-1 bg-gray-200/20 rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, var(--accent), var(--primary))",
            }}
            initial={{ width: "0%" }}
            animate={{ width: `${((currentIndex + 1) / slides.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      )}
    </div>
  );
}