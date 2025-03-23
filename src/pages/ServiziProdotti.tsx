import { useState, useEffect } from "react";
import { Check, Star, User, Filter, Search, ShoppingCart, Truck, Package, ArrowRight, Clock, Construction } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Dati dei veicoli dal componente Servizi.tsx
const vehicles = [
  {
    id: 1,
    name: "Euro Cargo Scarrabile",
    description: "Camion con sistema scarrabile per trasporto di container e materiali",
    price: "280€/giorno",
    withDriverPrice: "420€/giorno",
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
    price: "180€/giorno",
    withDriverPrice: "320€/giorno",
    image: "/lovable-uploads/2a91b4df-0a54-4b26-90e6-d8f4c43328aa.png",
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
    price: "150€/giorno",
    withDriverPrice: "290€/giorno",
    image: "/lovable-uploads/b626251b-fdc0-4163-9b91-f73d5364a140.png",
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
  }
];

// Dati dei prodotti dal componente CatalogoContent.tsx
const products = [
  {
    id: 1,
    name: "Cemento Portland Buzzi",
    description: "Cemento di alta qualità per costruzioni durevoli e resistenti",
    price: "4.90€/sacco",
    category: "Cementi",
    image: "https://www.amorelegnamistore.it/cdn/shop/files/CEMENTO-425-BUZZI-PORTLAND-25-KG-Amorelegnami-310.jpg?v=1683920067&width=950",
  },
  {
    id: 2,
    name: "Rasante grigio Kerakoll",
    description: "Rasante professionale per finiture di alta qualità",
    price: "12.50€/sacco",
    category: "Rasanti",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQtXUpX0eqJnZ1DMVW0ebDQmBjIci6KXBBNw&s",
  },
  {
    id: 3,
    name: "Rasante bianco Kerakoll",
    description: "Rasante bianco per finiture perfette e di pregio",
    price: "14.80€/sacco",
    category: "Rasanti",
    image: "https://www.lovebrico.com/695-large_default/rasante-kerakoll-rasobuild-eco-top-fino-25-kg-12047-bianco.jpg",
  },
  {
    id: 4,
    name: "Colla C1 Buffa",
    description: "Adesivo cementizio per piastrelle in interni",
    price: "6.50€/sacco",
    category: "Colle",
    image: "https://imes.me.it/wp-content/uploads/2016/09/DURABOND-UNIVERSALE.jpg",
  },
  {
    id: 5,
    name: "Colla C2TE Buffa",
    description: "Adesivo cementizio ad alte prestazioni per esterni",
    price: "9.70€/sacco",
    category: "Colle",
    image: "https://edilpiazza.com/cdn/shop/files/150756.jpg?v=1721292568",
  },
  {
    id: 6,
    name: "Mattoni Forati",
    description: "Mattoni in laterizio per tramezzi e pareti divisorie",
    price: "0.75€/pz",
    category: "Mattoni",
    image: "https://www.danesilaterizi.it/wp-content/uploads/2020/01/Quattro-fori-8.12.24.jpg",
  }
];

const vehicleCategories = ["Tutti i mezzi", "Movimento terra", "Sollevamento", "Trasporto", "Compattazione"];
const productCategories = ["Tutti", "Cementi", "Rasanti", "Colle", "Mattoni", "Inerti", "Coperture", "Strutture"];

export default function ServiziProdotti() {
  const [activeTab, setActiveTab] = useState("servizi");
  const [selectedVehicleCategory, setSelectedVehicleCategory] = useState("Tutti i mezzi");
  const [selectedProductCategory, setSelectedProductCategory] = useState("Tutti");
  const [withDriver, setWithDriver] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const { addItem } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Trigger animations
    setIsPageLoaded(true);
  }, []);

  // Filtro veicoli
  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch = vehicle.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = 
      selectedVehicleCategory === "Tutti i mezzi" || 
      vehicle.category === selectedVehicleCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Filtro prodotti
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedProductCategory === "Tutti" || 
      product.category === selectedProductCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product: any) => {
    addItem(product);
    toast({
      title: "Prodotto aggiunto al carrello",
      description: `${product.name} è stato aggiunto al carrello`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <main className="py-12">
        <div className="container mx-auto px-6">
          <div className={`text-center max-w-3xl mx-auto mb-12 ${isPageLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Noleggio Mezzi e Materiali
            </h1>
            <p className="text-lg text-gray-600">
              Trova tutto ciò di cui hai bisogno per il tuo cantiere in un unico posto:
              dai mezzi per il movimento terra ai materiali di costruzione di alta qualità.
            </p>
            
            {/* Cerca globale */}
            <div className="mt-8 max-w-md mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cerca mezzi o materiali..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Tabs per switchare tra servizi e prodotti */}
          <Tabs defaultValue="servizi" value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <div className="flex justify-center mb-6">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="servizi" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                  <Truck className="w-4 h-4 mr-2" />
                  Noleggio Mezzi
                </TabsTrigger>
                <TabsTrigger value="prodotti" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                  <Package className="w-4 h-4 mr-2" />
                  Materiali
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Contenuto Tab Servizi */}
            <TabsContent value="servizi" className="animate-fade-in">
              {/* Filtri Servizi */}
              <div className={`bg-white rounded-xl shadow-sm p-4 mb-8 ${isPageLoaded ? 'animate-slide-in-left delay-100' : 'opacity-0'}`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex gap-4 overflow-x-auto pb-4 md:pb-0">
                    {vehicleCategories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedVehicleCategory(category)}
                        className={`px-4 py-2 rounded-full border ${
                          selectedVehicleCategory === category 
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

              {/* Griglia Veicoli */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {filteredVehicles.length > 0 ? (
                  filteredVehicles.map((vehicle, index) => (
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
                          <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
                            Prenota ora
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-3 text-center py-12">
                    <p className="text-gray-500">Nessun mezzo disponibile con i criteri di ricerca selezionati</p>
                  </div>
                )}
              </div>

              {/* CTA Servizi */}
              <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10 my-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Hai bisogno di assistenza?</h3>
                    <p className="text-gray-600">
                      Contattaci per un preventivo personalizzato o per richiedere informazioni
                      specifiche sui nostri mezzi disponibili per il noleggio.
                    </p>
                  </div>
                  <Link 
                    to="/servizi" 
                    className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-medium whitespace-nowrap hover-lift"
                  >
                    Vedi tutti i mezzi disponibili
                  </Link>
                </div>
              </div>
            </TabsContent>

            {/* Contenuto Tab Prodotti */}
            <TabsContent value="prodotti" className="animate-fade-in">
              {/* Filtri Prodotti */}
              <div className="bg-white rounded-xl shadow-sm p-4 mb-8 animate-slide-in-left">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                    {productCategories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedProductCategory(category)}
                        className={`px-4 py-2 rounded-full border ${
                          selectedProductCategory === category
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-gray-200 hover:border-primary hover:bg-primary/5"
                        } text-sm font-medium whitespace-nowrap transition-colors hover-lift`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                  <Link
                    to="/checkout"
                    className="px-4 py-2 rounded-full border border-gray-200 hover:border-primary hover:bg-primary/5 text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2 hover-lift"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Carrello
                  </Link>
                </div>
              </div>

              {/* Griglia Prodotti */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product, index) => (
                    <div
                      key={product.id}
                      className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 animate-fade-in hover-lift`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                      <div className="p-6">
                        <div className="mb-4">
                          <p className="text-xs text-primary font-medium mb-2">
                            {product.category}
                          </p>
                          <h3 className="text-lg font-semibold text-dark mb-2">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-4">
                            {product.description}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-semibold text-dark">
                            {product.price}
                          </span>
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="inline-flex items-center gap-2 px-3 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm font-medium"
                          >
                            <ShoppingCart className="w-4 h-4" />
                            Aggiungi
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-4 text-center py-12">
                    <p className="text-gray-500">Nessun prodotto disponibile con i criteri di ricerca selezionati</p>
                  </div>
                )}
              </div>

              {/* CTA Prodotti */}
              <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10 my-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Completa il tuo ordine</h3>
                    <p className="text-gray-600">
                      Visita il nostro catalogo completo per vedere tutti i materiali disponibili,
                      o procedi al checkout per completare l'ordine.
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <Link 
                      to="/catalogo" 
                      className="px-6 py-3 bg-white border border-primary text-primary rounded-xl hover:bg-primary/5 transition-colors text-sm font-medium whitespace-nowrap hover-lift"
                    >
                      Vedi tutti i prodotti
                    </Link>
                    <Link 
                      to="/checkout" 
                      className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors text-sm font-medium whitespace-nowrap hover-lift"
                    >
                      Procedi all'ordine
                    </Link>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Sezione Bundle Prodotti + Servizi */}
          <div className="bg-white border border-gray-200 rounded-3xl p-8 lg:p-10 my-12 shadow-sm">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Soluzioni Complete per il tuo Cantiere</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Scopri i nostri pacchetti speciali che combinano noleggio mezzi e materiali edili
                per offrire una soluzione completa alle tue esigenze di cantiere.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10 hover-lift">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Construction className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Pacchetto Ristrutturazione</h3>
                    <p className="text-gray-600">
                      L'ideale per chi sta ristrutturando: noleggio di una mini pala e fornitura
                      di cemento, rasanti e colle a prezzi scontati.
                    </p>
                  </div>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-gray-700">
                    <Check className="w-4 h-4 text-primary" />
                    Mini pala per 3 giorni
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <Check className="w-4 h-4 text-primary" />
                    10 sacchi di cemento Portland
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <Check className="w-4 h-4 text-primary" />
                    5 sacchi di rasante a scelta
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <Check className="w-4 h-4 text-primary" />
                    Trasporto in cantiere incluso
                  </li>
                </ul>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div>
                    <span className="block text-xl font-bold text-gray-900">
                      A partire da 500€
                    </span>
                    <span className="text-sm text-gray-500">
                      Risparmio del 15% rispetto all'acquisto separato
                    </span>
                  </div>
                  <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
                    Richiedi preventivo
                  </button>
                </div>
              </div>

              <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10 hover-lift">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Truck className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Pacchetto Fondazioni</h3>
                    <p className="text-gray-600">
                      Tutto il necessario per realizzare fondazioni: escavatore, materiali inerti
                      e cementi di prima qualità.
                    </p>
                  </div>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-gray-700">
                    <Check className="w-4 h-4 text-primary" />
                    Escavatore con conducente per 2 giorni
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <Check className="w-4 h-4 text-primary" />
                    5m³ di sabbia lavata
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <Check className="w-4 h-4 text-primary" />
                    20 sacchi di cemento Portland
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <Check className="w-4 h-4 text-primary" />
                    Trasporto in cantiere incluso
                  </li>
                </ul>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div>
                    <span className="block text-xl font-bold text-gray-900">
                      A partire da 850€
                    </span>
                    <span className="text-sm text-gray-500">
                      Risparmio del 20% rispetto all'acquisto separato
                    </span>
                  </div>
                  <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
                    Richiedi preventivo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 