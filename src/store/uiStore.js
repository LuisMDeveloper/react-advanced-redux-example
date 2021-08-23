import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isCartDetailsVisible: false,
  notification: {},
}

const uiStore = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleCartDetails(state) {
      state.isCartDetailsVisible = !state.isCartDetailsVisible
    },
    showNotification(state, action) {
      state.notification = { ...action.payload }
    },
  },
})

export const { toggleCartDetails, showNotification } = uiStore.actions

export const uiStoreReducer = uiStore.reducer
