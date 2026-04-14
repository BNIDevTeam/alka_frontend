const overviewContent = {
  title: "Our Purpose",
  paragraphs: [
    `At ALKA, our purpose is to help people find clarity, grow with intention, and live with kindness. 
    We believe that learning is not confined to classrooms, it is woven into everyday life. 
    Learning its for everyone, and it shapes who we become. 
    Through meaningful learning experiences and community-led initiatives, we walk alongside individuals as they build awareness, confidence, and compassion. 
    By nurturing purpose-driven growth, we aim to create individuals and communities that move forward with clarity, empathy, and heart.`,
  ],
  heroImage: "/images/banners/purposeMain.png", // your image

  // Only 2 images provided — component will reuse them to render 4 tiles
  images: [
    "/images/banners/home_page_banners/overview.jpeg",
    "/images/banners/home_page_banners/13.png",
    "/images/banners/home_page_banners/6.jpeg",
    "/images/banners/home_page_banners/4.png",
  ],

  imageAlts: [
    "ALKA community learning initiative",
    "Volunteers supporting a community program",
  ],

  cta: {
    primary: { label: "Learn More", href: "/aboutus" },
    secondary: { label: "Support Us", href: "/donation" },
  },

  // Stats row (like your screenshot)
  stats: [
    { value: "100+", label: "Lives Impacted", icon: "users" },
    { value: "50+", label: "Projects Initiated", icon: "projects" },
    { value: "50+", label: "Volunteers Engaged", icon: "action" },
    { value: "5+", label: "Strategic Partnerships ", icon: "partners" },
  ],

  // Bottom green donate bar
  donateBar: {
    title: "Make a difference today",
    desc: "Your contribution powers education, care, and community-led initiatives where it matters most.",
    buttonLabel: "Donate Now",
    href: "/donation",
  },

  collageTags: ["Community", "Education", "Awareness", "Kindness"],
};

export default overviewContent;
