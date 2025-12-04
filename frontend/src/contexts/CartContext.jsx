import React, { createContext, useContext, useState, useEffect } from 'react'
import { api } from '../api/client'
import { useAuth } from './AuthContext'

const CartContext = createContext()

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()

  // Função para atualizar o carrinho
  const refreshCart = async () => {
    if (!user) {
      setCartItems([])
      setCartCount(0)
      return
    }

    try {
      setIsLoading(true)
      const items = await api.cartList()
      setCartItems(items)
      const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
      setCartCount(totalItems)
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error)
      setCartItems([])
      setCartCount(0)
    } finally {
      setIsLoading(false)
    }
  }

  // Função para adicionar item ao carrinho
  const addToCart = async (productId) => {
    if (!user) return false
    
    try {
      await api.cartAdd(productId)
      await refreshCart() // Atualiza o contador
      return true
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error)
      return false
    }
  }

  // Função para remover item do carrinho
  const removeFromCart = async (itemId) => {
    if (!user) return false
    
    try {
      await api.cartRemove(itemId)
      await refreshCart() // Atualiza o contador
      return true
    } catch (error) {
      console.error('Erro ao remover do carrinho:', error)
      return false
    }
  }

  // Função para atualizar quantidade
  const updateQuantity = async (itemId, quantity) => {
    if (!user) return false
    
    try {
      await api.cartQty(itemId, quantity)
      await refreshCart() // Atualiza o contador
      return true
    } catch (error) {
      console.error('Erro ao atualizar quantidade:', error)
      return false
    }
  }

  // Carrega o carrinho quando o usuário faz login
  useEffect(() => {
    refreshCart()
  }, [user])

  const value = {
    cartItems,
    cartCount,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    refreshCart
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
