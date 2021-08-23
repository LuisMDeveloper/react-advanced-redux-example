import ProductItem from './ProductItem'
import classes from './Products.module.css'

const DUMMY_PRODUCTS = [
  {
    id: 'p1',
    title: 'My First Book',
    price: 7,
    description: 'This is a first book - amazing!',
  },
  {
    id: 'p2',
    title: 'My Second Book',
    price: 5,
    description: 'This is a second book - meh!',
  },
]

const Products = () => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => {
          return (
            <ProductItem
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              description={product.description}
            />
          )
        })}
      </ul>
    </section>
  )
}

export default Products
