import React from 'react'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="about-container">
      <div className="breadcrumb">
        <Link to="/">← Voltar para os produtos</Link>
      </div>
      
      <div className="about-content">
        <h1 className="about-title">Sobre Nós</h1>
        
        <div className="about-story">
          <div className="about-intro">
            <p className="about-lead">
              Somos um grupo de amantes do futebol que decidiu transformar nossa paixão em negócio. 
              Conectamos torcedores do mundo todo com as camisas dos seus times favoritos.
            </p>
          </div>
          
          <div className="about-sections">
            <div className="about-section">
              <h3>• Nossa História</h3>
              <p>
                Tudo começou com um sonho simples: facilitar o acesso dos torcedores às camisas dos seus times favoritos. 
                Como verdadeiros apaixonados por futebol, sabemos o que significa vestir as cores do coração.
              </p>
            </div>
            
            <div className="about-section">
              <h3>• Nossa Missão</h3>
              <p>
                Conectar torcedores com camisas oficiais dos principais clubes nacionais e internacionais. 
                Cada camisa conta uma história e carrega a emoção de milhões de fãs.
              </p>
            </div>
            
            <div className="about-section">
              <h3>• Nosso Compromisso</h3>
              <p>
                Oferecemos apenas produtos originais e de qualidade. Cada compra é uma celebração da nossa paixão compartilhada pelo futebol.
              </p>
            </div>
          </div>
          
          <div className="about-footer">
            <Link to="/" className="cta-button">
              Explore Nossa Coleção
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
