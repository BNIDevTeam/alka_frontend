// "use client";

// import React from "react";
// import Image from "next/image";
// import { aboutBanner } from "@/app/content/aboutus.banner";

// export default function AboutIntroCollage() {
//   return (
//     <section className="relative">
//       {/* This top padding gives room for overlap on desktop */}
//       <div className="container-page max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-10 sm:py-14 lg:pt-20">
//         <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
//           {/* Left card */}
//           <div className="lg:col-span-7">
//             <div
//               className="relative overflow-hidden rounded-2xl p-6 sm:p-7 shadow-lg"
//               style={{ background: "var(--surface)" }}
//             >
//               {/* top accent */}
//               <div
//                 className="absolute left-0 top-0 h-1 w-full"
//                 style={{
//                   background:
//                     "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)",
//                 }}
//               />

//               {/* heading */}
//               <div className="flex items-start gap-3">
//                 <div
//                   className="grid h-10 w-10 place-items-center rounded-2xl"
//                   style={{ background: "var(--surface-2)" }}
//                 >
//                   <span className="text-lg" aria-hidden="true">
//                     ✨
//                   </span>
//                 </div>

//                 <div>
//                   <h2
//                     className="whitespace-pre-line text-xl sm:text-2xl font-serif font-extrabold"
//                     style={{ color: "var(--text)" }}
//                   >
//                     {aboutBanner.intro.heading}
//                   </h2>
//                   <div
//                     className="mt-2 h-1 w-12 rounded-full"
//                     style={{ background: "var(--accent)" }}
//                   />
//                 </div>
//               </div>

//               {/* intro */}
//               <p
//                 className="mt-4 text-lg text-justify leading-relaxed"
//                 style={{ color: "var(--text-muted)" }}
//               >
//                 {aboutBanner.intro.text}
//               </p>

//               {/* points */}
//               <div className="mt-6 space-y-4">
//                 {aboutBanner.intro.points.map((p, idx) => (
//                   <div
//                     key={p.title}
//                     className="relative rounded-xl p-4 shadow-md"
//                     style={{ background: "var(--surface-2)" }}
//                   >
//                     {/* left vertical accent line */}
//                     <div
//                       className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full"
//                       style={{
//                         background:
//                           idx % 2 === 0
//                             ? "linear-gradient(180deg, var(--primary), var(--accent))"
//                             : "linear-gradient(180deg, var(--accent), var(--gold))",
//                       }}
//                     />

//                     <div className="flex items-start gap-3 pl-3">
//                       {/* icon bubble (token safe) */}
//                       <div
//                         className="mt-0.5 grid h-9 w-9 place-items-center rounded-xl shadow-sm"
//                         style={{
//                           background:
//                             "color-mix(in oklab, var(--surface), transparent 10%)",
//                         }}
//                       >
//                         <span className="text-base" aria-hidden="true">
//                           {idx === 0 ? "✅" : idx === 1 ? "🌱" : "⭐"}
//                         </span>
//                       </div>

//                       <div className="min-w-0">
//                         <div
//                           className="text-[15px] font-extrabold"
//                           style={{ color: "var(--text)" }}
//                         >
//                           {p.title}
//                         </div>
//                         <div
//                           className="mt-1 text-[14px] text-justify leading-relaxed"
//                           style={{ color: "var(--text-muted)" }}
//                         >
//                           {p.text}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Right collage (OVERLAPS HERO on lg+) */}
//           <div className="lg:col-span-5 mt-6">
//             <div className="relative z-10 lg:-mt-[180px]">
//               <div className="relative mx-auto max-w-[560px]">
//                 <div className="grid grid-cols-2 gap-4">
//                   {/* Top-left (tall) */}
//                   <div className="relative h-[310px] overflow-hidden rounded-sm shadow-sm ring-1 ring-black/10 mt-10">
//                     <Image
//                       src={aboutBanner.collage[0].src}
//                       alt={aboutBanner.collage[0].alt}
//                       fill
//                       className="object-cover"
//                       sizes="(max-width: 1024px) 90vw, 560px"
//                     />
//                   </div>

//                   {/* Top-right (small) */}
//                   <div className="relative h-[180px] mt-25 translate-y-2 overflow-hidden rounded-sm shadow-sm ring-1 ring-black/10">
//                     <Image
//                       src={aboutBanner.collage[1].src}
//                       alt={aboutBanner.collage[1].alt}
//                       fill
//                       className="object-cover"
//                       sizes="(max-width: 1024px) 90vw, 560px"
//                     />
//                   </div>

//                   {/* Bottom-left (small) */}
//                   <div className="relative h-[180px] mt-5 -translate-y-2 overflow-hidden rounded-sm shadow-sm ring-1 ring-black/10">
//                     <Image
//                       src={aboutBanner.collage[2].src}
//                       alt={aboutBanner.collage[2].alt}
//                       fill
//                       className="object-cover"
//                       sizes="(max-width: 1024px) 90vw, 560px"
//                     />
//                   </div>

//                   {/* Bottom-right (tall) */}
//                   <div className="relative h-[310px] mt-[-50px] overflow-hidden rounded-sm shadow-sm ring-1 ring-black/10 -mt-[168px]">
//                     <Image
//                       src={aboutBanner.collage[3].src}
//                       alt={aboutBanner.collage[3].alt}
//                       fill
//                       className="object-cover"
//                       sizes="(max-width: 1024px) 90vw, 560px"
//                     />
//                   </div>
//                 </div>

//                 {/* ✅ Removed soft plate behind collage */}
//                 {/* <div className="pointer-events-none absolute -inset-3 -z-10 rounded-3xl bg-white/45 blur-[1px]" /> */}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* little bottom padding */}
//       <div className="h-6 sm:h-10" />
//     </section>
//   );
// }

"use client";

import React from "react";
import Image from "next/image";
import { aboutBanner } from "@/app/content/aboutus.banner";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutIntroCollage() {
  const heroImg = aboutBanner?.collage?.[0];
  const smallImg = aboutBanner?.collage?.[1];
  const heading1 =
    aboutBanner?.intro?.heading?.slice(0, 15) || "Learning Today";
  const heading2 =
    aboutBanner?.intro?.heading?.slice(16, 33) || "Leading Tomorrow";

  return (
    <section className="relative overflow-hidden">
      <div className="container-page max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-10 sm:py-14 lg:py-16">
        {/* TOP ROW */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-8">
            {/* Big Title with small round image */}
            <div className="flex items-start gap-4">
              <h2
                className="mt-4 font-extrabold tracking-tight leading-[0.95] flex-1"
                style={{ color: "var(--text)" }}
              >
                <span className="block text-5xl sm:text-6xl lg:text-7xl">
                  {heading1}
                </span>
                <span className="block text-5xl sm:text-6xl lg:text-7xl py-5 bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] bg-clip-text text-transparent">
                  {heading2}
                </span>
              </h2>

              {/* Small round image near heading */}
              <div className="relative flex-shrink-0 mt-8">
                {/* <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-full overflow-hidden border-2 border-white shadow-xl">
                  {smallImg?.src && (
                    <Image
                      src="/images/logo/alka_logo.png"
                      alt={smallImg.alt || "ALKA"}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  )}
                </div> */}
                {/* Decorative dot */}
                {/* <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] border-2 border-white" /> */}
              </div>
            </div>

            <p
              className="mt-6 max-w-full text-[15px] text-justify sm:text-lg leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              {aboutBanner?.intro?.text || "About us"}
            </p>

            <p
              className="pt-6 max-w-full text-[15px] sm:text-lg leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              {aboutBanner?.intro?.text2 || "About us"}
            </p>

            <p
              className="pt-6 mx-auto max-w-4xl text-center text-[16px] sm:text-2xl leading-relaxed font-bold italic"
              style={{ color: "var(--text)" }}
            >
              {aboutBanner?.intro?.text3 || "About us"}
            </p>
            <p
              className="pt-6 max-w-full text-[15px] sm:text-lg leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              {aboutBanner?.intro?.text4 || "About us"}
            </p>

          </div>
          

          {/* RIGHT: SINGLE CIRCLE IMAGE */}
          <div className="lg:col-span-4">
            <div className="relative flex justify-center lg:justify-end">
              {/* circular ring with text feel */}
              <div className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px]">
                {/* Outer text ring */}
                <div className="absolute -inset-8 flex items-center justify-center pointer-events-none">
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <defs>
                      <path
                        id="circleTextPath"
                        d="M 100,100 m -85,0 a 85,85 0 1,1 170,0 a 85,85 0 1,1 -170,0"
                        fill="none"
                      />
                    </defs>
                    <text
                      fill="currentColor"
                      fontSize="10"
                      fontWeight="600"
                      letterSpacing="1.5"
                    >
                      <textPath href="#circleTextPath" startOffset="0%">
                        <tspan fill="var(--accent)">LEARNING TODAY </tspan>
                        <tspan fill="var(--text-muted)">• </tspan>
                        <tspan fill="var(--primary)">LEADING TOMORROW </tspan>
                        <tspan fill="var(--text-muted)">• </tspan>
                        <tspan fill="var(--accent)">LEARNING TODAY </tspan>
                        <tspan fill="var(--text-muted)">• </tspan>
                        <tspan fill="var(--primary)">LEADING TOMORROW </tspan>
                      </textPath>
                    </text>
                  </svg>
                </div>

                {/* Image */}
                <div className="absolute inset-6 overflow-hidden rounded-full">
                  {heroImg?.src && (
                    <Image
                      src={heroImg.src}
                      alt={heroImg.alt || "ALKA"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 340px, 380px"
                      priority
                    />
                  )}

                  {/* soft gloss */}
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.18), transparent 50%)",
                    }}
                  />
                </div>

                {/* Floating decorative elements */}
                <div className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] opacity-60 blur-md" />
                <div className="absolute -right-2 -bottom-2 h-4 w-4 rounded-full bg-gradient-to-r from-[var(--gold)] to-[var(--accent)] opacity-60 blur-sm" />
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW */}
        <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:items-center">
          {/* Bottom-left small image */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-4">
              {/* Multiple small images */}
              <div className="flex items-center -space-x-3">
                {(aboutBanner?.collage || []).slice(1, 5).map((img, idx) => (
                  <div
                    key={idx}
                    className="relative h-14 w-14 overflow-hidden rounded-full"
                    style={{
                      border: "2px solid var(--surface)",
                      boxShadow: "0 10px 22px rgba(0,0,0,0.10)",
                      background: "var(--surface)",
                      zIndex: 10 - idx,
                    }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt || `ALKA ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                ))}
              </div>

              {/* Text */}
              <div>
                <div
                  className="text-lg font-extrabold"
                  style={{ color: "var(--text)" }}
                >
                  {aboutBanner?.intro?.statValue || "10,000+"}
                </div>
                <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                  {aboutBanner?.intro?.statLabel || "People impacted"}
                </div>
              </div>
            </div>
          </div>

          {/* Middle: Features */}
          <div className="lg:col-span-5">
            <div
              className="rounded-2xl p-5"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                boxShadow: "0 18px 40px rgba(0,0,0,0.06)",
              }}
            >
              <div
                className="text-sm font-bold"
                style={{ color: "var(--text)" }}
              >
                {aboutBanner?.intro?.points?.[0]?.title}
              </div>
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                {aboutBanner?.intro?.points?.[0]?.text}
              </p>
            </div>
          </div>

          {/* Right: Our story + arrow button */}
          <div className="lg:col-span-4">
            <div className="flex items-stretch gap-4">
              <div
                className="flex-1 rounded-2xl p-5"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  boxShadow: "0 18px 40px rgba(0,0,0,0.06)",
                }}
              >
                <div
                  className="text-sm font-bold"
                  style={{ color: "var(--text)" }}
                >
                  {aboutBanner?.intro?.rightTitle || "Our story"}
                </div>
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  {aboutBanner?.intro?.rightText ||
                    "Purpose-led learning that transforms perspective and strengthens communities."}
                </p>
              </div>
              <Link
                href="/gallery"
                className="h-auto w-14 rounded-2xl grid place-items-center"
                style={{
                  background:
                    "linear-gradient(135deg, var(--accent) 0%, var(--primary) 100%)",
                  color: "white",
                  boxShadow: "0 18px 40px rgba(0,0,0,0.10)",
                }}
                aria-label="Explore"
              >
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
