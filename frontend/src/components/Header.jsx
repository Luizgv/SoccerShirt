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
      alert(`Produto adicionado ao carrinho!\nTamanho: ${selectedSize}`)
      setSelectedSizes(prev => ({
        ...prev,
        [productId]: null
      }))
    } else {
      alert('Erro ao adicionar produto ao carrinho')
    }
  }
  return (
    <header className="simple-header">
      <div className="simple-header-container">
        {/* Logo */}
        <Link to="/" className="simple-logo">
          <img src="/images/SoccerLogo.png" alt="Logo" className="logo-image" />
        </Link>

        {/* Search */}
        <div className="simple-search">
          <svg className="simple-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input 
            type="text"
            placeholder="Pesquise Produtos" 
            className="simple-search-input" 
          />
        </div>

        {/* Categories */}
        <Link 
          to="/?category=Nacional" 
          className={`simple-category-link ${isCategoryActive('Nacional') ? 'active' : ''}`}
        >
          Nacionais
        </Link>
        <Link 
          to="/?category=Internacional" 
          className={`simple-category-link ${isCategoryActive('Internacional') ? 'active' : ''}`}
        >
          Internacionais
        </Link>

        {/* Theme Toggle - Simple */}
        <button 
          onClick={toggleTheme}
          className="simple-theme-btn"
          aria-label="Mudar tema"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10" fill="currentColor"/>
            <path d="M12 2 A 10 10 0 0 1 12 22 Z" fill="white"/>
          </svg>
        </button>

        {/* Actions */}
        <div className="simple-actions">
          <Link to="/about" className="simple-icon-btn">
            <svg className="simple-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 16v-4"></path>
              <path d="M12 8h.01"></path>
            </svg>
          </Link>
          
          <Link to="/favorites" className="simple-icon-btn">
            <svg className="simple-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </Link>
          
          <Link to="/cart" className="simple-icon-btn">
            <svg className="simple-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {cartCount > 0 && <span className="simple-badge">{cartCount}</span>}
          </Link>

          {!user ? (
            <Link to="/login" className="simple-icon-btn">
              <svg className="simple-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </Link>
          ) : (
            <div className="simple-user-menu" ref={userMenuRef}>
              <button 
                className="simple-user-btn"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <svg className="simple-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </button>
              
              {showUserMenu && (
                <div className="simple-dropdown">
                  <button onClick={() => { logout(); nav('/login'); }}>
                    Sair
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
