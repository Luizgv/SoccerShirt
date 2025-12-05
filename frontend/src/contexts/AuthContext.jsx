// ============================================
// AUTHCONTEXT - Gerenciamento de Autenticação
// Context API + useState + useEffect + useMemo
// ============================================

import React, { createContext, useContext, useMemo, useState, useEffect } from 'react'
import { api, setToken, getToken } from '../api/client'

const AuthCtx = createContext(null)

// Hook customizado: const { user, login, logout } = useAuth()
export const useAuth = () => useContext(AuthCtx)

export default function AuthProvider({children}){
  
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  
  useEffect(() => {
    const loadUser = async () => {
      const token = getToken()
      if (token) {
        try {
          const userData = await api.me()
          setUser(userData)
        } catch (error) {
          console.error('Erro ao carregar usuário:', error)
          setToken('')
          setUser(null)
        }
      }
      setIsLoading(false)
    }
    loadUser()
  }, [])

  // ============================================
  // FUNÇÃO: login
  // 1. POST /api/auth/login (valida credenciais)
  // 2. GET /api/auth/me (busca dados completos)
  // 3. setUser() (atualiza estado global)
  // ============================================
  const login = async (email, password) => {
    await api.login(email, password)
    const userData = await api.me()
    setUser(userData)
  }

  // FUNÇÃO: logout (limpa token e estado)
  const logout = () => {
    setToken('')
    setUser(null)
  }

  const register = (data) => api.register(data)

  // useMemo: otimiza re-renders (só recria se user/isLoading mudarem)
  const value = useMemo(
    () => ({user, login, logout, register, isLoading}),
    [user, isLoading]
  )
  
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>
}
