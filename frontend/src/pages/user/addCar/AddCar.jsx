import React, {useState, useEffect} from 'react'
import './addcar.css';
import TextField from '@mui/material/TextField';
import myAxios from '../../../components/axios/axios';
import toast from 'react-hot-toast';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Divider, Typography } from '@mui/material';
import { getProfile } from '../../../api/profileApi';
import { useContext } from 'react';
import ProfileContext from '../../../components/context/ProfileContext';
import { useNavigate } from 'react-router-dom';
import AddCarAutocomplete from '../../../components/utils/MyAutocomplete';
import ProfileLayout from '../../../components/utils/ProfileLayout';
import MyTextField from '../../../components/utils/MyTextField';
import useMediaQuery from '@mui/material/useMediaQuery';

const AddCar = () => {
    const [models, setModels] = useState({});
    const [brands, setBrands] = useState({});
    const [engines, setEngines] = useState([]);
    const [disableModel, setDisableModel] = useState(true);
    const [disableEngine, setDisableEngine] = useState(true);
    const {user, setUser} = useContext(ProfileContext);
    const navigate = useNavigate();
    const isSmallScreen = useMediaQuery('(max-width:899px)');
    console.log('am in addcar');

    const [formData, setFormData] = useState({
        name: "",
        brand: "",
        model: "",
        engine: "",
        year: "",
        km: "",
        transmission: "",
        fuel: "",
        traction: "",
        description: "",
    });

    const {name, brand, model, engine, year, km, transmission, fuel, traction, description} = formData;

    useEffect(() => {
        const fetchProfile = async () => {
          const user = await getProfile();
          if (user) {
            setUser(user);
          }
        }
    
        fetchProfile();
        if (!user) {
          navigate('/', {replace: true});
          return;
        }
      }, []);
  

    const getBrands = async () => {
        try {
            const res = await myAxios.get('/api/brand/all');
            setBrands(res.data.brands.reduce((acc, brand) => {
                acc[brand.name] = brand;
                return acc;
            }
            , {}));
            
        } catch (error) {
            toast.error(error.response.data.error);
        }
    }

    useEffect(() => {
        getBrands();
    }, []);

    const handleChange = val => event => {
        setFormData({...formData, [val]: event.target.value});
    }

    const addCar = async () => {
        try {
            const sendFormData = {...formData, brand: brands[brand]._id, model: models[model]._id,
            engine: engine,
            traction: traction, description: description,
            year: parseInt(year), km: parseInt(km), transmission: transmission,
            fuel: fuel, brandName: brand, modelName: model};

            const res = await myAxios.post('/api/car/add', sendFormData);

            if (res.data.success) {
                toast.success("Mașină adăugată cu succes!");
                setFormData({
                    name: "",
                    brand: "",
                    model: "",
                    engine: "",
                    year: "",
                    km: "",
                    transmission: "",
                    fuel: "",
                    traction: "",
                    description: "",
                });
            }
        } catch (error) {
            toast.error(error.response.data.error);
        }
    }

    const handleBrandChange = (event, newValue) => {
        if (newValue === "" || newValue === null) {
            setModels({});
            setEngines([]);
            setFormData({...formData, brand: "", model: "", engine: ""});
            setDisableModel(true);
            return;
        } else {
            setFormData({...formData, brand: newValue, model: "", engine: ""});
            setModels(brands[newValue].models.reduce((acc, brand) => {
                acc[brand.name] = brand;
                return acc;
                }, {}));
            setEngines([]);
            setDisableModel(false);
        }
    }

    const handleModelChange = (event, newValue) => {
        if (newValue === "" || newValue === null) {
            setFormData({...formData, model: "", engine: ""});
            setEngines([]);
            setDisableEngine(true);
            return;
        } else {
            setFormData({...formData, model: newValue, engine: ""});
            setEngines(models[newValue].engines);
            setDisableEngine(false);
        }
    }

    const handleEngineChange = (event, newValue) => {
        setFormData({...formData, engine: newValue});
    }

    const handleTransmissionChange = (event, newValue) => {
        setFormData({...formData, transmission: newValue});
    }

    const handleFuelChange = (event, newValue) => {
        setFormData({...formData, fuel: newValue});
    }

    const handleTractionChange = (event, newValue) => {
        setFormData({...formData, traction: newValue});
    }

    const handleNameChange = (event) => {
        setFormData({...formData, name: event.target.value});
    }

    return (
        <ProfileLayout>
            <Grid container direction="column" spacing={2} sx={{marginTop: '2%'}}>
            <Grid item sx={{alignSelf: "center"}}>
            {isSmallScreen && <Typography fontWeight="bold" variant='h6' color='primary'>Adăugare mașină</Typography>}
            </Grid>
                <Grid item>
                    {/* <TextField size='small' onChange={handleChange("name")} type="text" name="name"
                    value={name} required fullWidth label='Nume (ex: Buburuza roșie)'/> */}
                    <MyTextField label='Nume (ex: Buburuza roșie)' name='name' value={name} type='text' changeFunction={handleNameChange} variant='outlined'/>
                </Grid>
                <Grid item>
                    <AddCarAutocomplete options={Object.keys(brands)} label="Selectați o marcă" value={brand} onChange={handleBrandChange} disabled={false}/>
                </Grid>
                <Grid item>
                    <AddCarAutocomplete options={Object.keys(models)} label="Selectați un model" value={model} onChange={handleModelChange} disabled={disableModel}/>
                </Grid>                        <Grid item>
                    <AddCarAutocomplete options={engines} label="Selectați un motor" value={engine} onChange={handleEngineChange} disabled={disableEngine}/>
                </Grid>
                <Grid item>
                    {/* <TextField size='small' onChange={handleChange("year")} type="text" name="year" value={year} fullWidth label="An fabricație"/> */}
                    <MyTextField label='An fabricație' name='year' value={year} type='number' changeFunction={handleChange('year')} variant='outlined'/>
                </Grid>
                <Grid item>
                    {/* <TextField size='small' onChange={handleChange("km")} type="text" name="km" value={km} fullWidth label="Kilometraj"/> */}
                    <MyTextField label='Kilometraj' name='km' value={km} type='number' changeFunction={handleChange('km')} variant='outlined'/>
                </Grid>
                <Grid item>
                    <AddCarAutocomplete options={["Manuală", "Automată", "Semi-automată"]} label="Selectați tipul de transmisie" value={transmission} onChange={handleTransmissionChange} disabled={false}/>
                </Grid>
                <Grid item>
                    <AddCarAutocomplete options={["Benzină", "Motorină", "Electric", "Hibrid"]} label="Selectați tipul de combustibil" value={fuel} onChange={handleFuelChange} disabled={false}/>
                </Grid>
                <Grid item>
                    <AddCarAutocomplete options={["FWD", "RWD", "AWD"]} label="Selectați tipul de tracțiune" value={traction} onChange={handleTractionChange} disabled={false}/>
                </Grid>
                <Grid item>
                    {/* <TextField size='medium' onChange={handleChange("description")} type="text" name="description" value={description} fullWidth label="Descriere"/> */}
                    <MyTextField label='Descriere' name='description' value={description} type='text' changeFunction={handleChange('description')} variant='outlined'/>
                </Grid>
                <Grid item sx={{alignSelf: "center"}}>
                    <Button variant="contained" onClick={addCar}>Adaugă mașină</Button>
                </Grid>
            </Grid>
        </ProfileLayout>
  )
}

export default AddCar;
