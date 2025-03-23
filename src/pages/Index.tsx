import { useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import PartnerCarousel from "@/components/PartnerCarousel";
import Showcase from "@/components/Showcase";
import ProductCategories from "@/components/ProductCategories";
import MaterialsCTASection from "@/components/MaterialsCTASection";
import DriverRentalSection from "@/components/DriverRentalSection";
import LocationSection from "@/components/LocationSection";
import NoleggioCtaSection from "@/components/NoleggioCtaSection";
import CatalogoCtaSection from "@/components/CatalogoCtaSection";

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
      <HeroSection />
      <ProductCategories />
      <MaterialsCTASection />
      <PartnerCarousel />
      <Showcase />
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">I nostri servizi</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <NoleggioCtaSection />
            <CatalogoCtaSection />
          </div>
        </div>
      </div>
      <DriverRentalSection />
      <LocationSection />
    </main>
  );
};

export default Index;
