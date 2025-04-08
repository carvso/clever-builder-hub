import { Check, Star, User, Shield, FileText } from "lucide-react";
import { useState, useEffect } from "react";
import CatalogoCtaSection from "@/components/CatalogoCtaSection";
import { getImagePath } from "@/utils/imageUtils";
import { Link } from "react-router-dom";

const vehicles = [
  {
    id: 1,
    name: "Euro Cargo Scarrabile",
    description: "Camion con sistema scarrabile per trasporto di container e materiali",
    image: "https://www.ricciato.com/resources/product/10242/gallery/01_Camion_allestito_gancio_scarrabile_Iveco_120E25K_angolare_destra.jpg",
    features: [
      "Portata: 12 tonnellate",
      "Sistema scarrabile idraulico",
      "Cassoni intercambiabili",
      "Patente C richiesta",
    ],
    category: "Trasporto",
    rating: 4.8,
    reviews: 86,
    withDriver: true,
  },
  {
    id: 2,
    name: "Escavatore Yanmar Vio 57",
    description: "Escavatore compatto con raggio di rotazione zero per spazi ristretti",
    image: getImagePath("/lovable-uploads/2a91b4df-0a54-4b26-90e6-d8f4c43328aa.png"),
    features: [
      "Peso: 5.7 tonnellate",
      "Profondità di scavo: 3.8m",
      "Cabina climatizzata",
      "Zero Tail Swing",
    ],
    category: "Movimento terra",
    rating: 4.9,
    reviews: 132,
    withDriver: true,
  },
  {
    id: 3,
    name: "Cat Maia (Mini Pala)",
    description: "Mini pala caricatrice ideale per movimentazione materiali in spazi ristretti",
    image: "https://sc04.alicdn.com/kf/H83c9800209bf4eefa994e7a5aefd1092F/250813069/H83c9800209bf4eefa994e7a5aefd1092F.jpg",
    features: [
      "Capacità operativa: 900kg",
      "Altezza di scarico: 2.3m",
      "Benna standard inclusa",
      "Joystick controllo intuitivo",
    ],
    category: "Movimento terra",
    rating: 4.7,
    reviews: 94,
    withDriver: true,
  },
  {
    id: 4,
    name: "Muletto Linda",
    description: "Carrello elevatore per movimentazione pallet e materiali pesanti",
    image: "https://www.orzicarrellielevatori.com/wp-content/uploads/2024/07/IMG20240617095459.jpg",
    features: [
      "Portata: 2.5 tonnellate",
      "Altezza di sollevamento: 3.5m",
      "Motore diesel",
      "Ruote pneumatiche",
    ],
    category: "Sollevamento",
    rating: 4.6,
    reviews: 78,
    withDriver: true,
  },
  {
    id: 7,
    name: "Camion Gru",
    description: "Camion con gru telescopica per sollevamento e trasporto materiali",
    image: getImagePath("/lovable-uploads/b626251b-fdc0-4163-9b91-f73d5364a140.png"),
    features: [
      "Portata: 10 tonnellate",
      "Sbraccio gru: fino a 20m",
      "Pianale di carico ampio",
      "Ideale per consegne in cantiere",
    ],
    category: "Sollevamento",
    rating: 4.8,
    reviews: 65,
    withDriver: true,
  },
];

export default function Mezzi() {
  const [selectedCategory, setSelectedCategory] = useState("Tutti i mezzi");
  const [withDriver, setWithDriver] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Trigger animations
    setIsPageLoaded(true);
  }, []);

  const filteredVehicles = vehicles.filter((vehicle) => {
    if (selectedCategory !== "Tutti i mezzi" && vehicle.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  const categories = ["Tutti i mezzi", "Movimento terra", "Sollevamento", "Trasporto"];

  return (
    <div className="min-h-screen bg-dark overflow-hidden">
      <main className="py-12">
        <div className="container mx-auto px-6">
          <div className={`text-center max-w-2xl mx-auto mb-12 ${isPageLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
            <h1 className="text-4xl font-bold text-white mb-4">
              Noleggio Automezzi
            </h1>
            <p className="text-lg text-gray-300">
              Scopri la nostra flotta di mezzi professionali per il tuo cantiere.
              Noleggio con o senza conducente, giornaliero, settimanale o mensile con assistenza dedicata
              a Siracusa, Solarino, Floridia e provincia.
            </p>
          </div>

          {/* Filters */}
          <div className={`bg-white rounded-xl shadow-sm p-4 mb-8 ${isPageLoaded ? 'animate-slide-in-left delay-100' : 'opacity-0'}`}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                {categories.map((category, index) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full border ${
                      selectedCategory === category 
                        ? "border-primary bg-primary/10 text-primary" 
                        : "border-gray-200 text-gray-700 hover:border-primary hover:text-primary"
                    } transition-colors text-sm font-medium hover-lift`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={withDriver}
                    onChange={(e) => setWithDriver(e.target.checked)}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700">Con conducente</span>
                </label>
              </div>
            </div>
          </div>

          {/* Vehicle Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((vehicle, index) => (
              <div
                key={vehicle.id}
                className={`bg-secondary/40 rounded-2xl overflow-hidden border border-gray-700 hover:shadow-lg transition-shadow hover-lift ${
                  isPageLoaded ? `animate-fade-in delay-${Math.min(index * 100, 500)}` : 'opacity-0'
                }`}
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-dark/80 backdrop-blur-sm text-primary text-xs font-medium px-3 py-1 rounded-full">
                      {vehicle.category}
                    </span>
                  </div>
                  {vehicle.withDriver && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-primary/90 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                        <User className="w-3 h-3" />
                        Disponibile con conducente
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white">
                      {vehicle.name}
                    </h3>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      <span className="font-medium text-white">{vehicle.rating}</span>
                      <span className="text-gray-400">({vehicle.reviews})</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-4">{vehicle.description}</p>
                  
                  <ul className="space-y-2 mb-6">
                    {vehicle.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                        <Check className="w-4 h-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex flex-col items-center justify-between pt-4 border-t border-gray-700 gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Shield className="w-4 h-4 text-primary" />
                      <span>
                        {withDriver ? "Conducente e assicurazione inclusi" : "Assicurazione inclusa"}
                      </span>
                    </div>
                    <Link 
                      to="/checkout" 
                      className="w-full px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors text-sm font-medium shadow-md hover:shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-2"
                    >
                      <FileText className="w-4 h-4" />
                      Richiedi preventivo
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* CTA Section per Catalogo */}
      <CatalogoCtaSection />
    </div>
  );
}
