import DonateSection2 from "./components/home/DonateSection2";
import HomeBanner from "./components/home/HomeBanner";
import Overview from "./components/home/Overview";
import SpreadSection from "./components/home/SpreadSection";
import AboutSection from "./components/home/AboutSection";
import DonateSection from "./components/home/DonateSection";
import AlkaCards from "./components/home/AlkaCards";
import ImpactStoriesSection from "./components/home/ImpactStoriesSection";

export default function Home() {
  return (
    <main
      className="min-h-screen"
      // style={{
      //   background:"var(--surface-2)",
         
      // }}
    >
      <HomeBanner />
      <AlkaCards />
      <Overview />
      <DonateSection2 />
      <ImpactStoriesSection />
      <SpreadSection />
      {/* <AboutSection /> */}
      {/* <DonateSection /> */}
    </main>
  );
}
