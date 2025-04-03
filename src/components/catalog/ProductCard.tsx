
import React from "react";
import { ChevronDown, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

// Type definitions for product variants
export type ProductVariant = {
  id: string;
  name: string;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price?: string;
  category: string;
  image: string;
  variants?: ProductVariant[];
};

interface ProductCardProps {
  product: Product;
  index: number;
  selectedVariants: Record<number, string>;
  onSelectVariant: (productId: number, variantId: string) => void;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  index,
  selectedVariants,
  onSelectVariant,
  onAddToCart,
}) => {
  return (
    <div
      className="bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-700 animate-fade-in hover-lift"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="aspect-video relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>
      <div className="p-6">
        <div className="mb-4">
          <p className="text-xs text-primary font-medium mb-2">
            {product.category}
          </p>
          <h3 className="text-lg font-semibold text-white mb-2">
            {product.name}
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            {product.description}
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {product.variants && product.variants.length > 0 ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600">
                  {selectedVariants[product.id]
                    ? `Variante: ${product.variants.find(v => v.id === selectedVariants[product.id])?.name}`
                    : "Seleziona variante"}
                  <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-gray-700 border-gray-600 text-gray-200">
                {product.variants.map((variant) => (
                  <DropdownMenuItem
                    key={variant.id}
                    onClick={() => onSelectVariant(product.id, variant.id)}
                    className="cursor-pointer hover:bg-gray-600"
                  >
                    {variant.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
          <button
            onClick={() => onAddToCart(product)}
            className="inline-flex items-center justify-center gap-2 px-3 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm font-medium w-full"
          >
            <ShoppingCart className="w-4 h-4" />
            Richiedi preventivo
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
