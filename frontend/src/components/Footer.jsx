import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-top">
          {/* Logo e Descrição */}
          <div className="footer-section">
            <h3 className="footer-logo">Soccer Shirt</h3>
            <p className="footer-description">
              A melhor loja de camisas de futebol do Brasil. 
              Produtos originais dos principais clubes nacionais e internacionais.
            </p>
          </div>

          {/* Links Rápidos */}
          <div className="footer-section">
            <h4 className="footer-title">Links Rápidos</h4>
            <ul className="footer-links">
              <li><Link to="/">Início</Link></li>
              <li><Link to="/about">Sobre Nós</Link></li>
              <li><Link to="/favorites">Favoritos</Link></li>
              <li><Link to="/cart">Carrinho</Link></li>
            </ul>
          </div>

          {/* Categorias */}
          <div className="footer-section">
            <h4 className="footer-title">Categorias</h4>
            <ul className="footer-links">
              <li><a href="#">Times Brasileiros</a></li>
              <li><a href="#">Times Europeus</a></li>
              <li><a href="#">Camisas Retrô</a></li>
              <li><a href="#">Lançamentos</a></li>
            </ul>
          </div>
        </div>

        {/* Separador */}
        <div className="footer-divider"></div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p>&copy; 2025 Soccer Shirt. Todos os direitos reservados.</p>
          </div>
          
          <div className="footer-bottom-right">
            <div className="footer-payments">
              <span>Pagamento:</span>
              <div className="payment-icons">
                <span title="Visa">💳</span>
                <span title="Mastercard">💳</span>
                <span title="PIX">📱</span>
                <span title="Boleto">🧾</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
