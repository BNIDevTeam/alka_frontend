import Image from "next/image";
import Link from "next/link";
import { donateCtaContent } from "@/app/content/home.donateCta";

function formatINR(n) {
  try {
    return new Intl.NumberFormat("en-IN").format(n);
  } catch {
    return String(n);
  }
}

export default function DonateSection() {
  const c = donateCtaContent;
  const pct = c.goal > 0 ? Math.min(100, Math.round((c.raised / c.goal) * 100)) : 0;

  return (
    <section className="section px-0">
      {/* ✅ Full-width background (no side margins visually) */}
      <div
        className="w-full"
        style={{
          background:
            "linear-gradient(135deg, color-mix(in oklab, var(--primary), white 92%) 0%, var(--surface) 45%, color-mix(in oklab, var(--gold), white 92%) 100%)",
        }}
      >
        {/* Keep content aligned but banner is full width */}
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div
            className="relative overflow-hidden rounded-3xl border p-7 sm:p-10"
            style={{ borderColor: "var(--border)", background: "rgba(255,255,255,0.35)" }}
          >
            {/* glow */}
            <div
              className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full opacity-25 blur-3xl"
              style={{ background: "var(--primary)" }}
            />
            <div
              className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 rounded-full opacity-20 blur-3xl"
              style={{ background: "var(--gold)" }}
            />

            <div className="relative grid gap-8 lg:grid-cols-12 lg:items-center">
              {/* Left */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3">
                  <span
                    className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold"
                    style={{
                      background: "rgba(255,255,255,0.70)",
                      border: "1px solid rgba(0,0,0,0.06)",
                      color: "rgba(15,23,42,0.85)",
                    }}
                  >
                    Support our mission
                  </span>
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {pct}% funded
                  </span>
                </div>

                <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">
                  {c.title}
                </h2>
                <p className="p-muted mt-3 max-w-xl text-base sm:text-[17px]">
                  {c.subtitle}
                </p>

                {/* Progress */}
                <div className="mt-6">
                  <div className="flex items-center justify-between text-sm">
                    <div className="font-semibold" style={{ color: "var(--text)" }}>
                      ₹{formatINR(c.raised)} raised
                    </div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                      Goal: ₹{formatINR(c.goal)}
                    </div>
                  </div>

                  <div
                    className="mt-3 h-3 w-full overflow-hidden rounded-full"
                    style={{ background: "rgba(0,0,0,0.08)" }}
                  >
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${pct}%`,
                        background:
                          "linear-gradient(90deg, var(--primary) 0%, var(--accent) 55%, var(--gold) 100%)",
                      }}
                    />
                  </div>

                  <div className="mt-2 text-xs" style={{ color: "var(--text-muted)" }}>
                    Every contribution matters — even small donations create big impact.
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="lg:col-span-5">
                <div
                  className="flex flex-col items-start gap-5 rounded-2xl border p-6"
                  style={{
                    borderColor: "rgba(0,0,0,0.08)",
                    background: "rgba(255,255,255,0.55)",
                  }}
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={c.image}
                      alt={c.organization}
                      width={56}
                      height={56}
                      className="h-14 w-14 rounded-2xl object-contain"
                    />
                    <div>
                      <div className="text-sm font-bold" style={{ color: "var(--text)" }}>
                        {c.organization}
                      </div>
                      <div className="text-xs" style={{ color: "rgba(15,23,42,0.70)" }}>
                        Transparent • Purpose-driven • Community-first
                      </div>
                    </div>
                  </div>

                  <Link
                    href={c.link}
                    className="inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 active:opacity-80"
                    style={{ background: "var(--accent)" }}
                  >
                    {c.buttonText}
                  </Link>

                  <div className="text-xs" style={{ color: "rgba(15,23,42,0.70)" }}>
                    Secure donation. You’ll be redirected to our donation page.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
