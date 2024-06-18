import React from "react";
import { useState } from "react";
import myAxios from "../../axios/axios";
import { toast } from "react-hot-toast";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import './signup.css';
import SignupLayout from "../../components/signup/SignUpLayout";
import { useNavigate } from "react-router-dom";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormHelperText from "@mui/material/FormHelperText";


const SignUpUser = ({}) => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        role: 0
      });
    
      const {name, email, password, role} = values;
    
      const handleChange = val => event => {
        setValues({...values, [val]: event.target.value});
      }
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const signUser = await myAxios.post('/api/signup', {
            name,
            email,
            password,
            role
          });
        
          if (signUser.status === 201) {
            setValues({name: '', email: '', password: '',  role: 0});
            toast.success("Contul a fost creat cu succes! Verifică-ți email-ul pentru a confirma contul.");
            navigate('/signin');
          }
        } catch (error) {
          toast.error(error.response.data.error);
        }
      }

    
    return (
        <SignupLayout>
          <Stack direction='column' spacing={5} sx={{alignItems: 'center'}}>
            <Typography color='secondary' sx={{textAlign: 'center'}}  variant='h5'>Înregistrează-te ca și Client</Typography>
            <TextField required value={name} onChange={handleChange('name')} label="Nume" margin='normal' sx={{width: '100%'}} type='text'
             InputLabelProps={{style: { color: '#8E8E8E' }}}/>
            <TextField required value={email} onChange={handleChange('email')} label="Email" margin='normal' sx={{width: '100%'}} type='text'
             InputLabelProps={{style: { color: '#8E8E8E' }}}/>
            <FormControl variant="outlined" sx={{width: '100%'}}>
                  <InputLabel required htmlFor="outlined-adornment-password" sx={{color: 'placeholder.primary'}}>Password</InputLabel>
                  
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
                   <FormHelperText sx={{margin: '0', color: 'black !important'}}>
                    Parola trebuie să conțină cel puțin o literă mare, o literă mica, o cifră și un caracter special (?,!,#,..)</FormHelperText>
                </FormControl>
            <Button onClick={handleSubmit} variant='contained' className="signup-button">Înregistrează-te</Button>
          </Stack>
        </SignupLayout>
    );
}

export default SignUpUser;