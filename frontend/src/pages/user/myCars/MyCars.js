import React, {useState, useEffect} from 'react'
import UserSidebar from '../../../components/user/UserSidebar';
import { Container, Grid } from '@mui/material';
import './mycars.css';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import myAxios from '../../../components/axios/axios';
import { toast } from 'react-toastify';
import CarCard from '../../../components/user/CarCard';

const MyCars = () => {

    const [page, setPage] = React.useState(1);
    const [cars, setCars] = useState([]);
    const [car, setCar] = useState({});
    const [carsNumber, setCarsNumber] = useState(0);

    const deleteCar = async () => {
        try {
            const res = await myAxios.put(`/api/mycars/delete`, {id: car._id});

            if (!res.data.success) {
                toast.error("Error deleting car!");
                return;
            }
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
            const res = await myAxios.get("/api/mycars");
            setCars(res.data.cars);
            setCarsNumber(res.data.cars.length);
            setCar(res.data.cars[0]);
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
    <Container>
        <Grid container spacing={2} sx={{marginTop: '3%'}}>
            <Grid item xs={3}>
            <UserSidebar/>
            </Grid>
            <Grid item xs={9}>
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

export default MyCars;
