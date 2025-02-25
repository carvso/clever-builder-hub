
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, Star } from "lucide-react";

const vehicles = [
  {
    id: 1,
    name: "Escavatore Cingolato",
    description: "Escavatore 20q ideale per scavi e movimento terra",
    price: "200€/giorno",
    image: "/lovable-uploads/8e9b834c-cad6-4dcd-9118-61a742d74b56.png",
    features: [
      "Peso operativo: 20q",
      "Profondità di scavo: 4m",
      "Cabina climatizzata",
      "GPS integrato",
    ],
    rating: 4.9,
    reviews: 128,
  },
  {
    id: 2,
    name: "Gru a Torre",
    description: "Gru altezza 30m con portata massima 2500kg",
    price: "350€/giorno",
    image: "/lovable-uploads/8e9b834c-cad6-4dcd-9118-61a742d74b56.png",
    features: [
      "Altezza: 30m",
      "Portata max: 2500kg",
      "Radiocomando incluso",
      "Assistenza 24/7",
    ],
    rating: 4.8,
    reviews: 94,
  },
  // Aggiungi altri veicoli qui...
];

export default function Servizi() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="py-12">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Noleggio Automezzi
            </h1>
            <p className="text-lg text-gray-600">
              Scopri la nostra flotta di mezzi professionali per il tuo cantiere.
              Noleggio giornaliero, settimanale o mensile con assistenza dedicata.
            </p>
          </div>

          {/* Filters */}
          <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
            {["Tutti i mezzi", "Movimento terra", "Sollevamento", "Trasporto", "Compattazione"].map(
              (filter) => (
                <button
                  key={filter}
                  className="px-4 py-2 bg-white rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:border-primary hover:text-primary transition-colors whitespace-nowrap"
                >
                  {filter}
                </button>
              )
            )}
          </div>

          {/* Vehicle Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {vehicle.name}
                    </h3>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      <span className="font-medium">{vehicle.rating}</span>
                      <span className="text-gray-500">({vehicle.reviews})</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{vehicle.description}</p>
                  
                  <ul className="space-y-2 mb-6">
                    {vehicle.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                        <Check className="w-4 h-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <span className="block text-xl font-bold text-gray-900">
                        {vehicle.price}
                      </span>
                      <span className="text-sm text-gray-500">
                        Assicurazione inclusa
                      </span>
                    </div>
                    <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
                      Prenota ora
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
