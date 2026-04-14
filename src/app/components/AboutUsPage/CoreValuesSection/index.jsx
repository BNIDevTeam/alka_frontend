// "use client";

// import React, { useMemo } from "react";
// import content from "@/app/content/about.visionMission";
// import {
//   Heart,
//   Users,
//   ShieldCheck,
//   HandHeart,
//   BookOpen,
//   Globe,
//   Sparkles,
//   Lightbulb,
//   BadgeCheck,
// } from "lucide-react";

// function valueIcon(name) {
//   const n = (name || "").toLowerCase();
//   if (n.includes("kind")) return Heart;
//   if (n.includes("respect")) return Users;
//   if (n.includes("honest")) return ShieldCheck;
//   if (n.includes("respons")) return HandHeart;
//   if (n.includes("learn")) return BookOpen;
//   if (n.includes("cultural")) return Globe;
//   if (n.includes("empathy")) return Sparkles;
//   if (n.includes("application")) return Lightbulb;
//   return BadgeCheck;
// }

// // nice gradient presets (no border needed)
// const gradients = [
//   "linear-gradient(135deg, color-mix(in oklab, var(--primary), white 22%) 0%, color-mix(in oklab, var(--accent), white 18%) 100%)",
//   "linear-gradient(135deg, color-mix(in oklab, var(--accent), white 18%) 0%, color-mix(in oklab, var(--gold), white 18%) 100%)",
//   "linear-gradient(135deg, color-mix(in oklab, var(--success), white 18%) 0%, color-mix(in oklab, var(--gold), white 24%) 100%)",
//   "linear-gradient(135deg, color-mix(in oklab, var(--primary), white 18%) 0%, color-mix(in oklab, var(--success), white 18%) 100%)",
// ];

// export default function CoreValuesSection() {
//   const valuesBlock = useMemo(() => {
//     const blocks = content?.blocks || [];
//     return blocks.find((b) => b.type === "list") || {};
//   }, []);

//   const items = valuesBlock?.content || [];

//   return (
//     <section className="section">
//       <div className="container-page max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
//         {/* header */}
//         <div className="text-center">
//           <div
//             className="mx-auto inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-extrabold shadow-sm"
//             style={{
//               background: "var(--surface-2)",
//               color: "var(--text-muted)",
//             }}
//           >
//             <Sparkles className="h-4 w-4" style={{ color: "var(--accent)" }} />
//             OUR CORE VALUES
//           </div>

//           <h2
//             className="mt-4 font-serif text-3xl sm:text-4xl"
//             style={{ color: "var(--text)" }}
//           >
//             {valuesBlock.title || "Core Values of ALKA"}
//           </h2>

//           {/* <p
//             className="mx-auto mt-3 max-w-2xl text-sm text-justify sm:text-base"
//             style={{ color: "var(--text-muted)" }}
//           >
//             Our values shape how we think, act, and serve — guiding everyday
//             decisions with kindness, honesty, and purpose.
//           </p> */}

//           <div
//             className="mx-auto mt-5 h-1 w-16 rounded-full"
//             style={{ background: "linear-gradient(90deg, var(--primary), var(--accent))" }}
//           />
//         </div>

//         {/* cards */}
//         <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
//           {items.map((v, idx) => {
//             const Icon = valueIcon(v.title);
//             const bg = gradients[idx % gradients.length];

//             return (
//               <div
//                 key={v.title}
//                 className="group relative overflow-hidden rounded-3xl p-5 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
//                 style={{ background: "var(--surface)" }}
//               >
//                 {/* gradient glow layer */}
//                 <div
//                   className="absolute inset-0 opacity-90 transition group-hover:opacity-100"
//                   style={{ background: bg }}
//                 />

//                 {/* subtle fade for readability (dark-mode safe) */}
//                 <div
//                   className="absolute inset-0"
//                   style={{
//                     background:
//                       "linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.55) 55%, rgba(255,255,255,0.25) 100%)",
//                     mixBlendMode: "overlay",
//                     opacity: 0.55,
//                   }}
//                 />

//                 {/* content */}
//                 <div className="relative z-10">
//                   <div className="flex items-start justify-between gap-3">
//                     <div
//                       className="grid h-12 w-12 place-items-center rounded-2xl shadow-sm"
//                       style={{
//                         background: "color-mix(in oklab, var(--surface), transparent 10%)",
//                       }}
//                     >
//                       <Icon className="h-5 w-5" style={{ color: "var(--primary)" }} />
//                     </div>

//                     <div
//                       className="rounded-full px-3 py-1 text-[11px] font-extrabold"
//                       style={{
//                         background: "rgba(255,255,255,0.55)",
//                         color: "rgba(0,0,0,0.65)",
//                       }}
//                     >
//                       {String(idx + 1).padStart(2, "0")}
//                     </div>
//                   </div>

//                   <div className="mt-4">
//                     <div
//                       className="text-lg font-extrabold"
//                       style={{ color: "var(--text)" }}
//                     >
//                       {v.title}
//                     </div>

//                     <p
//                       className="mt-2 text-sm leading-relaxed"
//                       style={{ color: "var(--text-muted)" }}
//                     >
//                       {v.text}
//                     </p>
//                   </div>

//                   {/* bottom accent */}
//                   <div className="mt-5 flex items-center gap-2">
//                     <span
//                       className="h-1 w-10 rounded-full"
//                       style={{ background: "var(--accent)" }}
//                     />
//                     <span
//                       className="h-1 w-6 rounded-full"
//                       style={{ background: "var(--gold)" }}
//                     />
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* footer note */}
//         <div
//           className="mx-auto mt-10 max-w-3xl rounded-3xl p-6 text-center shadow-sm"
//           style={{ background: "var(--surface-2)" }}
//         >
//           <div className="inline-flex items-center gap-2 text-sm font-extrabold"
//                style={{ color: "var(--text)" }}>
//             <BadgeCheck className="h-5 w-5" style={{ color: "var(--success)" }} />
//             Values are practiced daily — not just written.
//           </div>
//           <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
//             Every initiative at ALKA is rooted in these values — helping people grow with clarity,
//             kindness, and lifelong learning.
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import content from "@/app/content/about.visionMission";
import {
  Heart,
  ShieldCheck,
  BookOpen,
  Sparkles,
  Lightbulb,
  BadgeCheck,
} from "lucide-react";

function valueIcon(name) {
  const n = (name || "").toLowerCase();
  if (n.includes("kind")) return Heart;
  if (n.includes("intention")) return ShieldCheck;
  if (n.includes("learn")) return BookOpen;
  if (n.includes("positivity")) return Lightbulb;
  return BadgeCheck;
}

const gradients = [
  "linear-gradient(135deg, color-mix(in oklab, var(--primary), white 22%) 0%, color-mix(in oklab, var(--accent), white 18%) 100%)",
  "linear-gradient(135deg, color-mix(in oklab, var(--accent), white 18%) 0%, color-mix(in oklab, var(--gold), white 18%) 100%)",
  "linear-gradient(135deg, color-mix(in oklab, var(--success), white 18%) 0%, color-mix(in oklab, var(--gold), white 24%) 100%)",
  "linear-gradient(135deg, color-mix(in oklab, var(--primary), white 18%) 0%, color-mix(in oklab, var(--success), white 18%) 100%)",
];

export default function CoreValuesSection() {
  const valuesBlock = useMemo(() => {
    const blocks = content?.blocks || [];
    return blocks.find((b) => b.type === "list") || {};
  }, []);

  const items = (valuesBlock?.content || []).slice(0, 4); // ensure 4 cards
  const imageSrc = valuesBlock?.image || "/images/about/core-values.jpg";

  return (
    <section className="section">
      <div className="container-page max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* header */}
        <div className="text-center">
          <div
            className="mx-auto inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-extrabold shadow-sm"
            style={{
              background: "var(--surface-2)",
              color: "var(--text-muted)",
            }}
          >
            <Sparkles className="h-4 w-4" style={{ color: "var(--accent)" }} />
            OUR CORE VALUES
          </div>

          <h2
            className="mt-4 font-serif text-3xl sm:text-4xl"
            style={{ color: "var(--text)" }}
          >
            {valuesBlock.title || "Core Values of ALKA"}
          </h2>

          <div
            className="mx-auto mt-5 h-1 w-16 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, var(--primary), var(--accent))",
            }}
          />
        </div>

        {/* TWO COLUMN LAYOUT */}
        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:items-stretch">
          {/* LEFT: 4 cards */}
          <div className="grid gap-5 sm:grid-cols-2">
            {items.map((v, idx) => {
              const Icon = valueIcon(v.title);
              const bg = gradients[idx % gradients.length];

              return (
                <div
                  key={v.title}
                  className="group relative overflow-hidden rounded-3xl p-5 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
                  style={{ background: "var(--surface)" }}
                >
                  <div
                    className="absolute inset-0 opacity-90 transition group-hover:opacity-100"
                    style={{ background: bg }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.55) 55%, rgba(255,255,255,0.25) 100%)",
                      mixBlendMode: "overlay",
                      opacity: 0.55,
                    }}
                  />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between gap-3">
                      <div
                        className="grid h-12 w-12 place-items-center rounded-2xl shadow-sm"
                        style={{
                          background:
                            "color-mix(in oklab, var(--surface), transparent 10%)",
                        }}
                      >
                        <Icon
                          className="h-5 w-5"
                          style={{ color: "var(--primary)" }}
                        />
                      </div>

                      <div
                        className="rounded-full px-3 py-1 text-[11px] font-extrabold"
                        style={{
                          background: "rgba(255,255,255,0.55)",
                          color: "rgba(0,0,0,0.65)",
                        }}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </div>
                    </div>

                    <div className="mt-4">
                      <div
                        className="text-lg font-extrabold"
                        style={{ color: "var(--text)" }}
                      >
                        {v.title}
                      </div>

                      <p
                        className="mt-2 text-sm leading-relaxed"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {v.text}
                      </p>
                    </div>

                    <div className="mt-5 flex items-center gap-2">
                      <span
                        className="h-1 w-10 rounded-full"
                        style={{ background: "var(--accent)" }}
                      />
                      <span
                        className="h-1 w-6 rounded-full"
                        style={{ background: "var(--gold)" }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: full filled image */}
          <div
            className="relative overflow-hidden rounded-3xl shadow-lg min-h-[320px] sm:min-h-[420px] lg:min-h-full"
            style={{ background: "var(--surface)" }}
          >
            <Image
              src={imageSrc}
              alt="ALKA core values"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority={false}
            />

            {/* optional overlay for readability / style */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(245, 241, 241, 0.25) 0%, rgba(233, 230, 230, 0.05) 60%, rgba(216, 210, 210, 0) 100%)",
              }}
            />

            {/* optional label */}
            <div className="absolute bottom-4 left-4 right-4">
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-extrabold shadow-sm"
                style={{
                  background: "rgba(255,255,255,0.75)",
                  color: "rgba(0,0,0,0.75)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <Sparkles className="h-4 w-4" style={{ color: "var(--accent)" }} />
                Core Values
              </div>
            </div>
          </div>
        </div>

        {/* footer note */}
        <div
          className="mx-auto mt-10 max-w-4xl rounded-3xl p-6 text-center shadow-sm"
          style={{ background: "var(--surface-2)" }}
        >
          <div
            className="inline-flex items-center gap-2 text-sm font-extrabold"
            style={{ color: "var(--text)" }}
          >
            <BadgeCheck className="h-5 w-5" style={{ color: "var(--success)" }} />
            Values are practiced daily — not just written.
          </div>
          <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
            Every initiative at ALKA is rooted in these values — helping people
            grow with clarity, kindness, and lifelong learning.
          </p>
        </div>
      </div>
    </section>
  );
}