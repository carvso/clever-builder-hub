
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PartnerCarousel from "@/components/PartnerCarousel";
import Showcase from "@/components/Showcase";
import ProductCategories from "@/components/ProductCategories";
import MaterialsCTASection from "@/components/MaterialsCTASection";
import DriverRentalSection from "@/components/DriverRentalSection";
import LocationSection from "@/components/LocationSection";
import Footer from "@/components/Footer";

const Index = () => {
  // Aggiungi animazione al caricamento della pagina
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Aggiungi classe per animazione iniziale al body
    document.body.classList.add('animate-fade-in');
    
    return () => {
      document.body.classList.remove('animate-fade-in');
    };
  }, []);

  return (
    <main className="min-h-screen overflow-hidden">
      <Navbar />
      <HeroSection />
      <PartnerCarousel />
      <Showcase />
      <ProductCategories />
      <MaterialsCTASection />
      <DriverRentalSection />
      <LocationSection />
      <Footer />
    </main>
  );
};

export default Index;
