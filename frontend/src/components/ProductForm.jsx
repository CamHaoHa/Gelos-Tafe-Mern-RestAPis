import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {createProduct} from '../features/product/productSlice'
function ProductForm() {
    
    

    const [formData, setFormData] = useState({
        ProductCode:'',
        ProductName: '',
        ProductQuantity: '',
        Product_price:''
      })
    
    const {ProductCode, ProductName, ProductQuantity, Product_price} = formData


    const dispatch = useDispatch()

    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name] : e.target.value,
        }))
      }

    const onSubmit = (e) => {
        e.preventDefault()
        const productData = {ProductCode, ProductName, ProductQuantity,Product_price}
        dispatch(createProduct(productData))
        
      
    }
    
  return (
    <section className='form'>
        <form onSubmit={onSubmit}>
            <div className='form-group'>
                <label htmlFor="ProductCode">Product Code</label>
                <input type="number" 
                        name='ProductCode' 
                        id='ProductCode' 
                        value={ProductCode} 
                        onChange={onChange} />

                <label htmlFor="ProductName">Product Name</label>
                <input type="text" 
                        name='ProductName' 
                        id='ProductName' 
                        value={ProductName} 
                        onChange={onChange} />

                <label htmlFor="ProductQuantity">Product Quantity</label>
                <input type="number" 
                        name='ProductQuantity' 
                        id='ProductNQuantity'
                        value={ProductQuantity} 
                        onChange={onChange} />

                <label htmlFor="Product_price">Product Price</label>
                <input type="number" 
                        name='Product_price'
                        id='Product_price'
                        value={Product_price} 
                        onChange={onChange} />
                                                                    
            </div>
            <div className='form-group'>
                <button className="btn btn-block" type="submit"> Add Product</button>
                

            </div>

        </form>
    </section>
  )
}

export default ProductForm