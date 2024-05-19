import {React, useState, useEffect, useContext} from 'react';
import myAxios from '../../components/axios/axios';
import ServiceCard from '../../components/service/ServiceCard';
import Container from '@mui/material/Container';
import {Link} from 'react-router-dom';
import { Autocomplete, Card, Divider, FormControlLabel, Grid, Stack, TextField } from '@mui/material';
import ProfileContext from '../../components/context/ProfileContext'
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import Chip from '@mui/material/Chip';

const SearchService = () => {
    const [services, setServices] = useState([]);
    const {user} = useContext(ProfileContext);
    const [cars, setCars] = useState([]);
    const [selectedCars, setSelectedCars] = useState({});
    const [locations, setLocations] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [facilities, setFacilities] = useState([]);
    const [selectedFacilities, setSelectedFacilities] = useState([]);
    const [brands, setBrands] = useState({});
    const [disableBrand, setDisableBrand] = useState(false);
    const [disableModel, setDisableModel] = useState(true);
    const [disableEngine, setDisableEngine] = useState(true);
    const [models, setModels] = useState({});
    const [engines, setEngines] = useState([]);

    const [formData, setFormData] = useState({
        brand: "",
        model: "",
        engine: "",
    });

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

    const handleChange = val => event => {
        setFormData({...formData, [val]: event.target.value});
    }

    const allServices = async () => {
        try {
            const res = await myAxios.get('/api/service/all');
            setServices(res.data.services);
        } catch (error) {
            console.log(error);
        }
    }

    const allLocations = async () => {
        try {
            const res = await myAxios.get('/api/location/all');
            setLocations(res.data.locations);
        } catch (error) {
            console.log(error);
        }
    }

    const allFacilities = async () => {
        try {
            const res = await myAxios.get('/api/facility/all');
            setFacilities(res.data.facilities);
        } catch (error) {
            console.log(error);
        }
    }

    const handleFiltre = async () => {
        try {
            let res = null;
            if (Object.values(selectedCars).every(value => value === false) && selectedLocations.length === 0 && selectedFacilities.length === 0) {
                return allServices();
            }

            if (Object.values(selectedCars).every(value => value === false)) {
                if (selectedLocations.length === 0 && selectedFacilities.length !== 0) {
                    res = await myAxios.post('/api/service/filter/facility', {
                        facilities: selectedFacilities?.map(facility => facility._id),
                    });
                } else if (selectedLocations.length !== 0 && selectedFacilities.length === 0) {
                    res = await myAxios.post('/api/service/filter/location', {
                        locations: selectedLocations?.map(location => location._id)
                    });
                } else {
                    res = await myAxios.post('/api/service/filter/locationfacility', {
                        locations: selectedLocations?.map(location => location._id),
                        facilities: selectedFacilities?.map(facility => facility._id)
                    });
                }
            }

            if (Object.values(selectedCars).every(value => value === false) === false) {
                if (selectedLocations.length === 0 && selectedFacilities.length !== 0) {
                    res = await myAxios.post('/api/service/filter/facilitycars', {
                        facilities: selectedFacilities?.map(facility => facility._id),
                        cars: Object.keys(selectedCars).filter(car => selectedCars[car])
                    });
                } else if (selectedLocations.length !== 0 && selectedFacilities.length === 0) {
                    res = await myAxios.post('/api/service/filter/locationcars', {
                        locations: selectedLocations?.map(location => location._id),
                        cars: Object.keys(selectedCars).filter(car => selectedCars[car])
                    });
                } else if (selectedLocations.length === 0 && selectedFacilities.length === 0) {
                    console.log('here');
                    console.log(Object.keys(selectedCars).filter(car => selectedCars[car]));
                    res = await myAxios.post('/api/service/filter/cars', {
                        cars: Object.keys(selectedCars).filter(car => selectedCars[car])
                    });
                } else {
                    res = await myAxios.post('/api/service/filter', {
                        locations: selectedLocations?.map(location => location._id),
                        facilities: selectedFacilities?.map(facility => facility._id),
                        cars: Object.keys(selectedCars).filter(car => selectedCars[car])
                    });
                }
            }
                
            setServices(res.data.services);
            // console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    // useEffect(() => {
    //     console.log(services);
    // }, [services]);

    useEffect(() => {
        allServices();
        allLocations();
        allFacilities();
        getBrands();

        if (user) {
            try {
                const getCars = async () => {
                    const res = await myAxios.get('/api/mycars');
                    setCars(res.data.cars);
                    setSelectedCars(res.data.cars.reduce((acc, car) => {
                        acc[car._id] = false;
                        return acc;
                    }, {}))
                }
                getCars();
            } catch (error) {
                console.log(error);
            }
        }
    }, [user]);

    const handleCarChange = (event) => {
        setSelectedCars({...selectedCars, [event.target.value]: event.target.checked});
        setFormData({...formData, brand: "", model: "", engine: ""});

        if (Object.values(selectedCars).some(value => value === true)) {
            setDisableBrand(false);
            
        } else {
            setDisableBrand(true);
            setDisableModel(true);
            setDisableEngine(true);
        }
    }

    // useEffect(() => {
    //     console.log(brands);
    // }, [brands]);

    return (
        <Container>
            <Grid container spacing={2} sx={{marginTop: '5%'}}>
                <Grid item xs={3}  sx={{alignItems: 'center'}}>
                    <Stack spacing={2}>
                        <Card sx={{padding: '10%', borderRadius: '7px'}}>
                            <Stack spacing={2}>
                            <h5>Filtre</h5>
                            {user && cars.length > 0 && (
                                <>
                                    <h6>Selectează mașina:</h6>
                                    {cars.map(car => (
                                        <div key={car._id}>
                                            <FormControlLabel control={
                                            <Checkbox
                                                onChange={handleCarChange}
                                                checked={selectedCars[car._id]}
                                                value={car._id}
                                            />}
                                            label={car.name}
                                            />
                                        </div>
                                    ))}
                                </>
                            )}

                            <h6>SAU</h6>
                            <h6>Selectează marca:</h6>
                            <Autocomplete
                                size='small'
                                id="combo-box-brands"
                                options={Object.keys(brands)}
                                disabled={disableBrand}
                                renderInput={(params) => <TextField {...params} label="Selectați o marcă"/>}
                                value={formData.brand}
                                getOptionLabel={(option) => option || ""}
                                onChange={(event, newValue) => {

                                    if (newValue === "" || newValue === null) {
                                        setModels({});
                                        setEngines([]);
                                        setFormData({...formData, brand: "", model: "", engine: ""});
                                        setDisableModel(true);
                                        setDisableEngine(true);
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

                            <h6>Selectează modelul:</h6>
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

                            <h6>Selectează motorizarea:</h6>
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
                            <Divider sx={{ opacity: 1, margin: '8% 0% 8% 0%' }} />
                            <h6>Selectează județul:</h6>
                            <Autocomplete
                                multiple
                                id="locations-standard"
                                options={locations}
                                disableCloseOnSelect
                                getOptionLabel={(option) => option.name}
                                isOptionEqualToValue={(option, value) => option._id === value._id}
                                onChange={(event, value) => {
                                    setSelectedLocations(value);
                                }}
                                renderOption={(props, option, { selected }) => {
                                    const { key, ...rest } = props;

                                    return (<li key={option.name} {...rest}>
                                        <Checkbox
                                            checked={selected}
                                        />
                                        {option.name}
                                    </li>);
                                }}
                                renderTags={(tagValue, getTagProps) =>
                                    tagValue.map((option, index) => {
                                        const { key, ...rest } = getTagProps({ index });
                                        return (
                                            <Chip
                                                label={option.name}
                                                {...rest}
                                                key={key}
                                            />
                                        );
                                    })
                                }
                                renderInput={(params) => (
                                    <TextField {...params} placeholder="Judet" />
                                )}
                            />

                            <Divider sx={{ opacity: 1, margin: '8% 0% 8% 0%' }} />
                            <h6>Selectează serviciile:</h6>
                            <Autocomplete
                                multiple
                                id="tags-standard"
                                limitTags={2}
                                options={facilities}
                                disableCloseOnSelect
                                getOptionLabel={(option) => option.name}
                                isOptionEqualToValue={(option, value) => option._id === value._id}
                                onChange={(event, value) => {
                                    setSelectedFacilities(value);
                                }}
                                renderOption={(props, option, { selected }) => {
                                    const { key, ...rest } = props;

                                    return (<li key={option.name} {...rest}>
                                        <Checkbox
                                            checked={selected}
                                        />
                                        {option.name}
                                    </li>);
                                }}
                                renderTags={(tagValue, getTagProps) =>
                                    tagValue.map((option, index) => {
                                        const { key, ...rest } = getTagProps({ index });
                                        return (
                                            <Chip
                                                label={option.name}
                                                {...rest}
                                                key={key}
                                            />
                                        );
                                    })
                                }
                                renderInput={(params) => (
                                    <TextField {...params} placeholder="Servicii" />
                                )}
                            />

                            <Button color="primary" sx={{margin: '3%'}} onClick={handleFiltre} >Cauta</Button>
                            </Stack>
                        </Card>
                    </Stack>
                </Grid>
                <Grid item xs={9}>
                    <Stack sx={{justifyContent: 'center'}} spacing={2}>
                    {services?.map(service => (
                        <div key={service._id}>
                            <Link to={`/service/page/${service.name}`}>
                            <ServiceCard service={service} />
                            </Link>
                        </div>
                    ))}
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    )
}

export default SearchService