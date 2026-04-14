export const aboutBanner = {
  brand: "Charity",
  heroImage: "/images/banners/about.jpg", // your image
  title: "About ALKA",
  // subtitle:
  //   "Learn more about our non-profit organization and our mission to make a positive impact on the world through our charitable initiatives.",
  subtitle: "NOT ALL OF US CAN DO GREAT THINGS. BUT WE CAN DO SMALL THINGS WITH GREAT LOVE",

  nav: [
    { label: "Home", href: "/", active: false },
    { label: "About Us", href: "/about-us", active: true },
    { label: "Our Work", href: "/our-work", active: false },
    { label: "Stories", href: "/stories", active: false },
    { label: "Contact", href: "/contact", active: false },
  ],

  cta: { label: "Donate", href: "/donate" },

  intro: {
    heading: "Learning Today, Leading Tomorrow",
    statValue: "100+",
    text:
      `We believe the right path in life begins with instilling the right values at the right age. 
        Our mission is to empower children from underserved and marginalized communities through quality education, 
        meaningful mentorship, and a nurturing environment where both character and intellect grow together. 
        Education, to us, is not just about academics, it is about cultivating integrity, compassion, responsibility, 
        and confidence from an early age. `,
    text2: `When values guide learning, learning reveals purpose. We follow a simple yet transformative belief:  `,
    text3: `“ Awareness awakens the mind. 
            Learning shapes understanding. 
            Knowledge finds meaning only through right action ” `,
    text4: `By building strong foundations early in life, we help children discover their true purpose,  
            guiding them to grow into thoughtful, confident individuals who lead with wisdom and heart. `,
    text5: `Knowledge has no age limit and no boundaries. It is a lifelong journey of growth, reflection, and service. 
            Whether supporting literacy, providing essential learning resources, or creating spaces that inspire creativity, 
            we are not just sharing information, we are illuminating pathways to possibility. `,

    points: [
      {
        title: "Changing Lives",
        text: "We are not just teaching lessons. We are guiding futures. We are shaping lives with purpose. ",
      },
      // {
      //   title: "Building Futures",
      //   text:
      //     "Creating opportunities and a better future with our non-profit organization.",
      // },
    ],
  },

  collage: [
    { src: "/images/banners/aboutus_page_banners/ltlt.png", alt: "Helping hands" },
    { src: "/images/banners/aboutus_page_banners/lt.jpeg", alt: "Food distribution" },
    { src: "/images/banners/aboutus_page_banners/mission.jpeg", alt: "Donation box" },
    { src: "/images/banners/aboutus_page_banners/vission.jpeg", alt: "Community support" },
  ],
};
