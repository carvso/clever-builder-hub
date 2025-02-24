
import { Search } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center bg-light">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                Leader nel settore edile
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-dark mb-6 leading-tight">
                Materiali edili di qualità per il tuo cantiere
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Scopri i migliori materiali e macchinari per costruzioni sicure e resistenti.
              </p>
            </div>
            <div className="relative max-w-xl">
              <input
                type="text"
                placeholder="Cerca materiali..."
                className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-dark"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white p-3 rounded-xl hover:bg-primary/90 transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="hidden lg:block relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl"></div>
            <img
              src="/lovable-uploads/8e9b834c-cad6-4dcd-9118-61a742d74b56.png"
              alt="Materiali edili e macchinari"
              className="rounded-2xl shadow-2xl w-full object-cover h-[600px]"
            />
            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-dark mb-1">
                    Consegna Rapida
                  </p>
                  <p className="text-sm text-gray-600">
                    Materiali disponibili in pronta consegna
                  </p>
                </div>
                <button className="px-6 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors text-sm font-medium">
                  Ordina Ora
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
