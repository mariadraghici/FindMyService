import {React, useState, useEffect, useContext} from 'react';
import myAxios from '../../components/axios/axios';
import ServiceCard from '../../components/service/ServiceCard';
import Container from '@mui/material/Container';
import {Link} from 'react-router-dom';
import { Card, Divider, FormControlLabel, Grid, Stack, Typography } from '@mui/material';
import ProfileContext from '../../components/context/ProfileContext'
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { toast } from 'react-hot-toast';
import { filter } from '../../api/filteringApi';
import { getAllServices } from '../../api/serviceApi';
import { getAllBrands } from '../../api/brandApi';
import { getAllFacilities } from '../../api/facilityApi';
import { getAllCities } from '../../api/cityApi';
import './searchService.css';
import useMediaQuery from '@mui/material/useMediaQuery';
import bgImage from '/img/search-img.png';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import MyAutocomplete from '../../components/utils/MyAutocomplete';
import MyAutocompleteWithCheckboxes from '../../components/utils/AutocompleteWithCheckboxes';

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
    const isSmallScreen = useMediaQuery('(max-width:899px)');
    const [page, setPage] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [filterButtonActivated, setFilterButtonActivated] = useState(false);

    const [formData, setFormData] = useState({
        brand: "",
        model: "",
        engine: "",
    });

    const handlePageChange = (event, value) => {
        setPage(value);
    };

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
            const res = await getAllServices();
            setServices(res);
            setPageNo(Math.ceil(services.length / 5));
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
            setFilterButtonActivated(false);
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

    const handleBrandChange = (event, newValue) => {
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

    const handleCityChange = (event, newValue) => {
        setSelectedCities(newValue);
    }

    const handleFacilityChange = (event, newValue) => {
        setSelectedFacilities(newValue);
    }


    return (
        <Container maxWidth={false} sx={{padding: "0 !Important"}}>
            <Box sx={{display:'flex', flexDirection: 'column', justifyContent: 'center' }}>
                 <img src={bgImage} alt="img-profile" className="img-style-search" />
            <Container>
            <Grid container direction='row' spacing={2} className='grid-container-search'>
                <Grid item xs={12} md={3} sx={{alignItems: 'center'}}>
                    {isSmallScreen && filterButtonActivated === false &&
                    <Button onClick={() => setFilterButtonActivated(true)} variant='contained' color='primary' sx={{width: '100%'}}>Filtre</Button>}
                    {(isSmallScreen && filterButtonActivated || !isSmallScreen) && <Stack spacing={2}>
                        <Card sx={{padding: '10%', borderRadius: '7px', backgroundColor: '#EEEEEE'}}>
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
                                            <Checkbox onChange={handleCarChange} checked={selectedCars[car._id]} value={car._id}
                                                sx={{
                                                    color: 'secondary.main',
                                                    '&.Mui-checked': {
                                                      color: 'primary.main',
                                                    },}}/>}
                                            label={car.name}
                                            />
                                        </div>
                                    ))}
                                    <Typography variant="h6" component="div">
                                        Sau
                                    </Typography>
                                </>
                            )}

                            <Typography variant="h6" component="div">
                                Selectează marca:
                            </Typography>
                            <MyAutocomplete options={Object.keys(brands)} label="Selectați o marcă" value={formData.brand} onChange={handleBrandChange} disabled={disableBrand}/>
                            <Typography variant="h6" component="div">
                                Selectează modelul:
                            </Typography>
                            <MyAutocomplete options={Object.keys(models)} label="Selectați un model" value={formData.model} onChange={handleModelChange} disabled={disableModel}/>
                            <Typography variant="h6" component="div">
                                Selectează motorizarea:
                            </Typography>
                            <MyAutocomplete options={engines} label="Selectați un motor" value={formData.engine} onChange={handleEngineChange} disabled={disableEngine}/>
                            <Divider sx={{ opacity: 1, margin: '8% 0% 8% 0%' }} />
                            <Typography variant="h6" component="div">
                                Selectează județul:
                            </Typography>
                            <MyAutocompleteWithCheckboxes options={cities} placeholder="Judet" onChange={handleCityChange}/>
                            <Divider sx={{ opacity: 1, margin: '8% 0% 8% 0%' }} />
                            <Typography variant="h6" component="div">
                                Selectează serviciile:
                            </Typography>
                            <MyAutocompleteWithCheckboxes options={facilities} placeholder="Servicii" onChange={handleFacilityChange}/>
                            <Button color="primary" variant='contained' sx={{margin: '3%'}} onClick={handleFiltre} >Cauta</Button>
                            </Stack>
                        </Card>
                    </Stack>}
                </Grid>
                <Grid item md={9} xs={12}>
                    <Stack sx={{justifyContent: 'center'}} spacing={2}>
                    {services?.slice((page - 1) * 5, (page - 1) * 5 + 5).map(service => (
                        <div key={service._id}>
                            <Link to={`/service/page/${service.name}`}>
                            <ServiceCard service={service} />
                            </Link>
                        </div>
                    ))}

                    </Stack>
                    <Grid container justifyContent="flex-end" sx={{ bottom: '10px', right: '10px' }}>
                        {services.length !== 0 && <Pagination
                        sx={{
                            '& .MuiPaginationItem-root': {
                            color: 'white', // Change the color of the numbers to white
                            },
                            '& .Mui-selected': {
                            backgroundColor: 'primary.main', // Ensure selected item has appropriate contrast
                            color: 'white', // Selected item color
                            },
                            '& .MuiPaginationItem-root.Mui-selected': {
                            backgroundColor: 'primary.main', // Selected item background color
                            },
                        }}
                        variant='outlined' count={pageNo} page={page} onChange={handlePageChange} />}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
        </Box>
        </Container>
    )
}

export default SearchService