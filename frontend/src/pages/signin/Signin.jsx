import {React, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import myAxios from '../../axios/axios'
import {useContext} from 'react'
import ProfileContext from '../../context/ProfileContext'
import signinImage from '/img/signin_photo.png'
import './signin.css'
import { Stack } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { getProfile } from '../../api/profileApi';
import FormWithBgImage from '../../components/utils/FormWithBgImageLayout';


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

  const fetchProfile = async () => {
    const user = await getProfile();
      if (user) {
          setUser(user);
      }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const signUser = await myAxios.post('/api/signin', {
        email,
        password
      });
      
      if (signUser.status === 200) {
        setValues({email: '', password: ''});
        toast.success('Logare cu succes!');
        fetchProfile();
        navigate('/', {replace: true});
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }

  return (
      <FormWithBgImage bgImage={signinImage} alt='signin'>
                <AccountCircleIcon className='signin-icon'/>
                <Typography variant='h5' color='secondary' className='login-text'>Logare</Typography>
                <TextField value={email} onChange={handleChange('email')} label="Email" InputLabelProps={{style: {color: 'black'}}} type='text' InputProps={{style: { color:'black' }}} sx={{ width: '100%'}} className='outlinedInput'/>
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
                <Stack direction='row'spacing={2} sx={{width: '100%', justifyContent: 'space-between', marginBottom: '5% !important'}}>
                  <Typography variant='body2' color='secondary' sx={{cursor: 'pointer', textDecoration: 'underline'}} onClick={() => navigate('/signup')} mt={0}>
                    Nu ai cont? <br/> Înregistrează-te</Typography>
                  <Typography variant='body2' color='secondary' sx={{cursor: 'pointer', textDecoration: 'underline'}} onClick={() => navigate('/forgotpassword')}>Ai uitat parola?</Typography>
                </Stack>
                <Button onClick={handleSubmit} variant='contained'>Loghează-te</Button>
      </FormWithBgImage>
  )
}

export default Signin
