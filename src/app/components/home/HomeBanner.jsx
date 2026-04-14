// import Image from "next/image";
// import Link from "next/link";
// import bannerContent from "@/app/content/home.banner"; // rename your bannerContent file to this

// export default function HomeBanner() {
//   return (
//     <section className="relative overflow-hidden">
//       {/* Background image */}
//       <div className="relative h-[62vh] min-h-[520px] w-full sm:h-[70vh]">
//         <Image
//           src={bannerContent.image}
//           alt={bannerContent.tagline || "ALKA"}
//           fill
//           priority
//           className="object-cover"
//           sizes="100vw"
//         />

//         {/* Overlay gradients for readability */}
//         <div
//           className="absolute inset-0"
//           style={{
//             background:
//               "linear-gradient(90deg, rgba(98,16,159,0.78) 0%, rgba(254,98,68,0.30) 55%, rgba(0,0,0,0.15) 100%)",
//           }}
//         />
//         <div
//           className="absolute inset-0"
//           style={{
//             background:
//               "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.55) 100%)",
//           }}
//         />

//         {/* Content */}
//         <div className="absolute inset-0">
//           <div className="container-page flex h-full items-end pb-12 sm:pb-16 lg:pb-40">
//             <div className="max-w-2xl">
//               {/* Tag / pill */}
//               <div
//                 className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold tracking-wide text-white"
//                 style={{ background: "rgba(255,255,255,0.16)", border: "1px solid rgba(255,255,255,0.22)" }}
//               >
//                 <span
//                   className="inline-block h-2 w-2 rounded-full"
//                   style={{ background: "var(--accent)" }}
//                 />
//                 {bannerContent.tagline}
//               </div>

//               {/* Headline */}
//               <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
//                 {bannerContent.title}
//               </h1>

//               {/* Subtext */}
//               <p className="mt-4 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
//                 {bannerContent.description}
//               </p>

//               {/* CTAs */}
              
//               <div className="mt-7 flex flex-wrap gap-3">

//                 <Link
//                   href="/aboutus"
//                   className="btn-primary"
//                   style={{ background: "var(--success)" }}
//                 >
//                   Learn More
//                 </Link>

               

//                 <Link
//                   href="/contactus"
//                   className="btn-ghost"
//                   style={{
//                     borderColor: "rgba(255,255,255,0.30)",
//                     color: "rgba(255,255,255,0.95)",
//                   }}
//                 >
//                   Contact Us
//                 </Link>

//                  <Link href="/donation" className="btn-accent">
//                   Donate Now
//                 </Link>

                
//               </div>

//               {/* Trust strip */}
//               <div className="mt-8 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-3">
//                 {bannerContent.stats?.map((s) => (
//                   <div
//                     key={s.label}
//                     className="rounded-2xl px-4 py-3"
//                     style={{
//                       background: "rgba(255,255,255,0.10)",
//                       border: "1px solid rgba(255,255,255,0.18)",
//                     }}
//                   >
//                     <div className="text-lg font-extrabold text-white sm:text-xl">
//                       {s.value}
//                     </div>
//                     <div className="text-xs text-white/80">{s.label}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import Image from "next/image";
import Link from "next/link";
import bannerContent from "@/app/content/home.banner";

export default function HomeBanner() {
  return (
    <section className="relative">
      {/* background image */}
      <div className="relative h-[72vh] min-h-[560px] w-full">
        <Image
          src={bannerContent.image}
          alt={bannerContent.tagline || "ALKA"}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        {/* dark overlay like screenshot */}
        <div className="absolute inset-0 bg-black/55" />

        {/* center content */}
        <div className="absolute inset-0">
          <div className="container-page flex h-full flex-col items-center justify-center text-center">
            {/* logo area optional (keep if you want) */}
            {/* <div className="mb-4 text-white/90 font-serif text-lg">ALKA</div> */}

            <h1 className="font-serif text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-5xl">
              {bannerContent.title}
            </h1>

            {/* <p className="pt-5 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base lg:text-xl">
              {bannerContent.description}
            </p> */}
            <p className="mt-4 max-w-full text-sm leading-relaxed text-white/85 sm:text-base lg:text-xl">
             <br/> {bannerContent.description2}
            </p>

            {/* <div className="mt-7">
              <Link
                href="/donation"
                className="inline-flex h-11 items-center justify-center rounded-xl px-6 text-sm font-semibold text-white transition hover:opacity-90 active:opacity-85"
                style={{ background: "linear-gradient(135deg, var(--accent) 0%, var(--primary) 100%)" }} // green like screenshot button
              >
                Donate Now
              </Link>
            </div> */}
          </div>
        </div>

        {/* IMPORTANT: add bottom space so floating cards don't cover hero content */}
        <div className="absolute bottom-0 left-0 right-0 h-28 sm:h-32 lg:h-40" />
      </div>
    </section>
  );
}
