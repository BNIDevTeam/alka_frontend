"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import overviewContent from "@/app/content/home.overview";
import {
  ArrowRight,
  Sparkles,
  Users,
  FolderKanban,
  Megaphone,
  Network,
  HeartHandshake,
  GraduationCap,
  BookOpen,
  HandHeart,
  PenLine,
  Target,
  Globe,
  Award,
  TrendingUp,
  ChevronRight,
  Leaf,
  Sun,
  Droplets,
} from "lucide-react";

const statIconMap = {
  users: <Users className="h-5 w-5" />,
  projects: <FolderKanban className="h-5 w-5" />,
  action: <Megaphone className="h-5 w-5" />,
  partners: <Network className="h-5 w-5" />,
  impact: <Target className="h-5 w-5" />,
  reach: <Globe className="h-5 w-5" />,
  recognition: <Award className="h-5 w-5" />,
  growth: <TrendingUp className="h-5 w-5" />,
};

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Overview() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredStat, setHoveredStat] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const stats = overviewContent.stats || [];
  const donate = overviewContent.donateBar || {};
  const primary = overviewContent.cta?.primary;
  const secondary = overviewContent.cta?.secondary;

  // Need 4 tiles; if only 2 images exist, reuse them
  const imgs = overviewContent.images || [];
  const alts = overviewContent.imageAlts || [];
  const tags = overviewContent.collageTags || [
    "Community",
    "Education",
    "Awareness",
    "Kindness",
  ];

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const imgAt = (i) => imgs[i] || imgs[i % Math.max(imgs.length, 1)];
  const altAt = (i) =>
    alts[i] || alts[i % Math.max(alts.length, 1)] || `Overview image ${i + 1}`;
  const tagAt = (i) => tags[i] || tags[i % Math.max(tags.length, 1)];

  return (
    <motion.section
      ref={sectionRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className="section relative overflow-hidden mb-0 py-20 sm:py-24 lg:py-28"
    >
      {/* Premium background with gradient and texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--surface)] via-[var(--surface)] to-[var(--surface-2)]" />

      {/* Animated background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Large gradient orbs with parallax */}
        <motion.div
          animate={{
            x: mousePosition.x * 50,
            y: mousePosition.y * 50,
          }}
          transition={{ type: "spring", stiffness: 30, damping: 20 }}
          className="absolute -left-20 -top-20 h-[600px] w-[600px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(var(--accent-rgb), 0.2) 0%, transparent 70%)",
          }}
        />

        <motion.div
          animate={{
            x: mousePosition.x * -40,
            y: mousePosition.y * -40,
          }}
          transition={{ type: "spring", stiffness: 30, damping: 20 }}
          className="absolute -right-20 -bottom-20 h-[700px] w-[700px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(var(--primary-rgb), 0.15) 0%, transparent 70%)",
          }}
        />

        {/* Geometric patterns */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute top-20 left-10 w-40 h-40 border border-[var(--accent)]/20 rounded-full" />
          <div className="absolute bottom-20 right-10 w-60 h-60 border border-[var(--primary)]/20 rounded-full" />
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--text) 1px, transparent 0)`,
            backgroundSize: "50px 50px",
            opacity: 0.02,
          }}
        />

        {/* Animated lines */}
        <svg className="absolute inset-0 w-full h-full">
          <motion.path
            d="M0,100 Q200,50 400,100 T800,100"
            stroke="var(--accent)"
            strokeWidth="0.5"
            fill="none"
            strokeDasharray="5,5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.1 }}
            transition={{ duration: 3, delay: 0.5 }}
          />
          <motion.path
            d="M0,300 Q300,350 600,300 T1200,300"
            stroke="var(--primary)"
            strokeWidth="0.5"
            fill="none"
            strokeDasharray="5,5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.1 }}
            transition={{ duration: 3, delay: 1 }}
          />
        </svg>
      </div>

      {/* ===== Watermark Background Icons (Animated) ===== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: [-12, -8, -12],
            scale: [1, 1.1, 1],
            x: mousePosition.x * 10,
            y: mousePosition.y * 10,
          }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        >
          <BookOpen
            className="absolute -left-5 top-10 h-32 w-32"
            style={{ color: "var(--accent)", opacity: 0.03 }}
          />
        </motion.div>

        <motion.div
          animate={{
            rotate: [-5, 0, -5],
            scale: [1, 1.1, 1],
            x: mousePosition.x * -15,
            y: mousePosition.y * -15,
          }}
          transition={{ repeat: Infinity, duration: 10, delay: 1 }}
        >
          <GraduationCap
            className="absolute right-0 top-40 h-32 w-32"
            style={{ color: "var(--primary)", opacity: 0.03 }}
          />
        </motion.div>

        <motion.div
          animate={{
            rotate: [8, 12, 8],
            scale: [1, 1.1, 1],
            x: mousePosition.x * 20,
            y: mousePosition.y * 20,
          }}
          transition={{ repeat: Infinity, duration: 9, delay: 2 }}
        >
          <HandHeart
            className="absolute left-1/4 bottom-20 h-32 w-32"
            style={{ color: "var(--success)", opacity: 0.02 }}
          />
        </motion.div>

        <motion.div
          animate={{
            rotate: [18, 22, 18],
            scale: [1, 1.1, 1],
            x: mousePosition.x * -20,
            y: mousePosition.y * -20,
          }}
          transition={{ repeat: Infinity, duration: 7, delay: 0.5 }}
        >
          <PenLine
            className="absolute right-1/4 top-60 h-32 w-32"
            style={{ color: "var(--gold)", opacity: 0.02 }}
          />
        </motion.div>
      </div>

      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-10 relative">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-center">
          {/* Left Content - Enhanced */}
          <motion.div variants={fadeInLeft} className="lg:col-span-6">
            {/* <div className="flex items-center gap-3 flex-wrap mb-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold backdrop-blur-md"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(var(--accent-rgb), 0.1), rgba(var(--primary-rgb), 0.1))",
                  border: "1px solid rgba(var(--accent-rgb), 0.2)",
                  color: "var(--text)",
                  boxShadow: "0 8px 20px -8px var(--accent)",
                }}
              >
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: "var(--accent)" }}
                />
                Our Purpose
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="inline-flex items-center gap-1 rounded-full px-4 py-2 text-xs font-semibold backdrop-blur-md"
                style={{
                  background: "rgba(0,0,0,0.02)",
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                }}
              >
                <Sparkles
                  className="h-3.5 w-3.5"
                  style={{ color: "var(--accent)" }}
                />
                Purpose-led
              </motion.div>
            </div> */}

            <motion.h2
              variants={fadeInUp}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.1] font-bold"
            >
              <span className="block" style={{ color: "var(--text)" }}>
                {overviewContent.title.split(" ")[0]}
              </span>
              <span className="block mt-0 bg-gradient-to-r from-[var(--accent)] via-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
                {overviewContent.title.split(" ").slice(1).join(" ")}
              </span>
            </motion.h2>

            <motion.div
              variants={fadeInUp}
              className="mt-8 flex items-center gap-4"
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "6rem" }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-1 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--primary)]"
              />
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "3rem" }}
                transition={{ duration: 1, delay: 0.8 }}
                className="h-1 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] opacity-40"
              />
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="mt-8 text-lg text-justify leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              {overviewContent.paragraphs?.[0]}
            </motion.p>

            {(primary || secondary) && (
              <motion.div
                variants={fadeInUp}
                className="mt-10 flex flex-wrap items-center gap-4"
              >
                {primary && (
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href={primary.href}
                      className="group relative inline-flex h-14 items-center gap-3 rounded-xl px-8 font-semibold text-white overflow-hidden shadow-xl"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--accent) 0%, var(--primary) 100%)",
                        boxShadow: "0 15px 30px -10px var(--accent)",
                      }}
                    >
                      <motion.span
                        className="absolute inset-0 bg-white"
                        initial={{ opacity: 0, x: "-100%" }}
                        whileHover={{ opacity: 0.2, x: "100%" }}
                        transition={{ duration: 0.5 }}
                      />
                      <span className="relative z-10 flex items-center gap-2" style={{color: "rgba(255,255,255,0.92)" }}>
                        {primary.label}
                        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </motion.div>
                )}

                {secondary && (
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href={secondary.href}
                      className="group relative h-14 px-8 text-sm font-semibold rounded-xl overflow-hidden flex items-center gap-2"
                      style={{
                        border: "1px solid var(--border)",
                        color: "var(--text)",
                        background: "var(--surface)",
                      }}
                    >
                      <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-[var(--accent)] to-[var(--primary)]"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 0.1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <span className="relative z-10 flex items-center gap-2">
                        {secondary.label}
                      </span>
                    </Link>
                  </motion.div>
                )}
              </motion.div>
            )}
          </motion.div>

          {/* Right: Enhanced Animated Collage with Larger Images */}
          {/* Right: Single Brush Image (like uploaded design) */}
          <motion.div variants={fadeInRight} className="lg:col-span-6">
            <div className="lg:flex lg:justify-end">
              <div className="w-full lg:max-w-[640px] xl:max-w-[720px]">
                <div className="relative h-[260px] sm:h-[340px] lg:h-[580px]">
                  <Image
                    src={overviewContent.heroImage}
                    alt={overviewContent.imageAlts?.[0] || "Hero image"}
                    fill
                    priority
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 720px"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ===== CENTER HEADING (only) ===== */}
        <motion.div variants={fadeInUp} className="mt-14 text-center">
          <h2
            className="text-4xl sm:text-5xl font-extrabold tracking-tight"
            style={{ color: "var(--text)" }}
          >
            <span className="font-extrabold">Find </span>{" "}
            <span className="font-extrabold">
              Clarity, Grow with Intention,
            </span>{" "}
            <span
              className="font-medium"
              style={{ color: "var(--text-muted)" }}
            >
              and live with kindness.
            </span>
          </h2>
        </motion.div>

        {/* ===== BOTTOM TILTED CARDS ===== */}
        <motion.div variants={fadeInUp} className="mt-12">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
            {[0, 1, 2, 3].map((i) => {
              const rotations = [-8, -3, 3, 8];
              const lifts = [6, 2, 2, 6];

              return (
                <div
                  key={i}
                  className="relative"
                  style={{
                    transform: `rotate(${rotations[i]}deg) translateY(${lifts[i]}px)`,
                  }}
                >
                  <div
                    className="relative overflow-hidden rounded-3xl border"
                    style={{
                      background: "var(--surface)",
                      borderColor: "var(--border)",
                      boxShadow: "0 24px 50px rgba(0,0,0,0.10)",
                    }}
                  >
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={imgAt(i)}
                        alt={altAt(i)}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 50vw, 25vw"
                      />
                      {/* soft top gloss like reference */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to bottom, rgba(255,255,255,0.16), transparent 45%)",
                        }}
                      />
                    </div>

                    {/* label */}
                    {/* <div className="absolute inset-0 grid place-items-center">
                      <div
                        className="px-4 py-1.5 rounded-full text-xs font-semibold"
                        style={{
                          background: "rgba(0,0,0,0.30)",
                          color: "white",
                          border: "1px solid rgba(255,255,255,0.20)",
                          backdropFilter: "blur(10px)",
                        }}
                      >
                        {tagAt(i)}
                      </div>
                    </div> */}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ===== Stats row with enhanced styling ===== */}
        {stats.length > 0 && (
          <motion.div
            variants={fadeInUp}
            className="mt-20 overflow-hidden rounded-3xl"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              boxShadow: "0 30px 60px -30px rgba(0,0,0,0.3)",
            }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[var(--border)]">
              {stats.map((s, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onHoverStart={() => setHoveredStat(idx)}
                  onHoverEnd={() => setHoveredStat(null)}
                  className="px-6 py-8 sm:px-8 sm:py-10 flex items-center gap-4 cursor-default"
                  style={{
                    background:
                      hoveredStat === idx
                        ? "linear-gradient(135deg, rgba(var(--accent-rgb), 0.05), rgba(var(--primary-rgb), 0.05))"
                        : "transparent",
                    transition: "background 0.3s ease",
                  }}
                >
                  <motion.span
                    animate={
                      hoveredStat === idx
                        ? {
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.15, 1],
                          }
                        : {}
                    }
                    transition={{ duration: 0.5 }}
                    className="inline-flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg"
                    style={{
                      background:
                        hoveredStat === idx
                          ? "linear-gradient(135deg, var(--accent) 0%, var(--primary) 100%)"
                          : "var(--surface-2)",
                      border: "1px solid var(--border)",
                      color: hoveredStat === idx ? "white" : "var(--text)",
                      boxShadow:
                        hoveredStat === idx
                          ? "0 15px 30px -10px var(--accent)"
                          : "none",
                    }}
                  >
                    {statIconMap[s.icon] || statIconMap.users}
                  </motion.span>

                  <div>
                    <motion.div
                      animate={
                        hoveredStat === idx ? { scale: 1.05 } : { scale: 1 }
                      }
                      className="text-2xl font-extrabold sm:text-3xl"
                      style={{ color: "var(--text)" }}
                    >
                      {s.value}
                    </motion.div>
                    <div
                      className="text-sm"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {s.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ===== Donate bar with premium styling ===== */}
        <motion.div
          variants={fadeInUp}
          whileHover={{ y: -4 }}
          className="mt-16 rounded-3xl p-8 sm:p-10 backdrop-blur-md"
          style={{
            background:
              "linear-gradient(135deg, rgba(34,197,94,0.08), rgba(16,185,129,0.05))",
            border: "1px solid rgba(34,197,94,0.2)",
            boxShadow: "0 30px 50px -30px rgba(34,197,94,0.4)",
          }}
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-6">
              <motion.span
                whileHover={{ rotate: [0, -15, 15, 0], scale: 1.15 }}
                transition={{ duration: 0.5 }}
                className="inline-flex h-16 w-16 items-center justify-center rounded-2xl shadow-xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(34,197,94,0.15), rgba(16,185,129,0.1))",
                  border: "1px solid rgba(34,197,94,0.3)",
                }}
              >
                <HeartHandshake
                  className="h-8 w-8"
                  style={{ color: "var(--success)" }}
                />
              </motion.span>

              <div>
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl font-extrabold sm:text-3xl bg-gradient-to-r from-[var(--success)] to-[var(--accent)] bg-clip-text text-transparent"
                  
                >
                  {donate.title || "Make a difference today"}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-3 text-base leading-relaxed max-w-xl"
                  style={{ color: "var(--text-muted)" }}
                >
                  {donate.desc ||
                    "Your contribution powers education, care, and community-led initiatives where it matters most."}
                </motion.p>
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href={donate.href || secondary?.href || "/donation"}
                className="group relative inline-flex h-16 items-center justify-center gap-3 rounded-2xl px-10 font-bold text-white overflow-hidden shadow-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, var(--accent) 0%, var(--primary) 100%)",
                  boxShadow: "0 20px 40px -15px var(--accent)",
                  color: "rgba(255,255,255,0.92)"
                }}
              >
                <motion.span
                  className="absolute inset-0 bg-white"
                  initial={{ opacity: 0, x: "-100%" }}
                  whileHover={{ opacity: 0.2, x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative z-10 flex items-center gap-2 text-lg">
                  {donate.buttonLabel || "Donate Now"}
                  <motion.div
                    animate={{ x: [0, 6, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      repeatType: "reverse",
                    }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Animated progress bar */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "75%" }}
            transition={{ duration: 1.5, delay: 1 }}
            className="mt-8 h-2 rounded-full bg-gradient-to-r from-[var(--success)] via-[var(--accent)] to-[var(--primary)]"
            style={{ opacity: 0.2 }}
          />
        </motion.div>
      </div>
    </motion.section>
  );
}
