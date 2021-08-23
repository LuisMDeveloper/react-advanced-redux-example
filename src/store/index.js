import { configureStore } from '@reduxjs/toolkit'
import { cartStoreReducer } from './cartStore'
import { uiStoreReducer } from './uiStore'

const store = configureStore({
  reducer: {
    cart: cartStoreReducer,
    ui: uiStoreReducer,
  },
})

export default store
