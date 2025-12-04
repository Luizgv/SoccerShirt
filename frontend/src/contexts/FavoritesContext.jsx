import React, { createContext, useContext, useState, useEffect } from 'react'
import { api } from '../api/client'
import { useAuth } from './AuthContext'

const FavoritesContext = createContext()

export const useFavorites = () => {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites deve ser usado dentro de um FavoritesProvider')
  }
  return context
}

export const FavoritesProvider = ({ children }) => {
  const { user } = useAuth()
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(false)

  // Função para buscar favoritos
  const fetchFavorites = async () => {
    if (!user) {
      setFavorites([])
      return
    }

    try {
      setLoading(true)
      const favoritesData = await api.favList()
      setFavorites(favoritesData || [])
    } catch (error) {
      console.error('Erro ao buscar favoritos:', error)
      setFavorites([])
    } finally {
      setLoading(false)
    }
  }

  // Função para adicionar/remover favorito
  const toggleFavorite = async (productId) => {
    if (!user) {
      throw new Error('Usuário não autenticado')
    }

    try {
      await api.favToggle(productId)
      // Atualizar lista de favoritos após toggle
      await fetchFavorites()
      return true
    } catch (error) {
      console.error('Erro ao alterar favorito:', error)
      throw error
    }
  }

  // Verificar se um produto está nos favoritos
  const isFavorite = (productId) => {
    return favorites.some(fav => fav.id === productId)
  }

  // Carregar favoritos quando usuário mudar
  useEffect(() => {
    fetchFavorites()
  }, [user])

  const value = {
    favorites,
    loading,
    toggleFavorite,
    isFavorite,
    refreshFavorites: fetchFavorites,
    favoritesCount: favorites.length
  }

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}
