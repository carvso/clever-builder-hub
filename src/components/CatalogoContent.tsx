
import { Filter, Search, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/use-toast";

const products = [
  {
    id: 1,
    name: "Mattoni Pieni",
    description: "Mattoni in argilla di alta qualità per murature portanti",
    price: "0.80€/pz",
    category: "Mattoni",
    image: "https://www.cottocusimano.com/ProductsResources/936/L12A1_0_ori.jpeg?1582218001",
  },
  {
    id: 2,
    name: "Calcestruzzo Rck 30",
    description: "Calcestruzzo preconfezionato per strutture",
    price: "85€/m³",
    category: "Calcestruzzo",
    image: "/lovable-uploads/7dc003ab-aa4a-4e77-a0f4-a031f5755afd.png",
  },
  {
    id: 3,
    name: "Cemento Portland",
    description: "Cemento tipo 32.5R in sacchi da 25kg",
    price: "4.50€/sacco",
    category: "Cementi",
    image: "/lovable-uploads/7dc003ab-aa4a-4e77-a0f4-a031f5755afd.png",
  },
  {
    id: 4,
    name: "Sabbione",
    description: "Sabbione per malte e intonaci",
    price: "45€/m³",
    category: "Inerti",
    image: "/lovable-uploads/7dc003ab-aa4a-4e77-a0f4-a031f5755afd.png",
  },
  {
    id: 5,
    name: "Blocchi Forati",
    description: "Blocchi in laterizio per tamponature",
    price: "1.20€/pz",
    category: "Mattoni",
    image: "/lovable-uploads/7dc003ab-aa4a-4e77-a0f4-a031f5755afd.png",
  },
  {
    id: 6,
    name: "Cemento Rapido",
    description: "Cemento a presa rapida per riparazioni",
    price: "6.90€/sacco",
    category: "Cementi",
    image: "/lovable-uploads/7dc003ab-aa4a-4e77-a0f4-a031f5755afd.png",
  },
];

const categories = ["Tutti", "Mattoni", "Calcestruzzo", "Cementi", "Inerti"];

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
    <div className="container mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark mb-4">Catalogo Materiali</h1>
        <p className="text-gray-600">
          Scopri la nostra selezione di materiali edili di alta qualità
        </p>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
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
              } text-sm font-medium whitespace-nowrap transition-colors`}
            >
              {category}
            </button>
          ))}
          <button 
            onClick={() => navigate("/checkout")}
            className="px-4 py-2 rounded-full border border-gray-200 hover:border-primary hover:bg-primary/5 text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Carrello
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
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
    </div>
  );
}
