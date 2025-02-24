
import Navbar from "@/components/Navbar";
import CatalogoContent from "@/components/CatalogoContent";
import Footer from "@/components/Footer";

export default function Catalogo() {
  return (
    <div className="min-h-screen bg-light">
      <Navbar />
      <CatalogoContent />
      <Footer />
    </div>
  );
}
