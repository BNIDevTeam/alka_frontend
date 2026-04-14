// "use client";

// import React, { useEffect, useState } from "react";

// const TAGLINES = ["#ummeed ek behtar kal ki", "Hope for a better tomorrow"];

// export default function AnimatedTagline() {
//   const [i, setI] = useState(0);

//   useEffect(() => {
//     const t = setInterval(() => {
//       setI((prev) => (prev + 1) % TAGLINES.length);
//     }, 3000);

//     return () => clearInterval(t);
//   }, []);

//   return (
//     <div className="alka-footer-sweep relative border-y border-white/5 py-2 sm:py-3">
//       <div className="alka-footer-sweep-glow" />
//       <div className="container-page max-w-[1600px] text-center mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-10 sm:py-12 alka-footer-sweep-inner">
//         <div className="alka-footer-sweep-text" key={i}>
//           {TAGLINES[i]}
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const TAGLINES = ["#ummeed ek behtar kal ki", "Hope for a better tomorrow"];

// export default function AnimatedTagline() {
//   const [i, setI] = useState(0);

//   useEffect(() => {
//     const t = setInterval(() => {
//       setI((prev) => (prev + 1) % TAGLINES.length);
//     }, 3000);
//     return () => clearInterval(t);
//   }, []);

//   return (
//     <div className="alka-footer-sweep relative border-y border-white/5 py-2 sm:py-3">
//       <div className="alka-footer-sweep-glow" />
//       <div className="container-page max-w-[1600px] text-center mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-10 sm:py-12 alka-footer-sweep-inner">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={i}
//             className="alka-footer-sweep-text"
//             initial={{ opacity: 0, y: 10, filter: "blur(2px)" }}
//             animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
//             exit={{ opacity: 0, y: -10, filter: "blur(2px)" }}
//             transition={{ duration: 0.5, ease: "easeInOut" }}
//           >
//             {TAGLINES[i]}
//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TAGLINES = ["ummeed ek behtar kal ki", "Hope for a better tomorrow"];

export default function AnimatedTagline() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setI((prev) => (prev + 1) % TAGLINES.length);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="alka-footer-sweep relative border-y border-white/5 py-2 sm:py-3">
      <div className="alka-footer-sweep-glow" />
      <div className="container-page max-w-[1600px] text-center mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-10 sm:py-12 alka-footer-sweep-inner">
        {/* perspective needed for 3D flip */}
        <div style={{ perspective: 800 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              className="alka-footer-sweep-text"
              initial={{ opacity: 0, rotateX: -90, y: 8 }}
              animate={{ opacity: 1, rotateX: 0, y: 0 }}
              exit={{ opacity: 0, rotateX: 90, y: -8 }}
              transition={{ duration: 0.55, ease: "easeInOut" }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {TAGLINES[i]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}