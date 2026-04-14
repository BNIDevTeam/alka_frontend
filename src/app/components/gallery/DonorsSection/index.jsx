"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import donorsContent from "@/app/content/home.donors";
import Link from "next/link";
import {
  Sparkles,
  HeartHandshake,
  Star,
  Award,
  ChevronRight,
} from "lucide-react";

export default function DonorsSection() {
  const donors = useMemo(() => donorsContent?.donors || [], []);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
    <section className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Gradient orbs */}
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
          className="absolute -left-20 top-20 w-64 h-64 rounded-full bg-gradient-to-r from-[var(--accent)]/10 to-transparent blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 15,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute -right-20 bottom-20 w-80 h-80 rounded-full bg-gradient-to-r from-[var(--primary)]/10 to-transparent blur-3xl"
        />

        {/* Floating geometric shapes */}
        <div className="absolute top-40 left-10 w-20 h-20 border border-[var(--accent)]/20 rounded-3xl rotate-12" />
        <div className="absolute bottom-40 right-10 w-32 h-32 border border-[var(--primary)]/20 rounded-full" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, var(--text) 2px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="container-page max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          

          <h2 className="mt-6 font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="block" style={{ color: "var(--text)" }}>
              {donorsContent.title}
            </span>
          </h2>

          <p
            className="mt-4 text-base sm:text-lg max-w-full mx-auto"
            style={{ color: "var(--text-muted)" }}
          >
            {donorsContent.subtitle}
          </p>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mx-auto mt-6 h-1 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--primary)]"
          />
        </motion.div>

        {/* Donors Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8"
        >
          {donors.map((donor, index) => (
            <motion.div
              key={donor.name}
              variants={itemVariants}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="group relative"
            >
              <Link
                href={donor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block cursor-pointer"
                aria-label={`Open ${donor.name}`}
              >
                {/* Glow effect on hover */}
                <motion.div
                  className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle, var(--${
                      index % 2 === 0 ? "accent" : "primary"
                    }) 0%, transparent 70%)`,
                    filter: "blur(20px)",
                  }}
                />

                {/* Main card */}
                <div
                  className="relative overflow-hidden rounded-3xl p-6 shadow-xl transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {/* Animated gradient border */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background:
                        "linear-gradient(90deg, var(--accent), var(--primary), var(--gold))",
                      padding: "2px",
                    }}
                  >
                    <div
                      className="w-full h-full rounded-3xl"
                      style={{ background: "var(--surface)" }}
                    />
                  </motion.div>
                  {/* Top accent line with animation */}
                  <motion.div
                    className="absolute left-0 top-0 h-1 w-full"
                    style={{
                      background:
                        "linear-gradient(90deg, var(--accent), var(--primary), var(--gold))",
                      backgroundSize: "200% 100%",
                    }}
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      ease: "linear",
                    }}
                  />
                  {/* Decorative corner elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[var(--accent)]/10 to-transparent rounded-bl-3xl" />
                  <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-[var(--primary)]/10 to-transparent rounded-tr-3xl" />
                  {/* Logo container */}
                  <div className="relative mb-5">
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/5 to-[var(--primary)]/5 rounded-2xl blur-xl" />
                    <div
                      className="relative h-28 w-full rounded-2xl flex items-center justify-center p-4"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(var(--surface-2-rgb), 0.8), rgba(var(--surface-rgb), 0.9))",
                        border: "1px solid var(--border)",
                        boxShadow: "0 10px 30px -15px rgba(0,0,0,0.2)",
                      }}
                    >
                      <div className="relative h-16 w-[140px] bg-white rounded-lg">
                        <Image
                          src={donor.logo}
                          alt={`${donor.name} logo`}
                          fill
                          className="object-contain transition-transform duration-500 group-hover:scale-110 p-1 "
                          sizes="140px"
                        />
                      </div>
                    </div>

                    {/* Floating badge */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: hoveredIndex === index ? 1 : 0 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] flex items-center justify-center shadow-lg"
                    >
                      <Award className="h-4 w-4 text-white" />
                    </motion.div>
                  </div>
                  {/* Donor info */}
                  {/* Donor info */}
                  <div className="relative text-center">
                    {/* <div className="mb-2 flex items-center justify-center">
                      <h3
                        className="text-lg font-extrabold"
                        style={{ color: "var(--text)" }}
                      >
                        {donor.name}
                      </h3>
                    </div> */}

                    <div
                      className="flex items-center justify-center gap-2 text-xm"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <HeartHandshake
                        className="h-3 w-3"
                        style={{ color: "var(--accent)" }}
                      />
                      <span>Proud supporter of ALKA</span>
                    </div>

                    {/* Contribution level indicator */}
                    <motion.div
                      className="mt-3 h-1 rounded-full overflow-hidden"
                      style={{ background: "var(--surface-2)" }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background:
                            "linear-gradient(90deg, var(--accent), var(--primary))",
                        }}
                        initial={{ width: "0%" }}
                        animate={{
                          width: hoveredIndex === index ? "100%" : "0%",
                        }}
                        transition={{ duration: 0.5 }}
                      />
                    </motion.div>
                  </div>
                  
                  {/* Hover action indicator */}
                  <motion.div
                    className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{ x: hoveredIndex === index ? 0 : 10 }}
                  >
                    <div
                      className="flex items-center gap-1 text-xs font-medium"
                      style={{ color: "var(--accent)" }}
                    >
                      <span>View</span>
                      <ChevronRight className="h-3 w-3" />
                    </div>
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced footer note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="relative inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-[var(--success)] to-[var(--accent)] rounded-full blur opacity-20" />
            <div
              className="relative inline-flex items-center gap-3 rounded-full px-8 py-4 shadow-xl backdrop-blur-sm"
              style={{
                background: "rgba(var(--surface-rgb), 0.9)",
                border: "1px solid rgba(var(--success-rgb), 0.3)",
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <HeartHandshake
                  className="h-5 w-5"
                  style={{ color: "var(--success)" }}
                />
              </motion.div>
              <span
                className="text-sm font-bold"
                style={{ color: "var(--text)" }}
              >
                Thank you for helping us create real impact.
              </span>
              <Sparkles
                className="h-4 w-4"
                style={{ color: "var(--accent)" }}
              />
            </div>
          </div>

          {/* Impact counter */}
          {/* <div className="mt-6 flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--accent)]" />
              <span style={{ color: "var(--text-muted)" }}>25+ Corporate Partners</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--primary)]" />
              <span style={{ color: "var(--text-muted)" }}>100+ Individual Donors</span>
            </div>
          </div> */}
        </motion.div>
      </div>
    </section>
  );
}
