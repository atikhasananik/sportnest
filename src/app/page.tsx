import CtaBanner from "@/components/home/CtaBanner";
import FeaturedVenues from "@/components/home/FeaturedVenues";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import SocialProof from "@/components/home/SocialProof";
import SportGrid from "@/components/home/SportGrid";

export default function Home() {
  return (
    <>
      <Hero />
      <SportGrid />
      <FeaturedVenues />
      <HowItWorks />
      <SocialProof />
      <CtaBanner />
    </>
  );
}
