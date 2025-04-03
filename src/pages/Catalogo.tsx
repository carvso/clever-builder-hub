
import CatalogoContent from "@/components/CatalogoContent";
import { useState, useEffect } from "react";

export default function Catalogo() {
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsPageLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-dark overflow-hidden">
      <main className="pt-12">
        <div className="container mx-auto px-6">
          <div className={`text-center max-w-2xl mx-auto mb-12 ${isPageLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
            <h1 className="text-4xl font-bold text-white mb-4">
              Materiali Edili di Qualità
            </h1>
            <p className="text-lg text-gray-300">
              Scopri la nostra selezione di materiali edili di prima qualità. 
              Da mattoni e cemento a materiali per l'isolamento, tutto ciò che serve 
              per completare il tuo progetto di costruzione a Siracusa, Solarino, Floridia e provincia.
            </p>
          </div>

          {/* Contenuto principale */}
          <CatalogoContent />
        </div>
      </main>
    </div>
  );
}
