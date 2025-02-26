
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
  return (
    <main className="min-h-screen">
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
