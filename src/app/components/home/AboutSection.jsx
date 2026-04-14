import Image from "next/image";
import Link from "next/link";
import aboutContent from "@/app/content/home.about";

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

export default function AboutSection() {
  return (
    <section className="section">
      <div className="container-page">
        <div className="grid gap-7">
          {aboutContent.map((block, index) => {
            const bg = toneBg(block.tone);
            const reverse = index % 2 === 1;

            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl border shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--surface)",
                }}
              >
                {/* top accent */}
                <div className="absolute left-0 top-0 h-1 w-full" style={{ background: bg }} />

                <div className="grid lg:grid-cols-12">
                  {/* Image */}
                  <div className={`relative lg:col-span-6 ${reverse ? "lg:order-2" : ""}`}>
                    <div className="relative h-72 sm:h-96 lg:h-full">
                      <Image
                        src={block.image}
                        alt={block.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition duration-700 group-hover:scale-[1.03]"
                        priority={index === 0}
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />

                      <div
                        className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold text-white"
                        style={{
                          background: "rgba(0,0,0,0.35)",
                          border: "1px solid rgba(255,255,255,0.18)",
                        }}
                      >
                        <span className="inline-block h-2 w-2 rounded-full" style={{ background: bg }} />
                        Featured
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`lg:col-span-6 ${reverse ? "lg:order-1" : ""}`}>
                    <div className="flex h-full flex-col p-7 sm:p-10">
                      <div
                        className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold"
                        style={{
                          background: "var(--surface-2)",
                          border: "1px solid var(--border)",
                          color: "var(--text)",
                        }}
                      >
                        <span className="inline-block h-2 w-2 rounded-full" style={{ background: bg }} />
                        About ALKA
                      </div>

                      <h3 className="mt-5 font-serif text-3xl leading-tight sm:text-4xl">
                        {block.title}
                      </h3>

                      <div className="mt-4 h-1 w-16 rounded-full" style={{ background: bg }} />

                      <p className="p-muted mt-5 text-[15px] leading-relaxed sm:text-base">
                        {block.text}
                      </p>

                      <div className="mt-8">
                        <Link
                          href={block.link}
                          className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 active:opacity-80"
                          style={{ background: bg }}
                        >
                          {block.button}
                          <span aria-hidden="true" className="text-white/90">
                            →
                          </span>
                        </Link>
                      </div>

                      <div className="mt-auto pt-8">
                        <div className="h-px w-full" style={{ background: "var(--border)" }} />
                        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs" style={{ color: "var(--text-muted)" }}>
                          <span className="rounded-full px-3 py-1" style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>
                            Trust • Learning • Community
                          </span>
                          <span className="rounded-full px-3 py-1" style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>
                            Updated 2024+
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
