import HeroSection from "@/components/wedding/HeroSection";
import CoupleIntro from "@/components/wedding/CoupleIntro";
import Timeline from "@/components/wedding/Timeline";
import Location from "@/components/wedding/Location";
import Gallery from "@/components/wedding/Gallery";
import Closing from "@/components/wedding/Closing";
import MusicPlayer from "@/components/wedding/MusicPlayer";

const Index = () => {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <MusicPlayer />
      <HeroSection />
      <CoupleIntro />
      <Timeline />
      <Location />
      <Gallery />
      <Closing />
    </main>
  );
};

export default Index;
