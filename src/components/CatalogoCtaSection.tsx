
import { ArrowRight, Package, ShieldCheck, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

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
    <section ref={sectionRef} className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="relative rounded-3xl bg-gray-50 overflow-hidden border border-gray-100">
          <div className="grid md:grid-cols-2 gap-8 py-12 px-8 md:px-12">
            <div className={`relative ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
              <div className="relative">
                <img 
                  src="https://www.tekneco.it/immagini/articoli/gasbeton.jpg" 
                  alt="Materiali EdilP2" 
                  className="rounded-xl shadow-xl max-h-80 object-cover hover-lift"
                />
                <div className="absolute top-6 left-0 -translate-x-1/4 bg-primary py-3 px-5 rounded-xl shadow-lg text-white">
                  <div className="text-center">
                    <p className="text-sm text-white/80">Sconti fino al</p>
                    <p className="text-xl font-bold">15%</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`text-dark space-y-6 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                <Package className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Materiali premium</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold leading-tight text-gray-900">
                Completa il tuo progetto con i migliori materiali
              </h2>
              
              <p className="text-gray-600 text-lg">
                Oltre al noleggio mezzi, EdilP2 offre una vasta gamma di materiali edili 
                di prima qualità per ogni fase del tuo progetto di costruzione.
              </p>
              
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Qualità Certificata</h3>
                    <p className="text-gray-600 text-sm">
                      Materiali testati e conformi alle normative
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Truck className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Consegna in Cantiere</h3>
                    <p className="text-gray-600 text-sm">
                      Trasporto e scarico direttamente in loco
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <Link 
                  to="/catalogo" 
                  className={`inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-medium hover-lift ${
                    isVisible ? 'animate-scale-in delay-200' : 'opacity-0'
                  }`}
                >
                  Esplora il nostro catalogo
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
