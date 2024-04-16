import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const SignUpService = ({navigate}) => {
    const [values, setValues] = useState({
        role: 2,
        name: '',
        email: '',
        password: ''
      });
    
      const {name, email, password, role} = values;
    
      const handleChange = val => event => {
        // console.log(event.target.value);
        setValues({...values, [val]: event.target.value});
      }
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const signService = await axios.post('/api/service/signup', {
            name,
            email,
            password,
            role
          });
    
          console.log(signService);
    
          if (signService.status === 201) {
            // window.location.href = '/signin';
            setValues({name: '', email: '', password: '', role: 2});
            toast.success("Service registered successfully!");
            navigate('/service/signin');
          }
        } catch (error) {
          toast.error(error.response.data.error);
        }
      }

    
    return (
        <Container>
            <Box sx={{display:'flex', flexDirection: 'column', alignItems:'center' }}>
            <Typography sx={{margin: '2%'}} variant='h5'>Sign Up</Typography>
            <TextField value={name} onChange={handleChange('name')} label="Name" margin='normal' sx={{width: '50%'}} type='text'/>
                <TextField value={email} onChange={handleChange('email')} label="Email" margin='normal' sx={{width: '50%'}} type='text'/>
                <TextField value={password} onChange={handleChange('password')} label="Password" margin='normal' sx={{width: '50%'}} type='password'/>
                <Button onClick={handleSubmit} variant='contained' sx={{width: '10%', marginTop: '2%'}}>Register</Button>
            </Box>
        </Container>
    );
}

export default SignUpService;