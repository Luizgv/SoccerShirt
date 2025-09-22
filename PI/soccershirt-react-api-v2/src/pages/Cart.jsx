import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/client'
import { useCart } from '../contexts/CartContext'
export default function Cart(){
  const nav = useNavigate()
  const { cartItems, refreshCart, updateQuantity, removeFromCart } = useCart()
  const [total,setTotal]=useState(0)
  const [coupon,setCoupon]=useState('')
  const [couponInfo,setCouponInfo]=useState(null)
  
  useEffect(() => {
    refreshCart()
  }, [])
  
  useEffect(() => {
    const newTotal = cartItems.reduce((a,i)=>a+Number(i.product.price)*i.quantity,0)
    setTotal(newTotal)
  }, [cartItems])
  
  const handleUpdateQuantity = async (itemId, newQuantity) => {
    await updateQuantity(itemId, newQuantity)
  }
  
  const handleRemoveItem = async (itemId) => {
    await removeFromCart(itemId)
  }
  
  const applyCoupon = async () => {
    try { 
      const c = await api.couponValidate(coupon); 
      setCouponInfo(c) 
    } catch(e) { 
      alert('Cupom inválido'); 
      setCouponInfo(null) 
    }
  }
  
  const checkout = async () => {
    await api.checkout({
      couponCode: couponInfo?.code || '', 
      paymentMethod: 'card', 
      cardLast4: '1234'
    })
    nav('/order/success')
  }
  
  if(!cartItems.length) {
    return (
      <div className="empty-cart">
        <div className="empty-cart-message">Seu carrinho está vazio</div>
      </div>
    )
  }
  
  const discount = couponInfo ? total * Number(couponInfo.percent) : 0
  const taxes = (total - discount) * 0.10
  const grand = (total - discount) + taxes
  
  return (
    <div className="cart-container">
      <h2 className="cart-title">Carrinho</h2>
      
      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-image">
                <img src={item.product.imageUrl} alt={item.product.name} />
              </div>
              
              <div className="cart-item-details">
                <div className="cart-item-name">{item.product.name}</div>
                <div className="cart-item-price">R$ {Number(item.product.price).toFixed(2)}</div>
              </div>
              
              <div className="cart-item-quantity">
                <button 
                  className="quantity-btn" 
                  onClick={() => handleUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                >
                  -
                </button>
                <span className="quantity-value">{item.quantity}</span>
                <button 
                  className="quantity-btn" 
                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              
              <button 
                className="remove-item-btn" 
                onClick={() => handleRemoveItem(item.id)}
                aria-label="Remover item"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
        
        <div className="cart-summary">
          <div className="checkout-section">
            <h3>Checkout</h3>
            
            <div className="summary-line">
              <span>Subtotal</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
            
            <div className="summary-line">
              <span>Frete</span>
              <span>R$ 0,00</span>
            </div>
            
            <div className="summary-line">
              <span>Taxas</span>
              <span>R$ {taxes.toFixed(2)}</span>
            </div>
            
            <div className="summary-total">
              <span>Total: R$ {grand.toFixed(2)}</span>
            </div>
            
            <button 
              className="checkout-btn" 
              onClick={checkout}
            >
              Finalizar Compra
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
