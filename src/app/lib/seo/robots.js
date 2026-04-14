export default function robots() {
  const baseUrl = "https://alkatrust.com";

  return {
    rules: [
      { userAgent: "*", allow: "/" },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
