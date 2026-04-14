"use client";

import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import content from "@/app/content/contactContent";
import spreadData from "@/app/content/home.spread";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  Users,
  HandHeart,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Download,
  Copy,
  Check,
  Share2,
  Clock,
} from "lucide-react";

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

function normalizePhone(phone) {
  return String(phone || "").replace(/\s+/g, "");
}

function normalizeEmail(email) {
  return String(email || "").trim();
}

const OPTIONS = [
  { value: "Volunteer", label: "Volunteer", icon: Users },
  { value: "Partner", label: "Partner", icon: HandHeart },
  { value: "Learner", label: "Learner", icon: BookOpen },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

function FancySelect({
  value,
  onChange,
  options,
  placeholder = "Select",
  hasError,
}) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);
  const Icon = selected?.icon;

  useEffect(() => {
    const onDoc = (e) => {
      if (!e.target.closest?.("[data-fancyselect]")) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div data-fancyselect className="relative">
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="h-11 w-full rounded-xl px-4 pr-10 text-left text-sm transition"
        style={{
          background: "var(--surface-2)",
          color: "var(--text)",
          border: hasError
            ? "1px solid var(--danger)"
            : "1px solid var(--border)",
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="block truncate">
          {selected ? selected.label : placeholder}
        </span>

        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
          {Icon ? (
            <Icon className="h-4 w-4" style={{ color: "var(--text-muted)" }} />
          ) : (
            <Users className="h-4 w-4" style={{ color: "var(--text-muted)" }} />
          )}
        </span>
      </button>

      {open && (
        <div
          className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border shadow-xl"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
          role="listbox"
        >
          {options.map((o) => {
            const ActiveIcon = o.icon;
            const active = o.value === value;

            return (
              <button
                key={o.value}
                type="button"
                onClick={() => {
                  onChange({
                    target: { name: "service_name", value: o.value },
                  });
                  setOpen(false);
                }}
                className="flex w-full items-center gap-3 px-4 py-3 text-sm transition hover:bg-white/5"
                style={{
                  background: active
                    ? "color-mix(in oklab, var(--accent), transparent 88%)"
                    : "transparent",
                  color: "var(--text)",
                }}
              >
                <span
                  className="grid h-8 w-8 place-items-center rounded-lg"
                  style={{
                    background: active
                      ? "color-mix(in oklab, var(--accent), transparent 75%)"
                      : "var(--surface-2)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <ActiveIcon
                    className="h-4 w-4"
                    style={{ color: "var(--text)" }}
                  />
                </span>

                <span className="flex-1 text-left">{o.label}</span>

                {active && (
                  <Check
                    className="h-4 w-4"
                    style={{ color: "var(--accent)" }}
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Field({ label, required, input, error }) {
  return (
    <div>
      <div
        className="mb-1.5 flex items-center gap-1 text-sm font-medium"
        style={{ color: "var(--text)" }}
      >
        {label}
        {required && <span style={{ color: "var(--accent)" }}>*</span>}
      </div>

      {input}

      {error ? (
        <div className="mt-1 text-xs" style={{ color: "var(--danger)" }}>
          {error}
        </div>
      ) : null}
    </div>
  );
}

function ContactCard({ icon: Icon, title, text, href }) {
  const isExternal = href?.startsWith("http");

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer noopener" : undefined}
      className="group flex items-start gap-3 rounded-xl p-4 transition-all hover:-translate-y-1 hover:shadow-lg"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      <div
        className="grid h-9 w-9 shrink-0 place-items-center rounded-lg"
        style={{
          background: "linear-gradient(135deg, var(--primary), var(--accent))",
        }}
      >
        <Icon className="h-4 w-4 text-white" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium" style={{ color: "var(--text)" }}>
          {title}
        </div>
        <div
          className="mt-0.5 text-xs truncate"
          style={{ color: "var(--text-muted)" }}
        >
          {text}
        </div>
      </div>

      <div
        className="text-xs opacity-0 transition-opacity group-hover:opacity-100"
        style={{ color: "var(--accent)" }}
      >
        →
      </div>
    </a>
  );
}

function FlyerCard({ template, index, copiedIndex, copyLink }) {
  const bg = toneBg(template.tone);
  const fileName =
    (template.file || "").split("/").pop()?.split("?")[0] || "template";
  const isCopied = copiedIndex === index;

  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-2xl border"
      style={{
        borderColor: "var(--border)",
        background: "var(--surface)",
      }}
    >
      <div
        className="absolute left-0 top-0 h-1 w-full"
        style={{ background: bg }}
      />

      <div className="relative">
        <div className="relative h-90 overflow-hidden">
          <Image
            src={template.image}
            alt={template.alt || "Template preview"}
            width={400}
            height={300}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>

        <div className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/40 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
          <span
            className="mr-1 inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: bg }}
          />
          Template
        </div>
      </div>

      <div className="p-4">
        <div className="font-serif text-base" style={{ color: "var(--text)" }}>
          {template.alt || "Template"}
        </div>
        <div
          className="mt-1 truncate text-xs"
          style={{ color: "var(--text-muted)" }}
        >
          {fileName}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <a
            href={template.file}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-1 rounded-lg py-2 text-xs font-medium text-white transition-opacity hover:opacity-90"
            style={{ background: bg }}
          >
            <Download className="h-3 w-3" />
            Download
          </a>

          <button
            type="button"
            onClick={() => copyLink(template.file, index)}
            className="flex items-center justify-center gap-1 rounded-lg py-2 text-xs font-medium transition-colors hover:bg-white/5"
            style={{
              background: "var(--surface-2)",
              border: "1px solid var(--border)",
              color: "var(--text)",
            }}
          >
            {isCopied ? (
              <>
                <Check
                  className="h-3 w-3"
                  style={{ color: "var(--success)" }}
                />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                Copy
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ContactUsSection() {
  const [formData, setFormData] = useState({
    your_name: "",
    your_email: "",
    phone_number: "",
    service_name: "",
    your_message: "",
    website: "", // honeypot
  });

  const [touched, setTouched] = useState(false);
  const [errors, setErrors] = useState({});
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: false,
    message: "",
  });

  const selected = useMemo(
    () => OPTIONS.find((o) => o.value === formData.service_name),
    [formData.service_name],
  );

  function validate(values) {
    const e = {};

    const your_name = String(values.your_name || "").trim();
    const your_email = String(values.your_email || "").trim();
    const phone_number = String(values.phone_number || "").trim();
    const service_name = String(values.service_name || "").trim();
    const your_message = String(values.your_message || "").trim();

    if (!your_name) e.your_name = "Please enter your name.";
    else if (your_name.length < 2 || your_name.length > 80) {
      e.your_name = "Name must be between 2 and 80 characters.";
    }

    if (!your_email) e.your_email = "Please enter your email.";
    else if (!/^\S+@\S+\.\S+$/.test(your_email)) {
      e.your_email = "Please enter a valid email.";
    } else if (your_email.length > 120) {
      e.your_email = "Email is too long.";
    }

    if (!phone_number) e.phone_number = "Please enter your phone number.";
    else {
      const digits = phone_number.replace(/\D/g, "");
      if (digits.length < 10 || digits.length > 15) {
        e.phone_number = "Please enter a valid phone number.";
      }
    }

    if (!service_name) e.service_name = "Please select one option.";
    else if (!OPTIONS.some((opt) => opt.value === service_name)) {
      e.service_name = "Please select a valid option.";
    }

    if (!your_message) e.your_message = "Please write a message.";
    else if (your_message.length < 10 || your_message.length > 2000) {
      e.your_message = "Message must be between 10 and 2000 characters.";
    }

    return e;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "your_name" || name === "your_email" || name === "your_message"
          ? value.replace(/\s{2,}/g, " ")
          : value,
    }));

    if (touched) {
      const next = {
        ...formData,
        [name]: value,
      };
      setErrors(validate(next));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched(true);
    const eMap = validate(formData);
    setErrors(eMap);

    if (Object.keys(eMap).length > 0) {
      setStatus({
        loading: false,
        success: false,
        error: false,
        message: "",
      });
      return;
    }

    setStatus({
      loading: true,
      success: false,
      error: false,
      message: "",
    });

    try {
      const payload = {
        your_name: formData.your_name.trim(),
        your_email: formData.your_email.trim(),
        phone_number: formData.phone_number.trim(),
        service_name: formData.service_name,
        your_message: formData.your_message.trim(),
        website: formData.website, // honeypot
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (data?.errors && typeof data.errors === "object") {
          setErrors(data.errors);
        }

        throw new Error(data?.message || "Failed to send message");
      }

      setStatus({
        loading: false,
        success: true,
        error: false,
        message: "",
      });

      setFormData({
        your_name: "",
        your_email: "",
        phone_number: "",
        service_name: "",
        your_message: "",
        website: "",
      });

      setTouched(false);
      setErrors({});
    } catch (err) {
      setStatus({
        loading: false,
        success: false,
        error: true,
        message:
          err?.message || "Something went wrong. Please try again later.",
      });
    }
  };

  async function copyLink(file, index) {
    try {
      const url = getAbsoluteUrl(file);
      await navigator.clipboard.writeText(url);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1200);
    } catch {
      // no-op
    }
  }

  return (
    <section className="relative">
      <div className="relative h-[260px] w-full overflow-hidden sm:h-[320px]">
        <Image
          src="/images/banners/contact_banner.png"
          alt="Contact banner"
          fill
          priority
          className="object-cover object-[center_35%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/5" />

        <div className="container-page relative h-full">
          <div className="flex h-full items-end pb-8 pt-[80px] sm:pb-20">
            <div>
              <h1 className="text-4xl font-serif font-extrabold text-white sm:text-5xl">
                {content.title}
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-white/80 sm:text-base">
                {content.subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(900px 380px at 20% 10%, color-mix(in oklab, var(--primary), transparent 85%), transparent 60%), radial-gradient(900px 380px at 80% 0%, color-mix(in oklab, var(--accent), transparent 85%), transparent 60%)",
        }}
      />

      <div className="container-page mx-auto mt-16 max-w-[1600px] px-4 sm:mt-20 sm:px-6 lg:px-8 xl:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 gap-8 lg:grid-cols-12"
        >
          <div className="space-y-6 lg:col-span-6">
            <motion.div variants={fadeInUp} className="space-y-4">
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium"
                style={{
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                  color: "var(--text-muted)",
                }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: "var(--accent)" }}
                />
                SPREAD THE WORD
              </div>

              <h2
                className="font-serif text-2xl"
                style={{ color: "var(--text)" }}
              >
                Your Voice Can Inspire Change
              </h2>

              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                Sometimes, the biggest support you can give is simply sharing
                our message. When you talk about ALKA, you help more people
                discover learning, awareness, and purpose.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h3
                className="font-serif text-lg"
                style={{ color: "var(--text)" }}
              >
                Download Flyer
              </h3>
              <p
                className="mt-1 text-xs"
                style={{ color: "var(--text-muted)" }}
              >
                Share these to help spread ALKA&apos;s mission
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-4">
              {spreadData.templates.slice(0, 2).map((template, index) => (
                <FlyerCard
                  key={index}
                  template={template}
                  index={index}
                  copiedIndex={copiedIndex}
                  copyLink={copyLink}
                />
              ))}
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-2 rounded-lg p-3 text-xs"
              style={{
                background: "var(--surface-2)",
                color: "var(--text-muted)",
              }}
            >
              <Share2 className="h-3 w-3" style={{ color: "var(--accent)" }} />
              <span>
                Copy links and share on WhatsApp, Instagram, or LinkedIn
              </span>
            </motion.div>
          </div>

          <motion.div variants={fadeInUp} className="lg:col-span-6">
            <div
              className="relative overflow-hidden rounded-3xl border"
              style={{
                borderColor: "var(--border)",
                background: "var(--surface)",
              }}
            >
              <div
                className="absolute left-0 top-0 h-1 w-full"
                style={{
                  background:
                    "linear-gradient(90deg, var(--primary), var(--accent))",
                }}
              />

              <div className="p-6 sm:p-8">
                {!status.success ? (
                  <>
                    <div
                      className="relative mb-8 rounded-2xl p-6 text-center"
                      style={{ background: "var(--surface-2)" }}
                    >
                      <span
                        className="absolute left-3 top-0 font-serif text-5xl opacity-20"
                        style={{ color: "var(--primary)" }}
                      >
                        “
                      </span>
                      <span
                        className="absolute bottom-0 right-3 font-serif text-5xl opacity-20"
                        style={{ color: "var(--accent)" }}
                      >
                        ”
                      </span>

                      <div
                        className="mb-3 text-sm font-extrabold tracking-wider"
                        style={{ color: "var(--text-muted)" }}
                      >
                        GET IN TOUCH
                      </div>

                      <div
                        className="mt-4 font-serif text-3xl leading-tight sm:text-4xl"
                        style={{ color: "var(--text)" }}
                      >
                        छोटा कदम, बड़ा बदलाव
                      </div>
                      <div
                        className="mt-4 font-serif text-3xl leading-tight sm:text-4xl"
                        style={{ color: "var(--text)" }}
                      >
                        Small Steps, Big Change
                      </div>

                      <div
                        className="mb-2 font-serif text-3xl leading-tight sm:text-4xl"
                        style={{ color: "var(--text)" }}
                      >
                        {content.taglineHi}
                      </div>
                      <div
                        className="mb-4 text-xl sm:text-2xl"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {content.taglineEn}
                      </div>

                      <div
                        className="mx-auto h-0.5 w-12 rounded-full"
                        style={{
                          background:
                            "linear-gradient(90deg, var(--primary), var(--accent))",
                        }}
                      />
                    </div>

                    <form
                      onSubmit={handleSubmit}
                      className="space-y-5"
                      noValidate
                    >
                      <input
                        type="text"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        autoComplete="off"
                        tabIndex={-1}
                        className="hidden"
                        aria-hidden="true"
                      />

                      {touched && Object.keys(errors).length > 0 && (
                        <div
                          className="flex items-start gap-2 rounded-xl p-3 text-sm"
                          style={{
                            background:
                              "color-mix(in oklab, var(--danger), transparent 90%)",
                            border:
                              "1px solid color-mix(in oklab, var(--danger), transparent 70%)",
                          }}
                        >
                          <AlertTriangle
                            className="mt-0.5 h-4 w-4 shrink-0"
                            style={{ color: "var(--danger)" }}
                          />
                          <div style={{ color: "var(--text)" }}>
                            Please fill all required fields correctly before
                            sending the message.
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Field
                          label="Your Name"
                          required
                          error={touched ? errors.your_name : ""}
                          input={
                            <input
                              type="text"
                              name="your_name"
                              value={formData.your_name}
                              onChange={handleChange}
                              placeholder="Enter your name"
                              autoComplete="name"
                              maxLength={80}
                              className="h-11 w-full rounded-xl px-4 text-sm outline-none transition-colors focus:ring-2 focus:ring-[var(--accent)]"
                              style={{
                                background: "var(--surface-2)",
                                color: "var(--text)",
                                border:
                                  touched && errors.your_name
                                    ? "1px solid var(--danger)"
                                    : "1px solid var(--border)",
                              }}
                            />
                          }
                        />

                        <Field
                          label="Email"
                          required
                          error={touched ? errors.your_email : ""}
                          input={
                            <input
                              type="email"
                              name="your_email"
                              value={formData.your_email}
                              onChange={handleChange}
                              placeholder="your@email.com"
                              autoComplete="email"
                              maxLength={120}
                              className="h-11 w-full rounded-xl px-4 text-sm outline-none transition-colors focus:ring-2 focus:ring-[var(--accent)]"
                              style={{
                                background: "var(--surface-2)",
                                color: "var(--text)",
                                border:
                                  touched && errors.your_email
                                    ? "1px solid var(--danger)"
                                    : "1px solid var(--border)",
                              }}
                            />
                          }
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Field
                          label="Phone"
                          required
                          error={touched ? errors.phone_number : ""}
                          input={
                            <input
                              type="tel"
                              name="phone_number"
                              value={formData.phone_number}
                              onChange={handleChange}
                              placeholder="+91 12345 67890"
                              autoComplete="tel"
                              maxLength={20}
                              className="h-11 w-full rounded-xl px-4 text-sm outline-none transition-colors focus:ring-2 focus:ring-[var(--accent)]"
                              style={{
                                background: "var(--surface-2)",
                                color: "var(--text)",
                                border:
                                  touched && errors.phone_number
                                    ? "1px solid var(--danger)"
                                    : "1px solid var(--border)",
                              }}
                            />
                          }
                        />

                        <Field
                          label="I want to be a"
                          required
                          error={touched ? errors.service_name : ""}
                          input={
                            <FancySelect
                              value={formData.service_name}
                              onChange={handleChange}
                              options={OPTIONS}
                              placeholder="Select"
                              hasError={touched && !!errors.service_name}
                            />
                          }
                        />
                      </div>

                      <Field
                        label="Message"
                        required
                        error={touched ? errors.your_message : ""}
                        input={
                          <textarea
                            name="your_message"
                            value={formData.your_message}
                            onChange={handleChange}
                            placeholder="Write your message..."
                            rows={4}
                            maxLength={2000}
                            className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors focus:ring-2 focus:ring-[var(--accent)]"
                            style={{
                              background: "var(--surface-2)",
                              color: "var(--text)",
                              border:
                                touched && errors.your_message
                                  ? "1px solid var(--danger)"
                                  : "1px solid var(--border)",
                              resize: "none",
                            }}
                          />
                        }
                      />

                      <button
                        type="submit"
                        disabled={status.loading}
                        className="h-12 w-full rounded-xl text-base font-medium text-white transition-all hover:scale-[1.02] hover:opacity-90 disabled:opacity-60 disabled:hover:scale-100"
                        style={{
                          background:
                            "linear-gradient(135deg, var(--primary), var(--accent))",
                        }}
                      >
                        {status.loading ? "Sending..." : "Send Message"}
                        {!status.loading && (
                          <Send className="ml-2 inline h-4 w-4" />
                        )}
                      </button>

                      <div
                        className="flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm"
                        style={{
                          background: "var(--surface-2)",
                          border: "1px solid var(--border)",
                          color: "var(--text-muted)",
                        }}
                      >
                        <Clock
                          className="h-4 w-4"
                          style={{ color: "var(--accent)" }}
                        />
                        <span>We typically respond within 24–48 hours</span>
                      </div>

                      {status.error && (
                        <div
                          className="flex items-start gap-2 rounded-xl p-3 text-sm"
                          style={{
                            background:
                              "color-mix(in oklab, var(--danger), transparent 90%)",
                            border:
                              "1px solid color-mix(in oklab, var(--danger), transparent 70%)",
                          }}
                        >
                          <AlertTriangle
                            className="mt-0.5 h-4 w-4 shrink-0"
                            style={{ color: "var(--danger)" }}
                          />
                          <span style={{ color: "var(--text)" }}>
                            {status.message ||
                              "Something went wrong. Please try again."}
                          </span>
                        </div>
                      )}
                    </form>
                  </>
                ) : (
                  <div className="py-12 text-center">
                    <div
                      className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl"
                      style={{
                        background:
                          "color-mix(in oklab, var(--success), transparent 85%)",
                      }}
                    >
                      <CheckCircle2
                        className="h-8 w-8"
                        style={{ color: "var(--success)" }}
                      />
                    </div>

                    <h3
                      className="mb-2 font-serif text-xl"
                      style={{ color: "var(--text)" }}
                    >
                      Thank you!
                    </h3>

                    <p
                      className="mb-6 text-sm"
                      style={{ color: "var(--text-muted)" }}
                    >
                      We&apos;ll contact you soon.
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        setStatus({
                          loading: false,
                          success: false,
                          error: false,
                          message: "",
                        })
                      }
                      className="rounded-xl px-5 py-2 text-sm font-medium transition-all hover:bg-white/5"
                      style={{
                        background: "var(--surface-2)",
                        border: "1px solid var(--border)",
                        color: "var(--text)",
                      }}
                    >
                      Send another message
                    </button>

                    <div
                      className="mt-6 flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm"
                      style={{
                        background: "var(--surface-2)",
                        border: "1px solid var(--border)",
                        color: "var(--text-muted)",
                      }}
                    >
                      <Clock
                        className="h-4 w-4"
                        style={{ color: "var(--accent)" }}
                      />
                      <span>We typically respond within 24–48 hours</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-20 mt-12"
        >
          <h3
            className="pb-5 text-center font-serif text-xl"
            style={{ color: "var(--text)" }}
          >
            Other Ways to Connect
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ContactCard
              icon={MapPin}
              title="Operating Address"
              text={content.operating_address}
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                content.operating_address,
              )}`}
            />

            <ContactCard
              icon={MapPin}
              title="Registered Address"
              text={content.registered_address || content.operating_address}
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                content.registered_address || content.operating_address,
              )}`}
            />

            <ContactCard
              icon={Phone}
              title="Phone"
              text={content.phone}
              href={`tel:${normalizePhone(content.phone)}`}
            />

            <ContactCard
              icon={Mail}
              title="Email"
              text={content.email}
              href={`mailto:${normalizeEmail(content.email)}`}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
