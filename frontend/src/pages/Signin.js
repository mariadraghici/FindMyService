import {React, useState} from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import axios from 'axios'
import {toast} from 'react-toastify'

const Signin = ({navigate}) => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const {email, password} = values;

  const handleChange = val => event => {
    // console.log(event.target.value);
    setValues({...values, [val]: event.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const signUser = await axios.post('/api/signin', {
        email,
        password
      });

      if (signUser.data.success === true) {
        setValues({email: '', password: ''});
        toast.success("User logged in successfully!"); 
      
        navigate('/dashboard');
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('jwt', JSON.stringify(signUser.data));
        }
      } 
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }

  return (
    <div>
      <Header/>
      <div className='container'>
        <div className="form">
          <form>
            <div className="input-container">
              <label>Email </label>
              <input onChange={handleChange("email")} type="text" name="email" value={email} required />
            </div>
            <div className="input-container">
              <label>Password </label>
              <input onChange={handleChange("password")} type="password" name="pass" value={password} required />
            </div>
            <div className="button-container">
              <button onClick={handleSubmit} type="submit">Log in</button>
            </div>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Signin
