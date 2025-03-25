import CatalogoContent from "@/components/CatalogoContent";
import { Package, ShieldCheck, Truck } from "lucide-react";
import { getImagePath } from "@/utils/imageUtils";

export default function Catalogo() {
  return (
    <div className="min-h-screen bg-light">
      {/* Hero Section */}
      <section className="relative py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
                <Package className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Materiali Edili</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Materiali Edili di Qualità per il Tuo Progetto
              </h1>
              
              <p className="text-gray-600 text-lg mb-8">
                Scopri la nostra selezione di materiali edili di prima qualità. 
                Da mattoni e cemento a materiali per l'isolamento, tutto ciò che serve 
                per completare il tuo progetto di costruzione.
              </p>
              
              <div className="flex flex-wrap gap-6">
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
            </div>
            
            <div className="relative">
              <img 
                src={getImagePath("/lovable-uploads/7dc003ab-aa4a-4e77-a0f4-a031f5755afd.png")}
                alt="Materiali Edili di Qualità"
                className="rounded-2xl shadow-xl w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contenuto principale */}
      <CatalogoContent />
    </div>
  );
}
