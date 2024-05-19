import React, { useEffect } from "react";
import { useState } from "react";
import myAxios from "../../components/axios/axios";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";

const SignUpService = ({navigate}) => {
    const [values, setValues] = useState({
        role: 2,
        name: '',
        email: '',
        password: '',
        address: '',
        phone: '',
        location: null
      });
      const [locations, setLocations] = useState([]);
    
      const {name, email, password, role, address, location, phone } = values;

      const getLocations = async () => {
        try {
          const locations = await myAxios.get('/api/location/all');
          console.log(locations.data.locations);
          setLocations(locations.data.locations);
        } catch (error) {
          toast.error(error.response.data.error);
        }
      }

      useEffect(() => {
        getLocations();
      }, []);
    
      const handleChange = val => event => {
        // console.log(event.target.value);
        setValues({...values, [val]: event.target.value});
      }
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {

          const signService = await myAxios.post('/api/signup', {
            name,
            email,
            password,
            role,
            address,
            phone,
            location: locations.find(loc => loc.name === location)._id
          });
    
    
          if (signService.status === 201) {
            setValues({name: '', email: '', password: '', role: 2, address: '', phone: '', location: null});
            toast.success("Service registered successfully!");
            navigate('/signin');
          }
        } catch (error) {
          toast.error(error.response.data.error);
        }
      }

    
    return (
        <Container>
            <Box sx={{display:'flex', flexDirection: 'column', alignItems:'center' }}>
            <Typography sx={{margin: '2%'}} variant='h5'>Înregistrează-te ca Service</Typography>
            <TextField value={name} onChange={handleChange('name')} label="Nume" margin='normal' sx={{width: '50%'}} type='text'/>
                <TextField value={email} onChange={handleChange('email')} label="Email" margin='normal' sx={{width: '50%'}} type='text'/>
                <TextField value={password} onChange={handleChange('password')} label="Parola" margin='normal' sx={{width: '50%'}} type='password'/>
                <TextField value={address} onChange={handleChange('address')} label="Adresa" margin='normal' sx={{width: '50%'}} type='text'/>
                <TextField value={phone} onChange={handleChange('phone')} label="Numar de telefon" margin='normal' sx={{width: '50%'}} type='text'/>
                <Autocomplete
                            sx={{width: '50%', marginTop: '2%'}}
                            id="combo-box-fuel"
                            options={locations.map((option) => option.name)}
                            renderInput={(params) => <TextField {...params} label="Selectați judetul"/>}
                            isOptionEqualToValue={(option, value) => option === value || value === ""}
                            value={location}
                            onChange={(event, newValue) => {
                                setValues({...values, location: newValue});
                            }}
                            />
                <Button onClick={handleSubmit} variant='contained' sx={{width: '15%', marginTop: '2%'}}>Înregistrează-te</Button>
            </Box>
        </Container>
    );
}

export default SignUpService;