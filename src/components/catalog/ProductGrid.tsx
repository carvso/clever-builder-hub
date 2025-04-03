
import React from "react";
import { Product } from "./ProductCard";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  selectedVariants: Record<number, string>;
  onSelectVariant: (productId: number, variantId: string) => void;
  onAddToCart: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedVariants,
  onSelectVariant,
  onAddToCart,
}) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          index={index}
          selectedVariants={selectedVariants}
          onSelectVariant={onSelectVariant}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
