
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, Star, User, Filter } from "lucide-react";
import { useState, useEffect } from "react";

const vehicles = [
  {
    id: 1,
    name: "Escavatore Cingolato",
    description: "Escavatore 20q ideale per scavi e movimento terra",
    price: "200€/giorno",
    withDriverPrice: "350€/giorno",
    image: "/lovable-uploads/8e9b834c-cad6-4dcd-9118-61a742d74b56.png",
    features: [
      "Peso operativo: 20q",
      "Profondità di scavo: 4m",
      "Cabina climatizzata",
      "GPS integrato",
    ],
    category: "Movimento terra",
    rating: 4.9,
    reviews: 128,
    withDriver: true,
  },
  {
    id: 2,
    name: "Gru a Torre",
    description: "Gru altezza 30m con portata massima 2500kg",
    price: "350€/giorno",
    withDriverPrice: "550€/giorno",
    image: "/lovable-uploads/8e9b834c-cad6-4dcd-9118-61a742d74b56.png",
    features: [
      "Altezza: 30m",
      "Portata max: 2500kg",
      "Radiocomando incluso",
      "Assistenza 24/7",
    ],
    category: "Sollevamento",
    rating: 4.8,
    reviews: 94,
    withDriver: true,
  },
  {
    id: 3,
    name: "Autocarro con Gru",
    description: "Autocarro 4 assi con gru integrata per trasporto materiali",
    price: "280€/giorno",
    withDriverPrice: "450€/giorno",
    image: "/lovable-uploads/8e9b834c-cad6-4dcd-9118-61a742d74b56.png",
    features: [
      "Capacità di carico: 15t",
      "Gru: portata 5t",
      "Lunghezza pianale: 9m",
      "Patente C richiesta",
    ],
    category: "Trasporto",
    rating: 4.7,
    reviews: 86,
    withDriver: true,
  },
  {
    id: 4,
    name: "Bulldozer Caterpillar",
    description: "Bulldozer potente per livellamento terreno e scavi di massa",
    price: "320€/giorno",
    withDriverPrice: "500€/giorno",
    image: "/lovable-uploads/8e9b834c-cad6-4dcd-9118-61a742d74b56.png",
    features: [
      "Potenza: 150HP",
      "Lama 3.8m",
      "Cingoli da 700mm",
      "Sistema di telecamere 360°",
    ],
    category: "Movimento terra",
    rating: 4.8,
    reviews: 112,
    withDriver: true,
  },
  {
    id: 5,
    name: "Autobetoniera",
    description: "Betoniera per trasporto calcestruzzo fresco",
    price: "230€/giorno",
    withDriverPrice: "400€/giorno",
    image: "/lovable-uploads/8e9b834c-cad6-4dcd-9118-61a742d74b56.png",
    features: [
      "Capacità: 8mc",
      "Portata: 10t",
      "Canaletta orientabile",
      "Miscelazione in transito",
    ],
    category: "Trasporto",
    rating: 4.6,
    reviews: 75,
    withDriver: true,
  },
  {
    id: 6,
    name: "Rullo Compressore",
    description: "Rullo compressore per compattazione terreno e asfalto",
    price: "180€/giorno",
    withDriverPrice: "320€/giorno",
    image: "/lovable-uploads/8e9b834c-cad6-4dcd-9118-61a742d74b56.png",
    features: [
      "Peso: 12t",
      "Larghezza rullo: 2m",
      "Vibrazione regolabile",
      "Facile da manovrare",
    ],
    category: "Compattazione",
    rating: 4.7,
    reviews: 92,
    withDriver: true,
  },
];

export default function Servizi() {
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

  const categories = ["Tutti i mezzi", "Movimento terra", "Sollevamento", "Trasporto", "Compattazione"];

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <Navbar />
      
      <main className="py-12">
        <div className="container mx-auto px-6">
          <div className={`text-center max-w-2xl mx-auto mb-12 ${isPageLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Noleggio Automezzi
            </h1>
            <p className="text-lg text-gray-600">
              Scopri la nostra flotta di mezzi professionali per il tuo cantiere.
              Noleggio con o senza conducente, giornaliero, settimanale o mensile con assistenza dedicata.
            </p>
          </div>

          {/* Filters */}
          <div className={`bg-white rounded-xl shadow-sm p-4 mb-8 ${isPageLoaded ? 'animate-slide-in-left delay-100' : 'opacity-0'}`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex gap-4 overflow-x-auto pb-4 md:pb-0">
                {categories.map((category, index) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full border ${
                      selectedCategory === category 
                        ? "border-primary bg-primary/10 text-primary" 
                        : "border-gray-200 text-gray-700 hover:border-primary hover:text-primary"
                    } transition-colors whitespace-nowrap text-sm font-medium hover-lift`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              <div className="flex items-center">
                <button
                  onClick={() => setWithDriver(!withDriver)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border ${
                    withDriver 
                      ? "border-primary bg-primary/10 text-primary" 
                      : "border-gray-200 text-gray-700 hover:border-primary hover:text-primary"
                  } transition-colors text-sm font-medium hover-lift`}
                >
                  <User className="w-4 h-4" />
                  {withDriver ? "Con conducente" : "Senza conducente"}
                </button>
              </div>
            </div>
          </div>

          {/* Vehicle Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((vehicle, index) => (
              <div
                key={vehicle.id}
                className={`bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow hover-lift ${
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
                    <span className="bg-white/90 backdrop-blur-sm text-primary text-xs font-medium px-3 py-1 rounded-full">
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
                    {vehicle.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                        <Check className="w-4 h-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <span className="block text-xl font-bold text-gray-900">
                        {withDriver ? vehicle.withDriverPrice : vehicle.price}
                      </span>
                      <span className="text-sm text-gray-500">
                        {withDriver ? "Conducente e assicurazione inclusi" : "Assicurazione inclusa"}
                      </span>
                    </div>
                    <button className="px-6 py-2 bg-primary text-