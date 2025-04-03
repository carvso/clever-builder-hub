import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import NoleggioCtaSection from "@/components/NoleggioCtaSection";

// Import our refactored components
import ProductFilters from "./catalog/ProductFilters";
import ProductGrid from "./catalog/ProductGrid";
import { Product } from "./catalog/ProductCard";
import { products, categories } from "./catalog/ProductData";

export default function CatalogoContent() {
  const { addItem } = useCart();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tutti");
  const [selectedVariants, setSelectedVariants] = useState<Record<number, string>>({});

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "Tutti" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSelectVariant = (productId: number, variantId: string) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [productId]: variantId,
    }));
  };

  const handleAddToCart = (product: Product) => {
    // If product has variants, check if one is selected
    if (product.variants && product.variants.length > 0) {
      const selectedVariantId = selectedVariants[product.id];
      if (!selectedVariantId) {
        toast({
          title: "Seleziona una variante",
          description: "Per favore seleziona una variante prima di aggiungere al carrello",
          variant: "destructive",
        });
        return;
      }

      // Find the selected variant name
      const selectedVariant = product.variants.find(
        (v) => v.id === selectedVariantId
      );

      // Add product with variant info
      addItem({
        ...product,
        name: `${product.name} - ${selectedVariant?.name}`,
        id: parseInt(`${product.id}${selectedVariantId.replace(/\D/g, '')}`),
        price: product.price || "€/pz", // Use product price if available
        quantity: 1, // Add quantity field
      });
    } else {
      // Add product without variants
      addItem({
        ...product,
        price: product.price || "€/pz", // Use product price if available
        quantity: 1, // Add quantity field
      });
    }

    toast({
      title: "Prodotto aggiunto al carrello",
      description: `${product.name} è stato aggiunto al carrello`,
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
          selectedVariants={selectedVariants}
          onSelectVariant={handleSelectVariant}
          onAddToCart={handleAddToCart}
        />

        {/* Noleggio CTA */}
        <div className="mt-16">
          <NoleggioCtaSection />
        </div>
      </div>
    </div>
  );
}
