
import React from "react";
import { Search, ShoppingCart } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Cart from "@/components/Cart";

interface ProductFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8 animate-slide-in-left">
      <div className="flex-1">
        <div className="relative">
          <input
            type="text"
            placeholder="Cerca materiali..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-700 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 text-white"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-full border ${
              selectedCategory === category
                ? "border-primary bg-primary/10 text-primary"
                : "border-gray-700 hover:border-primary hover:bg-primary/10 text-gray-300"
            } text-sm font-medium whitespace-nowrap transition-colors hover-lift`}
          >
            {category}
          </button>
        ))}
        <Sheet>
          <SheetTrigger asChild>
            <button 
              className="px-4 py-2 rounded-full border border-gray-700 hover:border-primary hover:bg-primary/10 text-gray-300 text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2 hover-lift"
            >
              <ShoppingCart className="w-4 h-4" />
              Carrello
            </button>
          </SheetTrigger>
          <SheetContent className="bg-gray-800 border-gray-700 text-white">
            <Cart />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default ProductFilters;
