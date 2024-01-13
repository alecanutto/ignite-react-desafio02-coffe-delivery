import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from 'react'

import {
  addItemAction,
  removeItemAction,
  checkoutCartAction,
  decrementItemQuantityAction,
  incrementItemQuantityAction,
  Item,
  OrderInfo,
} from '../reducers/cart/actions'

import { cartReducer, initialState, Order } from '../reducers/cart/reducer'
import { useNavigate } from 'react-router-dom'

interface CartContextType {
  cart: Item[]
  orders: Order[]
  addItem: (item: Item) => void
  removeItem: (itemId: Item['id']) => void
  decrementItemQuantity: (itemId: Item['id']) => void
  incrementItemQuantity: (itemId: Item['id']) => void
  checkout: (order: OrderInfo) => void
}

export const CartContext = createContext({} as CartContextType)

interface CartContextProviderProps {
  children: ReactNode
}

export function CartContextProvider({
  children,
}: Readonly<CartContextProviderProps>) {
  const [cartState, dispatch] = useReducer(
    cartReducer,
    initialState,
    (cartState) => {
      const storedStateAsJSON = localStorage.getItem(
        '@coffee-delivery:cart-state-1.0.0',
      )

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }

      return cartState
    },
  )

  const navigate = useNavigate()

  const { cart, orders } = cartState

  const addItem = (item: Item) => dispatch(addItemAction(item))

  const removeItem = (itemId: Item['id']) => dispatch(removeItemAction(itemId))

  const checkout = useCallback(
    (order: OrderInfo) => {
      dispatch(checkoutCartAction(order, navigate))
    },
    [dispatch, navigate],
  )

  const incrementItemQuantity = (itemId: Item['id']) =>
    dispatch(incrementItemQuantityAction(itemId))

  const decrementItemQuantity = (itemId: Item['id']) =>
    dispatch(decrementItemQuantityAction(itemId))

  useEffect(() => {
    if (cartState) {
      const stateJSON = JSON.stringify(cartState)

      localStorage.setItem('@coffee-delivery:cart-state-1.0.0', stateJSON)
    }
  }, [cartState])

  const values = useMemo(
    () => ({
      addItem,
      cart,
      orders,
      decrementItemQuantity,
      incrementItemQuantity,
      removeItem,
      checkout,
    }),
    [cart, checkout, orders],
  )

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>
}
