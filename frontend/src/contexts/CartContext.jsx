// ============================================
// CARTCONTEXT - Gerenciamento do Carrinho
// Context API + useState + useEffect
// Depende de: AuthContext (usuário logado)
// ============================================

import React, { createContext, useContext, useState, useEffect } from 'react'
import { api } from '../api/client'
import { useAuth } from './AuthContext'

const CartContext = createContext()

// Hook customizado: const { cartCount, addToCart } = useCart()
export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export default function CartProvider({ children }) {
  // Estados: cartItems (lista), cartCount (badge no Header)
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()

  // Sincronizar com backend (busca lista e recalcula contador)
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

  // ============================================
  // FUNÇÃO: addToCart
  // 1. Valida se usuário está logado
  // 2. POST /api/cart/add/{id} (adiciona no backend)
  // 3. refreshCart() (atualiza contador)
  // 4. Retorna true/false (componente mostra toast)
  // ============================================
  const addToCart = async (productId) => {
    if (!user) return false
    
    try {
      await api.cartAdd(productId)
      await refreshCart() // Atualiza badge no Header
      return true
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error)
      return false
    }
  }

  // Remove item do carrinho
  const removeFromCart = async (itemId) => {
    if (!user) return false
    
    try {
      await api.cartRemove(itemId)
      await refreshCart()
      return true
    } catch (error) {
      console.error('Erro ao remover do carrinho:', error)
      return false
    }
  }

  // Atualiza quantidade de um item
  const updateQuantity = async (itemId, quantity) => {
    if (!user) return false
    
    try {
      await api.cartQty(itemId, quantity)
      await refreshCart()
      return true
    } catch (error) {
      console.error('Erro ao atualizar quantidade:', error)
      return false
    }
  }

  // Monitora login/logout (user do AuthContext)
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
