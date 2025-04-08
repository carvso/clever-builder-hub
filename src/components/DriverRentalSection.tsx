import { ArrowRight, Shield, Star, User } from "lucide-react";
import { Link } from "react-router-dom";
import { getImagePath } from "@/utils/imageUtils";

export default function DriverRentalSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              Novità per i grandi cantieri
            </span>
            <h2 className="text-3xl font-bold text-dark mb-6 leading-tight">
              Noleggio mezzi pesanti con conducente qualificato
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Affidati ai nostri operatori esperti per gestire i mezzi più complessi. 
              Risparmia tempo, incrementa la sicurezza e ottimizza l'efficienza del tuo cantiere
              a Siracusa, Solarino, Floridia e provincia.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-dark mb-2">Operatori certificati</h3>
                  <p className="text-gray-600 text-sm">
                    Personale con anni di esperienza e certificazioni aggiornate
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-dark mb-2">Totale sicurezza</h3>
                  <p className="text-gray-600 text-sm">
                    Massima copertura assicurativa per ogni tipo di lavoro
                  </p>
                </div>
              </div>
            </div>
            
            <Link 
              to="/mezzi" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-medium"
            >
              Scopri tutti i mezzi disponibili
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img 
                src={getImagePath("/lovable-uploads/2a91b4df-0a54-4b26-90e6-d8f4c43328aa.png")} 
                alt="Escavatore con conducente" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
            
            <div className="absolute bottom-6 left-6 right-6 p-6 bg-white rounded-xl shadow-lg">
              <div className="flex items-start gap-4">
                <img 
                  src={getImagePath("/lovable-uploads/aeda115b-2290-4756-93e2-9c9fb997e90d.png")} 
                  alt="Operatore" 
                  className="w-16 h-16 rounded-full object-cover border-2 border-white"
                />
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm text-gray-600 ml-1">(128 recensioni)</span>
                  </div>
                  <p className="text-gray-800 font-medium">
                    "Operatore preparato e professionale. Ha ottimizzato i tempi di scavo riducendo i costi del progetto."
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    — Marco P., Impresa Edile Siracusa
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
