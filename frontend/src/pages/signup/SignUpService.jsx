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
import StyledPopper from "../../components/utils/StyledPopper";
import './signup.css';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import Card from '@mui/material/Card';

const SignUpService = () => {
      const [showPassword, setShowPassword] = React.useState(false);
      const [chooseLocation, setChooseLocation] = useState(false);
      const navigate = useNavigate();
      const [lat, setLat] = useState(0);
      const [lng, setLng] = useState(0);
      const handleClickShowPassword = () => setShowPassword((show) => !show);
      const [cityChosen, setCityChosen] = useState(false);
      const [anchorEl, setAnchorEl] = useState(null);
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
          console.log(cities.data.cities);
          setCities(cities.data.cities);
        } catch (error) {
          toast.error(error.response.data.error);
        }
      }

      useEffect(() => {
        getcities();
      }, []);
    
      const handleChange = val => event => {
        // console.log(event.target.value);
        setValues({...values, [val]: event.target.value});
      }
    
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
          console.log(error);
        }
      }

      const handleChooseLocationClick = (event) => {
        setChooseLocation(true);
      }

      const open = Boolean(anchorEl);
      const id = open ? 'simple-popup' : undefined;
    
    return (
        <SignupLayout>
            <Stack direction='column' spacing={5} sx={{alignItems: 'center', marginTop: '6%'}}>
              <Typography sx={{margin: '2%'}} color='text.primary' variant='h5'>Înregistrează-te ca Service</Typography>
              <TextField value={name} onChange={handleChange('name')} label="Nume" margin='normal' sx={{width: '50%'}} type='text'
              color='primary' InputLabelProps={{style: { color: '#8E8E8E' },}}/>
              <TextField required value={email} onChange={handleChange('email')} label="Email" margin='normal' sx={{width: '50%'}} type='text'
              color='primary' InputLabelProps={{style: { color: '#8E8E8E' },}}
              />
                  {/* <TextField required value={password} onChange={handleChange('password')} label="Parola" margin='normal' sx={{width: '50%'}} type='password'/> */}
                  <FormControl variant="outlined" sx={{width: '50%'}}>
                  <InputLabel htmlFor="outlined-adornment-password" sx={{color: 'placeholder.primary'}}>Password</InputLabel>
                  
                  <OutlinedInput
                    value={password} onChange={handleChange('password')}
                    id="outlined-adornment-password"
                    inputProps={{
                      style: { color: 'white' }
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
                  <TextField required value={phone} onChange={handleChange('phone')} label="Numar de telefon" margin='normal' sx={{width: '50%'}} type='text'
                  color='primary' InputLabelProps={{style: { color: '#8E8E8E' },}} />
                  <Autocomplete
                              sx={{width: '50%', marginTop: '2%'}}
                              id="combo-box-fuel"
                              options={cities.map((option) => option.name)}
                              renderInput={(params) => <TextField {...params} label="Selectați judetul" color='primary' InputLabelProps={{style: { color: '#8E8E8E' },}}/>}
                              isOptionEqualToValue={(option, value) => option === value || value === ""}
                              value={city}
                              onChange={(event, newValue) => {
                                  setValues({...values, city: newValue});
                                  setLat(cities.find(loc => loc.name === newValue).lat);
                                  setLng(cities.find(loc => loc.name === newValue).lng);
                                  setCityChosen(true);
                              }}
                              PopperComponent={StyledPopper}
                              />
                  {chooseLocation === false &&
                  <Button
                  onClick={handleChooseLocationClick}
                  variant='contained'
                  sx={{width: '50%', marginTop: '2%'}}
                  disabled={!cityChosen}>
                    Alegeți locația pe hartă
                    </Button>}
                  {chooseLocation && <LocationChooseOnMap setChooseLocation={setChooseLocation}
                  lng={lng}
                  setLat={setLat}
                  setLng={setLng}
                  lat={lat}
                  values={values}
                  setValues={setValues}
                  address={address}
                  handleChange={handleChange}/> }
                  <Button onClick={handleSubmit} variant='contained' className="signup-service-button">Înregistrează-te</Button>
            </Stack>
        </SignupLayout>
    );
}

export default SignUpService;