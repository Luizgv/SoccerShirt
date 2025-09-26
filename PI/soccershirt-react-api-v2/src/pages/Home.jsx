import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { api } from '../api/client'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'
import { useFavorites } from '../contexts/FavoritesContext'
export default function Home(){
  const { user } = useAuth()
  const { addToCart } = useCart()
  const { toggleFavorite } = useFavorites()
  const [searchParams] = useSearchParams()
  const [prods,setProds]=useState([])
  const [page,setPage]=useState(0)
  const [totalPages,setTotalPages]=useState(0)
  const [cats,setCats]=useState([])
  const [category,setCategory]=useState(searchParams.get('category') || '')
  const [sort,setSort]=useState('relevance')
  const [selectedSizes, setSelectedSizes] = useState({})
  useEffect(()=>{ api.categories().then(setCats) },[])
  useEffect(()=>{ api.products({category, sort, page, size:8}).then(p=>{ setProds(p.content); setTotalPages(p.totalPages) })},[category,sort,page])
  
  // Atualizar categoria quando URL mudar
  useEffect(() => {
    const urlCategory = searchParams.get('category') || ''
    setCategory(urlCategory)
    setPage(0)
  }, [searchParams])
  
  const addToFavorites = async (productId) => {
    try {
      await toggleFavorite(productId)
      alert('Produto adicionado aos favoritos! ❤️')
    } catch (error) {
      console.error('Erro ao favoritar:', error)
      alert('Erro ao adicionar aos favoritos. Tente novamente.')
    }
  }

  const handleSizeSelection = (productId, size) => {
    setSelectedSizes(prev => ({
      ...prev,
      [productId]: size
    }))
  }

  const handleAddToCart = async (productId) => {
    const selectedSize = selectedSizes[productId]
    
    if (!selectedSize) {
      alert('Por favor, selecione um tamanho antes de adicionar ao carrinho!')
      return
    }
    
    const success = await addToCart(productId, selectedSize)
    if (success) {
      alert(`Produto adicionado ao carrinho! 🛒\nTamanho: ${selectedSize}`)
      // Limpar seleção após adicionar
      setSelectedSizes(prev => ({
        ...prev,
        [productId]: null
      }))
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
        
        <button 
          onClick={() => {
            setCategory('')
            setSort('relevance')
            setPage(0)
          }}
          className="clear-filters-btn"
          style={{
            padding: '8px 16px',
            backgroundColor: '#f1f5f9',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            color: '#374151',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          🗑️ Limpar filtros
        </button>
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
                {p.oldPrice && p.price && (
                  <span className="discount-badge">
                    -{Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)}%
                  </span>
                )}
              </div>
              
              {/* Tamanhos disponíveis */}
              <div className="product-sizes">
                <span className="sizes-label">Tamanhos:</span>
                <div className="sizes-options">
                  {['P', 'M', 'G', 'GG'].map(size => (
                    <button
                      key={size}
                      className={`size-option ${selectedSizes[p.id] === size ? 'size-selected' : ''}`}
                      onClick={() => handleSizeSelection(p.id, size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              {user ? (
                <button 
                  className="add-to-cart-btn" 
                  onClick={() => handleAddToCart(p.id)}
                >
                  🛒 Comprar Agora
                </button>
              ) : (
                <Link to="/login" className="login-to-buy">
                  🛒 Comprar Agora
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Subfrase descritiva */}
      <div className="products-subtitle">
        <p>Encontre camisas oficiais e retrôs de clubes nacionais e internacionais</p>
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
