import { HeroSection } from "@/components/HeroSection";
import { SubsidiaryCards } from "@/components/SubsidiaryCards";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <SubsidiaryCards />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
