// import alkaCards from "@/app/content/home.alkaCards";

// function toneBg(tone) {
//   switch (tone) {
//     case "danger":
//       return "var(--danger)";
//     case "accent":
//       return "var(--accent)";
//     case "gold":
//       return "var(--gold)";
//     case "success":
//       return "var(--success)";
//     case "primary":
//     default:
//       return "var(--primary)";
//   }
// }

// function toneSoft(tone) {
//   const bg = toneBg(tone);
//   return `color-mix(in oklab, ${bg}, white 90%)`;
// }

// export default function AlkaCards() {
//   return (
//     <section className="relative z-20">
//       {/* Overlap Hero */}
//       <div className="-mt-16 sm:-mt-20 lg:-mt-24">
//         <div className="container-page">

//           {/* Cards */}
//           <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
//             {alkaCards.items.map((c, idx) => {
//               const bg = toneBg(c.tone);

//               return (
//                 <div
//                   key={c.key}
//                   className="group relative overflow-hidden rounded-3xl border p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg sm:p-6"
//                   style={{
//                     borderColor: "var(--border)",
//                     background: "var(--surface)",
//                   }}
//                 >
//                   {/* top accent */}
//                   <div className="absolute left-0 top-0 h-1 w-full" style={{ background: bg }} />

//                   {/* subtle corner tint */}
//                   <div
//                     className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition duration-500 group-hover:opacity-30"
//                     style={{ background: bg }}
//                   />

//                   {/* number + icon bubble */}
//                   <div className="flex items-start justify-between gap-3">
//                     <div
//                       className="inline-flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-extrabold"
//                       style={{
//                         background: toneSoft(c.tone),
//                         border: "1px solid color-mix(in oklab, var(--border), transparent 0%)",
//                         color: "rgba(15,23,42,0.85)",
//                       }}
//                     >
//                       {String(idx + 1).padStart(2, "0")}
//                     </div>

//                     <div
//                       className="rounded-full px-3 py-1 text-[11px] font-bold"
//                       style={{
//                         background: "var(--surface-2)",
//                         border: "1px solid var(--border)",
//                         color: "var(--text-muted)",
//                       }}
//                     >
//                       {c.title}
//                     </div>
//                   </div>

//                   <h3 className="mt-4 font-serif text-2xl leading-tight">{c.title}</h3>
//                   <div className="mt-3 h-1 w-14 rounded-full" style={{ background: bg }} />

//                   <p className="p-muted mt-4 text-sm text-justify leading-relaxed">
//                     {c.desc}
//                   </p>

//                   {/* bottom micro-row */}
//                   <div className="mt-6 flex items-center justify-between text-xs">
//                     <span style={{ color: "var(--text-muted)" }}>ALKA</span>
//                     <span
//                       className="inline-flex items-center gap-1 font-semibold"
//                       style={{ color: "var(--text)" }}
//                     >
//                       Learn more <span aria-hidden="true">→</span>
//                     </span>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {/* Optional: small shadow separator */}
//           <div className="pointer-events-none mt-6 h-6 rounded-3xl opacity-40 blur-2xl"
//                style={{ background: "rgba(0,0,0,0.15)" }}
//           />
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import alkaCards from "@/app/content/home.alkaCards";
import {
  ArrowRight,
  Sparkles,
  Heart,
  Target,
  Award,
  Star,
  Zap,
} from "lucide-react";
import Link from "next/link";


const MotionLink = motion(Link);

function toneBg(tone) {
  switch (tone) {
    case "danger":
      return "var(--danger)";
    case "accent":
      return "var(--alka2)";
    case "gold":
      return "var(--alka3)";
    case "success":
      return "var(--alka4)";
    case "primary":
    default:
      return "var(--alka1)";
  }
}

function toneSoft(tone) {
  const bg = toneBg(tone);
  return `color-mix(in oklab, ${bg}, white 10%)`;
}

function getIcon(tone) {
  switch (tone) {
    case "danger":
      return <Heart className="h-4 w-4" />;
    case "accent":
      return <Zap className="h-4 w-4" />;
    case "gold":
      return <Award className="h-4 w-4" />;
    case "success":
      return <Target className="h-4 w-4" />;
    default:
      return <Star className="h-4 w-4" />;
  }
}

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export default function AlkaCards() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  // Parallax effect for background
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

  return (
    <motion.section
      ref={sectionRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
    //   className="relative z-30 overflow-visible bg-gradient-to-b from-[var(--surface)] to-[var(--surface-2)] pt-16 pb-0 sm:pt-20 sm:pb-0"
    className="relative z-30 pt-16 pb-0 sm:pt-20 sm:pb-0"
    >
    
      
      <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
        {/* Gradient orbs with parallax */}
        <motion.div
          animate={{
            x: mousePosition.x * 30,
            y: mousePosition.y * 30,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 30 }}
          className="absolute -left-20 -top-20 h-[400px] w-[400px] rounded-full blur-3xl"
         
        />

        <motion.div
          animate={{
            x: mousePosition.x * -20,
            y: mousePosition.y * -20,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 30 }}
          className="absolute -bottom-20 -right-20 h-[500px] w-[500px] rounded-full blur-3xl"
          
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--text) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
            opacity: 0.02,
          }}
        />
      </div>

     
      <div className="container-page max-w-[1600px] relative z-20">
       
        <div
          className="relative z-30 
          -mt-30          /* mobile */
          xs:-mt-16       /* small phones */
          sm:-mt-20       /* tablets */
          md:-mt-24       /* small laptops */
          lg:-mt-32       /* large laptops */
          xl:-mt-40       /* desktops */
          2xl:-mt-44      /* large desktops */
        "
        >
          {/* Cards grid */}
          <div className="grid gap-4 sm:gap-6 grid-cols-1 xs:grid-cols-2 lg:grid-cols-4">
            {alkaCards.items.map((c, idx) => {
              const bg = toneBg(c.tone);
              const softBg = toneSoft(c.tone);
              const isHovered = hoveredIndex === idx;

              return (
                <motion.div
                  key={c.key}
                  variants={fadeInUp}
                  onHoverStart={() => setHoveredIndex(idx)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border shadow-lg sm:shadow-xl"
                  style={{
                    borderColor: isHovered ? bg : "var(--border)",
                    background: "var(--surface)",
                    boxShadow: isHovered
                      ? `0 20px 40px -15px ${bg}`
                      : "0 10px 30px -12px rgba(0,0,0,0.25)",
                    transition:
                      "box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease",
                    transform: isHovered ? "translateY(-6px)" : "translateY(0)",
                  }}
                >
                  {/* Solid background overlay */}
                  <div
                    className="absolute inset-0 bg-[var(--surface)]"
                    style={{ zIndex: -1 }}
                  />

                  {/* Animated top accent */}
                  <motion.div
                    className="absolute left-0 top-0 w-full"
                    initial={{ height: 3 }}
                    animate={{ height: isHovered ? 5 : 3 }}
                    style={{ background: bg }}
                  />

                  {/* Corner glow - adjusted for mobile */}
                  <motion.div
                    className="pointer-events-none absolute -right-12 sm:-right-16 -top-12 sm:-top-16 h-32 sm:h-48 w-32 sm:w-48 rounded-full blur-2xl sm:blur-3xl"
                    style={{ background: bg }}
                    animate={{
                      opacity: isHovered ? 0.2 : 0,
                      scale: isHovered ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Floating particles - disabled on mobile for performance */}
                  <AnimatePresence>
                    {isHovered && window.innerWidth > 640 && (
                      <>
                        {[...Array(2)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                            animate={{
                              opacity: [0, 0.3, 0],
                              scale: [0, 0.8, 0],
                              x: [0, (i - 1) * 30],
                              y: [0, -30 - i * 15],
                            }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            className="absolute h-1.5 w-1.5 rounded-full"
                            style={{ background: bg, left: "50%", top: "50%" }}
                          />
                        ))}
                      </>
                    )}
                  </AnimatePresence>

                  {/* Content wrapper */}
                  <div className="relative p-4 sm:p-7 bg-[var(--surface)] flex flex-col h-full">
                    {/* Number + icon bubble */}
                    <div className="flex items-start justify-between gap-2 sm:gap-3">
                      <motion.div
                        animate={
                          isHovered
                            ? {
                                rotate: [0, -5, 5, 0],
                                scale: [1, 1.05, 1],
                              }
                            : {}
                        }
                        transition={{ duration: 0.4 }}
                        className="inline-flex h-10 sm:h-12 w-10 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg relative overflow-hidden"
                        style={{
                          background: `linear-gradient(135deg, ${softBg} 0%, ${bg} 100%)`,
                          border: "1px solid rgba(255,255,255,0.2)",
                          color: "white",
                        }}
                      >
                        <span className="relative z-10 text-xs sm:text-sm font-extrabold">
                          {/* {String(idx + 1).padStart(2, "0")} */}
                           {"ALKA"[idx] ?? String(idx + 1)}
                        </span>
                        <motion.div
                          className="absolute inset-0 bg-white"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={
                            isHovered
                              ? { opacity: 0.15, scale: 1 }
                              : { opacity: 0, scale: 0 }
                          }
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>

                      <motion.div
                        animate={
                          isHovered
                            ? { scale: 1.03, y: -1 }
                            : { scale: 1, y: 0 }
                        }
                        className="rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-[11px] font-bold backdrop-blur-sm flex items-center gap-1"
                        style={{
                          background: "rgba(var(--surface-2-rgb), 0.9)",
                          border: "1px solid var(--border)",
                          color: "var(--text-muted)",
                        }}
                      >
                        {getIcon(c.tone)}
                        {/* {c.title} */}
                      </motion.div>
                    </div>

                    {/* Title */}
                    <h3 className="mt-4 pt-2 sm:mt-5 font-serif text-xl sm:text-lg leading-tight text-[var(--text)]">
                      {c.title}
                    </h3>

                    {/* Animated divider */}
                    <motion.div
                      className="mt-3 sm:mt-4 h-0.5 sm:h-1 rounded-full"
                      style={{ background: bg }}
                      animate={
                        isHovered ? { width: "60px" } : { width: "40px" }
                      }
                      transition={{ duration: 0.3 }}
                    />

                    {/* Description - shorter on mobile */}
                    <p
                      className="mt-3 sm:mt-4 text-xs sm:text-sm text-justify leading-relaxed line-clamp-3 sm:line-clamp-none"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {c.desc}
                    </p>

                 
                  </div>

                  {/* Progress indicator */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 sm:h-1"
                    style={{ background: bg }}
                    initial={{ width: 0 }}
                    animate={{ width: isHovered ? "100%" : "0%" }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA - responsive margin */}
        <motion.div
          variants={fadeInUp}
          className="mt-6 sm:mt-8 md:mt-10 text-center"
        >
          <MotionLink
            href="/gallery"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold shadow-lg group"
            style={{
              background:
                "linear-gradient(135deg, var(--accent) 0%, var(--primary) 100%)",
              color: "white",
              boxShadow: "0 8px 20px -8px var(--accent)",
            }}
          >
            <span>Explore All Initiatives</span>
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                repeatType: "reverse",
              }}
            >
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </motion.div>
          </MotionLink>
        </motion.div>

      
      </div>
    </motion.section>
  );
}
//SECOND OPTION FOR CARDS BACKGROUND COLOR

// import Link from "next/link";
// import alkaCards from "@/app/content/home.alkaCards";

// export default function AlkaCards() {
//   return (
//     <section className="relative z-20">
//       <div className="-mt-16 sm:-mt-20 lg:-mt-24">
//         <div className="container-page">
//           <div
//             className="overflow-hidden rounded-2xl border shadow-lg"
//             style={{ background: "var(--surface)", borderColor: "var(--border)" }}
//           >
//             <div className="grid md:grid-cols-4">
//               {alkaCards.items.map((c, idx) => {
//                 const href = c.href || c.link || "/";

//                 return (
//                   <div
//                     key={idx}
//                     className={[
//                       "p-6 sm:p-7",
//                       "flex flex-col justify-between",
//                       idx !== 0 ? "border-t md:border-t-0 md:border-l" : "",
//                     ].join(" ")}
//                     style={{ borderColor: "var(--border)" }}
//                   >
//                     <div>
//                       <div
//                         className="text-lg font-extrabold"
//                         style={{
//                           color: "color-mix(in oklab, var(--text), transparent 65%)",
//                         }}
//                       >
//                         {c.no || String(idx + 1).padStart(2, "0") + "."}
//                       </div>

//                       <div className="mt-2 text-base font-bold" style={{ color: "var(--text)" }}>
//                         {c.title}
//                       </div>

//                       <p
//                         className="mt-2 text-sm text-justify leading-relaxed"
//                         style={{ color: "var(--text-muted)" }}
//                       >
//                         {c.desc}
//                       </p>
//                     </div>

//                     <div className="mt-4">
//                       {href ? (
//                         <Link
//                           href={href}
//                           className="text-sm font-semibold underline-offset-4 hover:underline"
//                           style={{ color: "var(--text)" }}
//                         >
//                           {c.linkText || "Learn more →"}
//                         </Link>
//                       ) : (
//                         <span
//                           className="text-sm font-semibold"
//                           style={{ color: "var(--text-muted)" }}
//                         >
//                           {c.linkText || "Learn more →"}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           <div className="h-6" />
//         </div>
//       </div>
//     </section>
//   );
// }

// THIRD OPTION FOR CARDS BACKGROUND COLOR.

// import Link from "next/link";
// import alkaCards from "@/app/content/home.alkaCards";

// export default function AlkaCards() {
//   return (
//     <section className="relative z-20">
//       <div className="-mt-16 sm:-mt-20 lg:-mt-24">
//         <div className="container-page">
//           <div className="grid gap-4 md:grid-cols-4">
//             {alkaCards.items.map((c, idx) => {
//               const href = c.href || c.link || "/";

//               // Use only the primary purple to violet gradient for all cards
//               const gradient = "linear-gradient(135deg, #62109F 0%, #8A2BE2 100%)";

//               return (
//                 <div
//                   key={idx}
//                   className={[
//                     "p-6 sm:p-7",
//                     "flex flex-col justify-between",
//                     "relative overflow-hidden",
//                     "rounded-2xl shadow-lg",
//                     "transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
//                   ].join(" ")}
//                   style={{
//                     background: gradient,
//                   }}
//                 >
//                   {/* Subtle pattern overlay */}
//                   <div
//                     className="absolute inset-0 opacity-5"
//                     style={{
//                       backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
//                     }}
//                   />

//                   <div className="relative z-10">
//                     <div
//                       className="text-lg font-extrabold"
//                       style={{
//                         color: "rgba(255, 255, 255, 0.8)",
//                       }}
//                     >
//                       {c.no || String(idx + 1).padStart(2, "0") + "."}
//                     </div>

//                     <div className="mt-2 text-base font-bold text-white">
//                       {c.title}
//                     </div>

//                     <p
//                       className="mt-2 text-sm leading-relaxed"
//                       style={{ color: "rgba(255, 255, 255, 0.9)" }}
//                     >
//                       {c.desc}
//                     </p>
//                   </div>

//                   <div className="mt-4 relative z-10">
//                     {href ? (
//                       <Link
//                         href={href}
//                         className="text-sm font-semibold inline-flex items-center gap-1 group/link"
//                         style={{ color: "white" }}
//                       >
//                         <span className="relative">
//                           {c.linkText || "Learn more"}
//                           <span
//                             className="absolute bottom-0 left-0 w-0 h-0.5 group-hover/link:w-full transition-all duration-300 bg-white"
//                           />
//                         </span>
//                         <span className="inline-block transition-transform group-hover/link:translate-x-1">
//                           →
//                         </span>
//                       </Link>
//                     ) : (
//                       <span
//                         className="text-sm font-semibold"
//                         style={{ color: "rgba(255, 255, 255, 0.8)" }}
//                       >
//                         {c.linkText || "Learn more →"}
//                       </span>
//                     )}
//                   </div>

//                   {/* Decorative corner element */}
//                   <div
//                     className="absolute bottom-0 right-0 w-16 h-16 opacity-20"
//                     style={{
//                       background: "radial-gradient(circle at bottom right, white 0%, transparent 70%)",
//                     }}
//                   />
//                 </div>
//               );
//             })}
//           </div>

//           <div className="h-6" />
//         </div>
//       </div>
//     </section>
//   );
// }

//FOURTH OPTION FOR CARD COLORS BACKGROUND.

// import Link from "next/link";
// import alkaCards from "@/app/content/home.alkaCards";

// export default function AlkaCards() {
//   return (
//     <section className="relative z-20">
//       <div className="-mt-16 sm:-mt-20 lg:-mt-24">
//         <div className="container-page">
//           <div className="grid gap-4 md:grid-cols-4">
//             {alkaCards.items.map((c, idx) => {
//               const href = c.href || c.link || "/";

//               // Slight variations of the primary purple gradient
//               const getGradient = (index) => {
//                 const gradients = [
//                   "linear-gradient(135deg, #62109F 0%, #8A2BE2 100%)", // Primary
//                   "linear-gradient(135deg, #62109F 0%, #9D4EDD 100%)", // Slightly lighter
//                   "linear-gradient(135deg, #62109F 0%, #7B2CBF 100%)", // Slightly darker
//                   "linear-gradient(135deg, #62109F 0%, #C77DFF 100%)", // Lighter violet
//                 ];
//                 return gradients[index % gradients.length];
//               };

//               const gradient = c.gradient || getGradient(idx);

//               return (
//                 <div
//                   key={idx}
//                   className={[
//                     "p-6 sm:p-7",
//                     "flex flex-col justify-between",
//                     "relative overflow-hidden",
//                     "rounded-2xl shadow-lg",
//                     "transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
//                   ].join(" ")}
//                   style={{
//                     background: gradient,
//                   }}
//                 >
//                   <div
//                     className="absolute inset-0 opacity-5"
//                     style={{
//                       backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
//                     }}
//                   />

//                   <div className="relative z-10">
//                     <div
//                       className="text-lg font-extrabold"
//                       style={{
//                         color: "rgba(255, 255, 255, 0.8)",
//                       }}
//                     >
//                       {c.no || String(idx + 1).padStart(2, "0") + "."}
//                     </div>

//                     <div className="mt-2 text-base font-bold text-white">
//                       {c.title}
//                     </div>

//                     <p
//                       className="mt-2 text-sm leading-relaxed"
//                       style={{ color: "rgba(255, 255, 255, 0.9)" }}
//                     >
//                       {c.desc}
//                     </p>
//                   </div>

//                   <div className="mt-4 relative z-10">
//                     {href ? (
//                       <Link
//                         href={href}
//                         className="text-sm font-semibold inline-flex items-center gap-1 group/link"
//                         style={{ color: "white" }}
//                       >
//                         <span className="relative">
//                           {c.linkText || "Learn more"}
//                           <span
//                             className="absolute bottom-0 left-0 w-0 h-0.5 group-hover/link:w-full transition-all duration-300 bg-white"
//                           />
//                         </span>
//                         <span className="inline-block transition-transform group-hover/link:translate-x-1">
//                           →
//                         </span>
//                       </Link>
//                     ) : (
//                       <span
//                         className="text-sm font-semibold"
//                         style={{ color: "rgba(255, 255, 255, 0.8)" }}
//                       >
//                         {c.linkText || "Learn more →"}
//                       </span>
//                     )}
//                 </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
