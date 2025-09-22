import React from 'react';
import { Link } from 'react-router-dom';
import { Product, Size } from '../types/Product';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Função para formatar preço
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  // Função para obter o menor preço entre os tamanhos
  const getMinPrice = (): number => {
    const prices = product.availableSizes.map(size => size.finalPrice);
    return Math.min(...prices);
  };

  // Função para obter o maior preço entre os tamanhos
  const getMaxPrice = (): number => {
    const prices = product.availableSizes.map(size => size.finalPrice);
    return Math.max(...prices);
  };

  // Função para renderizar a faixa de preços
  const renderPriceRange = (): string => {
    const minPrice = getMinPrice();
    const maxPrice = getMaxPrice();
    
    if (minPrice === maxPrice) {
      return formatPrice(minPrice);
    }
    
    return `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;
  };

  // Função para obter tamanhos disponíveis
  const getAvailableSizes = (): Size[] => {
    return product.availableSizes
      .filter(size => size.isAvailable && size.stockQuantity > 0)
      .map(size => size.size);
  };

  const availableSizes = getAvailableSizes();

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden animate-fade-in">
      {/* Image placeholder */}
      <div className="relative aspect-square bg-surface flex items-center justify-center">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-6xl text-secondary">👕</div>
        )}
        
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
            {product.category === 'HOME' ? 'Casa' : 
             product.category === 'AWAY' ? 'Visitante' :
             product.category === 'THIRD' ? '3ª Camisa' :
             product.category === 'GOALKEEPER' ? 'Goleiro' :
             product.category === 'RETRO' ? 'Retrô' : 'Treino'}
          </span>
        </div>

        {/* Stock status */}
        {availableSizes.length === 0 && (
          <div className="absolute top-3 right-3">
            <span className="bg-error text-white text-xs px-2 py-1 rounded-full">
              Esgotado
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Team and League */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-medium text-primary">{product.team}</span>
          <span className="text-xs text-muted">•</span>
          <span className="text-sm text-secondary">{product.league}</span>
        </div>

        {/* Product name */}
        <h3 className="font-semibold text-text-primary mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Season */}
        <p className="text-sm text-secondary mb-3">{product.season}</p>

        {/* Available sizes */}
        <div className="mb-3">
          <p className="text-xs text-muted mb-1">Tamanhos disponíveis:</p>
          <div className="flex gap-1 flex-wrap">
            {availableSizes.length > 0 ? (
              availableSizes.map(size => (
                <span
                  key={size}
                  className="text-xs border border-border px-2 py-1 rounded text-text-secondary"
                >
                  {size}
                </span>
              ))
            ) : (
              <span className="text-xs text-error">Nenhum tamanho disponível</span>
            )}
          </div>
        </div>

        {/* Price */}
        <div className="mb-4">
          <p className="text-lg font-bold text-primary">
            {renderPriceRange()}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            to={`/product/${product.id}`}
            className="flex-1 btn btn-primary text-center"
          >
            Ver Detalhes
          </Link>
          {availableSizes.length > 0 && (
            <button className="btn btn-secondary px-3">
              🛒
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
