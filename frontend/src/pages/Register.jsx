import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {FaUser} from 'react-icons/fa'
import {register,reset} from '../features/auth/authSlice'
import Spinner  from '../components/Spinner'
function Register() {
  const [formData, setFormData] = useState({
    Username:'',
    Password: '',
    password2: ''

  })

  const {Username, Password, password2} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if(isError) {
      toast.error(message)
    }
    if(isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value,
    }))
  }

 const onSubmit = (e) => {
  e.preventDefault();

  if(Password !== password2) {
    toast.error(`passwords do not match `);
  } else {
    const userData = {
      Username, 
      Password,
    }
    dispatch(register(userData))
  }
 }
 if(isLoading) {
  return <Spinner />
 }
  return (
    <>
      <section className='heading'>
      <h1>
        <FaUser /> Register
      </h1>
        <p> Fill all fields to create an account</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
          <input 
            type="text" 
            className="form-control"
            id='username'
            name='Username' 
            value={Username} 
            placeholder="Username"
            onChange={onChange}/>
          </div>

          <div className='form-group'>
          <input 
            type="password" 
            className="form-control"
            id='password'
            name='Password' 
            value={Password} 
            placeholder="Password"
            onChange={onChange}/>
          </div>

          <div className='form-group'>
          <input 
            type="password" 
            className="form-control"
            id='password2'
            name='password2' 
            value={password2} 
            placeholder=" Confirm Password"
            onChange={onChange}/>
          </div>

          <div className="form-group">
            <button type="submit" className='btn btn-block'> Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register