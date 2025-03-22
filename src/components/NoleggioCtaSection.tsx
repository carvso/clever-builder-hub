import { ArrowRight, Truck, Construction, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

export default function NoleggioCtaSection() {
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
    <section ref={sectionRef} className="py-16 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="relative rounded-3xl bg-gradient-to-r from-primary/90 to-primary overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path fill="#FFF" d="M47.5,-57.2C59.9,-45.3,67.3,-28.5,71.5,-9.7C75.8,9,76.9,29.8,67.6,44.4C58.3,59.1,38.5,67.7,17.8,73.2C-2.9,78.8,-25.4,81.2,-40.2,72.5C-55,63.8,-62,43.9,-67.9,23.5C-73.8,3.2,-78.6,-17.7,-72.2,-33.8C-65.8,-49.9,-48.1,-61.3,-30.9,-70.5C-13.6,-79.7,3.2,-86.7,18.1,-81.1C33,-75.5,35.1,-69.2,47.5,-57.2Z" transform="translate(100 100)" />
            </svg>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 py-12 px-8 md:px-12">
            <div className={`text-white space-y-6 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                <Truck className="w-4 h-4" />
                <span className="text-sm font-medium">Noleggio esclusivo EdilP2</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                Hai bisogno di macchinari per il tuo cantiere?
              </h2>
              
              <p className="text-white/90 text-lg">
                Scopri la nostra flotta di mezzi professionali disponibili per noleggio 
                giornaliero, settimanale o mensile. Con o senza conducente, sempre con assistenza dedicata
                a Siracusa, Solarino, Floridia e provincia.
              </p>
              
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-white/20">
                    <Construction className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Mezzi Certificati</h3>
                    <p className="text-white/80 text-sm">
                      Attrezzature sempre controllate e manutenute
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-white/20">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Disponibilità 24/7</h3>
                    <p className="text-white/80 text-sm">
                      Assistenza e supporto sempre attivi
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <Link 
                  to="/servizi" 
                  className={`inline-flex items-center gap-2 px-6 py-3 bg-white text-primary rounded-xl hover:bg-white/90 transition-colors font-medium hover-lift ${
                    isVisible ? 'animate-scale-in delay-200' : 'opacity-0'
                  }`}
                >
                  Esplora tutti i mezzi disponibili
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            
            <div className={`flex items-center justify-center ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
              <div className="relative h-64 rounded-xl overflow-hidden shadow-lg mb-4">
                <img 
                  src={`${window.BASE_IMAGE_PATH || ''}/lovable-uploads/3a3896f1-3cf7-4bd7-9e58-94834f7ebf28.png`}
                  alt="Noleggio mezzi pesanti" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-6 right-0 translate-x-1/3 bg-white py-3 px-5 rounded-xl shadow-lg">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Disponibile da</p>
                    <p className="text-xl font-bold text-primary">200€/giorno</p>
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
