"use client";

import React from "react";
import Image from "next/image";
import { aboutBanner } from "@/app/content/aboutus.banner";

export default function AboutUsBanner() {
  return (
    <section className="w-full">
      <div className="relative h-[260px] sm:h-[420px] w-full overflow-hidden -mt-[80px]">
        <Image
          src={aboutBanner.heroImage}
          alt={aboutBanner.title}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-black/30" />

        <div className="container-page relative h-full">
          <div className="flex h-full items-end pb-8 sm:pb-24 pt-[80px]">
            <div>
              <h1 className="text-4xl sm:text-5xl font-serif font-extrabold text-white">
                {aboutBanner.title}
              </h1>
              <p className="mt-2 max-w-full text-sm sm:text-xl text-white/80">
                {aboutBanner.subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}