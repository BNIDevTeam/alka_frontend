
"use client";

import React, { useMemo, useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import content from "@/app/content/teamContent";

// ✅ Slider (Swiper)
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

function cx(...c) {
  return c.filter(Boolean).join(" ");
}

function Doodle({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 220 140"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 30c14 10 28 10 42 0M140 24c16 10 32 10 48 0"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        opacity=".55"
      />
      <path
        d="M168 52c12 6 14 18 7 30-8 13-22 18-40 15"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        opacity=".45"
      />
      <path
        d="M44 90c12-12 24-12 36 0M34 114c18 8 36 8 54 0"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        opacity=".45"
      />
    </svg>
  );
}

function Polaroid({
  src,
  alt,
  index = 1,
  rotate = -6,
  tag,
  className = "",
  style,
  isActive = false,
}) {
  return (
    <motion.div
      className={cx(
        "absolute rounded-[18px] shadow-[0_18px_35px_rgba(0,0,0,0.18)]",
        className,
      )}
      style={{
        transform: `rotate(${rotate}deg)`,
        background: "var(--surface)",
        border: "1px solid var(--border)",
        ...style,
      }}
      whileHover={{ scale: 1.02, rotate: rotate + 1, zIndex: 30 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      animate={isActive ? { scale: 1.05, zIndex: 40 } : {}}
    >
      {/* tiny index */}
      <div
        className="absolute left-3 top-2 text-[10px] font-semibold tracking-widest"
        style={{ color: "var(--text-muted)" }}
      >
        {String(index).padStart(2, "0")}
      </div>

      <div
        className="m-3 overflow-hidden rounded-[14px]"
        style={{ background: "var(--surface-2)" }}
      >
        <div className="relative h-[150px] w-[160px] sm:h-[175px] sm:w-[185px]">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-110"
            style={{
              filter:
                "saturate(1.15) contrast(1.05) brightness(1.02) sepia(0.08)",
            }}
            sizes="(max-width: 640px) 160px, 185px"
          />
        </div>
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            background:
              "radial-gradient(circle at 1px 1px, var(--text) 1px, transparent 0)",
            backgroundSize: "14px 14px",
          }}
        />
      </div>

      <div className="px-5 pb-4">
        <div
          className="text-[11px] font-semibold tracking-wide"
          style={{ color: "var(--text-muted)" }}
        >
          {tag || "Team"}
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Collage that stays INSIDE its box (no overflow outside).
 */
function PolaroidCollage({ people }) {
  const slots = [
    { left: "4%", top: "6%", r: -10 },
    { left: "28%", top: "2%", r: 7 },
    { left: "56%", top: "6%", r: -6 },
    { left: "74%", top: "22%", r: 9 },
    { left: "6%", top: "32%", r: 8 },
    { left: "32%", top: "28%", r: -7 },
    { left: "58%", top: "50%", r: 6 },
    { left: "10%", top: "58%", r: -6 },
    { left: "38%", top: "56%", r: 8 },
    { left: "66%", top: "54%", r: -8 },
    { left: "78%", top: "70%", r: 7 },
    { left: "14%", top: "78%", r: 9 },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative w-full overflow-hidden rounded-[28px] border backdrop-blur shadow-[0_18px_45px_rgba(0,0,0,0.08)]"
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.25]"
        style={{
          background:
            "radial-gradient(circle at 1px 1px, var(--text) 1px, transparent 0)",
          backgroundSize: "18px 18px",
        }}
      />
      <Doodle
        className="pointer-events-none absolute -right-8 top-6 h-24 w-44"
        style={{ color: "var(--text-muted)" }}
      />
      <Doodle
        className="pointer-events-none absolute -left-10 bottom-4 h-24 w-44 rotate-180"
        style={{ color: "var(--text-muted)" }}
      />

      <div className="relative h-[520px] sm:h-[560px]">
        {people.map((p, i) => {
          const slot = slots[i % slots.length];
          const cycle = Math.floor(i / slots.length);
          const nudgeX = (cycle % 2 === 0 ? 1 : -1) * cycle * 8;
          const nudgeY = cycle * 6;

          return (
            <Polaroid
              key={`${p.name}-${i}`}
              src={p.image}
              alt={p.name}
              index={i + 1}
              rotate={slot.r + (cycle % 2 === 0 ? 1 : -1)}
              tag={p.shortTag || p.role || p.group}
              style={{
                left: `calc(${slot.left} + ${nudgeX}px)`,
                top: `calc(${slot.top} + ${nudgeY}px)`,
                // boxShadow: isActive
                //   ? "0 28px 60px rgba(0,0,0,0.22)"
                //   : "0 18px 35px rgba(0,0,0,0.18)",
              }}
              className={cx(
                "transition-all duration-300",
                cycle === 0 ? "z-10" : cycle === 1 ? "z-[9]" : "z-[8]",
              )}
            />
          );
        })}
      </div>
    </motion.div>
  );
}

function ProfileSlide({ person, index, total, onBack, isActive }) {
  const rotate = index % 2 === 0 ? 4 : -3;

  return (
    <motion.div
      className="grid grid-cols-1 align-content-center text-center lg:grid-cols-2 lg:gap-4 lg:items-center min-h-[600px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      
     <motion.div
  className="max-w-xl mx-auto text-center flex flex-col items-center"
  initial={{ opacity: 0, x: -30 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6, delay: 0.1 }}
>
  <motion.button
    onClick={onBack}
    className="inline-flex items-center justify-center gap-2 text-xs font-semibold tracking-wider transition-colors group mb-6"
    style={{ color: "var(--text-muted)" }}
    whileHover={{ x: -5, color: "var(--text)" }}
    whileTap={{ scale: 0.95 }}
  >
    <span className="text-lg transform group-hover:-translate-x-1 transition-transform">
      ←
    </span>
    <span>BACK TO TEAM</span>
  </motion.button>

  <motion.h3
    className="mt-1 text-4xl sm:text-4xl font-extrabold leading-[0.95] flex flex-wrap items-baseline justify-center gap-x-3"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
  >
    <span style={{ color: "var(--accent)" }}>
      {String(person.name || "").toUpperCase().split(" ")[0]}
    </span>

    <span className="text-4xl sm:text-4xl" style={{ color: "var(--text)" }}>
      {String(person.name || "").toUpperCase().split(" ").slice(1).join(" ")}
    </span>
  </motion.h3>

  <motion.div
    className="mt-3 inline-block px-4 py-1.5 rounded-full text-sm font-medium"
    style={{
      background:
        "linear-gradient(135deg, var(--accent) 0%, var(--primary) 100%)",
      color: "white",
    }}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4, delay: 0.3 }}
  >
    {person.role}
  </motion.div>

  <motion.p
    className="pt-4 text-[18px] leading-relaxed whitespace-pre-line"
    style={{ color: "var(--text-muted)" }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.4 }}
  >
    {person.text ||
      "Dedicated to building awareness, inspiring learning, and creating positive community impact."}
  </motion.p>

  {person.tagline && (
    <motion.div
      className="mt-6 flex items-center justify-center gap-2 text-sm font-medium italic"
      style={{ color: "var(--text-muted)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="h-px w-6" style={{ background: "var(--border)" }} />
      {person.tagline}
    </motion.div>
  )}
</motion.div>

      {/* RIGHT POLAROID */}
      <motion.div
        className="relative flex justify-center"
        initial={{ opacity: 0, x: 20, rotate: rotate - 2 }}
        animate={{ opacity: 1, x: 0, rotate: rotate }}
        transition={{
          duration: 0.7,
          delay: 0.2,
          type: "spring",
          stiffness: 100,
        }}
      >
        <div className="relative group">
          <motion.div
            className="relative rounded-[24px] shadow-[0_25px_45px_rgba(0,0,0,0.2)]"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
            }}
            whileHover={{ scale: 1.02, rotate: rotate + 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Decorative elements */}
            <div className="absolute -left-4 -top-4 w-8 h-8 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--primary)] opacity-20 blur-md" />
            <div className="absolute -right-4 -bottom-4 w-8 h-8 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] opacity-20 blur-md" />

            <div
              className="absolute left-4 top-3 text-[10px] font-semibold tracking-widest"
              style={{ color: "var(--text-muted)" }}
            >
              {String(index).padStart(2, "0")}
            </div>

            <div
              className="m-4 overflow-hidden rounded-[16px]"
              style={{ background: "var(--surface-2)" }}
            >
              <div className="relative h-[260px] w-[260px] sm:h-[320px] sm:w-[320px]">
                {/* <Image
                  src={person.image}
                  alt={person.name}
                  fill
                  className="object-cover grayscale contrast-125 transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
                  sizes="(max-width: 640px) 260px, 320px"
                /> */}
                <Image
                  src={person.image}
                  alt={person.name}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110"
                  style={{
                    filter:
                      "saturate(1.18) contrast(1.06) brightness(1.02) sepia(0.06)",
                  }}
                  sizes="(max-width: 640px) 160px, 120px"
                />
              </div>
            </div>

            <div className="px-6 pb-5">
              <div
                className="text-sm font-semibold tracking-wide"
                style={{ color: "var(--text-muted)" }}
              >
                {person.role || "Team"}
              </div>
            </div>
          </motion.div>

          {/* Doodles */}
          {/* <Doodle
            className="pointer-events-none absolute -right-16 top-10 h-28 w-48 rotate-12"
            style={{ color: "var(--text-muted)" }}
          /> */}
          {/* <motion.div 
            className="pointer-events-none absolute -left-6 bottom-16 rotate-[6deg] text-xs font-semibold"
            style={{ color: "var(--text-muted)" }}
            animate={{ rotate: [6, 8, 6] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          >
            {person.scribble2 || "✦ visionary"}
          </motion.div> */}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function TeamSection() {
  const members = content.member || [];
  const trustees = content.trustee || [];

  const people = useMemo(
    () => [
      ...trustees.map((t) => ({ ...t, group: "Trustee" })),
      ...members.map((m) => ({ ...m, group: "Member" })),
    ],
    [members, trustees],
  );

  const total = people.length || 1;
  const [activeIndex, setActiveIndex] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [swiperInstance, setSwiperInstance] = useState(null);

  const handleExplore = () => {
    setShowIntro(false);
    setTimeout(() => {
      if (swiperInstance) {
        swiperInstance.slideTo(0);
      }
    }, 100);
  };

  const handleBack = () => {
    setShowIntro(true);
  };

  return (
    <section
      className="relative overflow-hidden py-16 sm:py-24"
      style={{ background: "var(--surface)" }}
    >
      {/* Animated background */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          background:
            "radial-gradient(circle at 1px 1px, var(--text) 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
      />

      {/* Gradient orbs */}
      <div className="pointer-events-none absolute -left-20 top-20 h-64 w-64 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--primary)] opacity-5 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-20 h-64 w-64 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] opacity-5 blur-3xl" />

      <div className="container-page max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 relative">
        <AnimatePresence mode="wait">
          {showIntro ? (
            /* INTRO SLIDE */
            <motion.div
              key="intro"
              className="grid gap-10 lg:grid-cols-2 lg:items-start min-h-[600px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* LEFT TEXT */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* <motion.div 
                  className="text-[12px] font-semibold tracking-[0.22em]"
                  style={{ color: "var(--text-muted)" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  00/
                </motion.div> */}

                <div className="mt-10">
                  <motion.div
                    className="text-5xl sm:text-6xl font-semibold italic"
                    style={{ color: "var(--text)" }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Our
                  </motion.div>
                  <motion.div
                    className="text-6xl sm:text-7xl font-extrabold tracking-tight block mt-0 bg-gradient-to-r from-[var(--accent)] via-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    TEAM
                  </motion.div>
                </div>

                <motion.p
                  className="mt-8 max-w-full text-justify text-[16px] "
                  style={{ color: "var(--text-muted)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {content.description ||
                    "Meet the passionate individuals behind ALKA, dedicated to building awareness, inspiring learning, and creating positive community impact."}
                </motion.p>

                <motion.div
                  className="mt-12 flex items-center gap-4 cursor-pointer group"
                  onClick={handleExplore}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <span
                    className="text-sm font-semibold tracking-[0.18em] transition-colors"
                    style={{ color: "var(--text-muted)" }}
                  >
                    MEET THE TEAM
                  </span>
                  <motion.span
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border shadow-md group-hover:shadow-lg transition-all"
                    style={{
                      background: "var(--surface)",
                      borderColor: "var(--border)",
                      color: "var(--text)",
                    }}
                    whileHover={{ scale: 1.1, rotate: 0 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-xl">→</span>
                  </motion.span>
                </motion.div>
              </motion.div>

              {/* RIGHT COLLAGE */}
              <PolaroidCollage people={people} />
            </motion.div>
          ) : (
            /* TEAM MEMBER SLIDES */
            <motion.div
              key="slides"
              className="relative px-20" // Increased padding to accommodate buttons without overlap
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Custom Navigation Buttons - positioned with more space */}
              <button
                className="absolute -left-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110 group focus:outline-none"
                style={{
                  background: "var(--surface)",
                  color: "var(--text-muted)",
                  border: "1px solid var(--border)",
                }}
                onClick={() => swiperInstance?.slidePrev()}
                aria-label="Previous slide"
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--accent)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-muted)")
                }
              >
                <span className="transform group-hover:-translate-x-0.5 transition-transform">
                  ←
                </span>
              </button>

              <button
                className="absolute -right-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110 group focus:outline-none"
                style={{
                  background: "var(--surface)",
                  color: "var(--text-muted)",
                  border: "1px solid var(--border)",
                }}
                onClick={() => swiperInstance?.slideNext()}
                aria-label="Next slide"
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--accent)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-muted)")
                }
              >
                <span className="transform group-hover:translate-x-0.5 transition-transform">
                  →
                </span>
              </button>

              {/* Container for slider with inner padding for content */}
              <div className="relative">
                <Swiper
                  modules={[Navigation, Pagination, A11y, EffectFade]}
                  slidesPerView={1}
                  spaceBetween={0}
                  effect="fade"
                  fadeEffect={{ crossFade: true }}
                  speed={800}
                  onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                  onSwiper={setSwiperInstance}
                  className="team-slider"
                >
                  {people.map((person, idx) => (
                    <SwiperSlide key={`${person.name}-${idx}`}>
                      <ProfileSlide
                        person={person}
                        index={idx + 1}
                        total={total}
                        onBack={handleBack}
                        isActive={activeIndex === idx}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Custom Pagination */}
              <div className="flex justify-center gap-2 mt-8">
                {people.map((_, idx) => (
                  <button
                    key={idx}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeIndex === idx ? "w-8" : "w-2 hover:w-3"
                    }`}
                    style={{
                      background:
                        activeIndex === idx ? "var(--accent)" : "var(--border)",
                    }}
                    onClick={() => swiperInstance?.slideTo(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        .team-slider {
          overflow: visible !important;
        }
        .team-slider .swiper-wrapper {
          overflow: visible;
        }
        .team-slider .swiper-slide {
          opacity: 0 !important;
          transition: opacity 0.8s ease !important;
        }
        .team-slider .swiper-slide-active {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
}
