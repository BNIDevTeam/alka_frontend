"use client";

import React from "react";
import Image from "next/image";
import { storiesBanner } from "@/app/content/stories.banner";

export default function StoriesBanner() {
  return (
    <section className="w-full">
      {/* HERO */}
      <div className="relative h-[260px] sm:h-[420px] w-full overflow-hidden -mt-[80px]">
        <Image
          src={storiesBanner.heroImage}
          alt={storiesBanner.title}
          fill
          priority
          className="object-cover object-[center_20%]"
          sizes="100vw"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0" />

        {/* Text */}
        <div className="container-page relative h-full">
          <div className="flex h-full items-end pb-8 sm:pb-24 pt-[80px]">
            <div>
              <h1 className="text-4xl sm:text-5xl font-serif font-extrabold text-white">
                {storiesBanner.title}
              </h1>
              <p className="mt-2 max-w-full text-sm sm:text-xl text-white/80">
                {storiesBanner.subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
