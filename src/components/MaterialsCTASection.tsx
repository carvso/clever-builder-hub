import { ArrowRight, Package, Box, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { getImagePath } from "@/utils/imageUtils";

export default function MaterialsCTASection() {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img 
                src={getImagePath("/lovable-uploads/7dc003ab-aa4a-4e77-a0f4-a031f5755afd.png")} 
                alt="Materiali edili di qualità" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
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
          
          <div className="order-1 lg:order-2 space-y-8">
            <div>
              <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium mb-6">
                Materiali di qualità
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                Soluzioni complete per ogni fase del tuo progetto
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Da mattoni e cemento a materiali per l'isolamento, offriamo tutto ciò che serve 
                per completare il tuo progetto di costruzione con la massima qualità.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-primary/20">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Materiali Certificati</h3>
                  <p className="text-sm text-gray-400">
                    Prodotti testati e conformi alle normative
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-primary/20">
                  <Box className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Ampia Selezione</h3>
                  <p className="text-sm text-gray-400">
                    Tutto ciò che serve per il tuo cantiere
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-primary/20">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Qualità Garantita</h3>
                  <p className="text-sm text-gray-400">
                    Materiali di prima scelta
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-primary/20">
                  <ArrowRight className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Consegna Rapida</h3>
                  <p className="text-sm text-gray-400">
                    Direttamente in cantiere
                  </p>
                </div>
              </div>
            </div>
            <div>
              <Link 
                to="/catalogo" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-medium hover-lift"
              >
                Esplora il catalogo
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
