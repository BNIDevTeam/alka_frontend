// /** @type {import("next").NextConfig} */
// const isDev = process.env.NODE_ENV !== "production";
// const securityHeaders = [
//   { key: "X-Content-Type-Options", value: "nosniff" },
//   { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
//   { key: "X-Frame-Options", value: "SAMEORIGIN" },
//   { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=(), interest-cohort=()" },
//   { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
//   { key: "Cross-Origin-Resource-Policy", value: "same-site" },
//   { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
//   {
//     key: "Content-Security-Policy",
//     value: [
//       "default-src 'self'",
//       isDev ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'" : "script-src 'self' 'unsafe-inline'",
//       "style-src 'self' 'unsafe-inline'",
//       "img-src 'self' data: blob: https:",
//       "font-src 'self' data: https:",
//       "connect-src 'self' https:",
//       "object-src 'none'",
//       "frame-ancestors 'self'",
//       "base-uri 'self'",
//       "form-action 'self'",
//       "upgrade-insecure-requests",
//     ].join('; '),
//   },
// ];
// const nextConfig = {
//   reactStrictMode: true,
//   poweredByHeader: false,
//   images: {
//     remotePatterns: [
//       { protocol: "https", hostname: "images.unsplash.com" },
//       { protocol: "https", hostname: "*.amazonaws.com" },
//       { protocol: "https", hostname: "alka-ngo-media-prod.s3.eu-north-1.amazonaws.com" },
//       { protocol: "https", hostname: "www.harshuglobal.in" },
//       { protocol: "https", hostname: "www.businessneedsinc.com" },
//       { protocol: "https", hostname: "www.onpointwares.com" },
//       { protocol: "https", hostname: "riyuglobal.com" },
//       { protocol: "https", hostname: "rrindustriesus.com" },
//     ],
//   },
//   async headers() {
//     return [{ source: '/:path*', headers: securityHeaders }];
//   },
// };
// export default nextConfig;
/** @type {import("next").NextConfig} */
const isDev = process.env.NODE_ENV !== "production";

const cspParts = [
  "default-src 'self'",
  isDev
    ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
    : "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https: http:",
  "font-src 'self' data: https:",
  isDev
    ? "connect-src 'self' https: http://localhost:4000 http://127.0.0.1:4000 ws://localhost:3000 ws://127.0.0.1:3000"
    : "connect-src 'self' https:",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
];

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), browsing-topics=(), interest-cohort=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-site" },
  ...(!isDev
    ? [
        {
          key: "Strict-Transport-Security",
          value: "max-age=31536000; includeSubDomains; preload",
        },
      ]
    : []),
  {
    key: "Content-Security-Policy",
    value: cspParts.join("; "),
  },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "*.amazonaws.com" },
      { protocol: "https", hostname: "alka-ngo-media-prod.s3.eu-north-1.amazonaws.com" },
      { protocol: "https", hostname: "www.harshuglobal.in" },
      { protocol: "https", hostname: "www.businessneedsinc.com" },
      { protocol: "https", hostname: "www.onpointwares.com" },
      { protocol: "https", hostname: "riyuglobal.com" },
      { protocol: "https", hostname: "rrindustriesus.com" },
      ...(isDev
        ? [
            { protocol: "http", hostname: "localhost", port: "4000" },
            { protocol: "http", hostname: "127.0.0.1", port: "4000" },
          ]
        : []),
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;