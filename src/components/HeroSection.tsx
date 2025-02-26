import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Mattoni Pieni",
    description: "Mattoni in argilla di alta qualità per murature portanti",
    price: "0.80€/pz",
    category: "Mattoni",
    image: "/lovable-uploads/7dc003ab-aa4a-4e77-a0f4-a031f5755afd.png",
  },
  // ... keep existing code (products array)
];

export default function HeroSection() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setIsSearching(e.target.value.length > 0);
  };

  const handleProductClick = (productId: number) => {
    setIsSearching(false);
    setSearchQuery("");
    navigate("/catalogo");
  };

  useEffect(() => {
    // Trigger animations after component mount
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-[80vh] flex items-center bg-light">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <span 
                className={`inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}
              >
                Leader nel settore edile
              </span>
              <h1 
                className={`text-4xl md:text-5xl font-bold text-dark mb-6 leading-tight ${isVisible ? 'animate-slide-in-left delay-100' : 'opacity-0'}`}
              >
                Materiali edili di qualità per il tuo cantiere
              </h1>
              <p 
                className={`text-lg text-gray-600 mb-8 ${isVisible ? 'animate-slide-in-left delay-200' : 'opacity-0'}`}
              >
                Scopri i migliori materiali e macchinari per costruzioni sicure e resistenti.
              </p>
            </div>
            <div 
              className={`relative max-w-xl ${isVisible ? 'animate-fade-in delay-300' : 'opacity-0'}`}
            >
              <input
                type="text"
                placeholder="Cerca materiali..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-dark hover-glow"
              />
              <button 
                onClick={() => navigate("/catalogo")}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white p-3 rounded-xl hover:bg-primary/90 transition-colors animate-pulse-slow"
              >
                <Search className="w-5 h-5" />
              </button>

              {isSearching && filteredProducts.length > 0 && (
                <div className="absolute z-50 left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden animate-scale-in">
                  <div className="max-h-[300px] overflow-y-auto">
                    {filteredProducts.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleProductClick(product.id)}
                        className="w-full p-4 text-left hover:bg-gray-50 flex items-center gap-4 border-b border-gray-100 last:border-0 transition-colors"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="font-medium text-dark">{product.name}</h3>
                          <p className="text-sm text-gray-600">{product.category}</p>
                        </div>
                        <span className="ml-auto font-medium text-primary">
                          {product.price}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div 
            className={`hidden lg:block relative ${isVisible ? 'animate-slide-in-right delay-200' : 'opacity-0'}`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl"></div>
            <img
              src="/lovable-uploads/8e9b834c-cad6-4dcd-9118-61a742d74b56.png"
              alt="Materiali edili e macchinari"
              className="rounded-2xl shadow-2xl w-full object-cover h-[600px] hover-lift"
            />
            <div 
              className={`absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm p-6 rounded-xl ${isVisible ? 'animate-slide-in-right delay-400' : 'opacity-0'}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-dark mb-1">
                    Consegna Rapida
                  </p>
                  <p className="text-sm text-gray-600">
                    Materiali disponibili in pronta consegna
                  </p>
                </div>
                <button className="px-6 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors text-sm font-medium hover-lift">
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
