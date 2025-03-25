import CatalogoContent from "@/components/CatalogoContent";
import { Package, ShieldCheck, Truck, Check } from "lucide-react";
import { useState, useEffect } from "react";

export default function Catalogo() {
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsPageLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <main className="py-12">
        <div className="container mx-auto px-6">
          <div className={`text-center max-w-2xl mx-auto mb-12 ${isPageLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Materiali Edili di Qualità
            </h1>
            <p className="text-lg text-gray-600">
              Scopri la nostra selezione di materiali edili di prima qualità. 
              Da mattoni e cemento a materiali per l'isolamento, tutto ciò che serve 
              per completare il tuo progetto di costruzione a Siracusa, Solarino, Floridia e provincia.
            </p>
          </div>

          {/* Features Grid */}
          <div className={`grid md:grid-cols-3 gap-8 mb-12 ${isPageLoaded ? 'animate-slide-in-left delay-100' : 'opacity-0'}`}>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Qualità Certificata</h3>
              <p className="text-gray-600 text-sm">
                Materiali testati e conformi alle normative vigenti
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4">
                <Truck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Consegna in Cantiere</h3>
              <p className="text-gray-600 text-sm">
                Trasporto e scarico direttamente nel tuo cantiere
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Ampia Selezione</h3>
              <p className="text-gray-600 text-sm">
                Tutti i materiali necessari per il tuo progetto
              </p>
            </div>
          </div>

          {/* Contenuto principale */}
          <CatalogoContent />
        </div>
      </main>
    </div>
  );
}
