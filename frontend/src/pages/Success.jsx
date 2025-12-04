import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'

export default function Success(){
  const { refreshCart } = useCart()
  
  useEffect(() => {
    refreshCart()
  }, [])
  
  return (
    <div className="success-page">
      <div className="success-content">
        <div className="success-icon">✅</div>
        <h1 className="success-title">Compra Finalizada com Sucesso!</h1>
        <p className="success-message">
          Seu pedido foi confirmado e está sendo processado.
        </p>
        <p className="success-info">
          Em breve você receberá um e-mail com os detalhes do seu pedido e informações de rastreamento.
        </p>
        <div className="success-actions">
          <Link className="btn-primary" to="/">
            Continuar Comprando
          </Link>
          <Link className="btn-secondary" to="/about">
            Ver Meus Pedidos
          </Link>
        </div>
      </div>
    </div>
  )
}
