import React, {useState, useEffect} from 'react'
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import UserSidebar from '../../../components/user/UserSidebar';
import { Container, Grid, TextField } from '@mui/material';
import './mycars.css';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { toast } from 'react-toastify';
import CarCard from '../../../components/user/CarCard';

const MyCars = () => {

    const [page, setPage] = React.useState(1);
    const [cars, setCars] = useState([]);
    const [car, setCar] = useState({});
    const [carsNumber, setCarsNumber] = useState(0);

    const deleteCar = async () => {
        try {
            const res = await axios.put(`/api/mycars/delete`, {id: car._id});
            console.log(res);
            toast.success("Car deleted successfully!");
            getMyCars();
            setPage(carsNumber);
        } catch (error) {
            console.log(error);
            toast.error("Error deleting car!");
        }
    };

    const getMyCars = async () => {
        try {
            const res = await axios.get("/api/mycars");
            setCars(res.data.cars);
            setCarsNumber(res.data.cars.length);
            setCar(res.data.cars[0]);
            console.log(res.data.cars);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getMyCars();
    }, []);

    const handleChange = (event, value) => {
        setPage(value);
        setCar(cars[value-1]);
    };

  return (
    <Container sx={{paddingTop: '5%'}}>
        <Grid container spacing={2}>
            <Grid item xs={4} sx={{paddingRight:"2%"}}>
            <UserSidebar/>
            </Grid>
            <Grid item xs={8}>
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <CarCard car={car} deleteCar={deleteCar}/>
                        <Stack direction="row" justifyContent="flex-end" alignItems="baseline">
                            <Pagination count={carsNumber} page={page} onChange={handleChange} />
                        </Stack>
                    </Grid>                   
                </Grid>
            </Grid>
        </Grid>
    </Container>
  )
}

export default MyCars
