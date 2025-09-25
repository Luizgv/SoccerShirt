import React from 'react';
import { ProductCategory } from '../types/Product';

interface FiltersProps {
  onFilterChange: (filters: FilterState) => void;
  loading?: boolean;
}

export interface FilterState {
  category?: ProductCategory;
  team?: string;
  league?: string;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange, loading = false }) => {
  const [filters, setFilters] = React.useState<FilterState>({});

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const clearFilters = () => {
    const clearedFilters: FilterState = {};
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== undefined && value !== '');
  const activeFiltersCount = Object.values(filters).filter(value => value !== undefined && value !== '').length;

  const categoryOptions = [
    { value: '', label: 'Todas as categorias' },
    { value: 'HOME', label: 'Camisa Casa' },
    { value: 'AWAY', label: 'Camisa Visitante' },
    { value: 'THIRD', label: 'Terceira Camisa' },
    { value: 'GOALKEEPER', label: 'Camisa de Goleiro' },
    { value: 'RETRO', label: 'Camisa Retrô' },
    { value: 'TRAINING', label: 'Camisa de Treino' }
  ];

  const sortOptions = [
    { value: 'id:asc', label: 'Mais recentes' },
    { value: 'name:asc', label: 'Nome (A-Z)' },
    { value: 'name:desc', label: 'Nome (Z-A)' },
    { value: 'basePrice:asc', label: 'Menor preço' },
    { value: 'basePrice:desc', label: 'Maior preço' },
    { value: 'team:asc', label: 'Time (A-Z)' }
  ];

  const popularTeams = [
    'Real Madrid', 'FC Barcelona', 'Manchester United', 'Arsenal',
    'Paris Saint-Germain', 'Bayern Munich', 'Flamengo', 'Palmeiras'
  ];

  const popularLeagues = [
    'La Liga', 'Premier League', 'Ligue 1', 'Bundesliga', 'Brasileirão'
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-text-primary">Filtros</h2>
        <div className="flex gap-2">
          {/* Botão de teste para aplicar filtros rapidamente */}
          {!hasActiveFilters && (
            <button
              onClick={() => handleFilterChange({ category: 'HOME', team: 'Real Madrid' })}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 rounded-lg transition-all duration-200"
              disabled={loading}
            >
              <span>⚡</span>
              Aplicar filtros teste
            </button>
          )}
          
          <button
            onClick={clearFilters}
            className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm border rounded-lg transition-all duration-200 ${
              hasActiveFilters 
                ? 'bg-surface hover:bg-border text-secondary hover:text-primary border-border hover:shadow-sm' 
                : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
            }`}
            disabled={loading || !hasActiveFilters}
          >
            <span>🗑️</span>
            Limpar filtros {hasActiveFilters ? `(${activeFiltersCount})` : ''}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Category filter */}
        <div className="form-group">
          <label className="form-label">Categoria</label>
          <select
            className="form-select"
            value={filters.category || ''}
            onChange={(e) => handleFilterChange({ 
              category: e.target.value as ProductCategory || undefined 
            })}
            disabled={loading}
          >
            {categoryOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Team filter */}
        <div className="form-group">
          <label className="form-label">Time</label>
          <select
            className="form-select"
            value={filters.team || ''}
            onChange={(e) => handleFilterChange({ team: e.target.value || undefined })}
            disabled={loading}
          >
            <option value="">Todos os times</option>
            {popularTeams.map(team => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
        </div>

        {/* League filter */}
        <div className="form-group">
          <label className="form-label">Liga</label>
          <select
            className="form-select"
            value={filters.league || ''}
            onChange={(e) => handleFilterChange({ league: e.target.value || undefined })}
            disabled={loading}
          >
            <option value="">Todas as ligas</option>
            {popularLeagues.map(league => (
              <option key={league} value={league}>
                {league}
              </option>
            ))}
          </select>
        </div>

        {/* Sort filter */}
        <div className="form-group">
          <label className="form-label">Ordenar por</label>
          <select
            className="form-select"
            value={filters.sortBy && filters.sortDir ? `${filters.sortBy}:${filters.sortDir}` : ''}
            onChange={(e) => {
              const [sortBy, sortDir] = e.target.value.split(':');
              handleFilterChange({ 
                sortBy: sortBy || undefined, 
                sortDir: (sortDir as 'asc' | 'desc') || undefined 
              });
            }}
            disabled={loading}
          >
            <option value="">Padrão</option>
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active filters display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-secondary">Filtros ativos:</p>
            <button
              onClick={clearFilters}
              className="text-xs text-secondary hover:text-primary underline transition-colors"
              disabled={loading}
            >
              Limpar todos
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.category && (
              <span className="inline-flex items-center gap-1 bg-surface px-2 py-1 rounded text-sm">
                Categoria: {categoryOptions.find(c => c.value === filters.category)?.label}
                <button
                  onClick={() => handleFilterChange({ category: undefined })}
                  className="text-secondary hover:text-primary ml-1"
                  disabled={loading}
                >
                  ×
                </button>
              </span>
            )}
            {filters.team && (
              <span className="inline-flex items-center gap-1 bg-surface px-2 py-1 rounded text-sm">
                Time: {filters.team}
                <button
                  onClick={() => handleFilterChange({ team: undefined })}
                  className="text-secondary hover:text-primary ml-1"
                  disabled={loading}
                >
                  ×
                </button>
              </span>
            )}
            {filters.league && (
              <span className="inline-flex items-center gap-1 bg-surface px-2 py-1 rounded text-sm">
                Liga: {filters.league}
                <button
                  onClick={() => handleFilterChange({ league: undefined })}
                  className="text-secondary hover:text-primary ml-1"
                  disabled={loading}
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;
