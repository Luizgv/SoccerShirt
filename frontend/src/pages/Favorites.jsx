import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { useFavorites } from '../contexts/FavoritesContext'
export default function Favorites(){
  const { addToCart } = useCart()
  const { favorites: items, toggleFavorite } = useFavorites()
  const [selectedSizes, setSelectedSizes] = useState({})
  
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
      // Limpar seleção após adicionar
      setSelectedSizes(prev => ({
        ...prev,
        [productId]: null
      }))
    } else {
      alert('Erro ao adicionar produto ao carrinho')
    }
  }
  
  return (
    <div className="favorites-container">
      <div className="favorites-header">
        <h2 className="favorites-title">Favoritos</h2>
      </div>
      
      {!items.length ? (
        <div className="favorites-empty">
          <p className="favorites-empty-message">
            Você ainda não possui nenhum produto favoritado!
          </p>
          <Link to="/" className="explore-btn">
            Explorar Produtos
          </Link>
        </div>
      ) : (
        <div className="favorites-grid">
          {items.map(product => (
            <div className="product-card" key={product.id}>
              <div className="product-image-container">
                <Link to={`/products/${product.id}`}>
                  <img src={product.imageUrl} alt={product.name} className="product-image"/>
                </Link>
                <button 
                  className="favorite-btn" 
                  onClick={() => removeFromFavorites(product.id)}
                  aria-label="Remover dos favoritos"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
              </div>
              
              <div className="product-info">
                <div className="product-category">Camisa {product.team}</div>
                <div className="product-name">{product.name}</div>
                <div className="product-rating">
                  <span className="rating-stars">★</span>
                  <span>4.5 (1128)</span>
                </div>
                <div className="product-price">
                  <span className="current-price">R$ {Number(product.price).toFixed(2)}</span>
                  <span className="old-price">R$ {Number(product.oldPrice).toFixed(2)}</span>
                  {product.oldPrice && product.price && (
                    <span className="discount-badge">
                      -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                    </span>
                  )}
                </div>
                
                {/* Tamanhos disponíveis */}
                <div className="product-sizes">
                  <span className="sizes-label">Tamanhos:</span>
                  <div className="sizes-options">
                    {['P', 'M', 'G', 'GG'].map(size => (
                      <button
                        key={size}
                        className={`size-option ${selectedSizes[product.id] === size ? 'size-selected' : ''}`}
                        onClick={() => handleSizeSelection(product.id, size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                
                <button 
                  className="add-to-cart-btn" 
                  onClick={() => handleAddToCart(product.id)}
                >
                  Comprar Agora
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
