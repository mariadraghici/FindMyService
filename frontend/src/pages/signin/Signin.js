import {React, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import myAxios from '../../components/axios/axios'
import {useContext} from 'react'
import ProfileContext from '../../components/context/ProfileContext'

const Signin = () => {
  const navigate = useNavigate();
  const {setUser} = useContext(ProfileContext);

  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const {email, password} = values;

  const handleChange = val => event => {
    // console.log(event.target.value);
    setValues({...values, [val]: event.target.value});
  }

  const getProfile = async() => {
    try {
      const res = await myAxios.get('/api/profile');
      if (res.status === 200) {
        setUser(res.data.user);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const signUser = await myAxios.post('api/signin', {
        email,
        password
      });
      
      if (signUser.status === 200) {
        setValues({email: '', password: ''});
        toast.success("User logged in successfully!");
        getProfile();
        navigate('/', {replace: true});
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }

  return (
      <Container>
        <Box sx={{display:'flex', flexDirection: 'column', alignItems:'center' }}>
          <Typography sx={{margin: '2%'}} variant='h5'>Logare</Typography>
          <TextField value={email} onChange={handleChange('email')} label="Email" margin='normal' sx={{width: '50%'}} type='text'/>
          <TextField value={password} onChange={handleChange('password')} label="Password" margin='normal' sx={{width: '50%'}} type='password'/>
          <Button onClick={handleSubmit} variant='contained' sx={{width: '15%', marginTop: '2%'}}>Loghează-te</Button>
        </Box>
      </Container>
  )
}

export default Signin
