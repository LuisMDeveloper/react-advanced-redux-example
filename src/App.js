import Cart from './components/Cart/Cart'
import Layout from './components/Layout/Layout'
import Products from './components/Shop/Products'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Notification from './components/UI/Notification'
import { showNotification } from './store/uiStore'

function App() {
  const dispatch = useDispatch()
  const isCartVisible = useSelector((state) => state.ui.isCartDetailsVisible)
  const cartState = useSelector((state) => state.cart)
  const notification = useSelector((state) => state.ui.notification)

  useEffect(() => {
    let notificationTimer = null
    const timer = setTimeout(() => {
      dispatch(
        showNotification({
          status: 'pending',
          title: 'Pending...',
          message: 'Sending request...',
        })
      )
      const sendData = async () => {
        const response = await fetch(
          'https://react-example-f7ba1-default-rtdb.firebaseio.com/cart.json',
          {
            method: 'PUT',
            body: JSON.stringify(cartState),
          }
        )

        if (!response.ok) {
          throw new Error('Something went wrong!')
        }
        dispatch(
          showNotification({
            status: 'success',
            title: 'Success',
            message: 'Request succeeded',
          })
        )
      }
      sendData()
        .then(() => {
          notificationTimer = setTimeout(() => {
            dispatch(showNotification(null))
          }, 3000)
        })
        .catch(() => {
          dispatch(
            showNotification({
              status: 'error',
              title: 'Error',
              message: 'Something went wrong!',
            })
          )
        })
    }, 1000)

    return () => {
      clearTimeout(timer)
      clearTimeout(notificationTimer)
    }
  }, [cartState, dispatch])
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
