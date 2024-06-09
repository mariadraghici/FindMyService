import React, { useEffect, useContext } from "react";
import { useState } from "react";
import myAxios from "../../components/axios/axios";
import { toast } from "react-hot-toast";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import { IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LocationChooseOnMap from "../../components/service/LocationChooseOnMap";
import { useNavigate } from "react-router-dom";
import ProfileContext from "../../components/context/ProfileContext";
import SignupLayout from "../../components/utils/SignUpLayout";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";
import StyledPopperWhite from "../../components/utils/StyledPopperWhite";
import './signup.css';
import FormHelperText from "@mui/material/FormHelperText";

const SignUpService = () => {
      const [showPassword, setShowPassword] = React.useState(false);
      const [chooseLocation, setChooseLocation] = useState(false);
      const navigate = useNavigate();
      const [lat, setLat] = useState(0);
      const [lng, setLng] = useState(0);
      const handleClickShowPassword = () => setShowPassword((show) => !show);
      const [allFieldsCompleted, setAllFieldsCompleted] = useState(false);
      const [anchorEl, setAnchorEl] = useState(null);
      const [firstPage, setFirstPage] = useState(true);
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

      const [values, setValues] = useState({
          role: 2,
          name: '',
          email: '',
          password: '',
          address: '',
          phone: '',
          city: null
        });
      const [cities, setCities] = useState([]);
    
      const {name, email, password, role, address, city, phone } = values;

      const getcities = async () => {
        try {
          const cities = await myAxios.get('/api/city/all');
          setCities(cities.data.cities);
        } catch (error) {
          toast.error(error.response.data.error);
        }
      }

      useEffect(() => {
        getcities();
        // set values address to ''
      }, []);
      
    
      const handleChange = val => event => {
        setValues({...values, [val]: event.target.value});
      }

      useEffect(() => {
        if (name && email && password && phone && city) {
          setAllFieldsCompleted(true);
        } else {
          setAllFieldsCompleted(false);
        }
      }, [name, email, password, address, phone, city]);
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !password || !address || !phone || !city) {
          toast.error("All fields are required!");
          return;
        }

        try {
          const signService = await myAxios.post('/api/signup', {
            name,
            email,
            password,
            role,
            address,
            lat,
            lng,
            phone,
            city: cities.find(loc => loc.name === city)._id
          });
    
    
          if (signService.status === 201) {
            setValues({name: '', email: '', password: '', role: 2, address: '', phone: '', city: null});
            toast.success("Service registered successfully!");
            navigate('/signin');
          }
        } catch (error) {
          toast.error(error.response.data.error);
        }
      }

      const handleNextStepClick = (event) => {
        setFirstPage(false);
      }

      const open = Boolean(anchorEl);
    
    return (
        <SignupLayout>
            <Stack direction='column' spacing={5} sx={{alignItems: 'center', marginTop: '6%'}}>
              {firstPage && <>
              <Typography sx={{margin: '2%', textAlign: 'center'}} variant='h5'>Înregistrează-te ca Service</Typography>
              <TextField required value={name} onChange={handleChange('name')} label="Nume" margin='normal' sx={{width: '100%'}} type='text'
              color='primary' InputLabelProps={{style: { color: '#8E8E8E' },}}
              InputProps={{
                style: { color: 'black' }
              }}/>
              <TextField required value={email} onChange={handleChange('email')} label="Email" margin='normal' sx={{width: '100%'}} type='text'
              color='primary' InputLabelProps={{style: { color: '#8E8E8E' },}}
              InputProps={{
                style: { color: 'black' }
              }}
              />
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
                   <FormHelperText sx={{margin: '0'}}>
                    Parola trebuie să conțină cel puțin o literă mare, o cifră și un caracter special (?,!,#,..)</FormHelperText>
                </FormControl>
                  <TextField required value={phone} onChange={handleChange('phone')} label="Numar de telefon" margin='normal' sx={{width: '100%'}} type='text'
                  color='primary' InputLabelProps={{style: { color: '#8E8E8E' }}}
                  InputProps={{
                    style: { color: 'black' }
                  }}
                  />
                  <Autocomplete
                              sx={{width: '100%', marginTop: '2%'}}
                              id="combo-box-fuel"
                              options={cities.map((option) => option.name)}
                              renderInput={(params) => <TextField required {...params} label="Selectați judetul"
                               color='primary' InputLabelProps={{style: { color: '#8E8E8E' }}}
                               InputProps={{
                                ...params.InputProps,
                                sx: {
                                  '& .MuiAutocomplete-input': {
                                    color: 'black', // Change text color to black
                                  },
                                },
                              }}
                               />}
                              isOptionEqualToValue={(option, value) => option === value || value === ""}
                              value={city}
                              onChange={(event, newValue) => {
                                  setValues({...values, city: newValue});
                                  setLat(cities.find(loc => loc.name === newValue).lat);
                                  setLng(cities.find(loc => loc.name === newValue).lng);
                              }}
                              PopperComponent={StyledPopperWhite}
                              />
                  <Button
                  onClick={handleNextStepClick}
                  variant='contained'
                  sx={{width: '50%', marginTop: '2%'}}
                  disabled={!allFieldsCompleted}>
                    pasul urmator
                    </Button>
                  </>}
                  {firstPage === false && <LocationChooseOnMap setChooseLocation={setChooseLocation}
                  lng={lng}
                  setLat={setLat}
                  setLng={setLng}
                  lat={lat}
                  values={values}
                  setValues={setValues}
                  address={address}
                  handleChange={handleChange}/> }
                  {firstPage === false && <Stack direction='row' spacing={2} sx={{alignItems: 'center'}}>
                  <Button onClick={() => {setFirstPage(true); setValues({...values, address: ''})}} variant='contained' sx={{backgroundColor: '#565656'}}>Pasul anterior</Button>
                  <Button onClick={handleSubmit} variant='contained'>Înregistrează-te</Button>
                  </Stack>}
            </Stack>
        </SignupLayout>
    );
}

export default SignUpService;