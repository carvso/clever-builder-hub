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
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

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
          <div className="mt-10 text-center">
            <Link 
              to="/servizi-prodotti" 
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-medium hover:-translate-y-1 hover:shadow-md transition-all"
            >
              Esplora Servizi & Prodotti in un'unica pagina
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
      <DriverRentalSection />
      <LocationSection />
    </main>
  );
};

export default Index;
