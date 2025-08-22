import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';
import './styles/global.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-surface">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            {/* Rotas futuras */}
            <Route path="/categories" element={<CatalogPage />} />
            <Route path="/brands" element={<CatalogPage />} />
            {/* 404 - Redireciona para home */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        
        {/* Footer */}
        <footer className="bg-primary text-white py-12 mt-16">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                    <span className="text-primary font-bold">⚽</span>
                  </div>
                  <h3 className="text-xl font-bold">Soccer Shirt</h3>
                </div>
                <p className="text-gray-300 text-sm">
                  Sua loja especializada em camisas de futebol oficiais dos melhores times do mundo.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Categorias</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><a href="/catalog?category=HOME" className="hover:text-white">Camisas Casa</a></li>
                  <li><a href="/catalog?category=AWAY" className="hover:text-white">Camisas Visitante</a></li>
                  <li><a href="/catalog?category=RETRO" className="hover:text-white">Camisas Retrô</a></li>
                  <li><a href="/catalog?category=TRAINING" className="hover:text-white">Camisas Treino</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Ligas</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><a href="/catalog?league=Premier League" className="hover:text-white">Premier League</a></li>
                  <li><a href="/catalog?league=La Liga" className="hover:text-white">La Liga</a></li>
                  <li><a href="/catalog?league=Bundesliga" className="hover:text-white">Bundesliga</a></li>
                  <li><a href="/catalog?league=Brasileirão" className="hover:text-white">Brasileirão</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Atendimento</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>📧 contato@soccershirt.com</li>
                  <li>📱 (11) 99999-9999</li>
                  <li>🕒 Seg a Sex: 8h às 18h</li>
                  <li>🕒 Sáb: 9h às 15h</li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-300">
              <p>&copy; 2024 Soccer Shirt. Todos os direitos reservados.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
