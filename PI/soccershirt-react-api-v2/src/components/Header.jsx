import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'
export default function Header(){
  const { user, logout } = useAuth()
  const { cartCount } = useCart()
  const nav = useNavigate()
  const location = useLocation()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const userMenuRef = useRef(null)

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

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
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
          <Link 
            to="/about" 
            className={`action-btn about-btn ${isActive('/about') ? 'action-active' : ''}`}
          >
            <span className="action-icon">ℹ️</span>
            <span className="action-text">Sobre Nós</span>
          </Link>
          
          <Link 
            to="/favorites" 
            className={`action-btn favorites-btn ${isActive('/favorites') ? 'action-active' : ''}`}
          >
            <span className="action-icon">❤️</span>
            <span className="action-text">Favoritos</span>
          </Link>
          
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
