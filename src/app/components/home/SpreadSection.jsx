"use client";

import { useState } from "react";
import Image from "next/image";
import spreadData from "@/app/content/home.spread";
import { Quote } from "lucide-react";
import Link from "next/link";

function toneBg(tone) {
  switch (tone) {
    case "danger":
      return "var(--danger)";
    case "accent":
      return "var(--accent)";
    case "gold":
      return "var(--gold)";
    case "success":
      return "var(--success)";
    default:
      return "var(--primary)";
  }
}

function getAbsoluteUrl(pathOrUrl) {
  if (!pathOrUrl) return "";
  if (pathOrUrl.startsWith("http")) return pathOrUrl;
  if (typeof window === "undefined") return pathOrUrl;
  return `${window.location.origin}${pathOrUrl}`;
}

export default function SpreadSection() {
  const [copiedIndex, setCopiedIndex] = useState(null);

  async function copyLink(file, index) {
    try {
      const url = getAbsoluteUrl(file);
      await navigator.clipboard.writeText(url);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1200);
    } catch {}
  }

  return (
    <section className="section relative overflow-hidden">
      {/* subtle background decor */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full blur-3xl opacity-25"
          style={{ background: "var(--accent)" }}
        />
        <div
          className="absolute -bottom-28 -left-20 h-[520px] w-[520px] rounded-full blur-3xl opacity-20"
          style={{ background: "var(--primary)" }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left content */}
          <div className="lg:col-span-7">
            <div
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold"
              style={{
                borderColor: "var(--border)",
                background: "var(--surface)",
              }}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: "var(--success)" }}
              />
              Ready-to-share templates
            </div>

            <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">
              {spreadData.title}
            </h2>

            <p className="p-muted mt-3 text-base sm:text-[17px] leading-relaxed">
              {spreadData.description}
            </p>

          

            {spreadData.tip && (
              <div
                className="mt-7 rounded-3xl  p-5 sm:p-7 shadow-sm relative overflow-hidden"
                style={{
                  borderColor: "var(--border)",
                  background:
                    "linear-gradient(180deg, var(--surface) 0%, var(--surface-2) 100%)",
                }}
              >
                {/* Large decorative quote icon */}
                {/* <Quote
                  className="absolute left-2 top-5 h-16 w-16 sm:h-20 sm:w-20 opacity-10"
                  style={{ color: "var(--primary)" }}
                /> */}

                {/* Motivational Quote */}
                <div className="relative z-10 text-center py-4 sm:py-6">
                  <p
                    className="font-serif text-lg sm:text-xl md:text-5xl leading-relaxed max-w-full mx-auto"
                    style={{ color: "var(--text)" }}
                  >
                    {/* The future depends on what we do in the present. Every
                    small act of kindness, every moment of learning, and every
                    step we take together creates ripples of change that last
                    for generations. */}
                    {spreadData.quoute}
                  </p>

                  {/* <div className="mt-4 flex items-center justify-center gap-3">
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--accent)]" />
                    <span
                      className="text-sm font-medium"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Mahatma Gandhi
                    </span>
                    <div className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--primary)]" />
                  </div> */}

                  <div className="mt-6 flex flex-wrap gap-3 justify-center">
                    {/* <a
                      href="/contactus"
                      className="btn-ghost h-10 px-4 text-sm inline-flex items-center gap-2"
                    >
                      Join the movement
                    </a> */}
                    <Link
                      href="/donation"
                      className="btn-accent h-10 px-4 text-sm inline-flex items-center gap-2"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--accent) 0%, var(--primary) 100%)",
                        boxShadow: "0 8px 20px -8px var(--accent)",
                        color: "rgba(255,255,255,0.92)"
                      }}
                    >
                      Support ALKA
                    </Link>
                  </div>
                </div>
                
              </div>
            )}
          </div>

          {/* Templates */}
          <div className="lg:col-span-5 mt-12">
            {/* Responsive grid: phones 1 col, md 2 cols, xl 3 cols if space */}
            <div className="grid gap-6 sm:grid-cols-1 xl:grid-cols-1">
              {spreadData.templates.map((template, index) => {
                const bg = toneBg(template.tone);
                const fileName =
                  (template.file || "").split("/").pop()?.split("?")[0] ||
                  "template";

                return (
                  <div
                    key={index}
                    className="group relative flex h-full flex-col overflow-hidden rounded-3xl border shadow-sm transition
                               hover:-translate-y-0.5 hover:shadow-lg"
                    style={{
                      borderColor: "var(--border)",
                      background: "var(--surface)",
                    }}
                  >
                    {/* top accent + glow */}
                    <div
                      className="absolute left-0 top-0 h-1 w-full"
                      style={{ background: bg }}
                    />
                    <div
                      className="pointer-events-none absolute -top-24 right-[-60px] h-52 w-52 rounded-full blur-3xl opacity-25"
                      style={{ background: bg }}
                    />

                    {/* image */}
                    <div className="relative">
                      <div className="relative overflow-hidden">
                        <Image
                          src={template.image}
                          alt={template.alt || "Template preview"}
                          width={1200}
                          height={900}
                          className="h-56 w-full object-cover transition duration-500 group-hover:scale-[1.03] sm:h-60"
                          sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                      </div>

                      {/* badge */}
                      <div
                        className="absolute left-4 top-4 flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold text-white"
                        style={{
                          background: "rgba(0,0,0,0.35)",
                          border: "1px solid rgba(255,255,255,0.20)",
                          backdropFilter: "blur(10px)",
                        }}
                      >
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ background: bg }}
                        />
                        Share Template
                      </div>

                      {/* status pill */}
                      <div
                        className="absolute right-4 top-4 rounded-full px-2.5 py-1 text-[11px] font-bold text-white"
                        style={{
                          background: "rgba(0,0,0,0.35)",
                          border: "1px solid rgba(255,255,255,0.18)",
                          backdropFilter: "blur(10px)",
                        }}
                      >
                        Ready
                      </div>
                    </div>

                    {/* content */}
                    <div className="flex flex-1 flex-col p-5">
                      <div className="min-w-0">
                        <div className="font-serif text-lg leading-snug">
                          {template.alt || "Template"}
                        </div>
                        <div
                          className="mt-1 truncate text-xs"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {fileName}
                        </div>
                      </div>

                      <p className="p-muted mt-3 text-sm leading-relaxed">
                        Use this design to share ALKA’s message on social media
                        or print.
                      </p>

                      <div className="mt-auto pt-5 grid grid-cols-1 gap-3">
                        <a
                          href={template.file}
                           target="_blank"
                          rel="noreferrer"
                          className="inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold text-white transition
                                     hover:opacity-90 active:opacity-80 focus:outline-none focus-visible:ring-2"
                          style={{
                            background: `linear-gradient(135deg, ${bg} 0%, ${bg} 60%, rgba(255,255,255,0.10) 140%)`,
                            boxShadow: "0 10px 24px rgba(0,0,0,0.12)",
                          }}
                        >
                          {template.buttonText || "Download"}
                        </a>

                        <button
                          type="button"
                          onClick={() => copyLink(template.file, index)}
                          className="btn-ghost h-11 text-sm transition focus:outline-none focus-visible:ring-2"
                          style={{
                            borderColor: "var(--border)",
                          }}
                        >
                          {copiedIndex === index
                            ? "Link copied ✅"
                            : "Copy share link"}
                        </button>
                      </div>
                    </div>

                    {/* subtle border highlight on hover */}
                    <div
                      className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition group-hover:opacity-100"
                      style={{
                        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
                      }}
                    />
                  </div>
                );
              })}
            </div>

            <p className="p-muted mt-5 text-xs leading-relaxed">
              Tip: Copy the link and share it on WhatsApp/Instagram/LinkedIn to
              help more people find ALKA.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
