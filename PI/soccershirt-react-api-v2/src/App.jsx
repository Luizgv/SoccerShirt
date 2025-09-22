import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import AuthProvider, { useAuth } from './contexts/AuthContext.jsx'
import CartProvider from './contexts/CartContext.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Product from './pages/Product.jsx'
import Favorites from './pages/Favorites.jsx'
import Cart from './pages/Cart.jsx'
import Success from './pages/Success.jsx'
function RequireAuth({children}){
  const { user } = useAuth()
  const loc = useLocation()
  if(!user){ return <Navigate to={`/login?next=${encodeURIComponent(loc.pathname)}`} replace/> }
  return children
}

function AppContent() {
  const { isLoading } = useAuth()
  
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading">Carregando...</div>
      </div>
    )
  }
  
  return (
    <>
      <Header/>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/products/:id" element={<Product/>}/>
          <Route path="/favorites" element={<RequireAuth><Favorites/></RequireAuth>}/>
          <Route path="/cart" element={<RequireAuth><Cart/></RequireAuth>}/>
          <Route path="/order/success" element={<Success/>}/>
          <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
      </div>
    </>
  )
}

export default function App(){
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  )
}
