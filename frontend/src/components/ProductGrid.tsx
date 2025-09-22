import React from 'react';
import { Product } from '../types/Product';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, loading = false }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            <div className="aspect-square bg-surface"></div>
            <div className="p-4">
              <div className="h-4 bg-surface rounded mb-2"></div>
              <div className="h-6 bg-surface rounded mb-2"></div>
              <div className="h-4 bg-surface rounded mb-3"></div>
              <div className="h-4 bg-surface rounded mb-3"></div>
              <div className="h-6 bg-surface rounded mb-4"></div>
              <div className="h-10 bg-surface rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="text-6xl mb-4">👕</div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          Nenhum produto encontrado
        </h3>
        <p className="text-secondary text-center max-w-md">
          Não encontramos produtos que correspondam aos seus critérios de busca. 
          Tente ajustar os filtros ou buscar por outros termos.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
