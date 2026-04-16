import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PricingSection from "@/components/PricingSection";
import TrainersSection from "@/components/TrainersSection";
import NoticesSection from "@/components/NoticesSection";
import AdmissionForm from "@/components/AdmissionForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <PricingSection />
      <TrainersSection />
      <NoticesSection />
      <AdmissionForm />
      <Footer />
    </div>
  );
};

export default Index;
