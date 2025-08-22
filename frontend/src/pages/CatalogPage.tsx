import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productService } from '../services/api';
import { Product, PageResponse, ProductFilters } from '../types/Product';
import ProductGrid from '../components/ProductGrid';
import Filters, { FilterState } from '../components/Filters';

const CatalogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    totalElements: 0,
    totalPages: 0,
    currentPage: 0,
    size: 12
  });

  // Inicializar filtros com parâmetros da URL
  const [filters, setFilters] = useState<ProductFilters>(() => {
    const initialFilters: ProductFilters = {
      page: parseInt(searchParams.get('page') || '0'),
      size: parseInt(searchParams.get('size') || '12'),
      sortBy: searchParams.get('sortBy') || undefined,
      sortDir: (searchParams.get('sortDir') as 'asc' | 'desc') || undefined,
    };

    const team = searchParams.get('team');
    const league = searchParams.get('league');
    const category = searchParams.get('category');
    const name = searchParams.get('name');

    if (team) initialFilters.team = team;
    if (league) initialFilters.league = league;
    if (category) initialFilters.category = category as any;
    if (name) initialFilters.name = name;

    return initialFilters;
  });

  useEffect(() => {
    loadProducts();
  }, [filters]);

  // Atualizar URL quando filtros mudarem
  useEffect(() => {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        params.set(key, value.toString());
      }
    });

    setSearchParams(params);
  }, [filters, setSearchParams]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      let response: PageResponse<Product>;

      // Se há filtros específicos, usar busca com filtros
      if (filters.name || filters.team || filters.league || filters.category) {
        response = await productService.searchProducts(filters);
      } else {
        response = await productService.getProducts(filters);
      }

      setProducts(response.content);
      setPagination({
        totalElements: response.totalElements,
        totalPages: response.totalPages,
        currentPage: response.number,
        size: response.size
      });
    } catch (err) {
      console.error('Erro ao carregar produtos:', err);
      setError('Erro ao carregar produtos. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      page: 0 // Reset para primeira página quando filtros mudarem
    }));
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPagination = () => {
    if (pagination.totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    const currentPage = pagination.currentPage;
    const totalPages = pagination.totalPages;

    // Calcular início e fim das páginas visíveis
    let startPage = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);

    // Ajustar início se estamos no final
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(0, endPage - maxVisiblePages + 1);
    }

    // Botão anterior
    if (currentPage > 0) {
      pages.push(
        <button
          key="prev"
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-3 py-2 border border-border rounded-lg hover:bg-surface transition-colors"
          disabled={loading}
        >
          ‹
        </button>
      );
    }

    // Páginas
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-2 border rounded-lg transition-colors ${
            i === currentPage
              ? 'bg-primary text-white border-primary'
              : 'border-border hover:bg-surface'
          }`}
          disabled={loading}
        >
          {i + 1}
        </button>
      );
    }

    // Botão próximo
    if (currentPage < totalPages - 1) {
      pages.push(
        <button
          key="next"
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-3 py-2 border border-border rounded-lg hover:bg-surface transition-colors"
          disabled={loading}
        >
          ›
        </button>
      );
    }

    return (
      <div className="flex justify-center items-center gap-2 mt-8">
        {pages}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-surface py-8">
      <div className="container">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Catálogo de Camisas
          </h1>
          <p className="text-secondary">
            Encontre a camisa perfeita do seu time favorito
          </p>
        </div>

        {/* Filters */}
        <Filters onFilterChange={handleFilterChange} loading={loading} />

        {/* Results info */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-secondary">
            {loading ? (
              'Carregando...'
            ) : (
              `${pagination.totalElements} produto${pagination.totalElements !== 1 ? 's' : ''} encontrado${pagination.totalElements !== 1 ? 's' : ''}`
            )}
          </p>
          
          {pagination.totalPages > 1 && (
            <p className="text-secondary">
              Página {pagination.currentPage + 1} de {pagination.totalPages}
            </p>
          )}
        </div>

        {/* Error state */}
        {error && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="text-center">
              <p className="text-error mb-4">{error}</p>
              <button onClick={loadProducts} className="btn btn-primary">
                Tentar Novamente
              </button>
            </div>
          </div>
        )}

        {/* Products grid */}
        <ProductGrid products={products} loading={loading} />

        {/* Pagination */}
        {renderPagination()}
      </div>
    </div>
  );
};

export default CatalogPage;
