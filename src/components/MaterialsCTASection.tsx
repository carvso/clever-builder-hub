import { ArrowRight, Package, Box, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function MaterialsCTASection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = [
    "https://www.infobuild.it/wp-content/uploads/conformita-materiali-edilizia.png",
    "https://www.spazzinimaterialiedili.it/wp-content/uploads/2022/10/spazzini_06.jpeg"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Cambia immagine ogni 5 secondi

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img 
                src={images[currentImageIndex]}
                alt="Materiali edili di qualità" 
                className="w-full h-full object-cover transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
            
            <div className="absolute bottom-6 left-6 right-6 p-6 bg-white rounded-xl shadow-lg">
              <div className="flex flex-col">
                <div className="flex items-center gap-4 mb-3">
                  <span className="inline-block px-3 py-1 bg-primary rounded-full text-white text-xs font-semibold">
                    SPEDIZIONE GRATUITA
                  </span>
                  <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-gray-700 text-xs font-semibold">
                    DISPONIBILITÀ IMMEDIATA
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-dark mb-2">
                  Promozione Materiali EdilP2
                </h4>
                <p className="text-gray-600 text-sm mb-4">
                  Su tutti gli ordini superiori a 500€, spedizione gratuita e sconto del 5% sul totale.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-bold">Valido fino: 31/12/2023</span>
                  <Link 
                    to="/catalogo"
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Scopri l'offerta
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              Da EdilP2, qualità garantita
            </span>
            <h2 className="text-3xl font-bold text-dark mb-6 leading-tight">
              Materiali edili certificati per ogni tipo di progetto
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Da oltre 25 anni, EdilP2 seleziona i migliori materiali da costruzione per garantire 
              durabilità, sicurezza e sostenibilità nei tuoi progetti.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Package className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-dark mb-2">Consegna rapida</h3>
                  <p className="text-gray-600 text-sm">
                    Materiali disponibili in magazzino con consegna in 24/48 ore
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-dark mb-2">Materiali certificati</h3>
                  <p className="text-gray-600 text-sm">
                    Tutti i prodotti rispettano le normative europee di sicurezza
                  </p>
                </div>
              </div>
            </div>
            
            <Link 
              to="/catalogo" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-medium"
            >
              Esplora il nostro catalogo
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
