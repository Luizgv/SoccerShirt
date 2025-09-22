import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header-minimal">
      <div className="container">
        <div className="header-content">
          
          {/* Logo Section */}
          <Link to="/" className="header-logo">
            <div className="logo-icon">
              <span>⚽</span>
            </div>
            <div className="logo-text">
              <h1>Soccer Shirt</h1>
            </div>
          </Link>

          {/* Desktop Navigation - Removed for gradual development */}
          <nav className="header-nav">
            <Link to="/" className="nav-link">Início</Link>
          </nav>

          {/* Right Section */}
          <div className="header-actions">
            {/* Search */}
            <div className="search-container">
              <input
                type="text"
                placeholder="Buscar camisas..."
                className="search-input"
              />
              <button className="search-button">
                <span>🔍</span>
              </button>
            </div>

            {/* Cart */}
            <button className="cart-button">
              <span className="cart-icon">🛒</span>
              <span className="cart-badge">0</span>
            </button>

            {/* Mobile Menu Button */}
            <button 
              className="mobile-menu-button"
              onClick={toggleMobileMenu}
              aria-label="Menu"
            >
              <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Simplified for gradual development */}
        <nav className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
          <Link to="/" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
            Início
          </Link>
          <div className="mobile-search">
            <input
              type="text"
              placeholder="Buscar camisas..."
              className="mobile-search-input"
            />
            <button className="mobile-search-button">🔍</button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
