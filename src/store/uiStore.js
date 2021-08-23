import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isCartDetailsVisible: false,
}

const uiStore = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleCartDetails(state) {
      state.isCartDetailsVisible = !state.isCartDetailsVisible
    },
  },
})

export const { toggleCartDetails } = uiStore.actions

export const uiStoreReducer = uiStore.reducer
