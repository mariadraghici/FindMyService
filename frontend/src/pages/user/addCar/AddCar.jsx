import React, {useState, useEffect} from 'react'
import './addcar.css';
import toast from 'react-hot-toast';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import AddCarAutocomplete from '../../../components/utils/MyAutocomplete';
import ProfileLayout from '../../../components/user/profile/ProfileLayout';
import MyTextField from '../../../components/utils/MyTextField';
import useMediaQuery from '@mui/material/useMediaQuery';
import { getAllBrands } from '../../../api/brandApi';
import {addCarApi} from '../../../api/carApi';

const AddCar = () => {
    const [models, setModels] = useState({});
    const [brands, setBrands] = useState({});
    const [engines, setEngines] = useState([]);
    const [disableModel, setDisableModel] = useState(true);
    const [disableEngine, setDisableEngine] = useState(true);
    const isSmallScreen = useMediaQuery('(max-width:899px)');

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

    const getBrands = async () => {
        try {
            const res = await getAllBrands();
            setBrands(res.reduce((acc, brand) => {
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
        await addCarApi(formData, setFormData, brands, models);
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
        <ProfileLayout withCard={true}>
            <Grid container direction="column" spacing={2} sx={{marginTop: '2%'}}>
            <Grid item sx={{alignSelf: "center"}}>
            {isSmallScreen && <Typography fontWeight="bold" variant='h6' color='primary'>Adăugare mașină</Typography>}
            </Grid>
                <Grid item>
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
                    <MyTextField label='An fabricație' name='year' value={year} type='number' changeFunction={handleChange('year')} variant='outlined'/>
                </Grid>
                <Grid item>
                    <MyTextField label='Kilometraj' name='km' value={km} type='number' changeFunction={handleChange('km')} variant='outlined'/>
                </Grid>
                <Grid item>
                    <AddCarAutocomplete options={["Manuală", "Automată", "Semi-automată"]} label="Selectați tipul de transmisie" value={transmission} onChange={handleTransmissionChange} disabled={false}/>
                </Grid>
                <Grid item>
                    <AddCarAutocomplete options={["Benzină", "Motorină", "Electric", "Hibrid"]} label="Selectați tipul de combustibil" value={fuel} onChange={handleFuelChange} disabled={false}/>
                </Grid>
                <Grid item>
                    <AddCarAutocomplete options={["Față", "Spate", "Integral", "4 roți"]} label="Selectați tipul de tracțiune" value={traction} onChange={handleTractionChange} disabled={false}/>
                </Grid>
                <Grid item>
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
