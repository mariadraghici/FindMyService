import React from "react";
import { useState } from "react";
import myAxios from "../../components/axios/axios";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


const SignUpUser = ({navigate}) => {

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
        <Container>
            <Box sx={{display:'flex', flexDirection: 'column', alignItems:'center' }}>
            <Typography sx={{margin: '2%'}} variant='h5'>Înregistrează-te ca User</Typography>
            <TextField value={name} onChange={handleChange('name')} label="Nume" margin='normal' sx={{width: '50%'}} type='text'/>
                <TextField value={email} onChange={handleChange('email')} label="Email" margin='normal' sx={{width: '50%'}} type='text'/>
                <TextField value={password} onChange={handleChange('password')} label="Parola" margin='normal' sx={{width: '50%'}} type='password'/>
                <Button onClick={handleSubmit} variant='contained' sx={{width: '15%', marginTop: '2%'}}>Înregistrează-te</Button>
            </Box>
        </Container>
    );
}

export default SignUpUser;