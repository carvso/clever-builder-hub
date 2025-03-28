import { ArrowRight, Package, ShieldCheck, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getImagePath } from "@/utils/imageUtils";

export default function CatalogoCtaSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-16 bg-secondary overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="relative rounded-3xl bg-gradient-to-r from-secondary to-dark overflow-hidden border border-gray-700/50">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path fill="#FFF" d="M47.5,-57.2C59.9,-45.3,67.3,-28.5,71.5,-9.7C75.8,9,76.9,29.8,67.6,44.4C58.3,59.1,38.5,67.7,17.8,73.2C-2.9,78.8,-25.4,81.2,-40.2,72.5C-55,63.8,-62,43.9,-67.9,23.5C-73.8,3.2,-78.6,-17.7,-72.2,-33.8C-65.8,-49.9,-48.1,-61.3,-30.9,-70.5C-13.6,-79.7,3.2,-86.7,18.1,-81.1C33,-75.5,35.1,-69.2,47.5,-57.2Z" transform="translate(100 100)" />
            </svg>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 py-12 px-8 md:px-12">
            <div className={`text-white space-y-6 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-dark/50 backdrop-blur-sm rounded-full border border-gray-700/50">
                <Package className="w-4 h-4" />
                <span className="text-sm font-medium">Materiali premium</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                Completa il tuo progetto con i migliori materiali
              </h2>
              
              <p className="text-gray-300 text-lg">
                Oltre al noleggio mezzi, EdilP2 offre una vasta gamma di materiali edili 
                di prima qualità per ogni fase del tuo progetto di costruzione.
              </p>
              
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-dark/50 border border-gray-700/50">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Qualità Certificata</h3>
                    <p className="text-gray-300 text-sm">
                      Materiali testati e conformi alle normative
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-dark/50 border border-gray-700/50">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Consegna in Cantiere</h3>
                    <p className="text-gray-300 text-sm">
                      Trasporto e scarico direttamente in loco
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <Link 
                  to="/catalogo" 
                  className={`inline-flex items-center gap-2 px-6 py-3 bg-dark text-white rounded-xl hover:bg-dark/80 transition-colors font-medium hover-lift border border-gray-700/50 ${
                    isVisible ? 'animate-scale-in delay-200' : 'opacity-0'
                  }`}
                >
                  Esplora il nostro catalogo
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            
            <div className={`flex items-center justify-center ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
              <div className="relative">
                <img 
                  src={getImagePath("/lovable-uploads/7dc003ab-aa4a-4e77-a0f4-a031f5755afd.png")} 
                  alt="Materiali edili di qualità" 
                  className="rounded-xl shadow-xl max-h-80 object-cover hover-lift border border-gray-700/50"
                />
                <div className="absolute bottom-6 right-0 translate-x-1/3 bg-dark py-3 px-5 rounded-xl shadow-lg border border-gray-700/50">
                  <div className="text-center">
                    <p className="text-sm text-gray-400">Disponibili da</p>
                    <p className="text-xl font-bold text-white">€0.50/pz</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
