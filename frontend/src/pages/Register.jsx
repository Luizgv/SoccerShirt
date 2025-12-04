import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
export default function Register(){
  const { register } = useAuth()
  const nav = useNavigate()
  const [form,setForm]=useState({fullName:'', email:'', password:'', phone:'', address:'', houseNumber:''})
  const [error,setError]=useState('')
  
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
  
  const onChange = e => setForm({...form, [e.target.name]: e.target.value})
  
  const onSubmit = async e => { 
    e.preventDefault(); 
    setError(''); 
    try { 
      await register(form); 
      nav('/login?registered=1') 
    } catch(err) { 
      setError(err.message||'Erro') 
    } 
  }
  
  return (
    <div className="register-container">
      <div className="register-form">
        <h2 className="register-title">Bem-vindo!</h2>
        <p className="register-subtitle">Faça cadastro da sua conta</p>
        
        <form onSubmit={onSubmit}>
          <div className="register-fields">
            <div className="form-row">
              <div className="form-group">
                <label>Nome Completo</label>
                <input 
                  name="fullName" 
                  value={form.fullName} 
                  onChange={onChange} 
                  placeholder="Coloque seu nome" 
                  required
                />
              </div>
              
              <div className="form-group">
                <label>E-mail</label>
                <input 
                  name="email" 
                  type="email" 
                  value={form.email} 
                  onChange={onChange} 
                  placeholder="Coloque seu e-mail" 
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Telefone</label>
                <input 
                  name="phone" 
                  value={form.phone} 
                  onChange={onChange} 
                  placeholder="Coloque seu telefone"
                />
              </div>
              
              <div className="form-group">
                <label>Senha</label>
                <input 
                  name="password" 
                  type="password" 
                  value={form.password} 
                  onChange={onChange} 
                  placeholder="Coloque sua senha" 
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Endereço</label>
                <input 
                  name="address" 
                  value={form.address} 
                  onChange={onChange} 
                  placeholder="Coloque seu endereço"
                />
              </div>
              
              <div className="form-group">
                <label>Número Residencial</label>
                <input 
                  name="houseNumber" 
                  value={form.houseNumber} 
                  onChange={onChange} 
                  placeholder="Coloque número da sua residencia"
                />
              </div>
            </div>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" className="register-btn">Cadastro</button>
        </form>
        
        <div className="register-footer">
          Possui uma conta? <Link to="/login">Faça login!</Link>
        </div>
      </div>
    </div>
  )
}
