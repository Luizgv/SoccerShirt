import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api/client'
import { useCart } from '../contexts/CartContext'
export default function Favorites(){
  const [items,setItems]=useState([])
  const { addToCart } = useCart()
  
  const refresh = () => api.favList().then(setItems)
  useEffect(refresh,[])
  
  const removeFromFavorites = async (productId) => {
    try {
      await api.favToggle(productId)
      refresh()
    } catch (error) {
      console.error('Erro ao remover dos favoritos:', error)
    }
  }

  const handleAddToCart = async (productId) => {
    const success = await addToCart(productId)
    if (success) {
      alert('Produto adicionado ao carrinho! 🛒')
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
                  ❤️
                </button>
              </div>
              
              <div className="favorite-info">
                <div className="favorite-category">Camisa {product.team}</div>
                <div className="favorite-name">{product.name}</div>
                <div className="favorite-rating">★★★★★ (198 Avaliações)</div>
                <div className="favorite-price">
                  <span className="favorite-current-price">R$ {Number(product.price).toFixed(2)}</span>
                  <span className="favorite-old-price">R$ {Number(product.oldPrice).toFixed(2)}</span>
                </div>
                
                <button 
                  className="add-to-cart-from-favorites" 
                  onClick={() => handleAddToCart(product.id)}
                >
                  🛒 Adicionar ao Carrinho
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
