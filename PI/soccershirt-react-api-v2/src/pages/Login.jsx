import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
export default function Login(){
  const { login } = useAuth()
  const nav = useNavigate()
  const loc = useLocation()
  const next = new URLSearchParams(loc.search).get('next') || '/'
  const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [error,setError]=useState('')
  
  useEffect(() => {
    // Impede o scroll da página
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    
    return () => {
      // Restaura o scroll quando sair da página
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [])
  
  const onSubmit = async (e)=>{ e.preventDefault(); setError(''); try{ await login(email,password); nav(next,{replace:true}) }catch(err){ setError(err.message||'Erro') } }
  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Bem-vindo de Volta!</h2>
        <p className="login-subtitle">Faça login na sua conta Login</p>
        
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>E-mail</label>
            <input 
              type="email" 
              value={email} 
              onChange={e=>setEmail(e.target.value)} 
              placeholder="Coloque seu e-mail" 
              required
            />
          </div>
          
          <div className="form-group">
            <label>Senha</label>
            <input 
              type="password" 
              value={password} 
              onChange={e=>setPassword(e.target.value)} 
              placeholder="Coloque sua senha" 
              required
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" className="login-btn">Login</button>
        </form>
        
        <div className="login-footer">
          Não tem uma conta? <Link to="/register">Se cadastre!</Link>
        </div>
      </div>
    </div>
  )
}
