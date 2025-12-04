import React, { createContext, useContext, useMemo, useState, useEffect } from 'react'
import { api, setToken, getToken } from '../api/client'
const AuthCtx = createContext(null)
export const useAuth = () => useContext(AuthCtx)
export default function AuthProvider({children}){
  const [user,setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Carregar dados do usuário ao inicializar se houver token
  useEffect(() => {
    const loadUser = async () => {
      const token = getToken()
      if (token) {
        try {
          const userData = await api.me()
          setUser(userData)
        } catch (error) {
          console.error('Erro ao carregar usuário:', error)
          setToken('') // Remove token inválido
          setUser(null)
        }
      }
      setIsLoading(false)
    }

    loadUser()
  }, [])

  const login = async (email,password) => {
    await api.login(email,password)
    const userData = await api.me() // Busca dados completos após login
    setUser(userData)
  }

  const logout = () => {
    setToken('')
    setUser(null)
  }

  const register = (data) => api.register(data)

  const value = useMemo(()=>({user, login, logout, register, isLoading}),[user, isLoading])
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>
}
