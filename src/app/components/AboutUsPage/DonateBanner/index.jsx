// "use client";

// import React, { useRef, useState, useEffect } from "react";
// import Image from "next/image";
// import donateBanner from "@/app/content/donate.banner";
// import { Play, X } from "lucide-react";

// export default function DonateBanner() {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [videoError, setVideoError] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const videoRef = useRef(null);
//   const videoContainerRef = useRef(null);

//   const handlePlayClick = () => {
//     setIsLoading(true);
//     setIsPlaying(true);
//   };

//   const handleCloseVideo = () => {
//     if (videoRef.current) {
//       videoRef.current.pause();
//       videoRef.current.removeAttribute("src");
//       videoRef.current.load();
//     }
//     setIsPlaying(false);
//     setVideoError(false);
//     setIsLoading(false);
//   };

//   useEffect(() => {
//     if (isPlaying && videoRef.current) {
//       const video = videoRef.current;
      
//       const handleCanPlay = () => {
//         console.log("Video ready to play");
//         setIsLoading(false);
//         video.play().catch(e => {
//           console.error("Play failed:", e);
//           setVideoError(true);
//         });
//       };

//       const handleError = (e) => {
//         console.error("Video error:", video.error);
//         setVideoError(true);
//         setIsLoading(false);
//       };

//       video.addEventListener("canplay", handleCanPlay);
//       video.addEventListener("error", handleError);

//       // Use the proxy URL
//       video.src = donateBanner.videoHref;
//       video.load();

//       return () => {
//         video.removeEventListener("canplay", handleCanPlay);
//         video.removeEventListener("error", handleError);
//       };
//     }
//   }, [isPlaying]);

//   // Adjust video size based on container
//   useEffect(() => {
//     if (isPlaying && videoRef.current && videoContainerRef.current) {
//       const resizeVideo = () => {
//         const container = videoContainerRef.current;
//         const video = videoRef.current;
        
//         if (container && video) {
//           const containerWidth = container.clientWidth;
//           const containerHeight = container.clientHeight;
          
//           // Make video fill the container
//           video.style.width = '100%';
//           video.style.height = '100%';
//           video.style.objectFit = 'cover'; // This makes video cover the entire area
//         }
//       };

//       resizeVideo();
//       window.addEventListener('resize', resizeVideo);
      
//       return () => {
//         window.removeEventListener('resize', resizeVideo);
//       };
//     }
//   }, [isPlaying]);

//   return (
//     <section className="section -mt-22">
//       <div className="container-page max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
//         <div className="mx-auto max-w-6xl">
//           <div
//             className="relative overflow-hidden rounded-3xl shadow-lg"
//             style={{ background: "var(--surface)" }}
//           >
//             <div className="relative h-[220px] sm:h-[260px] md:h-[290px]">
//               {!isPlaying ? (
//                 <>
//                   <Image
//                     src={donateBanner.image}
//                     alt={donateBanner.imageAlt}
//                     fill
//                     priority
//                     className="object-cover object-center"
//                     sizes="(max-width: 768px) 100vw, 900px"
//                   />
//                   <div className="absolute inset-0 bg-black/10" />

//                   <button
//                     type="button"
//                     onClick={handlePlayClick}
//                     aria-label="Play video"
//                     className="group absolute left-1/2 top-1/2 z-10 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 shadow-lg transition hover:scale-110 active:scale-95"
//                   >
//                     <Play className="h-6 w-6 text-gray-900 ml-1" fill="currentColor" />
//                   </button>
//                 </>
//               ) : (
//                 <div 
//                   ref={videoContainerRef}
//                   className="absolute inset-0 bg-black w-full h-full"
//                 >
//                   {isLoading && !videoError && (
//                     <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
//                       <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
//                     </div>
//                   )}
                  
//                   {videoError ? (
//                     <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-white p-4">
//                       <p className="text-lg font-semibold mb-2">Unable to play video</p>
//                       <p className="text-sm text-gray-300 mb-4 text-center">
//                         Please try again later
//                       </p>
//                       <button
//                         onClick={handleCloseVideo}
//                         className="px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-200 transition"
//                       >
//                         Close
//                       </button>
//                     </div>
//                   ) : (
//                     <video
//                       ref={videoRef}
//                       className="w-full h-full object-cover"
//                       controls
//                       playsInline
//                       muted
//                       style={{
//                         width: '100%',
//                         height: '100%',
//                         objectFit: 'cover',
//                       }}
//                     />
//                   )}

//                   <button
//                     type="button"
//                     onClick={handleCloseVideo}
//                     aria-label="Close video"
//                     className="absolute right-4 top-4 z-30 grid h-10 w-10 place-items-center rounded-full bg-black/70 text-white backdrop-blur-sm transition hover:bg-black/90"
//                   >
//                     <X className="h-5 w-5" />
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="mt-10 text-center">
//             <div
//               className="text-[10px] font-extrabold tracking-[0.26em]"
//               style={{ color: "var(--text-muted)" }}
//             >
//               {donateBanner.kicker}
//             </div>

//             <h2
//               className="mx-auto py-5 max-w-full font-serif text-2xl font-extrabold leading-tight sm:text-3xl"
//               style={{ color: "var(--text)" }}
//             >
//               {donateBanner.title}
//             </h2>

//             <p
//               className="mx-auto mt-3 max-w-full text-sm leading-relaxed sm:text-base"
//               style={{ color: "var(--text-muted)" }}
//             >
//               {donateBanner.description}
//             </p>

//             <div className="mt-6">
//               <a
//                 href={donateBanner.buttonHref}
//                 className="inline-flex h-11 items-center justify-center rounded-xl px-6 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:opacity-90"
//                 style={{
//                   background:
//                     "linear-gradient(135deg, var(--accent) 0%, var(--primary) 100%)",
//                 }}
//               >
//                 {donateBanner.buttonText}
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import donateBanner from "@/app/content/donate.banner";
import { Play, X } from "lucide-react";

export default function DonateBanner() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);

  const handlePlayClick = () => {
    setIsLoading(true);
    setIsPlaying(true);
  };

  const handleCloseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.removeAttribute("src");
      videoRef.current.load();
    }
    setIsPlaying(false);
    setVideoError(false);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isPlaying && videoRef.current) {
      const video = videoRef.current;

      const handleCanPlay = () => {
        setIsLoading(false);
        video.play().catch((e) => {
          console.error("Play failed:", e);
          setVideoError(true);
        });
      };

      const handleError = () => {
        console.error("Video error:", video.error);
        setVideoError(true);
        setIsLoading(false);
      };

      video.addEventListener("canplay", handleCanPlay);
      video.addEventListener("error", handleError);

      video.src = "/video/alkaMain.mp4";
      video.load();

      return () => {
        video.removeEventListener("canplay", handleCanPlay);
        video.removeEventListener("error", handleError);
      };
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying && videoRef.current && videoContainerRef.current) {
      const resizeVideo = () => {
        const video = videoRef.current;

        if (video) {
          video.style.width = "100%";
          video.style.height = "100%";
          video.style.objectFit = "cover";
        }
      };

      resizeVideo();
      window.addEventListener("resize", resizeVideo);

      return () => {
        window.removeEventListener("resize", resizeVideo);
      };
    }
  }, [isPlaying]);

  return (
    <section className="section -mt-22">
      <div className="container-page max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="mx-auto max-w-6xl">
          <div
            className="relative overflow-hidden rounded-3xl shadow-lg"
            style={{ background: "var(--surface)" }}
          >
            <div className="relative h-[220px] sm:h-[260px] md:h-[290px]">
              {!isPlaying ? (
                <>
                  <Image
                    src={donateBanner.image}
                    alt={donateBanner.imageAlt}
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 900px"
                  />
                  <div className="absolute inset-0 bg-black/10" />

                  <button
                    type="button"
                    onClick={handlePlayClick}
                    aria-label="Play video"
                    className="group absolute left-1/2 top-1/2 z-10 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 shadow-lg transition hover:scale-110 active:scale-95"
                  >
                    <Play
                      className="ml-1 h-6 w-6 text-gray-900"
                      fill="currentColor"
                    />
                  </button>
                </>
              ) : (
                <div
                  ref={videoContainerRef}
                  className="absolute inset-0 h-full w-full bg-black"
                >
                  {isLoading && !videoError && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50">
                      <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/30 border-t-white"></div>
                    </div>
                  )}

                  {videoError ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 p-4 text-white">
                      <p className="mb-2 text-lg font-semibold">
                        Unable to play video
                      </p>
                      <p className="mb-4 text-center text-sm text-gray-300">
                        Please try again later
                      </p>
                      <button
                        onClick={handleCloseVideo}
                        className="rounded-lg bg-white px-4 py-2 text-gray-900 transition hover:bg-gray-200"
                      >
                        Close
                      </button>
                    </div>
                  ) : (
                    <video
                      ref={videoRef}
                      className="h-full w-full object-cover"
                      controls
                      playsInline
                      muted
                    />
                  )}

                  <button
                    type="button"
                    onClick={handleCloseVideo}
                    aria-label="Close video"
                    className="absolute right-4 top-4 z-30 grid h-10 w-10 place-items-center rounded-full bg-black/70 text-white backdrop-blur-sm transition hover:bg-black/90"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mt-10 text-center">
            <div
              className="text-[10px] font-extrabold tracking-[0.26em]"
              style={{ color: "var(--text-muted)" }}
            >
              {donateBanner.kicker}
            </div>

            <h2
              className="mx-auto max-w-full py-5 font-serif text-2xl font-extrabold leading-tight sm:text-3xl"
              style={{ color: "var(--text)" }}
            >
              {donateBanner.title}
            </h2>

            <p
              className="mx-auto mt-3 max-w-full text-sm leading-relaxed sm:text-base"
              style={{ color: "var(--text-muted)" }}
            >
              {donateBanner.description}
            </p>

            <div className="mt-6">
              <a
                href={donateBanner.buttonHref}
                className="inline-flex h-11 items-center justify-center rounded-xl px-6 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:opacity-90"
                style={{
                  background:
                    "linear-gradient(135deg, var(--accent) 0%, var(--primary) 100%)",
                }}
              >
                {donateBanner.buttonText}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}