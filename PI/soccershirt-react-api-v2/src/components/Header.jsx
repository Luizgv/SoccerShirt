import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'
export default function Header(){
  const { user, logout } = useAuth()
  const { cartCount } = useCart()
  const nav = useNavigate()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const userMenuRef = useRef(null)

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
    <header>
      <Link to="/" style={{fontWeight:800, fontSize:22}}>LOGO</Link>
      <input placeholder="Pesquise Produtos" style={{flex:1}} />
      <div className="topbar-icons">
        <Link to="/favorites" className="header-link">♡</Link>
        <Link to="/cart" className="header-link cart-icon">
          🛒
          {user && cartCount > 0 && (
            <span className="cart-badge">{cartCount}</span>
          )}
        </Link>
        {!user ? (
          <Link to="/login" className="login-btn-header">Entrar</Link>
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
    </header>
  )
}
