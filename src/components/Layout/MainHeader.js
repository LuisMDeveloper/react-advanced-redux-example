import CartButton from '../Cart/CartButton'
import classes from './MainHeader.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { toggleCartDetails } from '../../store/uiStore'

const MainHeader = () => {
  const dispatch = useDispatch()
  const numberOfCartItems = useSelector((state) => state.cart.numberOfCartItems)
  const cartButtonHandler = () => {
    dispatch(toggleCartDetails())
  }
  return (
    <header className={classes.header}>
      <h1>ReduxCart</h1>
      <nav>
        <ul>
          <li>
            <CartButton
              onClick={cartButtonHandler}
              numberOfCartItems={numberOfCartItems}
            />
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default MainHeader
