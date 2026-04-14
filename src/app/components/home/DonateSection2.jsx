import Link from "next/link";
import donateData from "@/app/content/home.donate";

function toneStyles(tone) {
  switch (tone) {
    case "danger":
      return { bg: "var(--danger)" };
    case "accent":
      return { bg: "var(--alka2)" };
    case "gold":
      return { bg: "var(--alka3)" };
    case "success":
      return { bg: "var(--alka4)" };
    default:
      return { bg: "var(--alka1)" };
  }
}

export default function DonateSection2() {
  return (
    <section className="relative mb-20 bg-[var(--bg)] py-16">
      <div className="container-page w-full max-w-[1500px] mt-0">
       
        <div className="mx-auto max-w-full text-center">
          <h2 className="h2 p-5">{donateData.title}</h2>
          <p className="p-muted mt-3 text-base  sm:text-[17px]">
            {donateData.description}
          </p>
        </div>

      
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {donateData.options.map((option, index) => {
            const tone = toneStyles(option.tone);

            return (
              <div
                key={index}
                className="group card relative flex h-full flex-col overflow-hidden p-6 min-h-[320px]"
                style={{
                  background:
                    "linear-gradient(180deg, color-mix(in oklab, " +
                    tone.bg +
                    ", white 92%) 0%, color-mix(in oklab, var(--surface), transparent 0%) 55%, var(--surface) 100%)",
                }}
              >
                
                <div
                  className="absolute left-0 top-0 h-1 w-full"
                  style={{ background: tone.bg }}
                />

                
                <div className="flex flex-1 flex-col">
                  <h3 className="mt-2 py-2 font-serif text-center text-2xl leading-snug">
                    {option.title}
                  </h3>

                  <p className="p-muted mt-3 text-xl text-center leading-relaxed">
                    {option.description}
                  </p>

                  <div className="mt-auto pt-6">
                    <Link
                      href={option.link}
                      className="inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 active:opacity-80"
                      style={{ background: tone.bg }}
                    >
                      {option.buttonText}
                    </Link>
                  </div>
                </div>

                
                <div
                  className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full opacity-0 blur-3xl transition duration-500 group-hover:opacity-30"
                  style={{ background: tone.bg }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// "use client";

// import Link from "next/link";
// import { motion, useInView } from "framer-motion";
// import { useRef } from "react";
// import donateData from "@/app/content/home.donate";
// import { Heart, HandHeart, Sparkles, ArrowRight, Gift, Target, Zap, Award } from "lucide-react";

// function toneStyles(tone) {
//   switch (tone) {
//     case "danger":
//       return {
//         bg: "var(--danger)",
//         light: "color-mix(in oklab, var(--danger), white 85%)",
//         veryLight: "color-mix(in oklab, var(--danger), white 95%)",
//         icon: <Heart className="h-4 w-4" />
//       };
//     case "accent":
//       return {
//         bg: "var(--accent)",
//         light: "color-mix(in oklab, var(--accent), white 85%)",
//         veryLight: "color-mix(in oklab, var(--accent), white 95%)",
//         icon: <Zap className="h-4 w-4" />
//       };
//     case "gold":
//       return {
//         bg: "var(--gold)",
//         light: "color-mix(in oklab, var(--gold), white 85%)",
//         veryLight: "color-mix(in oklab, var(--gold), white 95%)",
//         icon: <Award className="h-4 w-4" />
//       };
//     case "success":
//       return {
//         bg: "var(--success)",
//         light: "color-mix(in oklab, var(--success), white 85%)",
//         veryLight: "color-mix(in oklab, var(--success), white 95%)",
//         icon: <Target className="h-4 w-4" />
//       };
//     default:
//       return {
//         bg: "var(--primary)",
//         light: "color-mix(in oklab, var(--primary), white 85%)",
//         veryLight: "color-mix(in oklab, var(--primary), white 95%)",
//         icon: <Gift className="h-4 w-4" />
//       };
//   }
// }

// // Animation variants
// const fadeInUp = {
//   hidden: { opacity: 0, y: 30 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.5, ease: "easeOut" }
//   }
// };

// const staggerContainer = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1,
//       delayChildren: 0.2
//     }
//   }
// };

// export default function DonateSection2() {
//   const sectionRef = useRef(null);
//   const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

//   return (
//     <motion.section
//       ref={sectionRef}
//       initial="hidden"
//       animate={isInView ? "visible" : "hidden"}
//       variants={staggerContainer}
//       className="relative overflow-visible py-16 sm:py-20 lg:py-24"
//       style={{ background: "var(--bg)" }} // Keeping original background
//     >
//       {/* Decorative background elements */}
//       <div className="pointer-events-none absolute inset-0 overflow-hidden">
//         {/* Subtle grid pattern */}
//         <div
//           className="absolute inset-0 opacity-[0.02]"
//           style={{
//             backgroundImage: `radial-gradient(circle at 1px 1px, var(--text) 1px, transparent 0)`,
//             backgroundSize: '40px 40px'
//           }}
//         />

//         {/* Floating orbs */}
//         <motion.div
//           animate={{
//             y: [0, 20, 0],
//             opacity: [0.1, 0.15, 0.1]
//           }}
//           transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
//           className="absolute -left-20 top-20 h-64 w-64 rounded-full blur-3xl"
//           style={{ background: "var(--accent)", opacity: 0.1 }}
//         />

//         <motion.div
//           animate={{
//             y: [0, -20, 0],
//             opacity: [0.1, 0.15, 0.1]
//           }}
//           transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 1 }}
//           className="absolute -right-20 bottom-20 h-72 w-72 rounded-full blur-3xl"
//           style={{ background: "var(--primary)", opacity: 0.1 }}
//         />
//       </div>

//       <div className="container-page w-full max-w-[1500px] mt-0 relative z-10">
//         {/* Header with enhanced styling */}
//         <motion.div
//           variants={fadeInUp}
//           className="mx-auto max-w-3xl text-center"
//         >
//           {/* Decorative badge */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5 }}
//             className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 mb-6"
//             style={{
//               borderColor: "var(--border)",
//               background: "rgba(var(--surface-rgb), 0.6)",
//               backdropFilter: "blur(8px)"
//             }}
//           >
//             <motion.span
//               animate={{ scale: [1, 1.2, 1] }}
//               transition={{ repeat: Infinity, duration: 2 }}
//               className="h-2 w-2 rounded-full"
//               style={{ background: "var(--accent)" }}
//             />
//             <span className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>
//               Make an Impact
//             </span>
//           </motion.div>

//           <h2 className="font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl bg-gradient-to-r from-[var(--text)] to-[var(--text-muted)] bg-clip-text text-transparent">
//             {donateData.title}
//           </h2>

//           <motion.div
//             className="mt-4 h-1 w-20 mx-auto rounded-full"
//             style={{ background: "var(--accent)" }}
//             initial={{ width: 0 }}
//             animate={{ width: 80 }}
//             transition={{ duration: 1, delay: 0.3 }}
//           />

//           <p className="mt-6 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
//              style={{ color: "var(--text-muted)" }}>
//             {donateData.description}
//           </p>
//         </motion.div>

//         {/* Cards grid */}
//         <motion.div
//           variants={staggerContainer}
//           className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
//         >
//           {donateData.options.map((option, index) => {
//             const tone = toneStyles(option.tone);
//             const gradientBg = `linear-gradient(180deg, ${tone.veryLight} 0%, var(--surface) 40%, var(--surface) 100%)`;

//             return (
//               <motion.div
//                 key={index}
//                 variants={fadeInUp}
//                 whileHover={{ y: -8 }}
//                 transition={{ type: "spring", stiffness: 300, damping: 20 }}
//                 className="group relative flex h-full flex-col overflow-hidden rounded-3xl border shadow-lg cursor-pointer"
//                 style={{
//                   borderColor: "var(--border)",
//                   background: gradientBg,
//                   boxShadow: "0 20px 40px -15px rgba(0,0,0,0.2)"
//                 }}
//               >
//                 {/* Animated top accent */}
//                 <motion.div
//                   className="absolute left-0 top-0 w-full"
//                   initial={{ height: 4 }}
//                   whileHover={{ height: 6 }}
//                   style={{ background: tone.bg }}
//                 />

//                 {/* Corner glow on hover */}
//                 <motion.div
//                   className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full blur-3xl"
//                   style={{ background: tone.bg }}
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   whileHover={{ opacity: 0.25, scale: 1.2 }}
//                   transition={{ duration: 0.4 }}
//                 />

//                 {/* Content */}
//                 <div className="relative flex flex-1 flex-col p-6 sm:p-7">
//                   {/* Icon and title row */}
//                   <div className="flex items-start justify-between gap-3">
//                     <motion.div
//                       whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
//                       transition={{ duration: 0.3 }}
//                       className="inline-flex h-12 w-12 items-center justify-center rounded-xl shadow-md"
//                       style={{
//                         background: `linear-gradient(135deg, ${tone.light} 0%, ${tone.bg} 100%)`,
//                         border: "1px solid rgba(255,255,255,0.2)",
//                         color: "white",
//                       }}
//                     >
//                       {tone.icon}
//                     </motion.div>

//                     <motion.div
//                       whileHover={{ scale: 1.05 }}
//                       className="rounded-full px-3 py-1 text-[11px] font-bold backdrop-blur-sm"
//                       style={{
//                         background: "rgba(var(--surface-2-rgb), 0.8)",
//                         border: "1px solid var(--border)",
//                         color: "var(--text-muted)",
//                       }}
//                     >
//                       {option.tone?.charAt(0).toUpperCase() + option.tone?.slice(1) || "Impact"}
//                     </motion.div>
//                   </div>

//                   {/* Title */}
//                   <h3 className="mt-4 font-serif text-xl leading-snug sm:text-2xl"
//                       style={{ color: "var(--text)" }}>
//                     {option.title}
//                   </h3>

//                   {/* Decorative line */}
//                   <motion.div
//                     className="mt-3 h-0.5 rounded-full"
//                     style={{ background: tone.bg }}
//                     initial={{ width: 40 }}
//                     whileHover={{ width: 60 }}
//                     transition={{ duration: 0.3 }}
//                   />

//                   {/* Description */}
//                   <p className="mt-4 text-sm text-justify leading-relaxed"
//                      style={{ color: "var(--text-muted)" }}>
//                     {option.description}
//                   </p>

//                   {/* Button */}
//                   <div className="mt-auto pt-6">
//                     <motion.div
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                     >
//                       <Link
//                         href={option.link}
//                         className="group/btn relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl px-4 py-3.5 text-sm font-semibold text-white shadow-lg transition-all"
//                         style={{
//                           background: `linear-gradient(135deg, ${tone.bg} 0%, ${tone.light} 100%)`,
//                           boxShadow: `0 10px 20px -8px ${tone.bg}`,
//                         }}
//                       >
//                         <motion.span
//                           className="absolute inset-0 bg-white"
//                           initial={{ opacity: 0, x: "-100%" }}
//                           whileHover={{ opacity: 0.2, x: "100%" }}
//                           transition={{ duration: 0.5 }}
//                         />
//                         <span className="relative z-10 flex items-center gap-2">
//                           {option.buttonText}
//                           <motion.span
//                             animate={{ x: [0, 3, 0] }}
//                             transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
//                           >
//                             <ArrowRight className="h-4 w-4" />
//                           </motion.span>
//                         </span>
//                       </Link>
//                     </motion.div>
//                   </div>

//                   {/* Impact badge */}
//                   <motion.div
//                     className="absolute bottom-3 right-3"
//                     initial={{ opacity: 0, scale: 0 }}
//                     whileHover={{ opacity: 1, scale: 1 }}
//                     transition={{ duration: 0.2 }}
//                   >
//                     <div className="flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold backdrop-blur-sm"
//                          style={{
//                            background: "rgba(0,0,0,0.3)",
//                            border: "1px solid rgba(255,255,255,0.2)",
//                            color: "white"
//                          }}>
//                       <HandHeart className="h-3 w-3" />
//                       Impact
//                     </div>
//                   </motion.div>
//                 </div>

//                 {/* Bottom progress bar on hover */}
//                 <motion.div
//                   className="absolute bottom-0 left-0 h-1"
//                   style={{ background: tone.bg }}
//                   initial={{ width: 0 }}
//                   whileHover={{ width: "100%" }}
//                   transition={{ duration: 0.5 }}
//                 />
//               </motion.div>
//             );
//           })}
//         </motion.div>

//         {/* Bottom CTA section */}
//         <motion.div
//           variants={fadeInUp}
//           className="mt-12 text-center"
//         >
//           <motion.div
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             className="inline-block"
//           >
//             <Link
//               href="/donation"
//               className="group inline-flex items-center gap-3 rounded-2xl border px-8 py-4 font-semibold shadow-lg backdrop-blur-sm transition-all hover:-translate-y-1"
//               style={{
//                 borderColor: "var(--border)",
//                 background: "rgba(var(--surface-rgb), 0.6)",
//                 color: "var(--text)",
//                 boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)"
//               }}
//             >
//               <span>View All Ways to Support</span>
//               <motion.div
//                 animate={{ x: [0, 5, 0] }}
//                 transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
//               >
//                 <ArrowRight className="h-5 w-5" style={{ color: "var(--accent)" }} />
//               </motion.div>
//             </Link>
//           </motion.div>
//         </motion.div>

//         {/* Trust indicators */}
//         <motion.div
//           variants={fadeInUp}
//           className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs"
//           style={{ color: "var(--text-muted)" }}
//         >
//           <span className="flex items-center gap-1">
//             <Heart className="h-3 w-3" style={{ color: "var(--accent)" }} />
//             100% Transparent
//           </span>
//           <span className="flex items-center gap-1">
//             <Target className="h-3 w-3" style={{ color: "var(--accent)" }} />
//             Direct Impact
//           </span>
//           <span className="flex items-center gap-1">
//             <Award className="h-3 w-3" style={{ color: "var(--accent)" }} />
//             Tax Exempted
//           </span>
//         </motion.div>
//       </div>
//     </motion.section>
//   );
// }
