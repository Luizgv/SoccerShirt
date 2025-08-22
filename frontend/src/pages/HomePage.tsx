import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../services/api';
import { Product } from '../types/Product';
import ProductGrid from '../components/ProductGrid';

const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      setLoading(true);
      // Buscar produtos em destaque (primeiros 8 produtos)
      const response = await productService.getProducts({ size: 8, sortBy: 'id', sortDir: 'desc' });
      setFeaturedProducts(response.content);
    } catch (err) {
      console.error('Erro ao carregar produtos:', err);
      setError('Erro ao carregar produtos. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              As Melhores Camisas de Futebol
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Encontre camisas oficiais dos seus times favoritos com os melhores preços
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/catalog" className="btn btn-primary bg-white text-primary hover:bg-gray-100">
                Ver Catálogo
              </Link>
              <Link to="/categories" className="btn btn-outline border-white text-white hover:bg-white hover:text-primary">
                Categorias
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Categorias Populares</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/catalog?category=HOME" className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-r from-blue-500 to-red-500 flex items-center justify-center">
                  <span className="text-6xl">👕</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    Camisas Casa
                  </h3>
                  <p className="text-secondary">
                    Camisas oficiais dos times para jogos em casa
                  </p>
                </div>
              </div>
            </Link>

            <Link to="/catalog?category=AWAY" className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-r from-green-500 to-yellow-500 flex items-center justify-center">
                  <span className="text-6xl">👕</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    Camisas Visitante
                  </h3>
                  <p className="text-secondary">
                    Camisas alternativas para jogos fora de casa
                  </p>
                </div>
              </div>
            </Link>

            <Link to="/catalog?category=RETRO" className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-6xl">👕</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    Camisas Retrô
                  </h3>
                  <p className="text-secondary">
                    Camisas clássicas e nostálgicas dos times
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">Produtos em Destaque</h2>
            <Link to="/catalog" className="btn btn-outline">
              Ver Todos
            </Link>
          </div>

          {error ? (
            <div className="text-center py-8">
              <p className="text-error mb-4">{error}</p>
              <button onClick={loadFeaturedProducts} className="btn btn-primary">
                Tentar Novamente
              </button>
            </div>
          ) : (
            <ProductGrid products={featuredProducts} loading={loading} />
          )}
        </div>
      </section>

      {/* Popular Teams */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Times Populares</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              'Real Madrid', 'FC Barcelona', 'Manchester United', 
              'Arsenal', 'Paris Saint-Germain', 'Bayern Munich',
              'Flamengo', 'Palmeiras', 'Liverpool', 'Chelsea',
              'Juventus', 'AC Milan'
            ].map((team) => (
              <Link
                key={team}
                to={`/catalog?team=${encodeURIComponent(team)}`}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 text-center group"
              >
                <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="text-2xl">⚽</span>
                </div>
                <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                  {team}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">✓</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Produtos Oficiais</h3>
              <p className="text-secondary">
                Todas as camisas são originais e licenciadas oficialmente
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-info rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🚚</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Entrega Rápida</h3>
              <p className="text-secondary">
                Entregamos em todo o Brasil com frete grátis acima de R$ 299
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-warning rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">💳</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Pagamento Seguro</h3>
              <p className="text-secondary">
                Aceitamos cartão, PIX e parcelamento em até 12x sem juros
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
