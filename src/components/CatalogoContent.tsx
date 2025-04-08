
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import NoleggioCtaSection from "@/components/NoleggioCtaSection";

// Import our refactored components
import ProductFilters from "./catalog/ProductFilters";
import ProductGrid from "./catalog/ProductGrid";
import { Product } from "./catalog/ProductCard";
import { products, categories } from "./catalog/ProductData";

export default function CatalogoContent() {
  const { toast } = useToast();
  const navigate = useNavigate();
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

  const handleRequestQuote = (product: Product) => {
    // Store the selected product in sessionStorage to use it in the checkout page
    sessionStorage.setItem('selectedProduct', JSON.stringify(product));
    
    // Navigate directly to checkout
    navigate('/checkout');
    
    toast({
      title: "Richiesta preventivo",
      description: `Stai per richiedere un preventivo per ${product.name}`,
    });
  };

  return (
    <div className="py-16 bg-dark text-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-white mb-4">Catalogo Materiali</h1>
          <p className="text-gray-300">
            Scopri la nostra selezione di materiali edili di alta qualità
          </p>
        </div>

        {/* Filters and Search */}
        <ProductFilters 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
        />

        {/* Products Grid */}
        <ProductGrid 
          products={filteredProducts}
          onRequestQuote={handleRequestQuote}
        />

        {/* Noleggio CTA */}
        <div className="mt-16">
          <NoleggioCtaSection />
        </div>
      </div>
    </div>
  );
}
