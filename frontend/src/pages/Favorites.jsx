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
      <h2 className="favorites-title">Favoritos</h2>
      
      {!items.length ? (
        <div className="empty-favorites">
          <div className="empty-favorites-message">
            Você ainda não tem nenhum produto favoritado!
          </div>
          <Link to="/" className="cta-button">
            Explorar Produtos
          </Link>
        </div>
      ) : (
        <div className="favorites-grid">
          {items.map(product => (
            <div className="favorite-card" key={product.id}>
              <div className="favorite-image-container">
                <Link to={`/products/${product.id}`}>
                  <img src={product.imageUrl} alt={product.name} className="favorite-image"/>
                </Link>
                <button 
                  className="remove-favorite-btn" 
                  onClick={() => removeFromFavorites(product.id)}
                  aria-label="Remover dos favoritos"
                >
                  ×
                </button>
              </div>
              
              <div className="favorite-info">
                <div className="favorite-category">Camisa {product.team}</div>
                <div className="favorite-name">{product.name}</div>
                <div className="favorite-rating">5.0 (198 Avaliações)</div>
                <div className="favorite-price">
                  <span className="favorite-current-price">R$ {Number(product.price).toFixed(2)}</span>
                  <span className="favorite-old-price">R$ {Number(product.oldPrice).toFixed(2)}</span>
                  {product.oldPrice && product.price && (
                    <span className="favorite-discount-badge">
                      -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                    </span>
                  )}
                </div>
                
                {/* Tamanhos disponíveis */}
                <div className="favorite-sizes">
                  <span className="favorite-sizes-label">Tamanhos:</span>
                  <div className="favorite-sizes-options">
                    {['P', 'M', 'G', 'GG'].map(size => (
                      <button
                        key={size}
                        className={`favorite-size-option ${selectedSizes[product.id] === size ? 'favorite-size-selected' : ''}`}
                        onClick={() => handleSizeSelection(product.id, size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                
                <button 
                  className="add-to-cart-from-favorites" 
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
