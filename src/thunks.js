import { showNotification } from './store/uiStore'
import { replaceCart } from './store/cartStore'

export const sendCartData = (cartState) => {
  return (dispatch) => {
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
          body: JSON.stringify({
            cartItems: cartState.cartItems,
            numberOfCartItems: cartState.numberOfCartItems,
          }),
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
    sendData().catch(() => {
      dispatch(
        showNotification({
          status: 'error',
          title: 'Error',
          message: 'Error sending cart',
        })
      )
    })
  }
}

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        'https://react-example-f7ba1-default-rtdb.firebaseio.com/cart.json'
      )

      if (!response.ok) {
        throw new Error('Something went wring!')
      }

      return await response.json()
    }

    try {
      const cart = await fetchData()
      dispatch(
        replaceCart({
          cartItems: cart.cartItems || [],
          numberOfCartItems: cart.numberOfCartItems,
        })
      )
    } catch (e) {
      dispatch(
        showNotification({
          status: 'error',
          title: 'Error',
          message: 'Error fetching cart',
        })
      )
    }
  }
}
