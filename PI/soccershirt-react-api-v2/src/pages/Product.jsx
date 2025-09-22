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
      alert('Produto adicionado ao carrinho! 🛒')
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
          <div className="product-category-detail">Tema</div>
          <h1 className="product-title">{p.name}</h1>
          <div className="product-rating-detail">★★★★★ (158 Avaliações)</div>
          
          <div className="product-pricing">
            <span className="current-price-detail">R$ {Number(p.price).toFixed(2)}</span>
            <span className="old-price-detail">R$ {Number(p.oldPrice).toFixed(2)}</span>
            <span className="discount-badge">-14% OFF</span>
          </div>
          
          <div className="product-description">
            <h3>Descrição</h3>
            <ul>
              <li>Indicado para: Jogo</li>
              <li>Clube: Nacional</li>
              <li>Gola: Gola V</li>
              <li>Material: Poliéster</li>
            </ul>
          </div>
          
          <div className="quantity-section">
            <label>Quantidade</label>
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
            <Link to="/login" className="login-to-buy-detail">
              Entre para comprar
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
