import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productService } from '../services/api';
import { Product, Size } from '../types/Product';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      loadProduct(parseInt(id));
    }
  }, [id]);

  const loadProduct = async (productId: number) => {
    try {
      setLoading(true);
      const productData = await productService.getProductById(productId);
      setProduct(productData);
      
      // Selecionar primeiro tamanho disponível automaticamente
      const availableSize = productData.availableSizes.find(size => 
        size.isAvailable && size.stockQuantity > 0
      );
      if (availableSize) {
        setSelectedSize(availableSize.size);
      }
    } catch (err) {
      console.error('Erro ao carregar produto:', err);
      setError('Produto não encontrado');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const getSelectedSizeInfo = () => {
    if (!product || !selectedSize) return null;
    return product.availableSizes.find(size => size.size === selectedSize);
  };

  const getMaxQuantity = (): number => {
    const sizeInfo = getSelectedSizeInfo();
    return sizeInfo ? Math.min(sizeInfo.stockQuantity, 10) : 0;
  };

  const handleAddToCart = () => {
    if (!product || !selectedSize) return;
    
    // Por enquanto, apenas mostra um alerta
    // Posteriormente implementaremos o carrinho
    alert(`Adicionado ao carrinho:\n${product.name}\nTamanho: ${selectedSize}\nQuantidade: ${quantity}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface py-8">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Image skeleton */}
              <div className="aspect-square bg-white rounded-lg animate-pulse"></div>
              
              {/* Content skeleton */}
              <div className="space-y-4">
                <div className="h-8 bg-white rounded animate-pulse"></div>
                <div className="h-12 bg-white rounded animate-pulse"></div>
                <div className="h-4 bg-white rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-white rounded animate-pulse w-1/2"></div>
                <div className="h-16 bg-white rounded animate-pulse"></div>
                <div className="h-12 bg-white rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-surface py-8">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-6xl mb-4">😕</div>
            <h1 className="text-2xl font-bold text-text-primary mb-4">
              {error || 'Produto não encontrado'}
            </h1>
            <p className="text-secondary mb-8">
              O produto que você está procurando não existe ou foi removido.
            </p>
            <Link to="/catalog" className="btn btn-primary">
              Voltar ao Catálogo
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const selectedSizeInfo = getSelectedSizeInfo();
  const maxQuantity = getMaxQuantity();

  return (
    <div className="min-h-screen bg-surface py-8">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center gap-2 text-sm text-secondary">
            <Link to="/" className="hover:text-primary">Início</Link>
            <span>›</span>
            <Link to="/catalog" className="hover:text-primary">Catálogo</Link>
            <span>›</span>
            <span className="text-text-primary">{product.name}</span>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-square bg-white rounded-lg shadow-md flex items-center justify-center">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-9xl text-secondary">👕</div>
                )}
              </div>
              
              {/* Thumbnail images placeholder */}
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="aspect-square bg-white rounded border-2 border-transparent hover:border-primary cursor-pointer transition-colors">
                    <div className="w-full h-full flex items-center justify-center text-2xl text-secondary">
                      👕
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Basic Info */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-primary font-semibold">{product.team}</span>
                  <span className="text-secondary">•</span>
                  <span className="text-secondary">{product.league}</span>
                </div>
                
                <h1 className="text-3xl font-bold text-text-primary mb-2">
                  {product.name}
                </h1>
                
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-primary text-white text-sm px-3 py-1 rounded-full">
                    {product.category === 'HOME' ? 'Casa' : 
                     product.category === 'AWAY' ? 'Visitante' :
                     product.category === 'THIRD' ? '3ª Camisa' :
                     product.category === 'GOALKEEPER' ? 'Goleiro' :
                     product.category === 'RETRO' ? 'Retrô' : 'Treino'}
                  </span>
                  <span className="text-secondary">{product.season}</span>
                </div>

                <p className="text-secondary leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Price */}
              <div className="border-t border-border pt-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {selectedSizeInfo ? formatPrice(selectedSizeInfo.finalPrice) : formatPrice(product.basePrice)}
                </div>
                {selectedSizeInfo && selectedSizeInfo.priceModifier > 0 && (
                  <div className="text-sm text-secondary">
                    Preço base: {formatPrice(product.basePrice)} + {formatPrice(selectedSizeInfo.priceModifier)} (tamanho {selectedSize})
                  </div>
                )}
              </div>

              {/* Size Selection */}
              <div className="border-t border-border pt-6">
                <h3 className="font-semibold text-text-primary mb-4">Selecione o tamanho:</h3>
                <div className="grid grid-cols-5 gap-2">
                  {product.availableSizes.map((sizeOption) => {
                    const isAvailable = sizeOption.isAvailable && sizeOption.stockQuantity > 0;
                    const isSelected = selectedSize === sizeOption.size;
                    
                    return (
                      <button
                        key={sizeOption.size}
                        onClick={() => isAvailable && setSelectedSize(sizeOption.size)}
                        disabled={!isAvailable}
                        className={`
                          h-12 border-2 rounded-lg font-semibold transition-all
                          ${isSelected 
                            ? 'border-primary bg-primary text-white' 
                            : isAvailable 
                              ? 'border-border hover:border-primary' 
                              : 'border-border bg-surface text-muted cursor-not-allowed opacity-50'
                          }
                        `}
                      >
                        {sizeOption.size}
                      </button>
                    );
                  })}
                </div>
                
                {selectedSizeInfo && (
                  <div className="mt-3 text-sm text-secondary">
                    Estoque disponível: {selectedSizeInfo.stockQuantity} unidades
                  </div>
                )}
              </div>

              {/* Quantity Selection */}
              {selectedSize && selectedSizeInfo && (
                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold text-text-primary mb-4">Quantidade:</h3>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 border border-border rounded-lg hover:bg-surface transition-colors"
                      disabled={quantity <= 1}
                    >
                      −
                    </button>
                    <span className="w-16 text-center font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(maxQuantity, quantity + 1))}
                      className="w-10 h-10 border border-border rounded-lg hover:bg-surface transition-colors"
                      disabled={quantity >= maxQuantity}
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Add to Cart */}
              <div className="border-t border-border pt-6">
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedSize || maxQuantity === 0}
                  className="w-full btn btn-primary btn-lg mb-4"
                >
                  {!selectedSize ? 'Selecione um tamanho' :
                   maxQuantity === 0 ? 'Produto esgotado' :
                   'Adicionar ao Carrinho'}
                </button>
                
                <button className="w-full btn btn-secondary">
                  Comprar Agora
                </button>
              </div>

              {/* Product Details */}
              <div className="border-t border-border pt-6">
                <h3 className="font-semibold text-text-primary mb-4">Detalhes do Produto</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-secondary">Time:</span>
                    <span className="text-text-primary">{product.team}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">Liga:</span>
                    <span className="text-text-primary">{product.league}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">Temporada:</span>
                    <span className="text-text-primary">{product.season}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">Categoria:</span>
                    <span className="text-text-primary">
                      {product.category === 'HOME' ? 'Camisa Casa' : 
                       product.category === 'AWAY' ? 'Camisa Visitante' :
                       product.category === 'THIRD' ? 'Terceira Camisa' :
                       product.category === 'GOALKEEPER' ? 'Camisa de Goleiro' :
                       product.category === 'RETRO' ? 'Camisa Retrô' : 'Camisa de Treino'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
