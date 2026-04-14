"use client";

import React from "react";
import Image from "next/image";
import { HeartHandshake, Sparkles, HandHeart, Calendar, Package } from "lucide-react";

export default function HopeBridge() {
  return (
    <>
      {/* HERO (Navbar overlap ready) */}
      <section className="relative">
        <div className="relative h-[260px] w-full overflow-hidden sm:h-[320px]">
          <Image
            src="/images/banners/donation2.jpg"
            alt="Donation banner"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/30" />

          <div className="container-page relative h-full mt-10">
            <div className="flex h-full items-end pb-12 sm:pb-20 pt-[80px]">
              <div>
               
                <h1 className="mt-4 text-4xl sm:text-5xl font-serif font-extrabold text-white">
                  Donation
                </h1>

                <p className="mt-2 max-w-2xl text-sm sm:text-base text-white/80">
                  At ALKA, learning brings us together and purpose helps us move forward.
                </p>

                <div className="mt-2 flex flex-wrap gap-3">
                  <a
                    href="#donate"
                    className="inline-flex h-11 items-center justify-center rounded-xl px-6 text-sm font-extrabold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                    style={{
                      background: "linear-gradient(135deg, var(--primary), var(--accent))",
                    }}
                  >
                    Donate Now
                  </a>

                  <a
                    href="#mission"
                    className="inline-flex h-11 items-center justify-center rounded-xl px-6 text-sm font-extrabold transition hover:-translate-y-0.5 hover:shadow-md"
                    style={{
                      background: "rgba(255,255,255,0.12)",
                      border: "1px solid rgba(255,255,255,0.22)",
                      color: "rgba(255,255,255,0.9)",
                    }}
                  >
                    How it helps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION / HOW TO SUPPORT */}
      <section id="mission" className="section relative">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(900px 420px at 15% 0%, color-mix(in oklab, var(--primary), transparent 88%), transparent 60%), radial-gradient(900px 420px at 85% 0%, color-mix(in oklab, var(--accent), transparent 88%), transparent 60%)",
          }}
        />
        <div className="container-page">
          <div className="text-center">
            <div
              className="mx-auto inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-extrabold shadow-sm"
              style={{ background: "var(--surface-2)", color: "var(--text-muted)" }}
            >
              <HeartHandshake className="h-4 w-4" style={{ color: "var(--accent)" }} />
              OUR MISSION
            </div>

            <h2 className="mt-4 font-serif text-3xl sm:text-4xl" style={{ color: "var(--text)" }}>
              Ways You Can Support ALKA
            </h2>

            <p className="mx-auto mt-3 max-w-full text-sm sm:text-base" style={{ color: "var(--text-muted)" }}>
              You can contribute through donations, in-kind support, or volunteering — every effort creates impact.
            </p>

            <div
              className="mx-auto mt-5 h-1 w-16 rounded-full"
              style={{ background: "linear-gradient(90deg, var(--primary), var(--accent))" }}
            />
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            <SupportCard
              icon={Calendar}
              title="One-time / Monthly / Quarterly"
              desc="Choose a one-time donation or support us through monthly/quarterly contributions to sustain learning and growth."
              tone="primary"
            />
            <SupportCard
              icon={Package}
              title="In-kind Contributions"
              desc="Donate new or gently used items that bring comfort and dignity to people who need support."
              tone="accent"
            />
            <SupportCard
              icon={HandHeart}
              title="Volunteer Your Time"
              desc="Contribute your time and presence by volunteering — support beneficiaries through care and shared learning."
              tone="gold"
            />
          </div>
        </div>
      </section>

      {/* DONATE (QR + text) */}
      <section id="donate" className="section">
        <div className="container-page">
          <div
            className="relative overflow-hidden rounded-3xl shadow-lg"
            style={{ background: "var(--surface)" }}
          >
            <div
              className="absolute left-0 top-0 h-1 w-full"
              style={{ background: "linear-gradient(90deg, var(--primary), var(--accent))" }}
            />

            <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-12 lg:items-center">
              {/* Left text */}
              <div className="lg:col-span-7">
                <div
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-extrabold"
                  style={{ background: "var(--surface-2)", color: "var(--text-muted)" }}
                >
                  <Sparkles className="h-4 w-4" style={{ color: "var(--accent)" }} />
                  SUPPORT OUR WORK
                </div>

                <h2 className="mt-4 font-serif text-3xl sm:text-4xl" style={{ color: "var(--text)" }}>
                  Your support builds stronger communities
                </h2>

                <p className="mt-4 text-sm sm:text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  Your support helps ALKA reach more people, strengthen communities, and create learning opportunities
                  where they are needed most. Every contribution matters.
                </p>

                <p className="mt-3 text-sm sm:text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  However you choose to support ALKA — through funds, resources, or time — you become part of a journey
                  that empowers people to live with awareness, confidence, and purpose.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="tel:9667166811"
                    className="inline-flex h-11 items-center justify-center rounded-xl px-5 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:shadow-md"
                    style={{
                      background: "linear-gradient(135deg, var(--primary), var(--accent))",
                      color: "rgba(255,255,255,0.92)",
                    }}
                  >
                    Call Us
                  </a>

                  <a
                    href="mailto:withus@alkatrust.com"
                    className="inline-flex h-11 items-center justify-center rounded-xl px-5 text-sm font-extrabold transition hover:-translate-y-0.5 hover:shadow-md"
                    style={{
                      background: "var(--surface-2)",
                      color: "var(--text)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    Email
                  </a>
                </div>
              </div>

              {/* Right QR */}
              <div className="lg:col-span-5">
                <div
                  className="relative rounded-3xl p-6 sm:p-7 shadow-sm"
                  style={{ background: "var(--surface-2)" }}
                >
                  <div
                    className="text-xs font-extrabold tracking-[0.22em]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    MAKE YOUR DONATION
                  </div>

                  <div className="mt-2 font-serif text-2xl" style={{ color: "var(--text)" }}>
                    {/* Scan & Donate */}
                    Kindly contact us on email or call.
                  </div>

                  {/* <div className="mt-5 grid place-items-center">
                    <div
                      className="relative overflow-hidden rounded-2xl shadow-lg"
                      style={{ background: "var(--surface)" }}
                    >
                      <Image
                        src="/images/donation_qr_code.jpg"
                        width={320}
                        height={320}
                        alt="Donation QR code"
                        className="h-auto w-[260px] sm:w-[300px] object-contain"
                        priority={false}
                      />
                    </div>
                  </div>

                  <div
                    className="mt-5 rounded-2xl p-4 text-xs font-bold"
                    style={{ background: "rgba(255,255,255,0.6)", color: "var(--text-muted)" }}
                  >
                    Tip: Use any UPI app to scan. If you face issues, contact us and we’ll help.
                  </div> */}
                </div>
              </div>
            </div>

            {/* soft glow */}
            <div
              className="pointer-events-none absolute -inset-16 -z-10 opacity-60 blur-3xl"
              style={{ background: "linear-gradient(135deg, var(--primary), var(--accent))" }}
            />
          </div>
        </div>
      </section>
    </>
  );
}

function SupportCard({ icon: Icon, title, desc, tone }) {
  const grad =
    tone === "accent"
      ? "linear-gradient(135deg, color-mix(in oklab, var(--accent), white 14%), color-mix(in oklab, var(--gold), white 18%))"
      : tone === "gold"
        ? "linear-gradient(135deg, color-mix(in oklab, var(--gold), white 14%), color-mix(in oklab, var(--accent), white 18%))"
        : "linear-gradient(135deg, color-mix(in oklab, var(--primary), white 14%), color-mix(in oklab, var(--accent), white 18%))";

  return (
    <div className="relative overflow-hidden rounded-3xl p-6 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
         style={{ background: "var(--surface)" }}>
      <div className="absolute inset-0 opacity-90" style={{ background: grad }} />
      <div className="absolute inset-0 opacity-70"
           style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.65), rgba(255,255,255,0.10))" }} />

      <div className="relative z-10">
        <div className="flex items-start gap-4">
          <div
            className="grid h-12 w-12 place-items-center rounded-2xl shadow-sm"
            style={{ background: "rgba(255,255,255,0.7)" }}
          >
            <Icon className="h-6 w-6" style={{ color: "var(--primary)" }} />
          </div>

          <div className="min-w-0">
            <div className="text-lg font-extrabold" style={{ color: "rgba(0,0,0,0.80)" }}>
              {title}
            </div>
            <div className="mt-2 text-sm leading-relaxed" style={{ color: "rgba(0,0,0,0.65)" }}>
              {desc}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
