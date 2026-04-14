"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import information from "@/app/content/info";
import {
  MapPin,
  HeartHandshake,
  Users,
  Sparkles,
  Award,
  Calendar,
  Globe,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function initials(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const a = parts[0]?.[0] || "";
  const b = parts[1]?.[0] || "";
  return (a + b).toUpperCase();
}

// Stable years generator based on name hash
function getYearsFromName(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return (Math.abs(hash) % 5) + 1; // 1-5 years
}

export default function VolunteerCarousel() {
  const volunteers = useMemo(() => {
    const list = [...(information.companyVolunteer || [])];

    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }

    return list;
  }, []);
  const [isClient, setIsClient] = useState(false);
  const [swiper, setSwiper] = useState(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Background decorative elements - Original theme style */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full px-0">
        {/* Enhanced Header - Original theme */}
        <div className="container-page max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="relative">
              {/* <div className="flex items-center gap-3 py-4">
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
                    <Users className="h-4 w-4" />
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      OUR VOLUNTEERS
                    </span>
                  </div>
                </div>
              </div> */}

              <h2
                className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold mt-2"
                style={{ color: "var(--text)" }}
              >
                Our{" "}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Volunteers
                </span>
              </h2>

              <p
                className="mt-4 max-w-full text-lg sm:text-xl"
                style={{ color: "var(--text-muted)" }}
              >
                People from different places, one shared purpose — to serve with
                kindness and create lasting impact.
              </p>

              {/* Stats - Original theme */}
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

        {/* Simple Carousel with Custom Navigation Buttons */}
        {isClient && (
          <div className="mt-12 w-full relative px-4 sm:px-6 lg:px-8 xl:px-10">
            {/* Custom Navigation Buttons */}
            <div className="absolute left-3 sm:-left-4 lg:left-6 top-1/2 -translate-y-1/2 z-20">
              <button
                onClick={() => swiper?.slidePrev()}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                style={{
                  border: "1px solid rgba(0,0,0,0.08)",
                }}
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 group-hover:text-purple-600 transition-colors" />
              </button>
            </div>

            <div className="absolute right-3 sm:-right-4 lg:right-6 top-1/2 -translate-y-1/2 z-20">
              <button
                onClick={() => swiper?.slideNext()}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                style={{
                  border: "1px solid rgba(0,0,0,0.08)",
                }}
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 group-hover:text-purple-600 transition-colors" />
              </button>
            </div>

            <Swiper
              modules={[Navigation]}
              slidesPerView="auto"
              spaceBetween={24}
              onSwiper={setSwiper}
              speed={400}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 16,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
                1280: {
                  slidesPerView: 4,
                  spaceBetween: 24,
                },
              }}
              className="alka-volunteer-swiper"
            >
              {volunteers.map((v, idx) => (
                <SwiperSlide key={`${v.name}-${idx}`}>
                  <VolunteerCard v={v} idx={idx} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {/* Placeholder */}
        {!isClient && (
          <div className="mt-12 w-full">
            <div className="flex justify-center gap-4 px-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-[280px] h-[300px] rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Custom Styles for Swiper */}
      <style jsx global>{`
        .alka-volunteer-swiper {
          padding: 20px 0 40px;
        }

        .alka-volunteer-swiper .swiper-wrapper {
          padding: 10px 0;
        }
      `}</style>
    </section>
  );
}

function VolunteerCard({ v, idx }) {
  const currentYear = new Date().getFullYear();
  const startYear = Number(v.from) || 2023;
  const years = Math.max(currentYear - startYear, 0);

  const gradients = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
  ];
  const cardGradient = gradients[idx % gradients.length];

  return (
    <div
      className="relative overflow-hidden rounded-xl h-full min-h-[320px] group transition-colors duration-300"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: cardGradient }}
      />

      <div className="h-full p-6 flex flex-col">
        <div className="mb-3 flex justify-end">
          <div
            className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider rounded-full"
            style={{
              background: "color-mix(in srgb, var(--text) 8%, transparent)",
              color: "var(--text-muted)",
            }}
          >
            VOLUNTEER
          </div>
        </div>

        <h3
          className="text-2xl font-bold mb-1 leading-tight"
          style={{ color: "var(--text)" }}
        >
          {v.name}
        </h3>

        <p
          className="text-sm pt-4 line-clamp-2"
          style={{ color: "var(--text-muted)" }}
        >
          {v.quote ||
            "Making a difference in the community through dedicated service and compassion."}
        </p>

        <div className="flex items-center gap-2 pt-2">
          <MapPin className="h-4 w-4" style={{ color: "#667eea" }} />
          <span className="text-sm" style={{ color: "var(--text-muted)" }}>
            {v.place}
          </span>
        </div>

        <div className="flex items-center gap-2 pt-3 mb-3">
          <HeartHandshake className="h-4 w-4" style={{ color: "#f093fb" }} />
          <span className="text-sm" style={{ color: "var(--text-muted)" }}>
            {years} year{years > 1 ? "s" : ""} • Since {startYear}
          </span>
        </div>

        <div
          className="mt-auto pt-18 border-t relative"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="absolute inset-0 flex items-center justify-start pointer-events-none select-none overflow-hidden">
            <span
              className="text-5xl sm:text-6xl font-black uppercase tracking-wider whitespace-nowrap"
              style={{
                color: "var(--text)",
                opacity: 0.05,
                lineHeight: 1,
              }}
            >
              VOLUNTEER
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
