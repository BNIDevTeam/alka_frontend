export default function sitemap() {
  const base = "https://alkatrust.com"; // ✅ change domain
  const now = new Date();

  return [
    { url: `${base}/`, lastModified: now },
    { url: `${base}/aboutus`, lastModified: now },
    { url: `${base}/gallery`, lastModified: now },
    { url: `${base}/contactus`, lastModified: now },
    { url: `${base}/donation`, lastModified: now }, // ✅ add your real routes (donate, initiatives, etc.)
    // add your real routes (donate, initiatives, etc.)
  ];
}
