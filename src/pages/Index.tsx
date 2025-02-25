
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PartnerCarousel from "@/components/PartnerCarousel";
import Showcase from "@/components/Showcase";
import ProductCategories from "@/components/ProductCategories";
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
      <LocationSection />
      <Footer />
    </main>
  );
};

export default Index;
