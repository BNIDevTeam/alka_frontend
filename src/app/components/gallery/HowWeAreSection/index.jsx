// "use client";

// import React, { useMemo, useState, useEffect, useRef } from "react";
// import Image from "next/image";
// import { motion, useInView } from "framer-motion";
// import information from "@/app/content/info";
// import howWeAreContent from "@/app/content/about.howWeAre";
// import {
//   Quote,
//   Sparkles,
//   Flame,
//   Lightbulb,
//   HeartHandshake,
//   ChevronRight,
//   Star,
//   Award,
//   Target,
// } from "lucide-react";

// function cx(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// function initials(name = "") {
//   const parts = name.trim().split(/\s+/).filter(Boolean);
//   return ((parts[0]?.[0] || "") + (parts[1]?.[0] || "")).toUpperCase();
// }

// // Animation variants
// const fadeInUp = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { 
//     opacity: 1, 
//     y: 0,
//     transition: { duration: 0.6, ease: "easeOut" }
//   }
// };

// const fadeInLeft = {
//   hidden: { opacity: 0, x: -30 },
//   visible: { 
//     opacity: 1, 
//     x: 0,
//     transition: { duration: 0.6, ease: "easeOut" }
//   }
// };

// const fadeInRight = {
//   hidden: { opacity: 0, x: 30 },
//   visible: { 
//     opacity: 1, 
//     x: 0,
//     transition: { duration: 0.6, ease: "easeOut" }
//   }
// };

// const staggerContainer = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.15,
//       delayChildren: 0.2
//     }
//   }
// };

// export default function HowWeAreSection() {
//   const trustees = useMemo(() => information.companyTrustee || [], []);
//   const sectionRef = useRef(null);
//   const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
//   // Only use the first trustee
//   const firstTrustee = trustees[0] || {};
//   const firstTrusteeText = howWeAreContent.trustees[0] || {};

//   return (
//     <motion.section
//       ref={sectionRef}
//       initial="hidden"
//       animate={isInView ? "visible" : "hidden"}
//       variants={staggerContainer}
//       className="section max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10"
      
//     >
//       {/* Animated background elements */}
//       <div className="pointer-events-none absolute inset-0 overflow-hidden">
//         {/* Gradient orbs */}
//         <motion.div
//           animate={{
//             y: [0, 20, 0],
//             opacity: [0.1, 0.15, 0.1],
//           }}
//           transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
//           className="absolute -left-20 top-20 h-[500px] w-[500px] rounded-full blur-3xl"
//           style={{ 
//             background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
//             opacity: 0.1
//           }}
//         />
        
//         <motion.div
//           animate={{
//             y: [0, -20, 0],
//             opacity: [0.1, 0.15, 0.1],
//           }}
//           transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 1 }}
//           className="absolute -right-20 bottom-20 h-[600px] w-[600px] rounded-full blur-3xl"
//           style={{ 
//             background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
//             opacity: 0.1
//           }}
//         />

//         {/* Grid pattern */}
//         <div 
//           className="absolute inset-0 opacity-[0.02]"
//           style={{
//             backgroundImage: `radial-gradient(circle at 1px 1px, var(--text) 1px, transparent 0)`,
//             backgroundSize: '40px 40px'
//           }}
//         />
//       </div>

//       <div className="container-page w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
//         {/* Header */}
//         <motion.div variants={fadeInUp} className="text-center max-w-4xl mx-auto mb-12 lg:mb-16">
//           <div
//             className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-extrabold shadow-lg backdrop-blur-sm"
//             style={{
//               background: "rgba(var(--surface-2-rgb), 0.8)",
//               border: "1px solid var(--border)",
//               color: "var(--text-muted)",
//             }}
//           >
//             <motion.span
//               animate={{ scale: [1, 1.2, 1] }}
//               transition={{ repeat: Infinity, duration: 2 }}
//               className="h-2 w-2 rounded-full"
//               style={{ background: "var(--accent)" }}
//             />
//             {howWeAreContent.kicker}
//           </div>

//           <motion.h2
//             variants={fadeInUp}
//             className="mt-4 font-serif text-2xl sm:text-3xl lg:text-4xl bg-gradient-to-r from-[var(--text)] to-[var(--text-muted)] bg-clip-text text-transparent"
//           >
//             {howWeAreContent.title}
//           </motion.h2>

//           <motion.p
//             variants={fadeInUp}
//             className="mx-auto mt-3 max-w-full text-sm sm:text-base"
//             style={{ color: "var(--text-muted)" }}
//           >
//             {howWeAreContent.subtitle}
//           </motion.p>

//           <motion.div
//             variants={fadeInUp}
//             className="mx-auto mt-5 h-1 w-20 rounded-full"
//             style={{
//               background: "linear-gradient(90deg, var(--primary), var(--accent))",
//             }}
//           />
//         </motion.div>

//         {/* Main content - Split Layout */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16">
//           {/* Left Column - Trustee Details (7 columns) */}
//           <motion.div 
//             variants={fadeInLeft}
//             className="lg:col-span-7"
//           >
//             <div
//               className="relative overflow-hidden rounded-3xl shadow-2xl backdrop-blur-sm h-full"
//               style={{
//                 background: "rgba(var(--surface-rgb), 0.9)",
//                 border: "1px solid var(--border)",
//               }}
//             >
//               {/* Animated top gradient */}
//               <motion.div
//                 className="absolute left-0 top-0 h-1.5 w-full"
//                 style={{
//                   background: "linear-gradient(90deg, var(--primary), var(--accent), var(--gold))",
//                   backgroundSize: "200% 100%",
//                 }}
//                 animate={{
//                   backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
//                 }}
//                 transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
//               />

//               {/* Corner decorations */}
//               <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] opacity-10 blur-3xl" />
//               <div className="absolute -right-20 -bottom-20 h-40 w-40 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--gold)] opacity-10 blur-3xl" />

//               <div className="relative p-8 sm:p-10 lg:p-12">
//                 {/* Header section with image and title */}
//                 <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
//                   {/* Image with animated border */}
//                   <motion.div
//                     whileHover={{ scale: 1.05 }}
//                     transition={{ type: "spring", stiffness: 300 }}
//                     className="relative flex-shrink-0"
//                   >
//                     <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] opacity-50 blur-md" />
//                     <div
//                       className="relative h-28 w-28 sm:h-32 sm:w-32 lg:h-36 lg:w-36 overflow-hidden rounded-2xl shadow-xl"
//                       style={{ background: "var(--surface-2)" }}
//                     >
//                       {firstTrustee.image ? (
//                         <Image
//                           src={firstTrustee.image}
//                           alt={firstTrustee.name}
//                           fill
//                           className="object-cover object-[50%_20%]"
//                           sizes="144px"
//                         />
//                       ) : (
//                         <div
//                           className="grid h-full w-full place-items-center text-2xl font-extrabold"
//                           style={{ color: "var(--text)" }}
//                         >
//                           {initials(firstTrustee.name)}
//                         </div>
//                       )}
//                     </div>
                    
//                     {/* Floating badge */}
//                     <motion.div
//                       initial={{ scale: 0, opacity: 0 }}
//                       animate={{ scale: 1, opacity: 1 }}
//                       transition={{ delay: 0.5, type: "spring" }}
//                       className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--gold)] flex items-center justify-center shadow-lg"
//                     >
//                       <Award className="h-4 w-4 text-white" />
//                     </motion.div>
//                   </motion.div>

//                   <div className="flex-1 min-w-0">
//                     <motion.h3
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.2 }}
//                       className="font-serif text-2xl sm:text-3xl lg:text-4xl"
//                       style={{ color: "var(--text)" }}
//                     >
//                       {firstTrustee.name}
//                     </motion.h3>
                    
//                     <motion.div
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.3 }}
//                       className="mt-2 flex items-center gap-2"
//                     >
//                       <div className="h-1 w-8 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]" />
//                       <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
//                         {firstTrustee.role || "Trustee"}
//                       </span>
//                     </motion.div>

//                     {/* Quick stats */}
//                     <motion.div
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 0.4 }}
//                       className="mt-4 flex flex-wrap gap-4"
//                     >
//                       <div className="flex items-center gap-2">
//                         <Star className="h-4 w-4" style={{ color: "var(--accent)" }} />
//                         <span className="text-xs" style={{ color: "var(--text-muted)" }}>Visionary Leader</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Target className="h-4 w-4" style={{ color: "var(--primary)" }} />
//                         <span className="text-xs" style={{ color: "var(--text-muted)" }}>10+ Years</span>
//                       </div>
//                     </motion.div>
//                   </div>
//                 </div>

//                 {/* About section with decorative quote */}
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.5 }}
//                   className="mt-8 relative"
//                 >
//                   <Quote className="absolute -left-2 -top-2 h-8 w-8 opacity-10" style={{ color: "var(--primary)" }} />
//                   <div
//                     className="p-6 rounded-2xl relative"
//                     style={{
//                       background: "linear-gradient(135deg, rgba(var(--surface-2-rgb), 0.5), rgba(var(--surface-rgb), 0.8))",
//                       border: "1px solid var(--border)",
//                     }}
//                   >
//                     <p
//                       className="text-sm leading-relaxed italic"
//                       style={{ color: "var(--text-muted)" }}
//                     >
//                       {firstTrusteeText.about}
//                     </p>
//                   </div>
//                 </motion.div>

//                 {/* Bottom quote card */}
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.6 }}
//                   className="mt-8"
//                 >
//                   <div
//                     className="relative overflow-hidden rounded-2xl p-6"
//                     style={{
//                       background: "linear-gradient(135deg, rgba(var(--primary-rgb), 0.05), rgba(var(--accent-rgb), 0.05))",
//                       border: "1px solid rgba(var(--accent-rgb), 0.2)",
//                     }}
//                   >
//                     <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] opacity-10 blur-2xl" />
                    
//                     <div className="flex items-start gap-4 relative">
//                       <div
//                         className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-xl shadow-lg"
//                         style={{
//                           background: "linear-gradient(135deg, var(--primary), var(--accent))",
//                         }}
//                       >
//                         <Quote className="h-5 w-5 text-white" />
//                       </div>
                      
//                       <div className="min-w-0">
//                         <div
//                           className="text-sm font-extrabold mb-1"
//                           style={{ color: "var(--text)" }}
//                         >
//                           Message to the community
//                         </div>
//                         <p
//                           className="text-sm leading-relaxed"
//                           style={{ color: "var(--text-muted)" }}
//                         >
//                           “{firstTrusteeText.thought}”
//                         </p>
//                       </div>
//                     </div>

//                     {/* Decorative dots */}
//                     <div className="absolute bottom-2 right-2 flex gap-1">
//                       <div className="h-1 w-1 rounded-full bg-[var(--primary)] opacity-30" />
//                       <div className="h-1 w-1 rounded-full bg-[var(--accent)] opacity-30" />
//                       <div className="h-1 w-1 rounded-full bg-[var(--gold)] opacity-30" />
//                     </div>
//                   </div>
//                 </motion.div>
//               </div>
//             </div>
//           </motion.div>

//           {/* Right Column - 3 Cards Vertical (5 columns) */}
//           <motion.div 
//             variants={fadeInRight}
//             className="lg:col-span-5"
//           >
//             <div className="flex flex-col gap-6 h-full">
//               <InfoTile
//                 icon={Flame}
//                 title="Motivation"
//                 text={firstTrusteeText.motivation}
//                 tone="primary"
//                 delay={0.3}
//               />
//               <InfoTile
//                 icon={Lightbulb}
//                 title="Inspiration"
//                 text={firstTrusteeText.inspiration}
//                 tone="accent"
//                 delay={0.4}
//               />
//               <InfoTile
//                 icon={HeartHandshake}
//                 title="Vision for ALKA"
//                 text={firstTrusteeText.thought}
//                 tone="gold"
//                 delay={0.5}
//               />
//             </div>
//           </motion.div>
//         </div>

//         {/* Bottom CTA */}
//         {/* <motion.div
//           variants={fadeInUp}
//           className="mt-16 text-center"
//         >
//           <motion.a
//             href="/team"
//             whileHover={{ scale: 1.02, y: -2 }}
//             whileTap={{ scale: 0.98 }}
//             className="inline-flex items-center gap-3 rounded-2xl px-8 py-4 font-semibold shadow-lg group relative overflow-hidden"
//             style={{
//               background: "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)",
//               color: "white",
//               border: "1px solid rgba(255,255,255,0.1)",
//             }}
//           >
//             <motion.span
//               className="absolute inset-0 bg-white"
//               initial={{ opacity: 0, x: "-100%" }}
//               whileHover={{ opacity: 0.2, x: "100%" }}
//               transition={{ duration: 0.5 }}
//             />
//             <span className="relative z-10 flex items-center gap-2">
//               Meet Our Full Team
//               <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
//             </span>
//           </motion.a>
//         </motion.div> */}
//       </div>
//     </motion.section>
//   );
// }

// function InfoTile({ icon: Icon, title, text, tone, delay }) {
//   const [isHovered, setIsHovered] = useState(false);
  
//   const getGradient = () => {
//     switch (tone) {
//       case "accent":
//         return "linear-gradient(135deg, var(--accent) 0%, var(--gold) 100%)";
//       case "gold":
//         return "linear-gradient(135deg, var(--gold) 0%, var(--accent) 100%)";
//       default:
//         return "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)";
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay }}
//       whileHover={{ y: -5, scale: 1.02 }}
//       onHoverStart={() => setIsHovered(true)}
//       onHoverEnd={() => setIsHovered(false)}
//       className="relative overflow-hidden rounded-xl p-6 shadow-lg cursor-default group w-full"
//       style={{
//         background: "var(--surface)",
//         border: isHovered ? `1px solid ${tone === 'accent' ? 'var(--accent)' : tone === 'gold' ? 'var(--gold)' : 'var(--primary)'}` : "1px solid var(--border)",
//         transition: "all 0.3s ease",
//         minHeight: "180px",
//       }}
//     >
//       {/* Subtle gradient background - reduced opacity significantly */}
//       <div
//         className="absolute inset-0 opacity-[0.03]"
//         style={{
//           background: getGradient(),
//         }}
//       />
      
//       {/* Very subtle hover overlay */}
//       <motion.div
//         className="absolute inset-0"
//         style={{
//           background: getGradient(),
//           opacity: isHovered ? 0.08 : 0,
//         }}
//         animate={{ opacity: isHovered ? 0.08 : 0 }}
//         transition={{ duration: 0.3 }}
//       />

//       {/* Icon and Title */}
//       <div className="flex items-center gap-3 mb-4 relative z-10">
//         <motion.div
//           animate={isHovered ? { rotate: [0, -5, 5, 0] } : {}}
//           transition={{ duration: 0.5 }}
//           className="grid h-12 w-12 place-items-center rounded-xl shadow-md flex-shrink-0"
//           style={{
//             background: `linear-gradient(135deg, ${tone === 'accent' ? 'var(--accent)' : tone === 'gold' ? 'var(--gold)' : 'var(--primary)'} 0%, color-mix(in oklab, ${tone === 'accent' ? 'var(--accent)' : tone === 'gold' ? 'var(--gold)' : 'var(--primary)'}, white 30%) 100%)`,
//             color: "white",
//           }}
//         >
//           <Icon className="h-6 w-6 text-white" />
//         </motion.div>
        
//         <span
//           className="text-base font-extrabold"
//           style={{ color: "var(--text)" }}
//         >
//           {title}
//         </span>
//       </div>

//       {/* Text */}
//       <p
//         className="text-sm leading-relaxed relative z-10"
//         style={{ color: "var(--text-muted)" }}
//       >
//         {text}
//       </p>

//       {/* Decorative corner accent - much subtler */}
//       <motion.div
//         className="absolute bottom-0 right-0 h-20 w-20 rounded-tl-xl pointer-events-none"
//         style={{
//           background: `radial-gradient(circle at bottom right, ${tone === 'accent' ? 'var(--accent)' : tone === 'gold' ? 'var(--gold)' : 'var(--primary)'}, transparent 80%)`,
//           opacity: isHovered ? 0.15 : 0.08,
//         }}
//       />
//     </motion.div>
//   );
// }

"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import information from "@/app/content/info";
import howWeAreContent from "@/app/content/about.howWeAre";
import {
  Quote,
  Sparkles,
  Flame,
  Lightbulb,
  HeartHandshake,
  ChevronRight,
  Star,
  Award,
  Target,
  Compass,
  Eye,
  Zap,
  Gem,
} from "lucide-react";

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function initials(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return ((parts[0]?.[0] || "") + (parts[1]?.[0] || "")).toUpperCase();
}

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

export default function HowWeAreSection() {
  const trustees = useMemo(() => information.companyTrustee || [], []);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  // Only use the first trustee
  const firstTrustee = trustees[0] || {};
  const firstTrusteeText = howWeAreContent.trustees[0] || {};

  return (
    <motion.section
      ref={sectionRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className="relative py-20 sm:py-24 lg:py-28 overflow-hidden"
      // style={{
      //   background: "linear-gradient(135deg, var(--surface) 0%, var(--surface-2) 100%)"
      // }}
    >
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating geometric shapes */}
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
            rotate: [0, 10, 0],
          }}
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-32 h-32 border border-[var(--accent)]/20 rounded-3xl"
        />
        
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            rotate: [0, -15, 0],
          }}
          transition={{ repeat: Infinity, duration: 15, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-40 right-20 w-48 h-48 border border-[var(--primary)]/20 rounded-full"
        />
        
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-[var(--accent)]/5 to-[var(--primary)]/5 blur-3xl"
        />

        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, var(--text) 2px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="container-page max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10">
        {/* Header with decorative elements */}
        <motion.div variants={fadeInUp} className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          

          <motion.h2
            variants={fadeInUp}
            className="mt-6 font-serif text-4xl sm:text-4xl lg:text-5xl font-bold leading-tight"
          >
            <span className="block" style={{ color: "var(--text)" }}>{howWeAreContent.title}</span>
            <span className="block mt-2 text-2xl sm:text-2xl lg:text-2xl font-light" style={{ color: "var(--text-muted)" }}>
              {howWeAreContent.subtitle}
            </span>
          </motion.h2>

          <motion.div
            variants={fadeInUp}
            className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-[var(--accent)] via-[var(--primary)] to-[var(--gold)]"
          />
        </motion.div>

        {/* Main content - Asymmetrical Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column - Profile Card with Creative Design */}
          <motion.div 
            variants={fadeInLeft}
            className="lg:col-span-7"
          >
            <div className="relative group">
              {/* Background card with depth */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[var(--accent)] via-[var(--primary)] to-[var(--gold)] rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
              
              <div
                className="relative overflow-hidden rounded-3xl shadow-2xl"
                style={{
                  background: "rgba(var(--surface-rgb), 0.95)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(var(--accent-rgb), 0.2)",
                }}
              >
                {/* Animated gradient border */}
                <motion.div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background: "linear-gradient(90deg, var(--accent), var(--primary), var(--gold), var(--accent))",
                    backgroundSize: "300% 100%",
                  }}
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
                  }}
                  transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                />
                
                {/* Inner content */}
                <div className="relative m-[2px] rounded-3xl overflow-hidden" style={{ background: "var(--surface)" }}>
                  {/* Decorative corner elements */}
                  <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[var(--accent)]/20 to-transparent rounded-br-3xl" />
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[var(--primary)]/20 to-transparent rounded-tl-3xl" />
                  
                  <div className="relative p-8 lg:p-10">
                    {/* Profile header with creative layout */}
                    <div className="flex flex-col md:flex-row items-start gap-8 mb-2">
                      {/* Image with artistic frame */}
                      <div className="relative flex-shrink-0">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[var(--accent)] via-[var(--primary)] to-[var(--gold)] rounded-2xl blur-lg opacity-70 animate-pulse" />
                        <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-44 lg:h-44 overflow-hidden rounded-2xl shadow-2xl">
                          {firstTrustee.image ? (
                            <Image
                              src={firstTrustee.image}
                              alt={firstTrustee.name}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-102"
                              sizes="176px"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-[var(--accent)]/20 to-[var(--primary)]/20 flex items-center justify-center">
                              <span className="text-4xl font-bold text-[var(--accent)]">{initials(firstTrustee.name)}</span>
                            </div>
                          )}
                        </div>
                        
                        {/* Floating badges */}
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3, type: "spring" }}
                          className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--gold)] flex items-center justify-center shadow-xl"
                        >
                          <Award className="h-5 w-5 text-white" />
                        </motion.div>
                        
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.4, type: "spring" }}
                          className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] flex items-center justify-center shadow-xl"
                        >
                          <Star className="h-4 w-4 text-white fill-white" />
                        </motion.div>
                      </div>

                      {/* Name and role with gradient */}
                      <div className="flex-1">
                        <div className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-3" style={{ background: "rgba(var(--accent-rgb), 0.1)", color: "var(--accent)" }}>
                          LEADERSHIP
                        </div>
                        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                          <span className="block" style={{ color: "var(--text)" }}>{firstTrustee.name}</span>
                          <span className="block mt-1 text-lg sm:text-xl font-medium" style={{ color: "var(--text-muted)" }}>
                            {firstTrustee.role || "Trustee"}
                          </span>
                        </h3>
                        
                      
                      </div>
                    </div>

                    {/* About section with creative quote styling */}
                    <div className="relative mb-1">
                      {/* <Quote className="absolute -left-2 -top-2 h-12 w-12" style={{ color: "var(--accent)", opacity: 0.2 }} /> */}
                      <div
                        className="relative p-6 rounded-2xl"
                        style={{
                          background: "linear-gradient(135deg, rgba(var(--surface-2-rgb), 0.7), rgba(var(--surface-rgb), 0.9))",
                          border: "1px solid rgba(var(--accent-rgb), 0.2)",
                        }}
                      >
                        <p className="text-xs font-bold leading-relaxed" style={{ color: "var(--text-muted)" }}>
                          {howWeAreContent.trusteeText1}  {howWeAreContent.trusteeText2}
                        </p>
                        <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                          •{howWeAreContent.trusteeText3} <br/>
                          •{howWeAreContent.trusteeText4} <br/>
                          •{howWeAreContent.trusteeText5} <br/>
                          •{howWeAreContent.trusteeText6} <br/>
                        </p>
                        <p></p>
                        <p className="text-xs font-bold leading-relaxed" style={{ color: "var(--text-muted)" }}>
                          {howWeAreContent.trusteeText7} <br/>
                     
                        </p>
                        <p><br/></p>
                         <p className="text-xs font-bold text-justify leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        ✨ {howWeAreContent.trusteeText8} <br/>
                     
                        </p>
                        
                      </div>
                    </div>

                    {/* Message card with enhanced design */}
                    <div
                      className="relative overflow-hidden rounded-2xl p-6"
                      style={{
                        background: "linear-gradient(135deg, rgba(var(--primary-rgb), 0.05), rgba(var(--accent-rgb), 0.05))",
                        border: "1px solid rgba(var(--accent-rgb), 0.2)",
                      }}
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[var(--accent)]/20 to-transparent rounded-bl-3xl" />
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[var(--primary)]/20 to-transparent rounded-tr-3xl" />
                      
                      <div className="flex items-start gap-4 relative">
                        <div
                          className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
                          style={{
                            background: "linear-gradient(135deg, var(--primary), var(--accent))",
                          }}
                        >
                          <HeartHandshake className="h-7 w-7 text-white" />
                        </div>
                        
                        <div>
                          <div className="text-sm font-extrabold mb-1" style={{ color: "var(--text)" }}>
                            Message to the community
                          </div>
                          <p className="text-base italic text-justify"  style={{ color: "var(--text-muted)" }}>
                            "{howWeAreContent.trusteeText9}"
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Creative Cards Grid */}
          <motion.div 
            variants={fadeInRight}
            className="lg:col-span-5"
          >
            <div className="grid grid-cols-1 gap-6 h-full">
              {/* Motivation Card - Creative Design */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                <div
                  className="relative overflow-hidden rounded-2xl p-6 shadow-xl"
                  style={{
                    background: "linear-gradient(135deg, var(--surface), var(--surface-2))",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[var(--accent)]/10 to-transparent rounded-bl-3xl" />
                  
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] rounded-xl blur opacity-50" />
                      <div
                        className="relative w-14 h-14 rounded-xl flex items-center justify-center"
                        style={{
                          background: "linear-gradient(135deg, var(--accent), var(--primary))",
                        }}
                      >
                        <Flame className="h-7 w-7 text-white" />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold" style={{ color: "var(--text)" }}>Motivation</h3>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-3 w-3 fill-[var(--accent)] text-[var(--accent)]" />
                        <Star className="h-3 w-3 fill-[var(--accent)] text-[var(--accent)]" />
                        <Star className="h-3 w-3 fill-[var(--accent)] text-[var(--accent)]" />
                        <Star className="h-3 w-3 fill-[var(--accent)] text-[var(--accent)]" />
                        <Star className="h-3 w-3 fill-[var(--accent)] text-[var(--accent)]" />
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {firstTrusteeText.motivation}
                  </p>
                  
                  <div className="mt-4 flex items-center justify-end">
                    <span className="text-xs font-medium" style={{ color: "var(--accent)" }}>Driving force</span>
                  </div>
                </div>
              </div>

              {/* Inspiration Card - Split Design */}
              <div className="relative group">
                <div
                  className="overflow-hidden rounded-2xl shadow-xl"
                  style={{
                    background: "linear-gradient(135deg, var(--surface-2), var(--surface))",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div className="grid grid-cols-3 gap-0">
                    <div
                      className="col-span-1 p-4 flex items-center justify-center"
                      style={{
                        background: "linear-gradient(135deg, var(--primary), var(--accent))",
                      }}
                    >
                      <Lightbulb className="h-8 w-8 text-white" />
                    </div>
                    <div className="col-span-2 p-4">
                      <h3 className="text-lg font-bold mb-2" style={{ color: "var(--text)" }}>Inspiration</h3>
                      <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        {firstTrusteeText.inspiration}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vision Card - Full Width with Gradient Border */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)] via-[var(--primary)] to-[var(--gold)] rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
                <div
                  className="relative overflow-hidden rounded-2xl p-6 shadow-xl"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        background: "linear-gradient(135deg, var(--gold), var(--accent))",
                      }}
                    >
                      <HeartHandshake className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold" style={{ color: "var(--text)" }}>Vision for ALKA</h3>
                  </div>
                  
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {firstTrusteeText.thought}
                  </p>
                  
                  <div className="mt-4 flex justify-end">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--primary)]" />
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--gold)]" />
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[var(--gold)] to-[var(--accent)]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute left-10 bottom-20 w-20 h-20 border border-[var(--accent)]/20 rounded-full -z-5" />
        <div className="absolute right-10 top-40 w-32 h-32 border border-[var(--primary)]/20 rounded-lg rotate-12 -z-5" />
      </div>
    </motion.section>
  );
}