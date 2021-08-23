import Cart from './components/Cart/Cart'
import Layout from './components/Layout/Layout'
import Products from './components/Shop/Products'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Notification from './components/UI/Notification'
import { showNotification } from './store/uiStore'
import { fetchCartData, sendCartData } from './thunks'

function App() {
  const dispatch = useDispatch()
  const isCartVisible = useSelector((state) => state.ui.isCartDetailsVisible)
  const cartState = useSelector((state) => state.cart)
  const notification = useSelector((state) => state.ui.notification)

  useEffect(() => {
    dispatch(fetchCartData())
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (cartState.updated) {
        dispatch(sendCartData(cartState))
      }
    }, 1000)
    return () => {
      clearTimeout(timer)
    }
  }, [cartState, dispatch])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (notification.status !== 'error') {
        dispatch(showNotification(null))
      }
    }, 3000)
    return () => {
      clearTimeout(timer)
    }
  }, [notification])

  return (
    <>
      {notification.status && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {isCartVisible && <Cart />}
        <Products />
      </Layout>
    </>
  )
}

export default App
