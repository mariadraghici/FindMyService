import {React, useState, useEffect, useContext} from 'react';
import myAxios from '../../components/axios/axios';
import ServiceCard from '../../components/service/ServiceCard';
import Container from '@mui/material/Container';
import {Link} from 'react-router-dom';
import { Autocomplete, Card, Divider, FormControlLabel, Grid, Stack, TextField, Typography } from '@mui/material';
import ProfileContext from '../../components/context/ProfileContext'
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { toast } from 'react-hot-toast';
import Chip from '@mui/material/Chip';
import { filter } from '../../api/filteringApi';
import { getAllServices } from '../../api/serviceApi';
import { getAllBrands } from '../../api/brandApi';
import { getAllFacilities } from '../../api/facilityApi';
import { getAllCities } from '../../api/cityApi';
import StyledPopper from '../../components/utils/StyledPopper';
import './searchService.css';
import useMediaQuery from '@mui/material/useMediaQuery';

const SearchService = () => {
    const [services, setServices] = useState([]);
    const {user} = useContext(ProfileContext);
    const [cars, setCars] = useState([]);
    const [selectedCars, setSelectedCars] = useState({});
    const [cities, setCities] = useState([]);
    const [selectedCities, setSelectedCities] = useState([]);
    const [facilities, setFacilities] = useState([]);
    const [selectedFacilities, setSelectedFacilities] = useState([]);
    const [brands, setBrands] = useState({});
    const [disableBrand, setDisableBrand] = useState(false);
    const [disableModel, setDisableModel] = useState(true);
    const [disableEngine, setDisableEngine] = useState(true);
    const [models, setModels] = useState({});
    const [engines, setEngines] = useState([]);
    const isSmallScreen = useMediaQuery('(max-width:1000px)');

    const [formData, setFormData] = useState({
        brand: "",
        model: "",
        engine: "",
    });

    const setAllBrands = async () => {
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
    const setAllServices = async () => {
        try {
            const services = await getAllServices();
            setServices(services);
        } catch (error) {
            console.error(error);
        }
    }

    const setAllCities = async () => {
        try {
            const res = await getAllCities();
            setCities(res);
        } catch (error) {
            console.log(error);
        }
    }

    const setAllFacilities = async () => {
        try {
            const res = await getAllFacilities();
            setFacilities(res);
        } catch (error) {
            console.log(error);
        }
    }

    const handleFiltre = async () => {
        try {
            const res = await filter(selectedCars, selectedFacilities, selectedCities, formData);
            setServices(res);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setAllServices();
        setAllCities();
        setAllFacilities();
        setAllBrands();

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

    return (
        <Container>
            <Grid container direction={isSmallScreen ? 'column' : 'row'} spacing={2} className='grid-container'>
                <Grid item xs={3} sx={{alignItems: 'center'}}>
                    <Stack spacing={2}>
                        <Card sx={{padding: '10%', borderRadius: '7px', backgroundColor: 'blacks.light'}}>
                            <Stack spacing={2}>
                            <Typography variant="h5" component="div">
                                Filtrează după:
                            </Typography>
                            {user && cars.length > 0 && (
                                <>
                                    <Typography variant="h6" component="div">
                                        Mașina ta
                                    </Typography>
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
                                    <Typography variant="h7" component="div">
                                        Sau
                                    </Typography>
                                </>
                            )}

                            <Typography variant="h6" component="div">
                                Selectează marca:
                            </Typography>
                            <Autocomplete
                                size='small'
                                id="combo-box-brands"
                                options={Object.keys(brands)}
                                disabled={disableBrand}
                                renderInput={(params) => <TextField {...params} label="Selectați o marcă" InputLabelProps={{
                                    style: { color: '#8E8E8E' },
                                  }}
                                  color='secondary'/>}
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
                                PopperComponent={StyledPopper}
                            />

                            <Typography variant="h6" component="div">
                                Selectează modelul:
                            </Typography>
                            <Autocomplete
                            PopperComponent={StyledPopper}
                            size='small'
                            id="combo-box-models"
                            options={Object.keys(models)}
                            value={formData.model}
                            disabled={disableModel}
                            renderInput={(params) => <TextField {...params} label="Selectați un model" InputLabelProps={{
                                style: { color: '#8E8E8E' },
                            }}/>}
                            onChange={(event, newValue) => {
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
                            <Typography variant="h6" component="div">
                                Selectează motorizarea:
                            </Typography>
                            <Autocomplete
                            size='small'
                            id="combo-box-engines"
                            PopperComponent={StyledPopper}
                            options={engines}
                            disabled={disableEngine}
                            renderInput={(params) => <TextField {...params} label="Selectați motorizarea" InputLabelProps={{
                                style: { color: '#8E8E8E' },
                            }}/>}
                            value={formData.engine}
                            onChange={(event, newValue) => {
                                setFormData({...formData, engine: newValue});
                            }}
                            isOptionEqualToValue={(option, value) => option === value || value === ""}
                            />
                            <Divider sx={{ opacity: 1, margin: '8% 0% 8% 0%' }} />
                            <Typography variant="h6" component="div">
                                Selectează județul:
                            </Typography>
                            <Autocomplete
                                multiple
                                size='small'
                                PopperComponent={StyledPopper}
                                id="cities-standard"
                                options={cities}
                                disableCloseOnSelect
                                getOptionLabel={(option) => option.name}
                                isOptionEqualToValue={(option, value) => option._id === value._id}
                                onChange={(event, value) => {
                                    setSelectedCities(value);
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
                            <Typography variant="h6" component="div">
                                Selectează serviciile:
                            </Typography>
                            <Autocomplete
                                size='small'
                                multiple
                                PopperComponent={StyledPopper}
                                id="tags-standard"
                                limitTags={1}
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