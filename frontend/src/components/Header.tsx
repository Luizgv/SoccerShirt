import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">⚽</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">Soccer Shirt</h1>
              <p className="text-xs text-secondary">E-commerce de Camisas</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-text-primary hover:text-primary transition-colors">
              Início
            </Link>
            <Link to="/catalog" className="text-text-primary hover:text-primary transition-colors">
              Catálogo
            </Link>
            <Link to="/categories" className="text-text-primary hover:text-primary transition-colors">
              Categorias
            </Link>
            <Link to="/brands" className="text-text-primary hover:text-primary transition-colors">
              Times
            </Link>
          </nav>

          {/* Search and Cart */}
          <div className="flex items-center gap-4">
            {/* Search bar - simplificada por enquanto */}
            <div className="hidden md:flex">
              <input
                type="text"
                placeholder="Buscar camisas..."
                className="form-input w-64"
              />
            </div>

            {/* Cart icon */}
            <button className="relative p-2 hover:bg-surface rounded-lg transition-colors">
              <span className="text-xl">🛒</span>
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>

            {/* Mobile menu button */}
            <button className="md:hidden p-2 hover:bg-surface rounded-lg transition-colors">
              <span className="text-xl">☰</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
