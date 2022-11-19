import {useState, useEffect} from 'react'
import {FaUser} from 'react-icons/fa'
function Register() {
  const [formData, setFormData] = useState({
    username:'',
    password: '',
    password2: ''

  })

  const {username, password, password2} = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value,
    }))
  }

 const onSubmit = (e) => {
  e.preventDefault();
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
            name='username' 
            value={username} 
            placeholder="Username"
            onChange={onChange}/>
          </div>

          <div className='form-group'>
          <input 
            type="password" 
            className="form-control"
            id='password'
            name='password' 
            value={password} 
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