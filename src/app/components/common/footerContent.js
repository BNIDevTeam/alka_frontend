import information from "@/app/content/info";
import socialMedia from "@/app/content/social.links";
import Link from "next/link";

const footerContent = {
  Link: "/contactus",
  title: "Contact us",
  description: `We’d love to hear from you. Whether you want to volunteer, collaborate, support ALKA, or simply share an idea, we’re here to connect. 
Together, we can make learning, awareness and purpose a part of everyday life.`,
  contact: {
    phone: information.phone,
    email: information.email,
    registered_address: information.registered_address,
    operating_address: information.operating_address,
    social: socialMedia,
  },
};

export default footerContent;
