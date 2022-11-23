import { useDispatch } from 'react-redux'
import { deleteProduct } from '../features/product/productSlice'


function ProductItem({product}) {

    const dispatch = useDispatch()
    return (
    <div className="product">
        <div>
            {new Date(product.createdAt).toLocaleString('aus')}
        </div>
        <p>Product Code:{product.ProductCode}</p>
        <p>Product Name: {product.ProductName}</p>
        <p>Product Quantity: {product.ProductQuantity}</p>
        <p>Product Price: {product.Product_price}</p>
        <button onClick={() => dispatch(deleteProduct(product._id))} className='close'>
        X
      </button>
    </div>
  )
}

export default ProductItem