import React from "react";
import { useState } from "react";
import myAxios from "../../components/axios/axios";
import { toast } from "react-hot-toast";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import './signup.css';
import SignupLayout from "../../components/utils/SignUpLayout";
import { useNavigate } from "react-router-dom";

const SignUpUser = ({}) => {
    const navigate = useNavigate();
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
            toast.success("User registered successfully!");
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
            <TextField  required value={password} onChange={handleChange('password')} label="Parola" margin='normal' sx={{width: '100%'}} type='password'
              InputLabelProps={{style: { color: '#8E8E8E' }}}/>
            <Button onClick={handleSubmit} variant='contained' className="signup-button">Înregistrează-te</Button>
          </Stack>
        </SignupLayout>
    );
}

export default SignUpUser;