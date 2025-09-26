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
            <h2>Paixão pelo Futebol, Amor pelas Camisas</h2>
            <p className="about-lead">
              Somos um grupo de amantes do futebol que decidiu transformar nossa paixão em negócio.
            </p>
          </div>
          
          <div className="about-sections">
            <div className="about-section">
              <h3>🏆 Nossa História</h3>
              <p>
                Tudo começou com um sonho simples: facilitar o acesso dos torcedores às camisas dos seus times favoritos. 
                Como verdadeiros apaixonados por futebol, sabemos o que significa vestir as cores do coração e 
                carregar a história de um clube no peito.
              </p>
            </div>
            
            <div className="about-section">
              <h3>⚽ Nossa Missão</h3>
              <p>
                Conectar torcedores do mundo todo com as camisas oficiais dos principais clubes nacionais e internacionais. 
                Acreditamos que cada camisa conta uma história e carrega a emoção de milhões de fãs.
              </p>
            </div>
            
            <div className="about-section">
              <h3>🌟 Nossa Paixão</h3>
              <p>
                Desde os clássicos brasileiros como Corinthians, São Paulo, Palmeiras e Santos, até os gigantes europeus 
                como Real Madrid e Barcelona - nossa curadoria é feita por quem realmente entende de futebol.
              </p>
            </div>
            
            <div className="about-section">
              <h3>🎯 Nosso Compromisso</h3>
              <p>
                Oferecemos apenas produtos originais e de qualidade, porque sabemos que a camisa do seu time 
                merece o mesmo respeito que você tem pelo futebol. Cada compra é uma celebração da nossa paixão compartilhada.
              </p>
            </div>
          </div>
          
          <div className="about-footer">
            <div className="about-cta">
              <h3>Junte-se à Nossa Família</h3>
              <p>
                Seja você torcedor de arquibancada ou jogador de fim de semana, aqui você encontra 
                a camisa perfeita para expressar sua paixão pelo futebol.
              </p>
              <Link to="/" className="cta-button">
                Explore Nossa Coleção
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
