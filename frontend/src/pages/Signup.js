import React, {useState} from 'react'
import './signup.css'
import axios from 'axios'
import {toast} from 'react-toastify'
import Header from '../components/Header'
import Footer from '../components/Footer'


const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  });

  const {name, email, password} = values;

  const handleChange = val => event => {
    // console.log(event.target.value);
    setValues({...values, [val]: event.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const signUser = await axios.post('/api/signup', {
        name,
        email,
        password
      });

      console.log(signUser);

      if (signUser.data.success === true) {
        // window.location.href = '/signin';
        setValues({name: '', email: '', password: ''});
        toast.success("User registered successfully!");
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }

  return (
    <div>
      <Header/>
      <div className="container">
        <div className="form">
          <form>
            <div className="input-container">
              <label>Username </label>
              <input onChange={handleChange("name")} type="text" name="uname" required value={name} />
            </div>
            <div className="input-container">
              <label>Email </label>
              <input onChange={handleChange("email")} type="text" name="email" value={email} required />
            </div>
            <div className="input-container">
              <label>Password </label>
              <input onChange={handleChange("password")} type="password" name="pass" value={password} required />
            </div>
            <div className="button-container">
              <button onClick={handleSubmit} type="submit">Register</button>
            </div>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Signup
