"use client";

import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import initiatives from "@/app/content/about.initiatives";
import {
  CalendarDays,
  MapPin,
  Images,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Leaf,
  PartyPopper,
  BookOpen,
  Trophy,
  Lightbulb,
  Heart,
} from "lucide-react";

function cx(...c) {
  return c.filter(Boolean).join(" ");
}

function iconFor(title = "") {
  const t = title.toLowerCase();
  if (t.includes("tree") || t.includes("plant")) return Leaf;
  if (t.includes("new year")) return PartyPopper;
  if (t.includes("children")) return BookOpen;
  if (t.includes("cricket") || t.includes("tournament")) return Trophy;
  if (t.includes("life")) return Lightbulb;
  return Sparkles;
}

function InitiativeCard({ it, openGallery }) {
  const imgs = it.images || [];
  const cover = imgs[0];

  const Icon = iconFor(it.title);

  return (
    <div
      className="group relative flex flex-col h-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
      onClick={() => openGallery(imgs, it.title, it.description || "", 0)}
      style={{ background: "var(--surface)" }}
    >
      {/* top gradient strip */}
      <div
        className="absolute left-0 top-0 h-1 w-full z-10"
        style={{ background: "linear-gradient(90deg, var(--primary), var(--accent))" }}
      />

      {/* Cover */}
      <div className="relative h-[180px] sm:h-[220px] overflow-hidden flex-shrink-0">
        {cover ? (
          <Image
            src={cover}
            alt={it.title}
            fill
            className="object-cover transition duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="grid h-full w-full place-items-center" style={{ background: "var(--surface-2)" }}>
            <Images className="h-6 w-6 sm:h-8 sm:w-8" style={{ color: "var(--text-muted)" }} />
          </div>
        )}
        <div className="absolute inset-0 bg-black/10" />

        {/* Tag */}
        <div className="absolute left-3 sm:left-4 top-3 sm:top-4 inline-flex items-center gap-1 sm:gap-2 rounded-full px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-extrabold text-white"
             style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.18)" }}>
          <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
          {it.date}
        </div>
      </div>

      {/* Body - Takes remaining space with flex-grow */}
      <div className="flex flex-col flex-grow p-4 sm:p-5">
        {/* Title */}
        <h3 className="font-serif text-lg sm:text-xl leading-snug" style={{ color: "var(--text)" }}>
          {it.title}
        </h3>

        {/* Description - flex-grow to push button down */}
        <p className="mt-2 sm:mt-3 line-clamp-3 sm:line-clamp-4 text-xs sm:text-sm leading-relaxed flex-grow" style={{ color: "var(--text-muted)" }}>
          {it.description}
        </p>

        {/* Thumbnails - if present */}
        {imgs.length > 1 && (
          <div className="mt-3 sm:mt-4 flex gap-1 sm:gap-2">
            {imgs.slice(0, 3).map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => openGallery(imgs, it.title, it.description || "", i)}
                className="relative h-10 w-10 sm:h-12 sm:w-12 overflow-hidden rounded-xl sm:rounded-2xl border shadow-sm hover:scale-105 transition-transform"
                style={{ borderColor: "var(--border)" }}
                aria-label={`Open ${it.title} image ${i + 1}`}
              >
                <Image src={src} alt="" fill className="object-cover" sizes="48px" />
              </button>
            ))}
            {imgs.length > 3 && (
              <button
                type="button"
                onClick={() => openGallery(imgs, it.title, it.description || "", 0)}
                className="h-10 sm:h-12 rounded-xl sm:rounded-2xl px-2 sm:px-3 text-[10px] sm:text-xs font-extrabold shadow-sm hover:scale-105 transition-transform"
                style={{ background: "var(--surface-2)", color: "var(--text-muted)", border: "1px solid var(--border)" }}
              >
                +{imgs.length - 3}
              </button>
            )}
          </div>
        )}

        {/* Action - Always at bottom with mt-auto */}
        <div className="mt-4 sm:mt-5 flex items-center justify-between gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => openGallery(imgs, it.title, it.description || "", 0)}
            className="inline-flex items-center gap-1 sm:gap-2 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-[10px] sm:text-xs font-extrabold text-white shadow-sm transition-all hover:opacity-90 hover:scale-105"
            style={{ background: "linear-gradient(135deg, var(--primary), var(--accent))" }}
          >
            <Images className="h-3 w-3 sm:h-4 sm:w-4" />
            View Photos
          </button>

          <div className="text-[10px] sm:text-xs font-bold px-2 py-1 rounded-lg" style={{ background: "var(--surface-2)", color: "var(--text-muted)" }}>
            {imgs.length} {imgs.length === 1 ? 'Photo' : 'Photos'}
          </div>
        </div>
      </div>
    </div>
  );
}


export default function InitiativesSection() {
  const items = useMemo(() => initiatives || [], []);
  const [modal, setModal] = useState({
    open: false,
    images: [],
    title: "",
    description: "",
    i: 0,
  });

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (modal.open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [modal.open]);

  const openGallery = (images, title, description = "", i = 0) =>
    setModal({ open: true, images: images || [], title: title || "", description: description || "", i });

  const close = () => setModal({ open: false, images: [], title: "", description: "", i: 0 });

  const next = () =>
    setModal((m) => ({ ...m, i: (m.i + 1) % (m.images.length || 1) }));

  const prev = () =>
    setModal((m) => ({
      ...m,
      i: (m.i - 1 + (m.images.length || 1)) % (m.images.length || 1),
    }));

  return (
    <section className="section py-16 sm:py-20">
      <div className="container-page max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1 sm:gap-2 rounded-full px-4 sm:px-5 py-2 text-[10px] sm:text-xs font-extrabold shadow-sm mb-4"
            style={{
              background: "var(--surface-2)",
              color: "var(--text-muted)",
            }}
          >
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" style={{ color: "var(--accent)" }} />
            OUR INITIATIVES
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-2xl sm:text-3xl lg:text-4xl"
            style={{ color: "var(--text)" }}
          >
            What We have Done So Far
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-3 max-w-2xl text-sm sm:text-base"
            style={{ color: "var(--text-muted)" }}
          >
            Every initiative is a step towards stronger communities — built on
            awareness, learning, and purpose.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mx-auto mt-5 h-1 w-20 rounded-full origin-center"
            style={{
              background: "linear-gradient(90deg, var(--primary), var(--accent))",
            }}
          />
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="h-full"
            >
              <InitiativeCard
                it={it}
                idx={idx}
                openGallery={openGallery}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal gallery */}
      {modal.open && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-2 sm:p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={close} />
          
          <div
            className="relative w-full max-w-7xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl"
            style={{ background: "var(--surface)" }}
          >
            {/* Header - Always at top */}
            <div
              className="flex items-center justify-between border-b px-3 sm:px-5 py-2 sm:py-4"
              style={{ borderColor: "var(--border)" }}
            >
              <div className="min-w-0 flex-1">
                <div
                  className="text-xs sm:text-sm font-extrabold truncate pr-2"
                  style={{ color: "var(--text)" }}
                >
                  {modal.title}
                </div>
                <div
                  className="text-[10px] sm:text-xs"
                  style={{ color: "var(--text-muted)" }}
                >
                  Photo {modal.i + 1} of {modal.images.length}
                </div>
              </div>

              <button
                onClick={close}
                className="inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl border flex-shrink-0 hover:bg-[var(--surface)] transition-colors"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--surface-2)",
                }}
                aria-label="Close"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: "var(--text)" }} />
              </button>
            </div>

            {/* Content - Scrollable on mobile */}
            <div className="overflow-y-auto max-h-[calc(95vh-120px)] sm:max-h-[calc(90vh-130px)]">
              {/* Mobile Layout (stacked) */}
              <div className="block sm:hidden">
                {/* Image Section */}
                <div className="relative h-[40vh] bg-black">
                  <Image
                    src={modal.images[modal.i]}
                    alt=""
                    fill
                    className="object-contain"
                    sizes="100vw"
                  />

                  {modal.images.length > 1 && (
                    <>
                      <button
                        onClick={prev}
                        className="absolute left-2 top-1/2 -translate-y-1/2 grid h-8 w-8 place-items-center rounded-full bg-white/90 shadow-lg hover:bg-white transition hover:scale-110"
                        aria-label="Previous"
                      >
                        <ChevronLeft
                          className="h-5 w-5"
                          style={{ color: "var(--primary)" }}
                        />
                      </button>
                      <button
                        onClick={next}
                        className="absolute right-2 top-1/2 -translate-y-1/2 grid h-8 w-8 place-items-center rounded-full bg-white/90 shadow-lg hover:bg-white transition hover:scale-110"
                        aria-label="Next"
                      >
                        <ChevronRight
                          className="h-5 w-5"
                          style={{ color: "var(--primary)" }}
                        />
                      </button>
                    </>
                  )}
                </div>

                {/* Description Section */}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Heart className="h-4 w-4" style={{ color: "var(--accent)" }} />
                    <span className="text-[10px] font-bold uppercase" style={{ color: "var(--text-muted)" }}>
                      About This Initiative
                    </span>
                  </div>
                  
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
                    {modal.description}
                  </p>

                  {/* Thumbnails */}
                  <div className="mb-4">
                    <div className="text-[10px] font-bold mb-2" style={{ color: "var(--text-muted)" }}>
                      GALLERY
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {modal.images.map((src, i) => (
                        <button
                          key={src}
                          onClick={() => setModal((m) => ({ ...m, i }))}
                          className={cx(
                            "relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all hover:scale-110",
                            i === modal.i
                              ? "opacity-100 scale-105"
                              : "opacity-60 hover:opacity-100",
                          )}
                          style={{
                            borderColor:
                              i === modal.i ? "var(--accent)" : "transparent",
                          }}
                          aria-label={`Open thumbnail ${i + 1}`}
                        >
                          <Image
                            src={src}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="56px"
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Impact Badge */}
                  <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-bold"
                       style={{
                         background: "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)",
                         color: "white",
                         width: "fit-content"
                       }}>
                    <Sparkles className="h-3 w-3" />
                    Making a Difference
                  </div>
                </div>
              </div>

              {/* Desktop Layout (grid) */}
              <div className="hidden sm:grid sm:grid-cols-2">
                {/* Image Section */}
                <div className="relative h-[60vh] bg-black">
                  <Image
                    src={modal.images[modal.i]}
                    alt=""
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 50vw, 800px"
                  />

                  {modal.images.length > 1 && (
                    <>
                      <button
                        onClick={prev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-white/90 shadow-lg hover:bg-white transition hover:scale-110"
                        aria-label="Previous"
                      >
                        <ChevronLeft
                          className="h-6 w-6"
                          style={{ color: "var(--primary)" }}
                        />
                      </button>
                      <button
                        onClick={next}
                        className="absolute right-4 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-white/90 shadow-lg hover:bg-white transition hover:scale-110"
                        aria-label="Next"
                      >
                        <ChevronRight
                          className="h-6 w-6"
                          style={{ color: "var(--primary)" }}
                        />
                      </button>
                    </>
                  )}
                </div>

                {/* Description Section */}
                <div className="p-6 md:p-8 flex flex-col max-h-[60vh] overflow-y-auto">
                  <div className="flex items-center gap-2 mb-4">
                    <Heart className="h-5 w-5" style={{ color: "var(--accent)" }} />
                    <span className="text-xs font-bold uppercase" style={{ color: "var(--text-muted)" }}>
                      About This Initiative
                    </span>
                  </div>
                  
                  <p className="text-sm md:text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
                    {modal.description}
                  </p>

                  {/* Thumbnails */}
                  <div className="mb-6">
                    <div className="text-xs font-bold mb-3" style={{ color: "var(--text-muted)" }}>
                      GALLERY
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {modal.images.map((src, i) => (
                        <button
                          key={src}
                          onClick={() => setModal((m) => ({ ...m, i }))}
                          className={cx(
                            "relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all hover:scale-110",
                            i === modal.i
                              ? "opacity-100 scale-105"
                              : "opacity-60 hover:opacity-100",
                          )}
                          style={{
                            borderColor:
                              i === modal.i ? "var(--accent)" : "transparent",
                          }}
                          aria-label={`Open thumbnail ${i + 1}`}
                        >
                          <Image
                            src={src}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Impact Badge */}
                  <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold"
                       style={{
                         background: "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)",
                         color: "white",
                         width: "fit-content"
                       }}>
                    <Sparkles className="h-3 w-3" />
                    Making a Difference
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}