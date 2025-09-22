import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api/client'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'
export default function Home(){
  const { user } = useAuth()
  const { addToCart } = useCart()
  const [prods,setProds]=useState([])
  const [page,setPage]=useState(0)
  const [totalPages,setTotalPages]=useState(0)
  const [cats,setCats]=useState([])
  const [category,setCategory]=useState('')
  const [sort,setSort]=useState('relevance')
  useEffect(()=>{ api.categories().then(setCats) },[])
  useEffect(()=>{ api.products({category, sort, page, size:8}).then(p=>{ setProds(p.content); setTotalPages(p.totalPages) })},[category,sort,page])
  
  const addToFavorites = async (productId) => {
    try {
      await api.favToggle(productId)
    } catch (error) {
      console.error('Erro ao favoritar:', error)
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
    <div className="home-container">
      <h2 className="home-title">Todos os Produtos</h2>
      
      <div className="filters-container">
        <select 
          value={category} 
          onChange={e=>{setPage(0); setCategory(e.target.value)}}
          className="filter-select"
        >
          <option value="">Todas as categorias</option>
          {cats.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        
        <select 
          value={sort} 
          onChange={e=>{setPage(0); setSort(e.target.value)}}
          className="filter-select"
        >
          <option value="relevance">Relevância</option>
          <option value="rating_desc">Avaliação</option>
          <option value="price_asc">Preço: menor → maior</option>
          <option value="price_desc">Preço: maior → menor</option>
        </select>
      </div>
      
      <div className="products-grid">
        {prods.map(p => (
          <div key={p.id} className="product-card">
            <div className="product-image-container">
              <Link to={`/products/${p.id}`}>
                <img src={p.imageUrl} alt={p.name} className="product-image"/>
              </Link>
              {user && (
                <button 
                  className="favorite-btn" 
                  onClick={() => addToFavorites(p.id)}
                  aria-label="Favoritar produto"
                >
                  ♡
                </button>
              )}
            </div>
            
            <div className="product-info">
              <div className="product-category">Camisa {p.team}</div>
              <div className="product-name">{p.name}</div>
              <div className="product-rating">★★★★★ (198 Avaliações)</div>
              <div className="product-price">
                <span className="current-price">R$ {Number(p.price).toFixed(2)}</span>
                <span className="old-price">R$ {Number(p.oldPrice).toFixed(2)}</span>
              </div>
              
              {user ? (
                <button 
                  className="add-to-cart-btn" 
                  onClick={() => handleAddToCart(p.id)}
                >
                  🛒 Adicionar ao Carrinho
                </button>
              ) : (
                <Link to="/login" className="login-to-buy">Entre para comprar</Link>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="pagination">
        <button 
          className="pagination-btn" 
          disabled={page<=0} 
          onClick={()=>setPage(p=>p-1)}
        >
          Anterior
        </button>
        <div className="pagination-info">Página {page+1} de {Math.max(1,totalPages)}</div>
        <button 
          className="pagination-btn" 
          disabled={page>=totalPages-1} 
          onClick={()=>setPage(p=>p+1)}
        >
          Próxima
        </button>
      </div>
    </div>
  )
}
