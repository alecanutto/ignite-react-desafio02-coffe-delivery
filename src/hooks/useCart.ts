import { useContext } from 'react'
import { CartContext } from '../contexts/CartContextProvider'

export function useCart() {
  return useContext(CartContext)
}
