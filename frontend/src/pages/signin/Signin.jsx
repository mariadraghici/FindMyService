import {React, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast';
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import myAxios from '../../components/axios/axios'
import {useContext} from 'react'
import ProfileContext from '../../components/context/ProfileContext'
import signinImage from '../../img/signin_photo.png'
import './signin.css'
import { Card, CardContent, Icon, Stack } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { getProfile } from '../../api/profileApi';
import CardLayout from '../../components/utils/CardLayout';

const Signin = () => {
  const navigate = useNavigate();
  const {setUser} = useContext(ProfileContext);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const {email, password} = values;

  const handleChange = val => event => {
    setValues({...values, [val]: event.target.value});
  }

  // const getProfile = async() => {
  //   try {
  //     const res = await myAxios.get('/api/profile');
  //     if (res.status === 200) {
  //       setUser(res.data.user);
  //     }
  //   } catch (error) {
  //     // toast.error(error.response.data.error);
  //   }
  // }

  const fetchProfile = async () => {
    const user = await getProfile();
      if (user) {
          setUser(user);
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
        // getProfile();
        fetchProfile();
        navigate('/', {replace: true});
      }
    } catch (error) {
      toast.error("Invalid email or password!");
    }
  }

  return (
      <Container maxWidth={false} sx={{padding: "0 !Important"}}>
        <Box sx={{display:'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <img src={signinImage} alt="signin_img" className="img-width-signin-photo" />
          
          <Stack direction='column' spacing={2} className='card-stack'>
            <CardLayout additionalClasses='card-signin'>
              <CardContent className='card-content'>
                <Stack direction='column' spacing={3} sx={{justifyContent: 'center', alignItems: 'center'}}>
                <AccountCircleIcon className='signin-icon'/>
                <Typography variant='h5' color='secondary' className='login-text'>Logare</Typography>
                <TextField value={email}
                onChange={handleChange('email')}
                label="Email"
                InputLabelProps={
                  {style: {color: 'black'}}
                }
                type='text'
                InputProps={{
                  style: { color:'black' }
                }}
                sx={{ width: '100%'}}
                className='outlinedInput'
                />
                <FormControl variant="outlined" sx={{width: '100%'}}>
                  <InputLabel htmlFor="outlined-adornment-password"
                  style={{color: 'black'}}
                  >
                  Password
                  </InputLabel>
                  
                  <OutlinedInput
                    value={password} onChange={handleChange('password')}
                    id="outlined-adornment-password"
                    inputProps={{
                      style: { color: 'black' }
                    }}

                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                <Button onClick={handleSubmit} variant='contained'>Loghează-te</Button>
                </Stack>
              </CardContent>
            </CardLayout>
          </Stack>
        </Box>
      </Container>
  )
}

export default Signin
