import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
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
        
        <Footer />
      </div>
    </Router>
  );
};

export default App;
