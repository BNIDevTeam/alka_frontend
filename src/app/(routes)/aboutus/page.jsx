import AboutUsBanner from "@/app/components/AboutUsPage/AboutUSBanner";
import AboutIntroCollage from "@/app/components/AboutUsPage/AboutIntroCollage/AboutIntroCollage";
import TeamSection from "@/app/components/AboutUsPage/Team";
import VisionMissionSection from "@/app/components/AboutUsPage/VisionMissionSection";
import VolunteerSection from "@/app/components/AboutUsPage/VolunteersCarousel/VolunteerSection";
import WhatWeDoSection from "@/app/components/AboutUsPage/WhatWeDo";
import React from "react";
import CoreValuesSection from "@/app/components/AboutUsPage/CoreValuesSection";
import DonateBanner from "@/app/components/AboutUsPage/DonateBanner";

const AboutUS = () => {
  return (
    <>
      <AboutUsBanner />
      <AboutIntroCollage />
      <VisionMissionSection />
       {/* <CoreValuesSection /> */}
       <DonateBanner />
      {/* <WhatWeDoSection /> */}
      <TeamSection />
      <VolunteerSection />
    </>
  );
};

export default AboutUS;
