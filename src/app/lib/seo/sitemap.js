export default function sitemap() {
  const baseUrl = "https://alkatrust.com";

  return [
    { url: `${baseUrl}/`, lastModified: new Date() },
    { url: `${baseUrl}/aboutus`, lastModified: new Date() },
    { url: `${baseUrl}/donation`, lastModified: new Date() },
    { url: `${baseUrl}/gallery`, lastModified: new Date() },
    { url: `${baseUrl}/contactus`, lastModified: new Date() },
  ];
}
