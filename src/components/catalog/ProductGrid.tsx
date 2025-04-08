
import React from "react";
import { Product } from "./ProductCard";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  onRequestQuote: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onRequestQuote,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          index={index}
          onRequestQuote={onRequestQuote}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
