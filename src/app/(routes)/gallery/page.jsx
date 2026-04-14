import HowWeAreSection from "@/app/components/gallery/HowWeAreSection";
import StoriesBanner from "@/app/components/gallery/StoriesBanner";
import React from "react";
import InitiativesSection from "../../components/gallery/InitiativesSection";
import DonorsSection from "@/app/components/gallery/DonorsSection";
import ImageSection from "@/app/components/gallery/ImageSection";
import MemoryCardsSection from "@/app/components/gallery/MemoryCardsSection";


const GalleryPage = () => {
  return (
    <>
      <StoriesBanner />
      {/* <MemoryCardsSection /> */}
      <HowWeAreSection />
      <InitiativesSection />
      <DonorsSection />
      <ImageSection />

    </>
  );
};

export default GalleryPage;
