"use client";

import Image from "next/image";
import Link from "next/link";
import aboutContent from "@/app/content/home.about";

export default function ImpactStoriesSection() {
  const card1 = aboutContent?.cards?.[0] || {};
  const card2 = aboutContent?.cards?.[1] || {};

  return (
    <section className="relative py-10 sm:py-10">
      <div
        className="relative mx-auto w-[100%] overflow-hidden bg-gradient-to-b from-[#fff7ed]/95 via-[#ffedd5]/80 to-transparent"
        style={{ borderColor: "var(--border)" }}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={
              aboutContent?.backgroundImage ||
              "/images/banners/aboutus_page_banners/core.jpeg"
            }
            alt="Impact stories background"
            fill
            priority
            className="object-cover object-bottom"
            sizes="100vw"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-[#fff7ed]/95 via-[#ffedd5]/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative px-6 py-12 sm:px-10 sm:py-14">
          <div className="text-center">
            <div className="text-sm font-extrabold tracking-[0.22em] text-black/80">
              {aboutContent?.sectionTag || "IMPACT STORIES"}
            </div>

            <div className="mx-auto mt-3 h-[3px] w-10 rounded-full bg-orange-500" />

            <h2 className="mt-6 font-serif text-2xl font-extrabold leading-tight text-black sm:text-4xl">
              {aboutContent?.heading ||
                "Together, we turn empathy into action and dreams into reality!"}
            </h2>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:gap-10">
            <StoryCard
              className="ml-4 sm:ml-10 lg:ml-24"
              label={card1.label}
              title={card1.title}
              text={card1.text}
              href={card1.link}
              btn={card1.button}
            />

            <StoryCard
              className="ml-0 sm:ml-6 lg:ml-16"
              label={card2.label}
              title={card2.title}
              text={card2.text}
              href={card2.link}
              btn={card2.button}
            />
          </div>

          <div className="h-36 sm:h-44" />
        </div>
      </div>
    </section>
  );
}

function StoryCard({ label, title, text, href, btn, className = "mt-20" }) {
  return (
    <div className={`relative ${className} lg:pl-20`}>
      <div className="text-[64px] font-black leading-none text-orange-500/90">
        “
      </div>

      <div className="-mt-3">
        <div className="text-xs font-extrabold tracking-wide text-black/55">
          {(label || "").toUpperCase()}
        </div>

        <h3 className="mt-2 text-lg font-extrabold text-black sm:text-3xl">
          {title}
        </h3>

        <p className="mt-3 max-w-xl text-sm leading-relaxed text-justify text-black sm:text-xl">
          {text}
        </p>

        <div className="mt-6">
          <Link
            href={href || "/"}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-[12px] font-extrabold text-white shadow-sm transition hover:opacity-90 active:opacity-80"
            style={{
              background:
                "linear-gradient(135deg, var(--accent) 0%, var(--primary) 100%)",
                color: "rgba(255,255,255,0.92)"
            }}
          >
            {btn || "READ MORE"}
            <span className="grid h-6 w-6 place-items-center rounded-full bg-white/15 text-white">
              +
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
