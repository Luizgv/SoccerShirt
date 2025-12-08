import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api } from '../api/client'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'
export default function Product(){
  const { id } = useParams()
  const [p,setP]=useState(null)
  const [quantity, setQuantity] = useState(1)
  const { user } = useAuth()
  const { addToCart } = useCart()
  
  useEffect(()=>{ api.product(id).then(setP) },[id])
  
  const handleAddToCart = async () => {
    const success = await addToCart(p.id)
    if (success) {
      alert('Produto adicionado ao carrinho!')
    } else {
      alert('Erro ao adicionar produto ao carrinho')
    }
  }
  
  if(!p) return <div className="loading">Carregando...</div>
  
  return (
    <div className="product-container">
      <div className="breadcrumb">
        <Link to="/">← Voltar para os produtos</Link>
      </div>
      
      <div className="product-details">
        <div className="product-image-section">
          <img src={p.imageUrl} alt={p.name} className="product-detail-image" />
        </div>
        
        <div className="product-info-section">
          <div className="product-header-detail">
            <button className="favorite-btn-detail" aria-label="Favoritar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>
          
          <h1 className="product-title">{p.name}</h1>
          <div className="product-rating-detail">
            <span className="rating-stars">★</span>
            <span>4.5 (1128 reviews)</span>
          </div>
          
          <div className="product-pricing">
            <span className="current-price-detail">R$ {Number(p.price).toFixed(2)}</span>
            <span className="old-price-detail">R$ {Number(p.oldPrice).toFixed(2)}</span>
            {p.oldPrice && p.price && (
              <span className="discount-badge-detail">
                -{Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)}% OFF
              </span>
            )}
          </div>
          
          <div className="product-description">
            <h3>Descrição</h3>
            <ul>
              <li>Indicado para: Jogo</li>
              <li>Clube: {p.team}</li>
              <li>Time: {p.category}</li>
              <li>Gola: Gola V</li>
              <li>Material: Poliéster</li>
            </ul>
          </div>
          
          <div className="quantity-section">
            <label>Quantidade:</label>
            <div className="quantity-controls">
              <button 
                className="quantity-btn" 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span className="quantity-display">{quantity}</span>
              <button 
                className="quantity-btn" 
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
          
          {user ? (
            <button 
              className="add-to-cart-detail-btn" 
              onClick={handleAddToCart}
            >
              Adicionar ao Carrinho
            </button>
          ) : (
            <Link to="/login" className="add-to-cart-detail-btn">
              Adicionar ao Carrinho
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
