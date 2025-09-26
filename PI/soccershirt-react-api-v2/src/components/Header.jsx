import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'
import { useTheme } from '../contexts/ThemeContext'
import { useFavorites } from '../contexts/FavoritesContext'
export default function Header(){
  const { user, logout } = useAuth()
  const { cartCount, addToCart } = useCart()
  const { isDarkMode, toggleTheme } = useTheme()
  const { favorites, toggleFavorite, favoritesCount } = useFavorites()
  const nav = useNavigate()
  const location = useLocation()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showFavoritesDropdown, setShowFavoritesDropdown] = useState(false)
  const [selectedSizes, setSelectedSizes] = useState({})
  const userMenuRef = useRef(null)
  const favoritesRef = useRef(null)

  // Função para verificar se uma rota está ativa
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/' && !location.search
    }
    return location.pathname === path
  }

  // Função para verificar se uma categoria está ativa
  const isCategoryActive = (category) => {
    const urlParams = new URLSearchParams(location.search)
    return location.pathname === '/' && urlParams.get('category') === category
  }


  // Fechar dropdowns ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false)
      }
      if (favoritesRef.current && !favoritesRef.current.contains(event.target)) {
        setShowFavoritesDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const removeFromFavorites = async (productId) => {
    try {
      await toggleFavorite(productId)
    } catch (error) {
      console.error('Erro ao remover dos favoritos:', error)
    }
  }

  const handleSizeSelection = (productId, size) => {
    setSelectedSizes(prev => ({
      ...prev,
      [productId]: size
    }))
  }

  const handleAddToCart = async (productId) => {
    const selectedSize = selectedSizes[productId]
    
    if (!selectedSize) {
      alert('Por favor, selecione um tamanho antes de adicionar ao carrinho!')
      return
    }
    
    const success = await addToCart(productId, selectedSize)
    if (success) {
      alert(`Produto adicionado ao carrinho! 🛒\nTamanho: ${selectedSize}`)
      setSelectedSizes(prev => ({
        ...prev,
        [productId]: null
      }))
    } else {
      alert('Erro ao adicionar produto ao carrinho')
    }
  }
  return (
    <header className="modern-header">
      <div className="header-container">
        {/* Logo Section */}
        <div className="logo-section">
          <Link to="/" className="logo-link">
            <div className="logo-icon">⚽</div>
            <span className="logo-text">Soccer Shirt</span>
          </Link>
        </div>

        {/* Search Section */}
        <div className="search-section">
          <div className="search-container">
            <div className="search-icon">🔍</div>
            <input 
              placeholder="Pesquise por times, produtos..." 
              className="search-input" 
            />
          </div>
        </div>

        {/* Navigation Section */}
        <div className="nav-section">
          <div className="category-nav">
            <Link 
              to="/?category=Nacional" 
              className={`category-btn ${isCategoryActive('Nacional') ? 'category-active' : ''}`}
            >
              <span className="category-icon">🇧🇷</span>
              Nacionais
            </Link>
            <Link 
              to="/?category=Internacional" 
              className={`category-btn ${isCategoryActive('Internacional') ? 'category-active' : ''}`}
            >
              <span className="category-icon">🌍</span>
              Internacionais
            </Link>
          </div>
        </div>

        {/* Actions Section */}
        <div className="actions-section">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="theme-toggle-btn"
            aria-label={`Mudar para modo ${isDarkMode ? 'claro' : 'escuro'}`}
          >
            <div className="theme-toggle-container">
              <div className={`theme-toggle-track ${isDarkMode ? 'dark' : 'light'}`}>
                <div className="theme-toggle-thumb">
                  <span className="theme-icon">
                    {isDarkMode ? '☀' : '☾'}
                  </span>
                </div>
              </div>
            </div>
          </button>

          <Link 
            to="/about" 
            className={`action-btn about-btn ${isActive('/about') ? 'action-active' : ''}`}
          >
            <span className="action-icon">ℹ️</span>
            <span className="action-text">Sobre Nós</span>
          </Link>
          
          {/* Favorites Dropdown */}
          <div className="favorites-dropdown-container" ref={favoritesRef}>
            <button 
              className={`action-btn favorites-btn ${showFavoritesDropdown ? 'action-active' : ''}`}
              onClick={() => setShowFavoritesDropdown(!showFavoritesDropdown)}
              disabled={!user}
            >
              <span className="action-icon">❤️</span>
              <span className="action-text">Favoritos</span>
              {user && favoritesCount > 0 && (
                <span className="favorites-badge">{favoritesCount}</span>
              )}
            </button>
            
            {showFavoritesDropdown && user && (
              <div className="favorites-dropdown">
                <div className="favorites-dropdown-header">
                  <h3>Meus Favoritos</h3>
                  {favoritesCount > 0 && (
                    <span className="favorites-count">{favoritesCount} {favoritesCount === 1 ? 'item' : 'itens'}</span>
                  )}
                </div>
                
                {favorites.length === 0 ? (
                  <div className="empty-favorites-dropdown">
                    <div className="empty-message">
                      <span className="empty-icon">💔</span>
                      <p>Nenhum favorito ainda</p>
                      <small>Adicione produtos aos favoritos para vê-los aqui</small>
                    </div>
                  </div>
                ) : (
                  <div className="favorites-dropdown-content">
                    {favorites.slice(0, 3).map(product => (
                      <div key={product.id} className="favorite-dropdown-item">
                        <div className="favorite-item-image">
                          <img src={product.imageUrl} alt={product.name} />
                        </div>
                        <div className="favorite-item-info">
                          <div className="favorite-item-name">{product.name}</div>
                          <div className="favorite-item-team">Camisa {product.team}</div>
                          <div className="favorite-item-price">
                            <span className="current-price">R$ {Number(product.price).toFixed(2)}</span>
                            {product.oldPrice && (
                              <span className="old-price">R$ {Number(product.oldPrice).toFixed(2)}</span>
                            )}
                          </div>
                          
                          <div className="favorite-item-sizes">
                            {['P', 'M', 'G', 'GG'].map(size => (
                              <button
                                key={size}
                                className={`size-btn ${selectedSizes[product.id] === size ? 'selected' : ''}`}
                                onClick={() => handleSizeSelection(product.id, size)}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                          
                          <div className="favorite-item-actions">
                            <button 
                              className="add-to-cart-mini"
                              onClick={() => handleAddToCart(product.id)}
                            >
                              🛒
                            </button>
                            <button 
                              className="remove-favorite-mini"
                              onClick={() => removeFromFavorites(product.id)}
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {favoritesCount > 3 && (
                      <div className="favorites-see-all">
                        <Link 
                          to="/favorites" 
                          onClick={() => setShowFavoritesDropdown(false)}
                          className="see-all-btn"
                        >
                          Ver todos os {favoritesCount} favoritos →
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
          
          <Link 
            to="/cart" 
            className={`action-btn cart-btn ${isActive('/cart') ? 'action-active' : ''}`}
          >
            <span className="action-icon">🛒</span>
            <span className="action-text">Carrinho</span>
          {user && cartCount > 0 && (
            <span className="cart-badge">{cartCount}</span>
          )}
        </Link>
          
        {!user ? (
            <Link to="/login" className="login-btn-modern">
              <span className="login-icon">👤</span>
              <span className="login-text">Entrar</span>
            </Link>
        ) : (
          <div className="user-menu-container" ref={userMenuRef}>
            <div 
              className="user-menu"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className="user-info">
                <span className="user-avatar">👤</span>
                <span className="user-name">{user.fullName}</span>
              </div>
              <span className="dropdown-arrow">▼</span>
            </div>
            
            {showUserMenu && (
              <div className="user-dropdown">
                <div className="user-dropdown-header">
                  <div className="user-full-info">
                    <span className="user-avatar-large">👤</span>
                    <div>
                      <div className="user-name-large">{user.fullName}</div>
                      <div className="user-email">{user.email}</div>
                    </div>
                  </div>
                </div>
                <div className="user-dropdown-divider"></div>
                <button 
                  className="logout-btn-dropdown" 
                  onClick={() => {
                    logout(); 
                    nav('/login'); 
                    setShowUserMenu(false);
                  }}
                >
                  <span>🚪</span>
                  Sair da conta
                </button>
              </div>
            )}
          </div>
        )}
        </div>
      </div>
    </header>
  )
}
