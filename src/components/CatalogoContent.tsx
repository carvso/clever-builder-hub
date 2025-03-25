import { Filter, Search, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/use-toast";
import NoleggioCtaSection from "@/components/NoleggioCtaSection";

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
  },
  {
    id: 7,
    name: "Gasbeton",
    description: "Blocchi in cemento cellulare per murature isolanti",
    price: "3.20€/pz",
    category: "Mattoni",
    image: "https://www.tekneco.it/immagini/articoli/gasbeton.jpg",
  },
  {
    id: 8,
    name: "Architrave",
    description: "Architrave prefabbricato per porte e finestre",
    price: "18.50€/pz",
    category: "Strutture",
    image: "https://img.edilportale.com/product-thumbs/h_Gallotta_ARCHITRAVE-2x2x5_mcHgJrPOS8.jpeg",
  },
  {
    id: 9,
    name: "Sabbia Lavata",
    description: "Sabbia fine per massetti e miscele cementizie di qualità",
    price: "35€/m³",
    category: "Inerti",
    image: "https://www.canzianinerti.it/wp-content/uploads/2023/05/aggregato-naturale-sabbia-frantoio-lavata-min.jpg",
  },
  {
    id: 10,
    name: "Sabbia",
    description: "Sabbia standard per impieghi generici in edilizia",
    price: "30€/m³",
    category: "Inerti",
    image: "https://cavechizzola.it/wp-content/uploads/2015/06/Sabbia-0-5-1030x773.jpg",
  },
  {
    id: 11,
    name: "Sabbione",
    description: "Sabbione per malte e intonaci a grana media",
    price: "45€/m³",
    category: "Inerti",
    image: "https://images.ctfassets.net/j4m9q0fykyy4/7vBcsGChlMKJkMKoFRlEOC/a133824242e696055060f9a061a57b8d/2020-08-mortier-b_C3_A9ton.jpg",
  },
  {
    id: 12,
    name: "Rimacinato fino (Azolo)",
    description: "Inerte rimacinato fine per sottofondi e riempimenti",
    price: "28€/m³",
    category: "Inerti",
    image: "https://files.synapp.it/87689/foto/prodotti/B/1522143826912_rimacinato_B.jpg",
  },
  {
    id: 13,
    name: "Pietrisco",
    description: "Pietrisco per drenaggi e calcestruzzi",
    price: "40€/m³",
    category: "Inerti",
    image: "https://www.egap.it/EGAP/wp-content/uploads/2022/08/PH026-Pietrisco-Scelto-Grande.jpg",
  },
  {
    id: 14,
    name: "Misto",
    description: "Misto granulometrico per sottofondi stradali",
    price: "32€/m³",
    category: "Inerti",
    image: "https://www.superbeton.it/kimg/640/misto_granulare_stab.jpg",
  },
  {
    id: 15,
    name: "Onduline catramate",
    description: "Lastre ondulate bituminose per coperture e tettoie",
    price: "8.90€/m²",
    category: "Coperture",
    image: "https://www.infobuild.it/wp-content/uploads/lastre-copertura-onduline.jpg",
  },
  {
    id: 16,
    name: "Blocchetti",
    description: "Blocchetti in cemento per murature di contenimento",
    price: "1.60€/pz",
    category: "Strutture",
    image: "https://molinaro.it/wp-content/uploads/2020/11/blocco_20x50_086-1024x684.jpg",
  },
];

const categories = ["Tutti", "Cementi", "Rasanti", "Colle", "Mattoni", "Inerti", "Coperture", "Strutture"];

export default function CatalogoContent() {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tutti");

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "Tutti" || product.category === selectedCategory;
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
    <div className="py-16 bg-light">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-dark mb-4">Catalogo Materiali</h1>
          <p className="text-gray-600">
            Scopri la nostra selezione di materiali edili di alta qualità
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 animate-slide-in-left">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Cerca materiali..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full border ${
                  selectedCategory === category
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-gray-200 hover:border-primary hover:bg-primary/5"
                } text-sm font-medium whitespace-nowrap transition-colors hover-lift`}
              >
                {category}
              </button>
            ))}
            <button 
              onClick={() => navigate("/checkout")}
              className="px-4 py-2 rounded-full border border-gray-200 hover:border-primary hover:bg-primary/5 text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2 hover-lift"
            >
              <ShoppingCart className="w-4 h-4" />
              Carrello
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
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
          ))}
        </div>

        {/* Noleggio CTA */}
        <NoleggioCtaSection />
      </div>
    </div>
  );
}
