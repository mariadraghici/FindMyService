import {React, useEffect, useRef, useState, useContext} from 'react'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import {toast} from 'react-toastify'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import myAxios from '../../components/axios'

const Signin = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
    console.log("Signin in");
    try {
      const signUser = await myAxios.post('api/signin', {
        email,
        password
      });

      console.log(signUser);
      
      if (signUser.status === 200) {
        const accessToken = signUser.data.accessToken;
        const role = signUser.data.role;

        console.log("role", role);
        

        // setAuth({email, password, accessToken, role});
        setValues({email: '', password: ''});
        toast.success("User logged in successfully!"); 
      
        navigate('/');
      } 
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.error);
    }
  }

  return (
      <Container>
        <Box sx={{display:'flex', flexDirection: 'column', alignItems:'center' }}>
          <Typography sx={{margin: '2%'}} variant='h5'>Sign In</Typography>
          <TextField value={email} onChange={handleChange('email')} label="Email" margin='normal' sx={{width: '50%'}} type='text'/>
          <TextField value={password} onChange={handleChange('password')} label="Password" margin='normal' sx={{width: '50%'}} type='password'/>
          <Button onClick={handleSubmit} variant='contained' sx={{width: '10%', marginTop: '2%'}}>Sign In</Button>
        </Box>
      </Container>
  )
}

export default Signin
