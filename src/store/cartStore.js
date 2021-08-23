import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartItems: [],
  numberOfCartItems: 0,
  updated: false,
}

const cartStore = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    replaceCart(state, action) {
      state.cartItems = action.payload.cartItems
      state.numberOfCartItems = action.payload.numberOfCartItems
    },
    addItemToCart(state, action) {
      const newItem = action.payload
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      )
      state.numberOfCartItems++
      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          title: newItem.title,
          quantity: 1,
          price: newItem.price,
          total: newItem.price,
        })
      } else {
        existingItem.quantity++
        existingItem.total = existingItem.total + existingItem.price
      }
      state.updated = true
    },
    removeItemToCart(state, action) {
      const id = action.payload
      const existingItem = state.cartItems.find((item) => item.id === id)
      state.numberOfCartItems--
      if (existingItem.quantity === 1) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id)
      } else {
        existingItem.quantity--
        existingItem.total = existingItem.total - existingItem.price
      }
      state.updated = true
    },
  },
})

export const { addItemToCart, removeItemToCart, replaceCart } =
  cartStore.actions

export const cartStoreReducer = cartStore.reducer
