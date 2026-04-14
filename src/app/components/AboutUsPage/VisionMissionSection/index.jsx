// "use client";

// import React, { useMemo, useState } from "react";
// import Image from "next/image";
// import content from "@/app/content/about.visionMission";

// import {
//   Eye,
//   Target,
//   Gem,
//   CheckCircle2,
//   Sparkles,
//   Heart,
//   HandHeart,
//   BookOpen,
//   Users,
//   ShieldCheck,
//   Globe,
//   Lightbulb,
// } from "lucide-react";

// function cx(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// const tabMeta = {
//   "Our Vision": { key: "vision", icon: Eye, tone: "primary" },
//   "Our Mission": { key: "mission", icon: Target, tone: "accent" },
//   "Core Values of ALKA": { key: "values", icon: Gem, tone: "gold" },
// };

// function toneStyles(tone) {
//   if (tone === "accent") {
//     return {
//       pillActive: "text-white shadow-sm",
//       pillActiveStyle: {
//         background:
//           "linear-gradient(135deg, var(--accent) 0%, var(--primary) 100%)",
//       },
//       accentStyle: { background: "var(--accent)" },
//       ring: "ring-black/10",
//     };
//   }
//   if (tone === "gold") {
//     return {
//       pillActive: "text-white shadow-sm",
//       pillActiveStyle: {
//         background:
//           "linear-gradient(135deg, var(--gold) 0%, var(--accent) 100%)",
//       },
//       accentStyle: { background: "var(--gold)" },
//       ring: "ring-black/10",
//     };
//   }
//   // primary default
//   return {
//     pillActive: "text-white shadow-sm",
//     pillActiveStyle: {
//       background:
//         "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)",
//     },
//     accentStyle: { background: "var(--primary)" },
//     ring: "ring-black/10",
//   };
// }

// // icons for core values
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
//   return CheckCircle2;
// }

// export default function VisionMissionSection() {
//   const blocks = content?.blocks || [];
//   const tabs = useMemo(() => blocks.map((b) => b.title), [blocks]);

//   const [active, setActive] = useState(tabs?.[0] || "Our Vision");
//   const block = blocks.find((b) => b.title === active) || blocks[0] || {};

//   const meta = tabMeta[block.title] || tabMeta["Our Vision"];
//   const Icon = meta.icon;
//   const tone = meta.tone;
//   const t = toneStyles(tone);

//   return (
//     <section className="section -mt-12">
//       <div className="container-page max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
//         {/* Header row */}
//         <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
//           <div>
//             <div
//               className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold"
//               style={{
//                 borderColor: "var(--border)",
//                 background: "var(--surface-2)",
//                 color: "var(--text)",
//               }}
//             >
//               <span
//                 className="inline-block h-2 w-2 rounded-full"
//                 style={t.accentStyle}
//               />
//               About ALKA
//             </div>

//             <h2 className="mt-4 font-serif text-3xl sm:text-4xl">
//               {content.title}
//             </h2>

//             <div className="mt-3 h-1 w-14 rounded-full" style={t.accentStyle} />
//           </div>

//           {/* Tabs */}
//           <div className="flex flex-wrap gap-2">
//             {tabs.map((name) => {
//               const m = tabMeta[name] || tabMeta["Our Vision"];
//               const TIcon = m.icon;
//               const isActive = name === active;

//               return (
//                 <button
//                   key={name}
//                   type="button"
//                   onClick={() => setActive(name)}
//                   className={cx(
//                     "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-extrabold transition",
//                     isActive
//                       ? t.pillActive
//                       : "border hover:-translate-y-0.5 hover:shadow-sm",
//                   )}
//                   style={
//                     isActive
//                       ? t.pillActiveStyle
//                       : {
//                           borderColor: "var(--border)",
//                           background: "var(--surface)",
//                         }
//                   }
//                 >
//                   <TIcon
//                     className={cx("h-4 w-4", isActive ? "text-white" : "")}
//                     style={
//                       !isActive ? { color: "var(--text-muted)" } : undefined
//                     }
//                   />
//                   {name === "Core Values of ALKA"
//                     ? "Core Values"
//                     : name.replace("Our ", "")}
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* Main card (like screenshot) */}
//         <div
//           className="mt-10 overflow-hidden rounded-3xl shadow-lg"
//           style={{ background: "var(--surface)" }}
//         >
//           <div className="grid gap-0 lg:grid-cols-12">
//             {/* Left image */}
//             <div className="relative lg:col-span-5">
//               <div className="relative h-[260px] sm:h-[320px] lg:h-full">
//                 <Image
//                   src={block.image}
//                   alt={block.title}
//                   fill
//                   className="object-cover"
//                   sizes="(max-width: 1024px) 100vw, 40vw"
//                 />
//                 {/* soft overlay */}
//                 <div className="absolute inset-0 bg-black/10" />
//               </div>
//             </div>

//             {/* Right content */}
//             <div className="lg:col-span-7">
//               <div className="p-6 sm:p-10">
//                 {/* Title row */}
//                 <div className="flex items-start gap-3">
//                   <div
//                     className="grid h-11 w-11 place-items-center rounded-2xl shadow-sm"
//                     style={{ background: "var(--surface-2)" }}
//                   >
//                     <Icon
//                       className="h-5 w-5"
//                       style={{ color: "var(--primary)" }}
//                     />
//                   </div>

//                   <div>
//                     <h3 className="font-serif text-2xl sm:text-3xl" style={{ color: "var(--text)" }}>
//                       {block.title === "Core Values of ALKA"
//                         ? "Our Core Values"
//                         : block.title}
//                     </h3>

//                     <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
//                       {block.type === "text"
//                         ? "Our vision and mission guide everything we do — from building awareness to nurturing purpose-driven learning."
//                         : "These values shape how we think, act, and serve the community every day."}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Body */}
//                 {block.type === "text" ? (
//                   <div className="mt-6 space-y-4 text-[14px] leading-relaxed" style={{ color: "var(--text-muted)" }}>
//                     <p>{block.content1}</p>
//                     <p>{block.content2}</p>
//                     {block.content3 ? <p>{block.content3}</p> : null}

//                     {/* Stylish bullets */}
//                     <div className="mt-6 space-y-3">
//                       <Bullet tone={tone} title="Changing lives">
//                         Improving lives one step at a time with our
//                         organization.
//                       </Bullet>
//                       <Bullet tone={tone} title="Building futures">
//                         Creating opportunities and a better future through
//                         learning.
//                       </Bullet>
//                       <Bullet tone={tone} title="Movement for change">
//                         Creating impact and promoting positive change through
//                         outreach.
//                       </Bullet>
//                       <Bullet tone={tone} title="Lasting impact">
//                         Striving for long-term impact in the communities we
//                         serve.
//                       </Bullet>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="mt-6">
//                     <div className="grid gap-3 sm:grid-cols-2">
//                       {(block.content || []).map((v) => {
//                         const VIcon = valueIcon(v.title);
//                         return (
//                           <div
//                             key={v.title}
//                             className="rounded-2xl p-4 shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
//                             style={{
//                               background:
//                                 "color-mix(in oklab, var(--surface), transparent 6%)",
//                             }}
//                           >
//                             <div className="flex items-start gap-3">
//                               <div
//                                 className="grid h-9 w-9 place-items-center rounded-xl shadow-sm"
//                                 style={{ background: "var(--surface-2)" }}
//                               >
//                                 <VIcon
//                                   className="h-4 w-4"
//                                   style={{ color: "var(--accent)" }}
//                                 />
//                               </div>

//                               <div>
//                                 <div className="text-sm font-extrabold" style={{ color: "var(--text)" }}>{v.title}</div>
//                                <div className="mt-1 text-[12.5px] leading-relaxed" style={{ color: "var(--text-muted)" }}>{v.text}</div>
//                               </div>
//                             </div>
//                           </div>
//                         );
//                       })}
//                     </div>

//                     <div
//                       className="mt-6 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold shadow-sm"
//                       style={{
//                         background: "var(--surface-2)",
//                         color: "var(--text-muted)",
//                       }}
//                     >
//                       <Sparkles
//                         className="h-4 w-4"
//                         style={{ color: "var(--accent)" }}
//                       />
//                       Values are practiced daily — not just written.
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function Bullet({ tone, title, children }) {
//   const t = toneStyles(tone);
//   return (
//     <div className="flex items-start gap-3">
//       <span
//         className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full shadow-sm"
//         style={{ background: "var(--surface-2)" }}
//       >
//         <CheckCircle2 className="h-4 w-4" style={{ color: t.accentStyle.background }} />
//       </span>

//       <div>
//         <div className="text-sm font-extrabold" style={{ color: "var(--text)" }}>
//           {title}
//         </div>
//         <div className="text-sm" style={{ color: "var(--text-muted)" }}>
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useMemo, useState } from "react";
import content from "@/app/content/about.visionMission";
import { Eye, Target, CheckCircle2, Sparkles } from "lucide-react";

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function toneStyles(tone) {
  if (tone === "accent") {
    return {
      pillActive: "text-white shadow-sm",
      pillActiveStyle: {
        background:
          "linear-gradient(135deg, var(--accent) 0%, var(--primary) 100%)",
      },
      accentStyle: { background: "var(--accent)" },
      ring: "ring-black/10",
    };
  }
  if (tone === "gold") {
    return {
      pillActive: "text-white shadow-sm",
      pillActiveStyle: {
        background:
          "linear-gradient(135deg, var(--gold) 0%, var(--accent) 100%)",
      },
      accentStyle: { background: "var(--gold)" },
      ring: "ring-black/10",
    };
  }
  // primary default
  return {
    pillActive: "text-white shadow-sm",
    pillActiveStyle: {
      background:
        "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)",
    },
    accentStyle: { background: "var(--primary)" },
    ring: "ring-black/10",
  };
}

export default function VisionMissionSection() {
  const blocks = content?.blocks || [];

  // Find vision and mission blocks
  const visionBlock = blocks.find((b) => b.title === "Our Vision") || {};
  const missionBlock = blocks.find((b) => b.title === "Our Mission") || {};

  return (
    <section className="section py-16 sm:py-20">
      <div className="container-page max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div
            className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold mb-4"
            style={{
              borderColor: "var(--border)",
              background: "var(--surface-2)",
              color: "var(--text)",
            }}
          >
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: "var(--accent)" }}
            />
            About ALKA
          </div>

          <h2
            className="font-serif text-3xl sm:text-4xl lg:text-4xl mb-3"
            style={{ color: "var(--text)" }}
          >
            Our Vision & Mission
          </h2>

          <div
            className="mx-auto h-1 w-20 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, var(--primary), var(--accent))",
            }}
          />
        </div>

        {/* Vision & Mission Cards - Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Vision Card */}
          <div
            className="relative h-full overflow-hidden rounded-3xl p-8 lg:p-10 shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(var(--primary-rgb), 0.05), rgba(var(--surface-rgb), 0.8))",
              border: "1px solid var(--border)",
            }}
          >
            {/* Decorative top accent */}
            <div
              className="absolute left-0 top-0 h-1.5 w-full"
              style={{
                background:
                  "linear-gradient(90deg, var(--primary), var(--accent))",
              }}
            />

            {/* Content */}
            <div className="relative h-full flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="grid h-14 w-14 place-items-center rounded-2xl shadow-lg"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--primary), var(--accent))",
                  }}
                >
                  <Eye className="h-7 w-7 text-white" />
                </div>
                <h3
                  className="font-serif text-2xl sm:text-3xl"
                  style={{ color: "var(--text)" }}
                >
                  Our Vision
                </h3>
              </div>

              <div className="space-y-4 flex-1">
                {/* <p
                  className="text-base text-justify leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  <RichText text={visionBlock.content1} />
                </p> */}

                <p
                  className="text-base text-justify leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  <RichText text={visionBlock.content4} />
                </p>

                <br/>

                {visionBlock.content4 && (
                  <p
                    className="text-base text-justify leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <RichText text={visionBlock.content2} />
                  </p>
                )}
              </div>

              {/* Quote/Impact Badge */}
              {visionBlock.quote && (
                <div className="mt-auto pt-6">
                  <div
                    className="h-px w-full mb-4"
                    style={{ background: "var(--border)" }}
                  />
                  <div
                    className="flex items-start gap-3 rounded-2xl p-4"
                    style={{
                      background: "var(--surface-2)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <Sparkles
                      className="h-4 w-4 mt-0.5"
                      style={{ color: "var(--primary)" }}
                    />
                    <p
                      className="text-sm italic font-bold leading-relaxed"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <RichText text={visionBlock.quote} />
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mission Card */}
          <div
            className="relative h-full overflow-hidden rounded-3xl p-8 lg:p-10 shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(var(--accent-rgb), 0.05), rgba(var(--surface-rgb), 0.8))",
              border: "1px solid var(--border)",
            }}
          >
            {/* Decorative top accent */}
            <div
              className="absolute left-0 top-0 h-1.5 w-full"
              style={{
                background:
                  "linear-gradient(90deg, var(--accent), var(--primary))",
              }}
            />

            {/* Content */}
            <div className="relative h-full flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="grid h-14 w-14 place-items-center rounded-2xl shadow-lg"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--accent), var(--primary))",
                  }}
                >
                  <Target className="h-7 w-7 text-white" />
                </div>
                <h3
                  className="font-serif text-2xl sm:text-3xl"
                  style={{ color: "var(--text)" }}
                >
                  Our Mission
                </h3>
              </div>

              <div className="space-y-4 flex-1">
                {missionBlock.content1 && (
                  <p
                    className="text-base text-justify leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <RichText text={missionBlock.content1} />
                  </p>
                )}

                {/* ✨ Creative “How we do it” section */}
                {/* <div
                  className="mt-6 rounded-2xl p-5"
                  style={{
                    background: "var(--surface-2)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="inline-flex h-2 w-2 rounded-full"
                      style={{ background: "var(--accent)" }}
                    />
                    <div
                      className="text-xs font-bold tracking-[0.18em] uppercase"
                      style={{ color: "var(--text)" }}
                    >
                      How we bring the mission to life
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    {[
                      {
                        title: "Awareness",
                        text: "Shift perspective through meaningful learning.",
                      },
                      {
                        title: "Empowerment",
                        text: "Build confidence, clarity, and inner strength.",
                      },
                      {
                        title: "Values",
                        text: "Make kindness & honesty part of everyday life.",
                      },
                    ].map((it, i) => (
                      <div
                        key={i}
                        className="rounded-xl p-3"
                        style={{
                          border: "1px solid var(--border)",
                          background: "var(--surface)",
                        }}
                      >
                        <div
                          className="text-sm font-semibold"
                          style={{ color: "var(--text)" }}
                        >
                          {it.title}
                        </div>
                        <div
                          className="mt-1 text-xs leading-relaxed"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {it.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div
                    className="mt-4 h-1 w-full rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, var(--accent), var(--primary))",
                      opacity: 0.25,
                    }}
                  />
                </div> */}
              </div>

              {/* Key Focus Areas */}
              {/* <div className="mt-8 space-y-3">
                <h4 className="text-sm font-semibold" style={{ color: "var(--text)" }}>Key Focus Areas:</h4>
                <div className="flex flex-wrap gap-2">
                  {['Education', 'Awareness', 'Community', 'Sustainability'].map((item, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        background: "var(--surface-2)",
                        border: "1px solid var(--border)",
                        color: "var(--text-muted)",
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div> */}

              {/* Impact Badge */}
              {missionBlock.quote && (
                <div className="mt-auto pt-6">
                  <div
                    className="h-px w-full mb-4"
                    style={{ background: "var(--border)" }}
                  />
                  <div
                    className="rounded-2xl p-4"
                 
                     style={{
                      background: "var(--surface-2)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle2
                        className="h-4 w-4 mt-0.5"
                        style={{ color: "var(--accent)" }}
                      />
                      <p
                        className="text-sm italic font-bold leading-relaxed"
                        style={{ color: "var(--text-muted)" }}
                      >
                        <RichText text={missionBlock.quote} />
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Quote/Statement */}
        {/* <div className="mt-12 text-center max-w-3xl mx-auto">
          <div
            className="relative p-6 rounded-2xl"
            style={{
              background: "var(--surface-2)",
              border: "1px solid var(--border)",
            }}
          >
            <span
              className="absolute left-4 top-2 font-serif text-6xl opacity-10"
              style={{ color: "var(--accent)" }}
            >
              "
            </span>
            <p
              className="text-sm italic"
              style={{ color: "var(--text-muted)" }}
            >
              Together, we can build a future where every child has access to
              education, every community thrives with awareness, and every
              individual finds purpose.
            </p>
            <span
              className="absolute right-4 bottom-0 font-serif text-6xl opacity-10"
              style={{ color: "var(--accent)" }}
            >
              "
            </span>
          </div>
        </div> */}
      </div>
    </section>
  );

  function RichText({ text }) {
    if (!text) return null;

    // Supports only <b>...</b> tags.
    const parts = String(text).split(/(<b>.*?<\/b>)/g);

    return (
      <>
        {parts.map((part, i) => {
          const match = part.match(/^<b>(.*?)<\/b>$/);
          if (match) {
            return (
              <strong key={i} style={{ color: "var(--text)" }}>
                {match[1]}
              </strong>
            );
          }
          return <React.Fragment key={i}>{part}</React.Fragment>;
        })}
      </>
    );
  }
}
