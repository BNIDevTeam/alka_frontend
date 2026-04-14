"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Navigation, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

import initiatives  from "@/app/content/about.initiatives";
import {
  MapPin,
  HeartHandshake,
  Users,
  Sparkles,
  Star,
  Award,
  Calendar,
  Globe,
  GalleryHorizontal,
} from "lucide-react";

function initials(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const a = parts[0]?.[0] || "";
  const b = parts[1]?.[0] || "";
  return (a + b).toUpperCase();
}

function accentFor(i) {
  const gradients = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
  ];
  return gradients[i % gradients.length];
}

// Stable years generator based on name hash
function getYearsFromName(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return (Math.abs(hash) % 5) + 1; // 1-5 years
}

export default function ImageSection() {
  const slides = useMemo(() => {
  const groups = (initiatives || []).map((it) =>
    (it.images || []).map((img, idx) => ({
      key: `${it.title}-${idx}`,
      title: it.title,
      date: it.date,
      location: it.location || "",
      description: it.description,
      image: img,
      index: idx + 1,
      totalImages: (it.images || []).length,
    }))
  );

  const mixed = [];
  let stillHasItems = true;

  while (stillHasItems) {
    stillHasItems = false;

    for (let i = 0; i < groups.length; i++) {
      if (groups[i].length > 0) {
        mixed.push(groups[i].shift());
        stillHasItems = true;
      }
    }
  }

  return mixed;
}, []);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section className="py-16 sm:py-0 lg:py-0 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full px-0">
        {/* Enhanced Header */}
        <div className="container-page max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="relative">
              <div className="flex items-center gap-3 py-4">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-30"></div>
                  <div
                    className="relative inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold shadow-lg backdrop-blur-sm"
                    style={{
                      background: "rgba(255, 255, 255, 0.15)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      color: "var(--text)",
                    }}
                  >
                    <GalleryHorizontal className="h-4 w-4" />
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Image Gallery
                    </span>
                  </div>
                </div>
              </div>

              <h2
                className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold mt-2"
                style={{ color: "var(--text)" }}
              >
                Initiative{" "}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Pictures
                </span>
              </h2>

              <p
                className="mt-4 max-w-full text-lg sm:text-xl"
                style={{ color: "var(--text-muted)" }}
              >
                People from different places, one shared purpose — to serve with
                kindness and create lasting impact.
              </p>

              {/* Stats */}
              {/* <div className="flex flex-wrap gap-6 mt-8">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10">
                    <Award className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">250+</div>
                    <div className="text-sm text-gray-500">Active Volunteers</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
                    <Globe className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">15+</div>
                    <div className="text-sm text-gray-500">Countries</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10">
                    <Calendar className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">5K+</div>
                    <div className="text-sm text-gray-500">Hours Served</div>
                  </div>
                </div>
              </div> */}
            </div>

            <div
              className="hidden sm:flex items-center gap-3 text-base font-semibold mt-8 sm:mt-0"
              style={{ color: "var(--text-muted)" }}
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur opacity-20"></div>
                <Sparkles
                  className="relative h-5 w-5 animate-pulse"
                  style={{ color: "var(--gold)" }}
                />
              </div>
              <span className="bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
                Swipe to explore more →
              </span>
            </div>
          </div>
        </div>

        {/* Enhanced Carousel - Only render Swiper on client */}
        {isClient && (
          <div className="mt-16 w-full relative">
            <Swiper
              modules={[Navigation, Autoplay, EffectCoverflow]}
              effect="coverflow"
              loop
              centeredSlides
              slidesPerView="auto"
              spaceBetween={30}
              speed={800}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              navigation={{
                prevEl: ".custom-prev",
                nextEl: ".custom-next",
              }}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
                slideShadows: true,
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1.2,
                  spaceBetween: 20,
                },
                640: {
                  slidesPerView: 1.5,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 2.5,
                  spaceBetween: 40,
                },
                1280: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
              }}
              className="alka-volunteer-swiper-full"
            >
              {slides.map((s, idx) => (
                <SwiperSlide key={s.key} className="alka-slide">
                  <InitiativeImageCard s={s} idx={idx} />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <button className="custom-prev absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-2xl border border-gray-200 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 group">
              <svg
                className="w-6 h-6 text-gray-800 group-hover:text-purple-600 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button className="custom-next absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-2xl border border-gray-200 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 group">
              <svg
                className="w-6 h-6 text-gray-800 group-hover:text-purple-600 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Show placeholder on server */}
        {!isClient && (
          <div className="mt-16 w-full">
            <div className="flex justify-center gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-[380px] h-[420px] rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        )}

        {/* Dots Indicator */}
        {/* <div className="container-page mt-12">
          <div className="flex justify-center items-center gap-2">
            {volunteers.slice(0, 5).map((_, idx) => (
              <button
                key={idx}
                className="w-2 h-2 rounded-full bg-gray-300 transition-all duration-300 hover:scale-125 hover:bg-purple-500"
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div> */}
      </div>

      {/* Enhanced Styles */}
      <style jsx global>{`
        .alka-volunteer-swiper-full {
          padding: 40px 0;
          overflow: visible !important;
        }

        .alka-volunteer-swiper-full .alka-slide {
          width: 380px;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @media (max-width: 640px) {
          .alka-volunteer-swiper-full .alka-slide {
            width: 320px;
          }
        }

        .alka-volunteer-swiper-full .swiper-slide {
          opacity: 0.5;
          transform: scale(0.88);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          filter: blur(1px);
        }

        .alka-volunteer-swiper-full .swiper-slide-active {
          opacity: 1;
          transform: scale(1) !important;
          filter: blur(0);
          z-index: 10;
        }

        .alka-volunteer-swiper-full .swiper-slide-prev,
        .alka-volunteer-swiper-full .swiper-slide-next {
          opacity: 0.8;
          transform: scale(0.95);
          filter: blur(0.5px);
        }

        /* Card hover effects */
        .alka-volunteer-swiper-full .swiper-slide .vol-card {
          transform: translateY(0);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .alka-volunteer-swiper-full .swiper-slide:hover .vol-card {
          transform: translateY(-8px);
        }

        .alka-volunteer-swiper-full .swiper-slide-active .vol-card {
          box-shadow:
            0 20px 60px rgba(0, 0, 0, 0.15),
            0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        /* Hide default navigation */
        .alka-volunteer-swiper-full .swiper-button-prev,
        .alka-volunteer-swiper-full .swiper-button-next {
          display: none;
        }
      `}</style>
    </section>
  );
}

function InitiativeImageCard({ s, idx }) {
  const accent = accentFor(idx);

  return (
    <div className="vol-card relative overflow-hidden rounded-3xl h-full min-h-[420px] group">
      {/* Gradient BG */}
      {/* <div
        className="absolute inset-0 transition-all duration-700 group-hover:scale-110"
        style={{ background: accent }}
      /> */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/18 via-transparent to-black/10" />

      {/* IMAGE */}
      <div className="absolute inset-0 p-3">
        <div className="relative h-full w-full overflow-hidden rounded-2xl">
          <Image
            src={s.image}
            alt={`${s.title} - ${s.date}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 320px, 380px"
            priority={idx < 3}
          />
          {/* readability overlay */}
          {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" /> */}
        </div>
      </div>

      {/* CONTENT */}
      {/* <div className="relative z-10 h-full p-8 flex flex-col justify-between">
       
        <div>
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/18 backdrop-blur-sm border border-white/30">
            <span className="text-sm font-bold text-white">
              {s.title}
            </span>
          </div>

          <div className="mt-4 text-white/90 font-extrabold text-2xl">
            {s.date}
          </div>

          {s.location ? (
            <div className="mt-2 text-white/75 text-sm flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{s.location}</span>
            </div>
          ) : null}
        </div>

        
        <div>
          <div className="text-white/85 text-sm leading-6 line-clamp-4">
            {s.description}
          </div>

          <div className="mt-5 flex items-center justify-between">
            <div className="text-xs font-semibold text-white/70">
              Photo {s.index} of {s.totalImages}
            </div>

            <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold bg-white/18 backdrop-blur-sm border border-white/30 text-white">
              Swipe →
            </span>
          </div>
        </div>
      </div> */}
    </div>
  );
}
