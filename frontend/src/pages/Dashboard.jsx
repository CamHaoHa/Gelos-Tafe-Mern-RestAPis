import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import ProductForm from '../components/ProductForm'
import Spinner from '../components/Spinner'
import {getProducts, reset} from '../features/product/productSlice'
import ProductItem from '../components/ProductItem'

function Dashboard() {
 const navigate = useNavigate()
 const dispatch = useDispatch()

 const {user} = useSelector((state) => state.auth)

const { products, isLoading, isError, message } = useSelector(
  (state) => state.products
)
 useEffect(() => {

  if(isError) {
    console.error(message)
  }

  if(!user) {
    navigate('/login')
  }

  dispatch(getProducts())

  return () => {
    dispatch(reset())
  }
 }, [user, navigate, isError, message, dispatch])

 console.log(user)

if(isLoading) {
  return <Spinner/>
}

return (
<>
  <section className="heading">
    <h1>Welcome {user && user.Username}</h1>
    <p>Products Dashboard</p>
  </section>

  <ProductForm />

  <section className='content'>
        
      </section>
</>
)
}
export default Dashboard