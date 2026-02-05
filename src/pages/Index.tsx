import HeroSection from "@/components/wedding/HeroSection";
import Countdown from "@/components/wedding/Countdown";
import CoupleIntro from "@/components/wedding/CoupleIntro";
import Timeline from "@/components/wedding/Timeline";
import Location from "@/components/wedding/Location";
import RSVP from "@/components/wedding/RSVP";
import Closing from "@/components/wedding/Closing";
import MusicPlayer from "@/components/wedding/MusicPlayer";

const Index = () => {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <MusicPlayer />
      <HeroSection />
      <CoupleIntro />
      <Countdown />
      <Timeline />
      <Location />
      <RSVP />
      <Closing />
    </main>
  );
};

export default Index;
