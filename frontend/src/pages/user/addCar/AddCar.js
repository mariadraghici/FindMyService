import React, {useState, useEffect} from 'react'
import UserSidebar from '../../../components/user/UserSidebar';
import './addcar.css';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import myAxios from '../../../components/axios/axios';
import {toast} from 'react-toastify';
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { Divider } from '@mui/material';

const AddCar = () => {

    const [models, setModels] = useState({});
    const [brands, setBrands] = useState({});
    const [engines, setEngines] = useState([]);
    const [disableModel, setDisableModel] = useState(true);
    const [disableEngine, setDisableEngine] = useState(true);

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

  return (
        <Container>
            <Grid container spacing={2} sx={{marginTop: '3%'}}>
                <Grid item xs={3}>
                <UserSidebar/>
                </Grid>
                <Grid item xs={9}>
                    <Card sx={{padding: '3%', borderRadius: '7px'}}>
                    <h4>Adaugă o mașină nouă</h4>
                    <Divider sx={{opacity: 1}}/>
                    <Grid container direction="column" spacing={2} sx={{marginTop: '2%'}}>
                        <Grid item>
                            <TextField size='small' onChange={handleChange("name")} type="text" name="name"
                            value={name} required fullWidth label='Nume (ex: Buburuza roșie)'/>
                        </Grid>
                        <Grid item>
                            <Autocomplete
                                size='small'
                                id="combo-box-brands"
                                options={Object.keys(brands)}
                                renderInput={(params) => <TextField {...params} label="Selectați o marcă"/>}
                                value={formData.brand}
                                getOptionLabel={(option) => option || ""}
                                onChange={(event, newValue) => {

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
                                    }}
                                isOptionEqualToValue={(option, value) => option === value || value === ""}
                            />
                        </Grid>
                        <Grid item>
                            <Autocomplete
                            size='small'
                            id="combo-box-models"
                            options={Object.keys(models)}
                            value={formData.model}
                            disabled={disableModel}
                            renderInput={(params) => <TextField {...params} label="Selectați un model"/>}
                            onChange={(event, newValue) => {
                                console.log(newValue);
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
                            }}
                            isOptionEqualToValue={(option, value) => option.name === value.name || option.name === ""}
                            />
                        </Grid>
                        <Grid item>
                            <Autocomplete
                            size='small'
                            id="combo-box-engines"
                            options={engines}
                            disabled={disableEngine}
                            renderInput={(params) => <TextField {...params} label="Selectați motorizarea"/>}
                            value={formData.engine}
                            onChange={(event, newValue) => {
                                setFormData({...formData, engine: newValue});
                            }}
                            isOptionEqualToValue={(option, value) => option === value || value === ""}
                            />
                        </Grid>
                        <Grid item>
                            <TextField size='small' onChange={handleChange("year")} type="text" name="year" value={year} fullWidth label="An fabricație"/>
                        </Grid>
                        <Grid item>
                            <TextField size='small' onChange={handleChange("km")} type="text" name="km" value={km} fullWidth label="Kilometraj"/>
                        </Grid>
                        <Grid item>
                            <Autocomplete
                            size='small'
                            value={formData.transmission}
                            id="combo-box-transmission"
                            options={["Manuală", "Automată"]}
                            renderInput={(params) => <TextField {...params} label="Selectați transmisia"/>}
                            isOptionEqualToValue={(option, value) => option === value || value === ""}
                            onChange={(event, newValue) => {
                                setFormData({...formData, transmission: newValue});
                            }}
                            />
                        </Grid>
                        <Grid item>
                            <Autocomplete
                            size='small'
                            id="combo-box-fuel"
                            options={["Benzină", "Motorină", "Electric", "Hibrid", "GPL", "Benzină + GPL", "Motorină + Electric", "Hibrid plug-in"]}
                            renderInput={(params) => <TextField {...params} label="Selectați combustibilul"/>}
                            isOptionEqualToValue={(option, value) => option === value || value === ""}
                            value={formData.fuel}
                            onChange={(event, newValue) => {
                                setFormData({...formData, fuel: newValue});
                            }}
                            />
                        </Grid>
                        <Grid item>
                            <Autocomplete
                            size='small'
                            value={formData.traction}
                            id="combo-box-traction"
                            options={["Tracțiune față (FWD)", "Tracțiune spate (RWD)", "Tracțiune pe toate roți (4WD)", "Tracțiune integrală (AWD)"]}
                            renderInput={(params) => <TextField {...params} label="Selectați tipul de tracțiune"/>}
                            isOptionEqualToValue={(option, value) => option === value || value === ""}
                            onChange={(event, newValue) => {
                                setFormData({...formData, traction: newValue});
                            }}
                            />
                        </Grid>
                        <Grid item>
                            <TextField size='medium' onChange={handleChange("description")} type="text" name="description" value={description} fullWidth label="Descriere"/>
                        </Grid>
                        <Grid item sx={{alignSelf: "center"}}>
                            <Button variant="contained" onClick={addCar}>Adaugă mașină</Button>
                        </Grid>
                    </Grid>
                    </Card>
                </Grid>

            </Grid>
        </Container>
  )
}

export default AddCar;
