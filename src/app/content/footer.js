import information from "@/app/content/info";
import socialMedia from "@/app/content/social.links";

const footerContent = {
  brand: {
    title: "ALKA",
    link: "/",
    description: `We would love to hear from you. Whether you want to volunteer, collaborate, support ALKA, or simply share an idea, we’re here to connect.
Together, we can make learning, awareness and purpose a part of everyday life.`,
  },

  contact: {
    phone: information.phone,
    email: information.email,
    registeredAddress: information.registered_address,
    operatingAddress: information.operating_address,
  },

  social: socialMedia,

  legal: {
    copyright: `© ${new Date().getFullYear()} ALKA. All rights reserved.`,
  },
};

export default footerContent;
